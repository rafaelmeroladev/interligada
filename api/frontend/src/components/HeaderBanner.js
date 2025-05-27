import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from '../api/axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../utils/HeaderBanner.css';

const imageBaseUrl = process.env.REACT_APP_API_URL_IMAGE;

const positionClasses = {
  'top-left':    'position-absolute top-0 start-0 p-3 text-start',
  'top-center':  'position-absolute top-0 start-50 translate-middle-x p-3 text-center',
  'top-right':   'position-absolute top-0 end-0 p-3 text-end',
  'center':      'position-absolute top-50 start-50 translate-middle p-3 text-center',
  'bottom-left': 'position-absolute bottom-0 start-0 p-3 text-start',
  'bottom-center':'position-absolute bottom-0 start-50 translate-middle-x p-3 text-center',
  'bottom-right':'position-absolute bottom-0 end-0 p-3 text-end',
};

function HeaderBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/banners')
      .then(({ data }) => {
        const ativos = data.filter(b => b.active).sort((a,b) => a.order - b.order);
        setBanners(ativos);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const settings = {
    dots: true, infinite: true, speed: 500,
    autoplay: true, arrows: false, autoplaySpeed: 5000,
    slidesToShow: 1, slidesToScroll: 1
  };

  if (loading) {
    return (
      <div className="mb-4 position-relative">
        <Skeleton height={400}/>
        <div className={positionClasses['bottom-left']} style={{ width: '100%' }}>
          <Skeleton width="30%" height={28}/>
          <Skeleton width="50%" count={1}/>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 position-relative">
      <Slider {...settings}>
        {banners.map(b => (
          <div key={b.id} className="position-relative">
            <a href={b.link || '#'} target="_blank" rel="noopener noreferrer">
              <img
                src={`${imageBaseUrl}${b.image}`}
                alt={b.title}
                className="img-fluid w-100"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </a>

            {/* Overlay de texto */}
            <div className={positionClasses[b.text_position || 'bottom-left']}>
              {b.show_title && <h5 className="text-white">{b.title}</h5>}
              {b.show_description && <p className="text-white">{b.description}</p>}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeaderBanner;
