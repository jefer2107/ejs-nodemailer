const { assert } = require("chai")
const sendMail = require("../emailService")
const ejsSendMail = require('../index')
const sinon = require('sinon')
const bodyContentImagesBuild = require("../imagesService/bodyContentImagesBuild")

describe('ejsSendMail Test',()=>{
    describe('send',()=>{
        it('configData and mailData should be pass correctly',()=>{
            const configData = {
                smtp:{
                    host: 'smtp.gmail.com',
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

            const sendMailData = {
                to: 'dsfsdf@dsfsdf.com',
                from: 'sdfsdf@fdsf.com',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'text',
                    content: 'texto texto xxx'                    
                }
                
            }

            const data = {
                smtp:{
                    host: 'smtp.gmail.com',
                    user: 'aaaa',
                    password: '123',
                    secure: true
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

        it('Bodycontent must be the same as content passed by mailData with bodyType html',async()=>{

            const newSendMailDataEjs = {
                ...sendMailData,
                body:{
                    bodyType: 'ejs',
                    content: 'ejs ejs xxx'
                }
            }

            ejsSendMail(data).send(newSendMailDataEjs)

            const args = sendMailServiceStub.args

            const mailData = args[0][0].mailData

            assert.equal(newSendMailDataEjs.body.content,mailData.body.bodyContent.content)

            
        })

            //let bodyContentImagesBuildStub;


            // before(()=>{
            //     bodyContentImagesBuildStub = sinon.stub(bodyContentImagesBuild,'bodyContentImagesBuild')
            // })

            // beforeEach(()=>{
            //     bodyContentImagesBuildStub.reset()
            // })

            // after(()=>{
            //     bodyContentImagesBuildStub.restore()
            // })

            const sendMailDataImages = {
                ...sendMailData,
                body:{
                    bodyType: 'ejs',
                    content: 'ejs ejs xxx',
                    images: [
                        {
                            filename: 'imageTest 1',
                            buffer: 'buffer test 1'
                        },
                        {
                            filename: 'imageTest 2',
                            buffer: 'buffer test 2'
                        },
                        {
                            filename: 'html 2',
                            filePath:'images/html5.png',
                            cid: 'html'
                        }
                    ]      
                }
            }

        it('Bodycontent should be return correctly with bodyType ejs or html with images',async()=>{

            let bodyContentImagesBuildStub;

            let imagesResult

            bodyContentImagesBuildStub = sinon.stub(bodyContentImagesBuild)

            ejsSendMail(data).send(sendMailDataImages)

            await bodyContentImagesBuild(sendMailDataImages.body.images)

            //console.log('bodyContentImagesBuild: ',imagesResult)

            // const args = await sendMailServiceStub.args

            // const mailData = args[0][0].mailData

            // console.log('images: ',images)

            // console.log('mailData: ',mailData)

        })


        // it('should be return error if pass value empty in smtp config',()=>{

        //     try {
        //         ejsSendMail()
        //     } catch (e) {
        //         assert.equal(e.message, 'SMTP config not configured. Please, configure calling config funtion.')
        //     }
            
        // })

        // it('should be return error if pass value empty in mail mailData',async()=>{
        //     const configData = {
        //         smtp:{
        //             host: 'smtp.gmail.com',
        //             user: 'aaaa',
        //             password: '123',
        //             secure: true
        //         }  
        //     }

        //     ejsSendMail(configData).send().then((x)=>{
        //         return x

        //     }).catch((e)=>{
        //         console.log('message ejsSendMail test: ',e.message)
        //         assert.equal(e.message,'hhhhhhhh')
        //     })

        // })

        // it('should be return error if pass value empty of the mailData.from',async()=>{

        //     const configData = {
        //         smtp:{
        //             host: 'smtp.gmail.com',
        //             user: 'aaaa',
        //             password: '123',
        //             secure: true
        //         }  
        //     }

        //     const sendMailData = {
        //         to: 'dsfsdf@dsfsdf.com',
        //         from: 'dddddddddddddd',
        //         subject: 'assunto xxx',
        //         body: {
        //             bodyType: 'text',
        //             content: 'texto texto xxx'                    
        //         }
                
        //     }

        //     ejsSendMail(configData).send(sendMailData).then((x)=>{
        //         return x

        //     }).catch((e)=>{
                
        //         console.log('message ejsSendMail test: ',e.message)
        //         assert.equal(e.message,'hhhhhhhh')
        //     })
        // })

        // let sendMailServiceStub

        // const sendMailData = {
        //     to: 'dsfsdf@dsfsdf.com',
        //     from: 'sdfsdf@fdsf.com',
        //     subject: 'assunto xxx',
        //     body: {
        //         bodyType: 'text',
        //         content: 'texto texto xxx'                    
        //     }
            
        // }

        // const data = {
        //     smtp:{
        //         host: 'smtp.gmail.com',
        //         user: 'aaaa',
        //         password: '123',
        //         secure: true
        //     }  
        // }

        // before(()=>{
        //     sendMailServiceStub = sinon.stub(sendMail,'send')
        // })

        // beforeEach(()=>{
        //     sendMailServiceStub.reset()
        // })

        // after(()=>{
        //     sendMailServiceStub.restore()
        // })
            
        // it('sendMail.send should exec successfully',()=>{
            
        //     ejsSendMail(data).send(sendMailData)
            
        //     assert.equal(sendMailServiceStub.callCount, 1)

        // })

        // it('Should get error when happens error in external sendMail.send e-mail service',async ()=>{
            
        //     sendMailServiceStub.throws(new Error('Test123'))

        //     try {
        //         await ejsSendMail(data).send(sendMailData)
        //     } catch (error) {
        //         assert.equal(error.message, 'Send mail fail.Test123')
        //     }

        // })

    })

})