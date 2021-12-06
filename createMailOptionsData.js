
const createMailOptionsData = (mailData)=>{
    
    if(mailData == null || mailData == undefined) throw Error('maildata not informed.')
    if(mailData.to == null || mailData.to == '') throw Error('to not informed.')
    if(mailData.from == null || mailData.from == '') throw Error('from not informed.')
    if(mailData.body.bodyType == null || mailData.body.bodyType == '') throw Error('bodyType not informed.')
    
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