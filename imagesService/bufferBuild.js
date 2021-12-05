const fs = require('fs')
const path = require('path')

const bufferBuild = (filePath)=>{
    return new Promise((res,rej)=>{
        fs.readFile(path.join(filePath),(erro,buffer)=>{
            if(erro){
                return rej(erro)
                
            }else{
                return res(buffer)
            }
            
        })
    })
    
}

module.exports = bufferBuild