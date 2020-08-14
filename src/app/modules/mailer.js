const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const {user, pass, email, } = require('../../config/configPessoal.json')

// cria o "trasport" com as informaões host > serviço que ira utilizar auth :{ user = seu login, pass = sua senha}
let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
      user,
      pass,
  }
});

//definindo para enviar um layot html
transport.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./src/app/resources/mail/')
  },
  viewPath: path.resolve('./src/app/resources/mail/'),
  extName: '.html',
}));



module.exports = transport