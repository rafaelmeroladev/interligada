import React, { useEffect, useState } from 'react';
import { getNews } from '../api/news';
import BannerCarousel from '../components/BannerCarousel';
import Top10 from '../components/Top10';

function Home() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const data = await getNews();
      setNoticias(data);
    };
    carregar();
  }, []);

  return (
    <>
    <BannerCarousel />
    <Top10 />
    <div className="container mt-5">
      <h2 className="mb-4">Últimas Notícias</h2>
      <div className="row">
        {noticias.map(noticia => (
          <div className="col-md-6 mb-3" key={noticia.id}>
            <div className="card h-100">
              {noticia.image && (
                <img src={noticia.image} className="card-img-top" alt={noticia.title} />
              )}
              <div className="card-body">
                <h5 className="card-title">{noticia.title}</h5>
                <p className="card-text">{noticia.text.slice(0, 100)}...</p>
                <small className="text-muted">{new Date(noticia.date_time).toLocaleDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}

export default Home;