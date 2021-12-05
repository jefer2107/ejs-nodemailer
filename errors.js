const erro = (configData,mailData)=>{
    if(!configData) throw Error(`SMTP config not configured. Please, configure calling 'config' funtion`)
    if(!mailData) throw Error('mailData wasn´n informed')
    if(!mailData.from ) throw Error('from should be set')
    if(!mailData.to ) throw Error('to should be set')

    const emailFormat = (email)=>{
        const characters = ['@','.','com']
        let value = 0
        let result = 1
        characters.map((e)=> {
            let verifyCharacter = email.includes(e)

            if(verifyCharacter) value = 1
            if(!verifyCharacter) value = 0
            
            result = result * value
        })
    
        if(result === 0) throw Error(`this email format does not exist`)
        
    }

    return {
        emailFormat
    }
}

module.exports = erro