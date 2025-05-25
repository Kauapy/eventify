const verificarAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.role !== "admin") {
    return res.status(403).json({ mensagem: "Acesso negado. Apenas administradores podem acessar!" });
  }
  next();
};