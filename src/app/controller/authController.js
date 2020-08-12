const express = require('express')
const User = require('../model/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const crypto = require('crypto')
const mailer = require('../modules/mailer')
const { waitForDebugger } = require('inspector')



const router = express.Router()

//gera um token baseado nas informaçoes passada pelo obj params
generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

class AuthController {
  
  register = async (req, res) => {
    const { email } = req.body

    //verifica se já tem o email cadastrado
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "Email já cadastrado" })

      //cria o usuario
    await User.create(req.body)
      .then(user => {
        //esconde a senha
        user.password = undefined

        //retorna o usuario com o token
        res.status(200).send({
          user,
          token: generateToken({ id: user.id }),
        })
      }) //verifica se ocorreu algu erro e retorna 
      .catch(error => res.status(400).send({ error }))
  }

  authenticate = async (req, res) => {
    //desconstroi o body
    const { email, password } = req.body

    //ve pega o usuario pelo email
    await User.findOne({ email }).select('+password')
      .then(async user => {
        //verifica se o usuario existe
        if (!user)
          return res.status(400).send({ error: "Usuario não cadastrado" })
        
          //verifica se a senha é certa
        if (!await bcrypt.compare(password, user.password))
          return res.status(400).send({ error: "Senha inválida" })

          //esconde a senha
        user.password = undefined

        //retorna o usuario e o token com o id dele
        return res.status(200).send({
          user,
          token: generateToken({ id: user.id }),
        })
      })
      .catch(error => res.status(400).send({ error }))
  }

  forgot_pass =  async (req,res)=>{
    const {email} = req.body

    await User.findOne({email})
      .then(async user => {
        if(!user)
          return res.status(400).send({error: "Email não cadastrado"})
        
        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)
        
        await User.findByIdAndUpdate(user.id,{
          '$set': {
            passwordResetToken: token,
            passwordResetExpire: now,
          }
        })

        mailer.sendMail({
          to: email,
          from: 'jeancar@gisul.com',
          template: 'auth/forgot_pass',
          context: {token},
        }, error =>{
          if(error)
           return res.status(400).send({error})
          
           return res.status(200).send({mensagem: "email enviado com sucesso"})
      })

          
      })
      .catch(error => res.status(400).send({error}))


  }

  resetPassword = async (req,res) =>{
    const {email,token,password}  = req.body

    await User.findOne({email}).select('+passwordResetToken passwordResetExpire')
      .then( async user =>{
        if(!user)
          return res.status(400).send({error: "Usuario não existe"})
        
        if(token !== user.passwordResetToken)
          return res.status(400).send({error: "Token invalido"})

        if(new Date() > user.passwordResetExpire)
          return res.status(400).send({error: "Token Expirado, crie um novo token"})
        
        user.password = password

        await user.save();

        res.status(200).send({error: "Senha resetada com sucesso"})

      })
      .catch(error => res.status(400).send({error}))

  }


}

module.exports = new AuthController()


