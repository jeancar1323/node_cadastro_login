const express = require('express')
const User = require('../model/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')

class ProjectController{
  token = (req,res)=>{
      res.send({ok: true, id :req.userId })
  }
}

module.exports = new ProjectController()