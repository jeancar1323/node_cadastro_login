const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')

const { host, port, user, pass, } = require('../../config/mail.json')

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }

});


transport.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./src/app/resources/mail/')
  },
  viewPath: path.resolve('./src/app/resources/mail/'),
  extName: '.html',
}));



module.exports = transport