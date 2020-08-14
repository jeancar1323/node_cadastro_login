const Task = require('../model/Task')
const Project = require('../model/Project')


 module.exports = new class taskController{

  create = async (req,res)=>{

   await Project.findById(req.projectId).populate('tasks')
    .then(async project=>{
      if(!project)
        return res.status(404).send({error: true, msg:'Projeto não existe'})

        await Task.create({...req.body, project: req.projectId})
          .then(async task=>{
            project.tasks.push(task)
            await project.save()

            return res.status(201).send({error:false, project})
              
          })
          .catch(erro => res.status(400).send({error: true, erro}))  

    })
    .catch(erro => res.status(400).send({error: true, erro}))
  }
  
  listAll = async (req,res)=>{

    await Task.find()
    .then(tasks => res.send({error:false,tasks}))
    .catch(erro => res.status(400).send({error: true, erro }))

  }

  show =  async (req,res)=> {
    await Task.findById(req.taskId).populate('project')
    .then(task => {
      if(!task)
      return res.status(404).send({error:true,msg: "Tarefa não econtrada"})

     return res.send({error:false,task})
    })
    .catch(erro => res.status(400).send({error: true, erro }))
  }
  update = async (req,res)=>{
    await Task.findById(req.taskId)
      .then( async task=>{
        if(!task)
          return res.status(404).send({error:true, msg:"Tarefa não encontrada"})
        
        await Task.findByIdAndUpdate(req.taskId, req.body,{new: true})
        .then(task => res.send({erro:false, task}))

      })
      .catch(erro => res.status(400).send({error: true, erro }))
  }
  

  delete  =  async (req,res)=> {
    await Task.findById(req.taskId)
    .then(async task =>{
      if(!task)
        return res.status(404).send({error: true,msg: "Tarefa não existe" })
       
      const project = await Project.findById(task.project)
      
      // let i = project.tasks.indexOf(req.taskId)
      // project.tasks.splice(i,1)
      // await project.save()
      await Task.findByIdAndRemove(req.taskId)
      return res.send({error:false, msg: "Deletado com sucesso"})
    
    })
    .catch(erro => res.status(400).send({error: true, erro }))
  }
}






