const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/node_reg_login', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

mongoose.Promise = global.Promise

module.exports = mongoose