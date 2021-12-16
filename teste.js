const ejsSendMail = require('./index')
const ejs = require('ejs')

ejsSendMail({
    smtp: {
        host: "smtp.gmail.com",
        user:'wx2sistemasteste@gmail.com',
        password:'m3t@lp0p0',
        port: 587,
        secure: false
    }
}).send({
    from: 'wx2sistemasteste@gmail.com',
    to:'jefer210784@gmail.com',
    subject:'Mensagem para o Francisco',
    body: {
        bodyType: 'ejs',
        content: `Testando`,
        images: [
            {
                filename: 'imageTest 2',
                buffer: 'buffer 2'
            },
            {
                filename: 'html-pdf 1',
                filePath:'images/test2.pdf',
                cid: 'html'
            },
            {
                filename: 'html 2',
                filePath:'images/html5.png',
                cid: 'html'
            }
        ]       
        
            
    }
})

