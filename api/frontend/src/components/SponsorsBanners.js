import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const imageBaseUrl = process.env.REACT_APP_API_URL_IMAGE;

// Configuração de cada slot: flag bitwise, classes de grid, dimensões e fit
const slotConfig = {
  small: { flag: 1, className: 'col-6 col-md-2', count: 6, height: 120, fit: 'contain' },
  medium: { flag: 2, className: 'col-md-12', count: 1, height: 250, fit: 'contain' },
  large: { flag: 4, className: 'col-12', count: 1, height: 350, fit: 'cover' },
};

/**
 * SponsorsBanners
 * @param {{ slot: 'small' | 'medium' | 'large' }} props
 */
export default function SponsorsBanners({ slot = 'large' }) {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = slotConfig[slot] || slotConfig.large;

  useEffect(() => {
    axios.get('/sponsors')
      .then(res => setSponsors(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const displayed = sponsors.filter(s => (s.position & config.flag) !== 0);

  // Small: grid sem container
  const renderSmall = (items) => (
    <div id={`${slot}-info-banner`} className="container">
      <div className="row justify-content-center g-0 mt-3 mb-5 pb-2">
        {items.map((s, idx) => (
          <div key={s.id || idx} className={`${config.className} mb-3 text-center`}>
            <a href={s.link} target="_blank" rel="noopener noreferrer">
              <img
                src={`${imageBaseUrl}${s.imagem}`}
                alt={s.nome}
                className="img-fluid"
                style={{ height: `${config.height}px`, objectFit: config.fit }}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  // Medium: dentro de container, banner centralizado
  const renderMedium = (items) => (
    <div id={`${slot}-info-banner`} className="container">
      <div className="flex justify-content-center">
        {items.map((s, idx) => (
          <div key={s.id || idx} className="col-md-12 mb-1 p-0">
            <a href={s.link} target="_blank" rel="noopener noreferrer">
              <img
                src={`${imageBaseUrl}${s.imagem}`}
                alt={s.nome}
                className="img-fluid"
                style={{ objectFit: config.fit }}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  // Large: full-width banner (container-fluid) com destaque
  const renderLarge = (items) => (
    <div className="container-fluid px-0">
      {items.map((s, idx) => (
        <div key={s.id || idx} className="banner-large-wrapper mb-5">
          <a href={s.link} target="_blank" rel="noopener noreferrer">
            <img
              src={`${imageBaseUrl}${s.imagem}`}
              alt={s.nome}
              className="img-fluid w-100"
              style={{ height: `${config.height}px`, objectFit: config.fit }}
            />
          </a>
        </div>
      ))}
    </div>
  );

  // Skeletons apenas trocando imagens por placeholders
  const skeletonItems = Array(config.count).fill({ imagem: '' });
  const renderSkeleton = () => (
    slot === 'small'
      ? renderSmall(skeletonItems.map((_, i) => ({ id: i, link: '#', imagem: '', nome: '' })))
      : slot === 'medium'
        ? (
          <div className="container mt-4">
            {renderSmall(skeletonItems)}
          </div>
        )
        : (
          <div className="container-fluid px-0">
            {renderSmall(skeletonItems)}
          </div>
        )
  );

  return (
    <div className="sponsors-banners" style={{ overflowX: 'hidden' }}>
      {loading
        ? renderSkeleton()
        : slot === 'small'
          ? renderSmall(displayed)
          : slot === 'medium'
            ? renderMedium(displayed)
            : renderLarge(displayed)
      }
    </div>
  );
}
