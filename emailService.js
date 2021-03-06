const nodemailer = require('nodemailer')
const createMailOptionsData = require('./createMailOptionsData')
const validator = require('./validator')

const send = ({configData,mailData})=>{
    validator().configValidate(configData)
    validator().maildataValidate(mailData)

        const {smtp} = configData

        const transporter = nodemailer.createTransport({ 
            host:smtp.host,
            secure:smtp.secure,
            port:smtp.port,
            auth: {
                user:smtp.user,
                pass:smtp.password
            }
        })

        transporter.sendMail(createMailOptionsData(mailData),(error)=>{
            if(error) throw Error(error.message)
            
            console.log('Email sucessfully')
        })

        return transporter
    

}

const sendMailService = {
    send
}

module.exports = sendMailService