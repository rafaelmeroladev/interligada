import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const api = process.env.REACT_APP_API_URL_IMAGE;

/**
 * NewsList
 * Lista notícias e gera links por slug em vez de ID
 */
export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get('/notices');
        // API deve retornar slug: string em cada item
        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data.data)
            ? response.data.data
            : [];
        setNews(data);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {loading ? (
        Array(9).fill().map((_, idx) => (
          <div className="col" key={idx}>
            <div className="card h-100 shadow-sm border-0">
              <Skeleton height={200} />
              <div className="card-body">
                <h5 className="card-title"><Skeleton width="80%" /></h5>
                <p className="card-text"><Skeleton count={2} /></p>
                <Skeleton width={100} height={30} />
              </div>
            </div>
          </div>
        ))
      ) : (
        news.map(item => (
          <div className="col" key={item.slug /* use slug as unique key */}>
            <div className="card h-100 shadow-sm border-0">
              <div className="news-image-wrapper" style={{ overflow: 'hidden', height: '200px' }}>
                <img
                  src={item.image.startsWith('http') ? item.image : `${api}${item.image}`}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: 'cover', transition: '0.4s ease' }}
                  alt={item.title}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted small">
                  {item.description?.slice(0, 100)}...
                </p>
                {/* Link by slug instead of ID */}
                <Link to={`/notices/${item.slug}`} className="btn btn-outline-primary btn-sm">
                  Ler mais
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
