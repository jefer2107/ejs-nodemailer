const { assert } = require("chai")
const sendMail = require("../emailService")
const ejsSendMail = require('../index')
const sinon = require('sinon')
const bodyContentImagesBuild = require("../imagesService/bodyContentImagesBuild")
const ejsCompiler = require('../ejsCompiler')

describe('ejsSendMail Test',()=>{
    describe('send',()=>{
        it('configData and mailData should be pass correctly',()=>{
            const configData = {
                smtp:{
                    host: 'vfgthynju',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            const sendMailData = {
                to: 'smtp.gmail.com',
                from: 'sdfsdf@fdsf.com',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'text',
                    content: 'texto texto xxx'                    
                }
                
            }

            ejsSendMail(configData).send(sendMailData)

            assert.isTrue(configData != null || configData != undefined)
            assert.isTrue(sendMailData != null || sendMailData != undefined)
            assert.isTrue(sendMailData.from != null || sendMailData.from !== undefined)
            assert.isTrue(sendMailData.to != null || sendMailData.to !== undefined)
        })

            let sendMailServiceStub;

            const data = {
                smtp:{
                    host: 'vfgthynju',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            const sendMailData = {
                to: 'dsfsdf@dsfsdf.com',
                from: 'sdfsdf@fdsf.com',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'text',
                    content: 'texto texto xxx'                    
                }
                
            }

            before(()=>{
                sendMailServiceStub = sinon.stub(sendMail,'send')
            })

            beforeEach(()=>{
                sendMailServiceStub.reset()
            })

            after(()=>{
                sendMailServiceStub.restore()
            })

        it('Bodycontent should be the same as content passed by mailData with bodyType text',async()=>{

            ejsSendMail(data).send(sendMailData)

            const args = sendMailServiceStub.args

            const mailData = args[0][0].mailData

            assert.equal(sendMailData.body.content,mailData.body.bodyContent)
        })

        it('Bodycontent must be the same as content passed by mailData with bodyType html',async()=>{

            const newSendMailDataHtml = {
                ...sendMailData,
                body:{
                    bodyType: 'html',
                    content: 'html html xxx'
                }
            }

            ejsSendMail(data).send(newSendMailDataHtml)

            const args = sendMailServiceStub.args

            const mailData = args[0][0].mailData

            assert.equal(newSendMailDataHtml.body.content,mailData.body.bodyContent.content)

            
        })

        it('Bodycontent must be the same as content passed by mailData with bodyType ejs',async()=>{

            const newSendMailDataEjs = {
                ...sendMailData,
                body:{
                    bodyType: 'ejs',
                    content: 'ejs ejs xxx'
                }
            }

            let ejsCompilerStub;

            ejsCompilerStub = sinon.stub(ejsCompiler)

            ejsSendMail(data).send(newSendMailDataEjs)

            await ejsCompilerStub

            const args = sendMailServiceStub.args

            const mailData = args[0][0].mailData

            assert.equal(newSendMailDataEjs.body.content,mailData.body.bodyContent.content)

            
        })

        //     let bodyContentImagesBuildStub;

        //     const sendMailDataImages = {
        //         ...sendMailData,
        //         body:{
        //             bodyType: 'ejs',
        //             content: 'ejs ejs xxx',
        //             images: [
        //                 {
        //                     filename: 'imageTest 1',
        //                     buffer: 'buffer test 1'
        //                 },
        //                 {
        //                     filename: 'imageTest 2',
        //                     buffer: 'buffer test 2'
        //                 },
        //                 {
        //                     filename: 'html 2',
        //                     filePath:'images/html5.png',
        //                     cid: 'html'
        //                 }
        //             ]      
        //         }
        //     }

        //     before(()=> {
        //         bodyContentImagesBuildStub = sinon.stub(bodyContentImagesBuild)
        //     });

        //     beforeEach(()=>{
        //         bodyContentImagesBuildStub.reset()
        //     })

        //     after(()=>{
        //         bodyContentImagesBuildStub.restore()
        //     })

        // it('Bodycontent should be return correctly with bodyType ejs or html with images',async()=>{

        //     let imagesResult
            
        //     ejsSendMail(data).send(sendMailDataImages)

        //     const args = await bodyContentImagesBuildStub.arg

        //     console.log('args: ',args)


        // })

        it('should be return error if pass value empty in smtp config',async()=>{

            try {
                await ejsSendMail()

            } catch (e) {
                assert.equal(e.message, 'SMTP config not configured. Please, configure calling config funtion.')
            }
            
        })

        it('should be return error if pass value empty in mail mailData',async()=>{
            const configData = {
                smtp:{
                    host: 'frtgyhujki',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            try {
                await ejsSendMail(configData).send()

            } catch (e) {
                assert.equal(e.message,'mailData wasn´n informed')

            }

        })

        it('should be return error if pass value empty of the mailData.from',async()=>{

            const newSendMailDataNotFrom = {
                ...sendMailData,
                from: '',
            }

            try {
                await ejsSendMail(data).send(newSendMailDataNotFrom)

            } catch (e) {
                assert.equal(e.message,'from should be set')
            }
        })

        it('should be return error if pass email format incorrectly of the mailData.from',async()=>{

            const newSendMailDataEmailFormatFrom = {
                ...sendMailData,
                from: 'vvvvvvvvvvv',
            }

            try {
                await ejsSendMail(data).send(newSendMailDataEmailFormatFrom)

            } catch (e) {
                assert.equal(e.message,`this email format: ${newSendMailDataEmailFormatFrom.from} does not exist`)
            }
        })

        it('should be return error if pass email format incorrectly of the mailData.from',async()=>{

            const newSendMailDataEmailFormatTo = {
                ...sendMailData,
                to: 'ggggggggggggg',
            }

            try {
                await ejsSendMail(data).send(newSendMailDataEmailFormatTo)

            } catch (e) {
                assert.equal(e.message,`this email format: ${newSendMailDataEmailFormatTo.to} does not exist`)
            }
        })

        it('Should get error when happens error in external sendMail.send e-mail service',async ()=>{
            
            sendMailServiceStub.throws(new Error('Test123'))

            try {
                await ejsSendMail(data).send(sendMailData)
                
            } catch (error) {
                assert.equal(error.message, 'Send mail fail.Test123')
            }

        })
            
        it('sendMail.send should be exec only once',()=>{
            
            ejsSendMail(data).send(sendMailData)
            
            assert.equal(sendMailServiceStub.callCount, 1)

        })

    })

})