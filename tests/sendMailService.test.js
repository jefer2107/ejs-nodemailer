// const { assert } = require("chai")
// const ejsSendMail = require('../index')
// const sendMail = require('../emailService')

// describe('sendMailService',()=>{
//     describe('send',()=>{
//         it('configData and mailData should be pass correctly',async()=>{

//             const configData = {
//                 smtp:{
//                     host: 'smtp.gmail.com',
//                     user: 'aaaa',
//                     password: '123',
//                     secure: true
//                 }  
//             }

//             const sendMailData = {
//                 to: 'dsfsdf@dsfsdf.com',
//                 from: 'sdfsdf@fdsf.com',
//                 subject: 'assunto xxx',
//                 body: {
//                     bodyType: 'text',
//                     content: 'texto texto xxx'                    
//                 }
                
//             }

//             ejsSendMail(configData).send(sendMailData).then((x)=>{
//                 const mailData = x.data

//                 sendMail.send({configData,mailData})

//                 assert.isTrue(configData != null || configData != undefined)
//                 assert.isTrue(mailData != null || mailData != undefined)
//                 assert.isTrue(mailData.to != null || mailData.to != undefined)
//                 assert.isTrue(mailData.from != null || mailData.from != undefined)

//             })
            
//         })

//         it('configData should be pass correctly by transporter',async()=>{

//             const configData = {
//                 smtp:{
//                     host: 'smtp.gmail.com',
//                     user: 'aaaa',
//                     password: '123',
//                     secure: true
//                 }  
//             }
//             const sendMailData = {
//                 to: 'dsfsdf@dsfsdf.com',
//                 from: 'sdfsdf@fdsf.com',
//                 subject: 'assunto xxx',
//                 body: {
//                     bodyType: 'text',
//                     content: 'texto texto xxx'                    
//                 }
                
//             }

//             ejsSendMail(configData).send(sendMailData).then((x)=>{
//                 const mailData = x.data

//                 const transporter = sendMail.send({configData,mailData})

//                 const smtpTransporter = transporter.options

//                 const {smtp} = configData

//                 assert.equal(smtpTransporter.host,smtp.host)
//                 assert.equal(smtpTransporter.secure,smtp.secure)
//                 assert.equal(smtpTransporter.port,smtp.port)
//                 assert.equal(smtpTransporter.host,smtp.host)
//                 assert.equal(smtpTransporter.auth.user,smtp.auth.user)
//                 assert.equal(smtpTransporter.auth.pass,smtp.auth.password)
//             })

            

            
//         })
//     })
// })