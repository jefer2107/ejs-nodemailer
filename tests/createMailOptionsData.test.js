const { assert } = require("chai")
const createMailOptionsData = require('../createMailOptionsData')
const ejsSendMail = require('../index')

describe('createMailOptionsData',()=>{
    it('mailData and bodyType should be pass correctly',()=>{
        
        const sendMailData = {
            to: 'dsfsdf@dsfsdf.com',
            from: 'sdfsdf@fdsf.com',
            subject: 'assunto xxx',
            body: {
                bodyType: 'text',
                content: 'texto texto xxx'                    
            }
            
        }

        createMailOptionsData(sendMailData)

        const {bodyType} = sendMailData.body

        assert.isTrue(sendMailData != null || sendMailData != undefined)
        assert.isTrue(sendMailData.to != null || sendMailData.to != undefined)
        assert.isTrue(sendMailData.from != null || sendMailData.from != undefined)
        assert.isTrue(bodyType != null || bodyType != undefined)
    })

    it('should be return data correctly when pass the bodytype text',async()=>{
        const configData = {
            smtp:{
                host: 'smtp.gmail.com',
                user: 'aaaa',
                password: '123',
                secure: true
            }  
        }
        const sendMailData = {
            from: 'dsfsdf@dsfsdf.com',
            to: 'sdfsdf@fdsf.com',
            subject: 'assunto xxx',
            body: {
                bodyType: 'text',
                content: 'texto texto xxx'                    
            }
            
        }

        const mailData = await ejsSendMail(configData).send(sendMailData)

        const {data} = mailData

        createMailOptionsData(data)

        assert.equal(sendMailData.body.content,data.body.bodyContent)

    })

    it('should be return data correctly when pass the bodytype html or ejs',async()=>{
        const configData = {
            smtp:{
                host: 'smtp.gmail.com',
                user: 'aaaa',
                password: '123',
                secure: true
            }  
        }
        const sendMailData = {
            from: 'dsfsdf@dsfsdf.com',
            to: 'sdfsdf@fdsf.com',
            subject: 'assunto xxx',
            body: {
                bodyType: 'html',
                content: 'html html xxx'
                                        
            }
            
        }

        const mailData = await ejsSendMail(configData).send(sendMailData)

        const {data} = mailData

        createMailOptionsData(data)

        assert.equal(sendMailData.body.content,data.body.bodyContent.content)

    })

    it('should be return data correctly when pass the bodytype html or ejs with images',async()=>{

        const configData = {
            smtp:{
                host: 'smtp.gmail.com',
                user: 'aaaa',
                password: '123',
                secure: true
            }  
        }
        
        const sendMailData = {
            from: 'dsfsdf@dsfsdf.com',
            to: 'sdfsdf@fdsf.com',
            subject: 'assunto xxx',
            body: {
                bodyType: 'html',
                content: 'html html xxx',
                images:[
                    {
                        filename: 'node',
                        buffer: 'buffer 1'
                    },
                    {
                        filename: 'html 1',
                        buffer: 'buffer 2'
                    },
                    {
                        filename: 'html 2',
                        filePath:'images/html5.png',
                        cid: 'html'
                    }
                    
                ]
                                        
            }
            
        }

        const mailData = await ejsSendMail(configData).send(sendMailData)

        const {data} = mailData

        const mailOptions = createMailOptionsData(data)

        const {images} = data.body.bodyContent
        const imagesMailOptions = mailOptions.attachments.map((x)=>{
            if(x.filename){
                return x.filename
            }
        })
        const imagesFilter = images.map((x)=>{
            if(x.filename){
                return x.filename
            }
        })

        const imagesStringiFy = JSON.stringify(imagesFilter)
        const imagesMailOptionsStringiFy = JSON.stringify(imagesMailOptions)

        const imagesLength = images.length
        const imagesMailOptionsLength = imagesMailOptions.length

        console.log('imagesMailOptionsStringiFy: ',imagesMailOptionsStringiFy)
        console.log('imagesStringiFy: ',imagesStringiFy)

        assert.equal(imagesLength,imagesMailOptionsLength)
        assert.equal(imagesStringiFy,imagesMailOptionsStringiFy)

    })

    it('should be returned an error when pass mailData null or undefined',()=>{

        assert.throws(()=>createMailOptionsData(),'maildata not informed.')
    })

    it('should be returned an error when pass mailData.to null or empty',()=>{

        const sendMailData = {
            from: 'sdfsdf@fdsf.com',
            subject: 'assunto xxx',
            body: { 
                bodyType: 'text',
                bodyContent: 'texto texto xxx'
            }
            
        }

        assert.throws(()=>createMailOptionsData(sendMailData),'to not informed.')
    })
})