import React, { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import HeaderBanner from '../components/HeaderBanner';
import { getNews } from '../api/news';
import Top10 from '../components/Top10';
import SponsorsBanners from '../components/SponsorsBanners';
import FloatingRequestButton from '../components/FloatingRequestButton';

export default function Noticias() {
  const { setHero } = useOutletContext();
  const [noticias, setNoticias] = useState([]);
  const imageBase = process.env.REACT_APP_API_URL_IMAGE;

  useEffect(() => {
    setHero(<HeaderBanner />);
    return () => setHero(null);
  }, [setHero]);

  useEffect(() => {
    const carregarNoticias = async () => {
      try {
        const resp = await getNews();
        const list = Array.isArray(resp)
          ? resp
          : Array.isArray(resp.data)
            ? resp.data
            : [];
        setNoticias(list);
      } catch (err) {
        console.error('Erro ao carregar notícias:', err);
      }
    };
    carregarNoticias();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-8">
          <h2 className="mb-4">
            <span role="img" aria-label="jornal">📰</span> Últimas Notícias
          </h2>

          {noticias.map(n => (
            <Link key={n.id} to={`/notices/${n.slug}`} className="text-decoration-none text-dark">
              <div className="col-md-12 mb-3">
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

        <div className="col-12 col-md-4">
          <Top10 />
          <SponsorsBanners slot="medium" />
        </div>

        <div>
          <FloatingRequestButton />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-12">
          <SponsorsBanners slot="small" />
        </div>
      </div>
    </div>
  );
}
