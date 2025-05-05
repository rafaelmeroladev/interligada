import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;

function RequestForm() {
  const [isActive, setIsActive] = useState(false);
  const [form, setForm] = useState({
    type: 'request',
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`${api}/statusRequestSystem`)
      .then(res => setIsActive(res.data.active))
      .catch(() => setIsActive(false));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${api}/pedidos`, form);
      setSubmitted(true);
      setForm({ type: '', email: '', phone: '', name: '', city: '', state: '', message: '' });
    } catch (err) {
      alert('Erro ao enviar pedido.');
    }
  };

  if (!isActive) {
    return (
      <div className="alert alert-info mt-4">
        O sistema de pedidos está desativado no momento.<br />
        Curta nossa programação! Consulte a grade para enviar pedidos nos horários certos.
      </div>
    );
  }

  if (submitted) {
    return <div className="alert alert-success mt-4">Pedido enviado com sucesso!</div>;
  }

  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">🎤 Faça seu pedido</h5>
        <form onSubmit={handleSubmit}>
        <div className="mb-2">
            <select
                className="form-select"
                name="type"
                value={form.type}
                onChange={handleChange}
            >
                <option value="request">🎵 Pedido de Música</option>
                <option value="message">✉️ Enviar Mensagem</option>
            </select>
         </div>
         <div className="mb-2">
            <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Seu e-mail"
                value={form.email}
                onChange={handleChange}
                required
            />
        </div>

        <div className="mb-2">
            <input
                type="text"
                className="form-control"
                name="phone"
                placeholder="Seu telefone"
                value={form.phone}
                onChange={handleChange}
                required
            />
        </div>

        <div className="mb-2">
            <input
                type="text"
                className="form-control"
                name="city"
                placeholder="Sua cidade"
                value={form.city}
                onChange={handleChange}
                required
            />
        </div>

        <div className="mb-2">
            <input
                type="text"
                className="form-control"
                name="state"
                placeholder="Seu estado"
                value={form.state}
                onChange={handleChange}
                required
            />
        </div>

        <div className="mb-2">
            <textarea
                className="form-control"
                name="message"
                placeholder="Mensagem / Dedicação"
                rows="3"
                value={form.message}
                onChange={handleChange}
                required
            />
        </div>
          <button type="submit" className="btn btn-primary w-100">
            Enviar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestForm;
