import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Top10() {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/top10')
      .then(res => setMusicas(res.data))
      .catch(err => console.error('Erro ao carregar Top 10:', err));
  }, []);

  const votar = async (id, type) => {
    try {
      await axios.post(`http://localhost:8000/api/top10/vote/${id}`, { type });
      setMusicas(musicas =>
        musicas.map(m =>
          m.id === id
            ? {
                ...m,
                votes_up: type === 'up' ? m.votes_up + 1 : m.votes_up,
                votes_down: type === 'down' ? m.votes_down + 1 : m.votes_down,
              }
            : m
        )
      );
    } catch (error) {
      console.error('Erro ao votar:', error);
    }
  };

  if (musicas.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <p>🎵 Carregando Top 10 músicas...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🎶 Top 10 Músicas</h2>
      {musicas.map(m => (
        <div className="card mb-3 shadow-sm" key={m.id}>
          <div className="row g-0 align-items-center">
            <div className="col-md-2 text-center fs-1 fw-bold text-primary">
              #{m.position}
            </div>
            <div className="col-md-2">
              <img
                src={m.image || 'https://via.placeholder.com/150'}
                className="img-fluid rounded-start"
                alt={m.title}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title mb-1">{m.title}</h5>
                <p className="card-text">
                  <small className="text-muted">
                    {m.artist} • {m.duration}
                  </small>
                </p>
              </div>
            </div>
            <div className="col-md-2 text-center">
              <button
                className="btn btn-success me-2"
                onClick={() => votar(m.id, 'up')}
              >
                👍 {m.votes_up}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => votar(m.id, 'down')}
              >
                👎 {m.votes_down}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Top10;
