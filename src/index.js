const express = require('express')
const bodyparser = require('body-parser')
const app = express();
const authRouter = require('./app/routes/authRouter')
const projectRouter = require('./app/routes/projectRouts')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))


app.use('/auth', authRouter)
app.use('/project', projectRouter)
app.get('/', (req,res)=>{
      res.send('Hell world')        
})

app.listen(3000, _ => console.log("Workando ?"))