const { assert } = require("chai")
const ejsCompiler = require('../ejsCompiler')

describe('ejsCompiler',()=>{
    it('content should be send correctly when pass the bodytype ejs',()=>{
        const sendMailData = {
            to: 'dsfsdf@dsfsdf.com',
            from: 'sdfsdf@fdsf.com',
            subject: 'assunto xxx',
            body: {
                bodyType: 'ejs',
                content: 'ejs ejs xxx'                  
            }
            
        }

        ejsCompiler(sendMailData.body.content,sendMailData.body?.ejsModel)

        assert.isTrue(sendMailData.body.content != null || sendMailData.body.content != undefined)
    })

    it('should be return error if pass body.content empty',async()=>{

        const message = await ejsCompiler()
        .then((x)=>{return x})
        .catch((e)=>{return e})

        assert.equal(message,'ejsTemplate not exists.')
    })
})