const jwp = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')


module.exports = (req, res, next) => {
  //pega o token pelo header
  const authHeader = req.headers.authorization;
  //verifica se o token não está vazio
  if (!authHeader)
    return res.status(401).send({ error: "Token não envíado" })
  //dividindo pelo espaço
  const parts = authHeader.split(' ')
  //verifica se o token tem duas partes
  if (!parts.lengt === 2)
    return res.status(401).send({ error: "Token no formato invalido" })
  //desetrutura o array 
  const [scheme, token] = parts
  //faz um regex para verificar se tem a palavra bearer -> / abre, ^ inicio , $ final, / fecha, i case insensitive
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token no formato invalido2 " + scheme })
  //verifica se o token é da aplicação e pega o token
  jwp.verify(token, authConfig.secret, (err, decoded)=>{
    if(err) return res.status(401).send({error: "Token invalido"})

    //adiciona o id no req
    req.userId = decoded.id;
    return next()
  })
  

}

// formato do token -> bearer ahsabd7b37g7s8agd8a