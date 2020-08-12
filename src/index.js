const express = require('express')
const bodyparser = require('body-parser')
const app = express();
const authRouter = require('./app/routes/authRouter')
const projectRouter = require('./app/routes/projectRouts')
const mail = require('./app/modules/mailer');
const transport = require('./app/modules/mailer');
const { user, pass, email, } = require('./config/configPessoal.json')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

var mailoptions = {
      from: user,
      to: email,
      subject: 'testando',
      text: "teste teste"
}


app.get('/email', async (req, res) => {

      await transport.sendMail(mailoptions)
            .then((response) =>       
            res.status(200).send({
                  Mensagem: "Email enviado com sucesso",
                  Informacao: response.response
            }))
            .catch(error => res.status(400).send({error}))
})

app.use('/auth', authRouter)
app.use('/project', projectRouter)
app.get('/', (req, res) => {
      res.send('Hell world')
})

app.listen(3000, _ => console.log("Workando ?"))