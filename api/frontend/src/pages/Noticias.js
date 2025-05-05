import React, { useEffect, useState } from 'react';
import { getNews } from '../api/news';
import { Link } from 'react-router-dom';

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const imageBase = process.env.REACT_APP_API_URL_IMAGE;

  useEffect(() => {
    const carregarNoticias = async () => {
      const data = await getNews();
      setNoticias(data);
    };
    carregarNoticias();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📰 Últimas Notícias</h2>
      <div className="row">
        {noticias.map(n => (
          <Link to={`/noticias/${n.id}`} className="text-decoration-none text-dark">
          <div className="col-md-6 mb-3" key={n.id}>
            <div className="card h-100 shadow-sm">
              {n.image && (
                <img
                  src={`${imageBase}${n.image}`}
                  className="card-img-top"
                  alt={n.title}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{n.title}</h5>
                <p className="card-text">{n.text.slice(0, 120)}...</p>
                <small className="text-muted">
                  {new Date(n.date_time).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Noticias;
