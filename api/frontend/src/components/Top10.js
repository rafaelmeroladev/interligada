import React, { useEffect, useState } from 'react';
import axios from '../api/axios';  // usa a instância axios configurada com REACT_APP_API_URL
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SponsorsBanners from './SponsorsBanners';

function Top10() {
  const [musicas, setMusicas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/top10')
      .then(res => {
        setMusicas(res.data.data ?? res.data);
      })
      .catch(err => console.error('Erro ao carregar Top 10:', err))
      .finally(() => setLoading(false));
  }, []);

  const votar = async (id, type) => {
    try {
      await axios.post(`/top10/vote/${id}`, { type });
      setMusicas(current =>
        current.map(m =>
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

  return (
    <div className="container">
      <h2 className="section-title">Top 10</h2>

      {loading
        ? Array(10).fill().map((_, idx) => (
          <div className="card mb-3 shadow-sm" key={idx}>
            <div className="row g-0 align-items-center">
              <div className="col-md-2 text-center fs-1 fw-bold text-primary">
                <Skeleton width={30} />
              </div>
              <div className="col-md-2">
                <Skeleton height={90} width="100%" />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title mb-1"><Skeleton width="80%" /></h5>
                  <p className="card-text"><Skeleton width="60%" /></p>
                </div>
              </div>
              <div className="col-md-2 text-center">
                <Skeleton width={80} height={30} className="mb-2" />
                <Skeleton width={80} height={30} />
              </div>
            </div>
          </div>
        ))
        : musicas.map(m => (
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
                  className="btn btn-success"
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
