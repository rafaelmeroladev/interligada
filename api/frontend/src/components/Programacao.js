import React, { useEffect, useState } from 'react';
import { getTimetable } from '../api/timetable';
const BASE_URL = process.env.REACT_APP_API_URL_IMAGE;

function Programacao() {
    const [programas, setProgramas] = useState([]);
  
    useEffect(() => {
      const carregar = async () => {
        const data = await getTimetable();
        setProgramas(data);
      };
      carregar();
    }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📅 Programação da Semana</h2>
      <div className="row">
        {programas.map(p => (
          <div className="col-md-6 mb-3" key={p.id}>
          <div className="card shadow-sm">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={`${BASE_URL}/${p.imagem}`}
                  className="img-fluid rounded-start"
                  alt={p.program_name}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{p.program_name}</h5>
                  <p className="card-text">
                    <b>Dia:</b> {p.day_week}<br />
                    <b>Horário:</b> {p.hour_start} - {p.hour_finish}<br />
                    <b>Descrição:</b> {p.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Programacao;
