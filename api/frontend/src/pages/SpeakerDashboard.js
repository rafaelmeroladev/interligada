import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function SpeakerDashboard() {
  const [program, setProgram]     = useState(null);
  const [unreadCount, setUnread]  = useState(0);
  const [requests, setRequests]   = useState([]);

  // 1) carregando seu programa
  useEffect(() => {
    (async () => {
      const res = await axios.get('/speaker/request-programs');
      if (res.data.length) {
        const prog = res.data[0];
        setProgram(prog);

        // count de pedidos não lidos
        const msgs = await axios.get(
          `/speaker/request-programs/${prog.id}/requests`
        );
        setUnread(msgs.data.length);
      }
    })();
  }, []);

  // 2) toggle on/off
  const toggle = async () => {
    const res = await axios.patch(
      `/speaker/request-programs/${program.id}/status`
    );
    setProgram(res.data);
  };

  // 3) listar mensagens
  const loadMsgs = async () => {
    const res = await axios.get(
      `/speaker/request-programs/${program.id}/requests`
    );
    setRequests(res.data);
  };
console.log(program);
  return (
    <div className="container my-4">
      <h1>Painel de Locutor</h1>
      {program
        ? (
          <div>
            <p>
              <strong>Programa:</strong> {program.timetable.program_name}
            </p>
            <p>
              <strong>Status de pedidos:</strong>{' '}
              {program.status ? '🟢 Online' : '🔴 Offline'}
            </p>
            <button className="btn btn-primary" onClick={toggle}>
              {program.status
                ? 'Desativar Pedidos'
                : 'Ativar Pedidos'}
            </button>

            <hr/>

            <p>
              <strong>Pedidos não lidos:</strong> {unreadCount}
            </p>
            <button className="btn btn-secondary" onClick={loadMsgs}>
              Ver Pedidos
            </button>

            <ul className="list-group mt-3">
              {requests.map(r => (
                <li key={r.id} className="list-group-item">
                  {r.message /* ou campo correto */}
                  <br/>
                  <small className="text-muted">{r.created_at}</small>
                </li>
              ))}
            </ul>
          </div>
        )
        : (
          <p>
            Você ainda não cadastrou seu programa de pedidos.
          </p>
        )}
    </div>
  );
}
