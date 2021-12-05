

const send = ({configData,mailData})=>{
    erro(configData,mailData).emailFormat(mailData.to)

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
            if(error)
            {
                throw Error(error.message)
                
            }
            else
            {
                console.log('Email sucessfully')
            }
        })

        return transporter
    

}

const sendMailService = {
    send
}

module.exports = sendMailService