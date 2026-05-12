const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Tenant } = require('../models');

class AuthController {
  
  
  async register(req, res) {
    try {
      const { tenantName, businessType, document, userName, email, password } = req.body;

      
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      
      const tenant = await Tenant.create({
        name: tenantName,
        business_type: businessType,
        document: document
      });

      
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      
      const user = await User.create({
        tenant_id: tenant.id,
        name: userName,
        email,
        password_hash,
        role: 'admin' 
      });

      
      return res.status(201).json({
        message: 'Empresa e usuário criados com sucesso!',
        tenant: { id: tenant.id, name: tenant.name },
        user: { id: user.id, name: user.name, email: user.email }
      });

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao registrar', details: error.message });
    }
  }

 
  async login(req, res) {
    try {
      const { email, password } = req.body;

     
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

     
      const checkPassword = await bcrypt.compare(password, user.password_hash);
      if (!checkPassword) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

 
      const token = jwt.sign(
        { 
          id: user.id, 
          tenant_id: user.tenant_id,
          role: user.role
        }, 
        process.env.JWT_SECRET || 'sua_senha_secreta_super_segura', 
        { expiresIn: '1d' } 
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