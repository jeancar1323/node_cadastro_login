const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const { text } = require('express')

// const { host, port, user, pass, } = require('../../config/mail.json')
 const {user, pass, email, } = require('../../config/configPessoal.json')
// const transport = nodemailer.createTransport({
//   host,
//   port,
//   auth: { user, pass }

// });



let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
      user,
      pass,
  }
});



// transport.sendMail(mailoptions, (error,info)=>{
//   if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
// })






// transport.use('compile', hbs({
//   viewEngine: {
//     defaultLayout: undefined,
//     partialsDir: path.resolve('./src/app/resources/mail/')
//   },
//   viewPath: path.resolve('./src/app/resources/mail/'),
//   extName: '.html',
// }));



module.exports = transport