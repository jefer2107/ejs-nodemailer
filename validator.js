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
        const characters = ['@','.','.com']
        if(!mailData) throw Error('mailData wasn´n informed')
        if(!mailData.body.bodyType) throw Error('bodyType not informed.')
        if(!mailData.from ) throw Error('from should be set')
        characters.map(e=> {if(!mailData.from.includes(e)) 
            throw Error(`this email format: ${mailData.from} does not exist`)})

        if(!mailData.to ) throw Error('to should be set')
        characters.map(e=> {if(!mailData.to.includes(e)) 
            throw Error(`this email format: ${mailData.to} does not exist`)})

    }

    const imagesValidate = (images)=>{
        if(!images || images == [])  throw Error('image data not informed.')

        images.forEach((x)=>{
            if(x.buffer){
                if(x.buffer.toString().length >= 2000000) 
                    throw Error(`The file: ${x.buffer} exceeds the allowed size.`)

            }else{
                
                if(path.extname(x.filePath) === '.pdf'){
                    if(fs.statSync(x.filePath)['size'] >= 1000000)
                        throw Error(`The file: ${x.filePath} exceeds the allowed size.`)

                }else{
                    if(fs.statSync(x.filePath)['size'] >= 2000000) 
                    throw Error(`The file: ${x.filePath} exceeds the allowed size.`)

                }
            }
        })

    }

    return{
        configValidate,
        maildataValidate,
        imagesValidate
    }
    
}

module.exports = validator