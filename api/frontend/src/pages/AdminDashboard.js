import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const ADMIN_ROUTE = process.env.REACT_APP_ADMIN_ROUTE;

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    banners: null,
    notices: null,
    top10: null,
    timetables: null,
    sponsors: null,
    requests: null,
    users: null
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [
          bannersRes,
          noticesRes,
          top10Res,
          timetablesRes,
          sponsorsRes,
          requestsRes,
          usersRes
        ] = await Promise.all([
          axios.get('/banners'),
          axios.get('/notices'),
          axios.get('/top10'),
          axios.get('/timetables'),
          axios.get('/sponsors'),
          axios.get('/requests'),
          axios.get('/users'),
        ]);
        setCounts({
          banners: bannersRes.data.length,
          notices: noticesRes.data.length,
          top10: top10Res.data.length,
          timetables: timetablesRes.data.length,
          sponsors: sponsorsRes.data.length,
          requests: requestsRes.data.length,
          users: usersRes.data.length
        });
      } catch (err) {
        console.error('Erro ao carregar contagens:', err);
      }
    }
    fetchCounts();
  }, []);

  const cards = [
    { key: 'banners', label: 'Banners' },
    { key: 'notices', label: 'Notícias' },
    { key: 'top10', label: 'Top 10' },
    { key: 'timetables', label: 'Programação' },
    { key: 'sponsors', label: 'Patrocinadores' },
    { key: 'requests', label: 'Solicitações' },
    { key: 'users', label: 'Usuários' },
  ];

  return (
    <div className="container my-4">
      <h1>Painel de Administração</h1>
      <div className="row">
        {cards.map(({ key, label }) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={key}>
            <Link to={`/${ADMIN_ROUTE}/${key}`} className="text-decoration-none">
              <div className="card h-100 border-primary">
                <div className="card-body text-center">
                  <h5 className="card-title">{label}</h5>
                  <p className="display-4">{counts[key] ?? '–'}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
