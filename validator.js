const fs = require('fs')
const path = require('path')

const validator = ()=>{
    const configValidate = (configData)=>{
        if(!configData) throw Error(`SMTP config not configured. Please, configure calling config funtion.`)
        if(!configData.smtp.host) throw Error(`SMTP config host not informed.`)
        if(!configData.smtp.user) throw Error(`SMTP config user not informed.`)
        if(!configData.smtp.password) throw Error(`SMTP config password not informed.`)
    }

    const maildataValidate = (mailData)=>{
        const characters = ['@','.','com']
        let value = 0
        let result = 1
        if(!mailData) throw Error('mailData wasn´n informed')
        if(!mailData.body.bodyType) throw Error('bodyType not informed.')
        if(!mailData.from ) throw Error('from should be set')
        if(!mailData.to ) throw Error('to should be set')
        characters.map((e)=> {
            let verifyCharacter = mailData.to.includes(e)
    
            if(verifyCharacter) value = 1
            if(!verifyCharacter) value = 0
            
            result = result * value
        })

        if(result === 0) throw Error(`this email format does not exist`)
    }

    const imagesValidate = (images)=>{
        if(!images || images == [])  throw Error('image data not informed.')

        images.forEach((x)=>{
            if(x.buffer){
                const sizeBuffer = x.buffer.toString().length

                console.log('sizeBuffer: ',sizeBuffer)

                if(sizeBuffer >= 2000000) throw Error('BUFFER The file image exceeds the allowed size.')
                return false

            }else{
                const typeFile = path.extname(x.filePath)
                const stats = fs.statSync(x.filePath)
                const sizeFilePath = stats['size']

                console.log('sizeFilePath: ',sizeFilePath)
                console.log('typeFile: ',typeFile)
                
                if(typeFile === '.pdf'){
                    if(sizeFilePath >= 2000000) throw Error('PDF The file image exceeds the allowed size.')

                }else{
                    if(sizeFilePath >= 2000000) throw Error('NÃO PDF The file image exceeds the allowed size.')

                }
            }
        })

        console.log('images: ',images)

    }

    return{
        configValidate,
        maildataValidate,
        imagesValidate
    }
    
}

module.exports = validator