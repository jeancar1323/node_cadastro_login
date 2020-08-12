const express = require('express')
const User = require('../model/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')



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


}

module.exports = new AuthController()


