const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Tenant } = require('../models');

class AuthController {
  
  // Rota para criar um novo Tenant (Empresa) e seu Usuário Admin
  async register(req, res) {
    try {
      const { tenantName, businessType, document, userName, email, password } = req.body;

      // 1. Verifica se o usuário ou documento já existe (simplificado para o exemplo)
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      // 2. Cria o Tenant (A Empresa)
      const tenant = await Tenant.create({
        name: tenantName,
        business_type: businessType,
        document: document
      });

      // 3. Criptografa a senha
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // 4. Cria o Usuário vinculado ao Tenant criado
      const user = await User.create({
        tenant_id: tenant.id,
        name: userName,
        email,
        password_hash,
        role: 'admin' // O primeiro usuário é sempre admin
      });

      // Retorna sucesso sem expor a senha
      return res.status(201).json({
        message: 'Empresa e usuário criados com sucesso!',
        tenant: { id: tenant.id, name: tenant.name },
        user: { id: user.id, name: user.name, email: user.email }
      });

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao registrar', details: error.message });
    }
  }

  // Rota de Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Busca o usuário pelo e-mail
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // 2. Verifica se a senha bate com o hash salvo
      const checkPassword = await bcrypt.compare(password, user.password_hash);
      if (!checkPassword) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // 3. Gera o Token JWT contendo o ID do usuário e, crucialmente, o ID da Empresa (Tenant)
      // Substitua 'sua_senha_secreta_super_segura' por process.env.JWT_SECRET em produção
      const token = jwt.sign(
        { 
          id: user.id, 
          tenant_id: user.tenant_id,
          role: user.role
        }, 
        process.env.JWT_SECRET || 'sua_senha_secreta_super_segura', 
        { expiresIn: '1d' } // Token expira em 1 dia
      );

      return res.json({
        user: { id: user.id, name: user.name, email: user.email },
        token
      });

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
    }
  }
}

module.exports = new AuthController();