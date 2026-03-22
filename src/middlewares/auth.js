const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // O token geralmente vem no header de autorização assim: "Bearer dhausdhasiudhias..."
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // Separa o "Bearer" do token em si
  const [, token] = authHeader.split(' ');

  try {
    // Decodifica o token usando a mesma chave secreta do login
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_senha_secreta_super_segura');

    // INJEÇÃO MÁGICA: Colocamos os dados decodificados dentro do objeto 'req' (requisição).
    // Assim, o próximo Controller sabe exatamente de qual tenant_id puxar os dados.
    req.user = {
      id: decoded.id,
      tenant_id: decoded.tenant_id,
      role: decoded.role
    };

    // Permite que a requisição siga para o Controller
    return next();

  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
