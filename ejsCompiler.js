const ejs = require('ejs')

const ejsCompiler = (ejsContent, data)=>{
    return new Promise((res,rej)=>{
        if(!ejsContent){
            return rej('ejsTemplate not exists.')
        } 

        let template = ejs.compile(ejsContent)
        const html = template(data)
        return res(html)  
    })
    
}


module.exports = ejsCompiler