const express = require('express')
const Project = require('../model/Project')
const Task = require('../model/Task')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const { findOne } = require('../model/Project')
const { response } = require('express')

class ProjectController {
  
  show = async (req, res) => {
    if (!req.query.projectId)
      return res.status(400).send({ error: true, msg: "Faltando o id do projeto projectId " })

    await Project.findById(req.query.projectId)
      .populate(['user','tasks'])
      .then(project => {
        if (!project)
          return res.status(404).send({ error: true, msg: "Projeto não encontrado" })

        return res.send(project)
      })
      .catch(erro => res.status(400).send({ error: true, erro }))

  }

  create = async (req, res) => {

    await Project.create({...req.body, user: req.userId })
      .then(project  => res.status(201).send({error: false, project}) )
      .catch(erro => res.status(400).send({ error: true, erro}))
  }

  update = async (req, res) => {
    if (!req.query.projectId)
      return res.status(400).send({ error: true, msg: "Faltando a query projetoId" })

    await Project.findById(req.query.projectId)
      .then(async project => {
        if (!project)
         return res.status(404).send({ error: true, msg: "Projeto não encontrado" })

        await Project.findByIdAndUpdate(req.query.projectId, req.body,{new:true} )
          .populate('user')
          .then(project =>   res.send({ error: false, project }))
          .catch(erro => res.status(400).send({ error: true, erro }))
      })
      .catch(erro => res.status(400).send({ error: true, erro }))
  }

  listAll = async (req, res) => {

    await Project.find()
      .populate(['user','tasks'])
      .then(project => {
        return res.send({ error: false, project })
      })
      .catch(erro => res.status(400).send({ error: true, erro }))
  }

  delete = async (req, res) => {
    if (!req.query.projectId)
      return res.status(400).send({ error: true, msg: "Faltando o id do projeto projectId " })

    await Project.findById(req.query.projectId)
      .then(async project => {
        if (!project)
          return res.status(404).send({ error: true, msg: "Projeto não encontrado" })

        await Task.remove({project: project.id})  

        await Project.findByIdAndRemove(req.query.projectId)
          .then(response => res.send({ error: false, msg: "Projeto deletado com sucesso" }))
          .catch(erro => res.status(400).send({ error: true, erro }))

      })
      .catch(erro => res.status(400).send({ error: true, erro }))


  }


}

module.exports = new ProjectController()