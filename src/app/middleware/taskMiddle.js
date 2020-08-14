const checkProjectId = (req,res,next) => {
    req.projectId = req.query.projectId
    if(!req.projectId)
        return res.status(400).send({error:true, msg: "Faltando a query projectId"})
    else          
        next()
}

const checkTaskId = (req,res,next) => {
    req.taskId = req.query.taskId
    if(!req.taskId)
        return res.status(400).send({error:true, msg: "Faltando a query taskId"})
    else          
        next()
}

module.exports = {checkProjectId,
    checkTaskId
}