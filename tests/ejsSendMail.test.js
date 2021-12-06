const { assert } = require("chai")
const sendMail = require("../emailService")
const ejsSendMail = require('../index')
const sinon = require('sinon')

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

        it('Bodycontent should be the same as content passed by mailData with bodyType text',async()=>{

            const sendMailData = {
                to: 'sdfffsdf@fdsf.com',
                from: 'sdfsdf@fdsf.com',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'text',
                    content: 'texto texto xxx'                    
                }
                
            }

            const configData = {
                smtp:{
                    host: 'smtp.gmail.com',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            const sendMail = await ejsSendMail(configData).send(sendMailData)

            const {data} = sendMail

            assert.equal(sendMailData.body.content,data.body.bodyContent)
        })

        it('Bodycontent must be the same as content passed by mailData with bodyType html',async()=>{

            const sendMailData = {
                to: 'dsfsdf@dsfsdf.com',
                from: 'sdfsdf@fdsf.com',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'html',
                    content: 'html html xxx'                    
                }
                
            }

            const configData = {
                smtp:{
                    host: 'smtp.gmail.com',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            const sendMail = await ejsSendMail(configData).send(sendMailData)

            const {data} = sendMail

            assert.equal(sendMailData.body.content,data.body.bodyContent.content)
        })

        it('Bodycontent should be the same as content passed by mailData with bodyType ejs',async()=>{

            const sendMailData = {
                to: 'dsfsdf@dsfsdf.com',
                from: 'sdfsdf@fdsf.com',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'ejs',
                    content: 'ejs ejs xxx'                    
                }
                
            }

            const configData = {
                smtp:{
                    host: 'smtp.gmail.com',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            const sendMail = await ejsSendMail(configData).send(sendMailData)

            const {data} = sendMail

            assert.equal(sendMailData.body.content,data.body.bodyContent.content)
        })


        it('should be return error if pass value empty in smtp config',()=>{

            try {
                ejsSendMail()
            } catch (e) {
                assert.equal(e.message, 'Config data not configured')
            }
            
        })

        it('should be return error if pass value empty in mail mailData',async()=>{
            const configData = {
                smtp:{
                    host: 'smtp.gmail.com',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }


            

            ejsSendMail(configData).send().then((x)=>{
                return x

            }).catch((e)=>{
                console.log('message ejsSendMail test: ',e.message)
                assert.equal(e.message,'hhhhhhhh')
            })

        })

        it('should be return error if pass value empty of the mailData.from',async()=>{

            const configData = {
                smtp:{
                    host: 'smtp.gmail.com',
                    user: 'aaaa',
                    password: '123',
                    secure: true
                }  
            }

            const sendMailData = {
                to: 'dsfsdf@dsfsdf.com',
                from: 'dddddddddddddd',
                subject: 'assunto xxx',
                body: {
                    bodyType: 'text',
                    content: 'texto texto xxx'                    
                }
                
            }

            ejsSendMail(configData).send(sendMailData).then((x)=>{
                return x

            }).catch((e)=>{
                
                console.log('message ejsSendMail test: ',e.message)
                assert.equal(e.message,'hhhhhhhh')
            })
        })

        let sendMailServiceStub

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
            
        it('sendMail.send should exec successfully',()=>{
            
            ejsSendMail(data).send(sendMailData)
            
            assert.equal(sendMailServiceStub.callCount, 1)

        })

        it('Should get error when happens error in external sendMail.send e-mail service',()=>{
            
            sendMailServiceStub.throws(new Error('Test123'))
            
            assert.throws(()=>ejsSendMail(data).send(sendMailData),'Send mail fail.Test123')

        })

    })

})