const bufferBuild = require('./bufferBuild')
const validator = require('../validator')

const bodyContentImagesBuild = async (images)=>{
    validator().imagesValidate(images)

    const newFileImages = []

    for(let x of images){
        if(x.buffer){

            newFileImages.push({
                filename: x.filename,
                buffer: x.buffer
            })

        }else{
            const fileItem = await bufferBuild(x.filePath).then((buffer)=>{
                 return {
                    filename: x.filename,
                    content: buffer,
                    cid: x.cid
                }

            }).catch((erro)=>{
                fileImages=[]
                throw Error(`Images can´t be set. ${erro}`)
            })
            newFileImages.push(fileItem)
            
        }
    }

    return newFileImages

}

module.exports = bodyContentImagesBuild