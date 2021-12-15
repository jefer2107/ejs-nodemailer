const validator = require('./validator')

const createMailOptionsData = (mailData)=>{
    validator().maildataValidate(mailData)
    
    let mailOptions = {}

    const {bodyType} = mailData.body

    switch(bodyType){
        case 'text':
            mailOptions = {
                from: mailData.from,
                to: mailData.to,
                subject: mailData.subject,
                text: mailData.body.bodyContent
            }
            break
        case 'html':
        case 'ejs':
            mailOptions = {
                from: mailData.from,
                to: mailData.to,
                subject: mailData.subject,
                attachments:mailData.body.bodyContent.images,
                html: mailData.body.bodyContent.content
            }
            break
    }


    return mailOptions

}

module.exports = createMailOptionsData