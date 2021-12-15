const sendMail = require("./emailService")
const bodyContentImagesBuild = require("./imagesService/bodyContentImagesBuild")
const ejsCompiler = require('./ejsCompiler')
const validator = require('./validator')

const ejsSendMail = (configData)=>{
    validator().configValidate(configData)
    
    const send = async(mailData)=>{
        
        validator().maildataValidate(mailData)

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

                    if(images) bodyContentImages = await bodyContentImagesBuild(images)

                    if(bodyType === 'ejs') ejs = ejsCompiler(content,mailData.body?.ejsModel)

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

        const newMailData = {
            ...mailData,
            body: {
                bodyType,
                bodyContent
            }
        }

        try {
             sendMail.send({
                configData,
                mailData: newMailData
            })

            
        } catch (e) {
            console.log('Erro index: ',e.message)
            throw Error(`Send mail fail.${e.message}`)
        }

        
    }

    return{
        send
    }
}

module.exports = ejsSendMail