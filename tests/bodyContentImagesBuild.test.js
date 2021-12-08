const { assert } = require("chai")
const bodyContentImagesBuild = require('../imagesService/bodyContentImagesBuild')

describe('bodyContentImagesBuild',()=>{
    it('should be pass images correctly',async()=>{

        const sendMailData = {
            to: 'dsfsdf@dsfsdf.com',
            from: 'sdfsdf@fdsf.com',
            subject: 'assunto xxx',
            body: {
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

        const {images} = sendMailData.body

        const newFileImages = await bodyContentImagesBuild(images)
        const newFileImagesFilter = newFileImages.map((x)=>{if(x.filename) return x.filename})
         
        const imagesFilter = images.map(x=>{if(x.filename) return x.filename})

        const newFileImagesStringiFy = JSON.stringify(newFileImagesFilter)
        const imagesStringiFy = JSON.stringify(imagesFilter)

        console.log('newFileImagesStringiFy: ',newFileImagesStringiFy)
        console.log('imagesStringiFy: ',imagesStringiFy)

        assert.isTrue(images != null || images != undefined)
        assert.equal(newFileImagesStringiFy,imagesStringiFy)
        
    })

    it('should be return an error when images null or undefined',async()=>{

        bodyContentImagesBuild().then((x)=>{
            return x

        }).catch((e)=>{
            console.log('message bodyContentImagesBuild test: ',e.message)
            assert.equal(e.message, 'mmmmmmkkkkiiiii')
        })
    })

   
})