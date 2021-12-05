const bufferCompiler = require('./bufferCompiler')

const bodyContentImagesBuild = async (images)=>{
    if(!images || images == [])  throw Error('image data not informed.')

    const newFileImages = []

    for(let x of images){
        if(x.buffer){

            newFileImages.push({
                filename: x.filename,
                buffer: x.buffer
            })

        }else{
            const fileItem = await bufferCompiler(x.filePath).then((buffer)=>{
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