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
                filename: 'imageTest 1',
                buffer: 'buffer test 1'
            },
            {
                filename: 'imageTest 2',
                buffer: 'buffer test 2'
            },
            {
                filename: 'html 2',
                filePath:'imagesTest/html5.png',
                cid: 'html'
            }
        ]       
        
            
    }
})

