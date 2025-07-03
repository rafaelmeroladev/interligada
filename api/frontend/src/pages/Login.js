// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const ADMIN_ROUTE = process.env.REACT_APP_ADMIN_ROUTE;  // painel-secreto-123

export default function Login() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const navigate              = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // chama POST http://localhost:8000/api/admin/login
      const res = await axios.post('/admin/login', { email, password });
      const token = res.data.token;
      // salva no localStorage
      localStorage.setItem('admin_token', token);
      // redireciona pro dashboard secreto
      navigate(`/${ADMIN_ROUTE}`);
    } catch (err) {
      setError('Credenciais inválidas');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: 'auto', padding: 20 }}>
      <h2>Login Admin</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Email:</label><br/>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Senha:</label><br/>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={{ marginTop: 20 }}>Entrar</button>
    </form>
  );
}
