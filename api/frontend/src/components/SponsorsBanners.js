import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const imageBaseUrl = process.env.REACT_APP_API_URL_IMAGE;

// Configuração de cada slot: flag bitwise, classes de grid, dimensões e fit
const slotConfig = {
  small:  { flag: 1, className: 'col-6 col-md-2',   count: 6, height: 120, fit: 'contain' },
  medium: { flag: 2, className: 'col-md-12',        count: 1, height: 250, fit: 'contain' },
  large:  { flag: 4, className: 'col-12',           count: 1, height: 350, fit: 'cover'  },
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

  // Render skeletons específicos por slot
  const renderSkeletonSmall = () => (
    <div className="container">
      <div className="row justify-content-center g-0 mt-3 mb-5 pb-2">
        {Array(config.count).fill().map((_, idx) => (
          <div key={idx} className={`${config.className} mb-3 text-center`}>
            <Skeleton height={config.height} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkeletonMedium = () => (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12 mb-3 p-0 text-center">
          <Skeleton height={config.height} />
        </div>
      </div>
    </div>
  );

  const renderSkeletonLarge = () => (
    <div className="container-fluid px-0 mb-5">
      <Skeleton height={config.height} />
    </div>
  );

  // Render banners por slot
  const renderSmall = (items) => (
    <div className="container">
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

  const renderMedium = (items) => (
    <div className="container mt-4">
      <div className="row justify-content-center">
        {items.map((s, idx) => (
          <div key={s.id || idx} className="col-md-12 mb-3 p-0 text-center">
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
    </div>
  );

  const renderLarge = (items) => (
    <div className="container-fluid px-0 mb-5">
      {items.map((s, idx) => (
        <div key={s.id || idx} className="banner-large-wrapper mb-3 text-center">
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

  return (
    <div className="sponsors-banners" style={{ overflowX: 'hidden' }}>
      {loading
        ? slot === 'small'
          ? renderSkeletonSmall()
          : slot === 'medium'
            ? renderSkeletonMedium()
            : renderSkeletonLarge()
        : slot === 'small'
          ? renderSmall(displayed)
          : slot === 'medium'
            ? renderMedium(displayed)
            : renderLarge(displayed)
      }
    </div>
  );
}
