import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      
     
      localStorage.setItem('@CoreFlow:token', response.data.token);
      localStorage.setItem('@CoreFlow:user', JSON.stringify(response.data.user));

      alert('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#18181b] border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        
        {}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Core<span className="text-indigo-500">Flow</span></h1>
          <p className="text-zinc-400 mt-2">Bem-vindo de volta! Entre na sua conta.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">E-mail</label>
            <input 
              type="email" 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Senha</label>
            <input 
              type="password" 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02]"
          >
            Entrar no Painel
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-sm">
            Não tem uma conta? <a href="/register" className="text-indigo-400 hover:underline">Crie uma agora</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;