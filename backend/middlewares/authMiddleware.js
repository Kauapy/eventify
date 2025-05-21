const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ mensagem: "Acesso negado. Token não fornecido." });
  }


  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ mensagem: "Acesso negado. Token não fornecido." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: "Token inválido." });
  }
}

module.exports = authMiddleware;


// AuthMiddleware só deve ser utilizado em rotas que precisam de autenticação