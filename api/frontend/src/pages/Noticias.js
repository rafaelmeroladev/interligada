import React, { useEffect, useState } from 'react';
import { getNews } from '../api/news';
import { Link } from 'react-router-dom';
import ProgramSchedule from '../components/ProgramSchedule';
import HeaderBanner from '../components/HeaderBanner';
import ProgramAlbums from '../components/ProgramAlbums';
import DownloadAppSection from '../components/DownloadAppSection';
import SponsorsBanners from '../components/SponsorsBanners';
import FloatingRequestButton from '../components/FloatingRequestButton';
import Top10 from '../components/Top10';

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const imageBase = process.env.REACT_APP_API_URL_IMAGE;

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
          <h2 className="mb-4">📰 Últimas Notícias</h2>
          {noticias.map(n => (
            <Link to={`/notices/${n.slug}`} className="text-decoration-none text-dark">
            <div className="col-md-12 mb-3" key={n.id}>
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

export default Noticias;
