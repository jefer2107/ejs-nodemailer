const sendMail = require("./emailService")
const bodyContentImagesBuild = require("./imagesService/bodyContentImagesBuild")
const ejsCompiler = require('./ejsCompiler')
const erro = require('./errors')

const ejsSendMail = (configData)=>{
    if(!configData)throw Error('Config data not configured')
    
    const send = async  (mailData)=>{
        const newMailData = {
            data: null
        }
        
        erro(configData,mailData)

        let bodyContent

        if(mailData.body && mailData.body.bodyType) {

            const {bodyType,content,images} = mailData.body
            
            switch(bodyType){
                case 'text':
                    bodyContent = content
                    break
                case 'html':
                case 'ejs':
                    let ejs = null, bodyContentImages

                    if(images)
                        bodyContentImages = await bodyContentImagesBuild(images)

                    if(bodyType === 'ejs') 
                        ejs = ejsCompiler(content,mailData.body?.ejsModel)

                    bodyContent = {
                        content: (bodyType === 'ejs' ? ejs : content),
                        images: bodyContentImages
                    }

                    break
                default:
                    throw Error('BodyType setted not exists')
            }
        }

        const bodyType = mailData.body.bodyType

        const data = {
            ...mailData,
            body: {
                bodyType,
                bodyContent
            }
        }

        newMailData.data = data

        try {
             sendMail.send({
                configData,
                mailData: newMailData.data
            })

            
        } catch (e) {
            console.log('Erro index: ',e.message)
            throw Error(`Send mail fail.${e.message}`)
        }

        return newMailData

        
    }

    return{
        send
    }
}

module.exports = ejsSendMail