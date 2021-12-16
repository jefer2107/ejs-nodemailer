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
        const newFileImagesFileName = newFileImages.map(x=>{if(x.filename) return x.filename})
         
        const imagesFileName = images.map(x=>{if(x.filename) return x.filename})

        const newFileImagesString = JSON.stringify(newFileImagesFileName)
        const imagesFileNameString = JSON.stringify(imagesFileName)

        console.log('newFileImagesStringiFy: ',newFileImagesString)
        console.log('imagesStringiFy: ',imagesFileNameString)

        assert.isTrue(images != null || images != undefined)
        assert.equal(newFileImagesString,imagesFileNameString)
        
    })

    it('should be return an error when images null or undefined',async()=>{

        try {
            await bodyContentImagesBuild()

        } catch (e) {
            assert.equal(e.message,'image data not informed.')
            
        }
    })

   
})