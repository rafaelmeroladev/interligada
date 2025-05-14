import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from '../api/axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const imageBaseUrl = process.env.REACT_APP_API_URL_IMAGE;

function HeaderBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('/banners');
        const ativosOrdenados = response.data
          .filter(b => b.active)
          .sort((a, b) => a.order - b.order);
        setBanners(ativosOrdenados);
      } catch (error) {
        console.error('Erro ao carregar banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if (loading) {
    // skeleton placeholder
    return (
      <div className="mb-4">
        {/* Imagem placeholder */}
        <Skeleton height={400} />

        {/* Título e descrição */}
        <div className="text-center mt-2">
          <Skeleton width="50%" height={28} style={{ margin: '0 auto 0.5rem' }} />
          <Skeleton width="80%" count={2} />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <a href={banner.link} target="_blank" rel="noopener noreferrer">
              <img
                src={`${imageBaseUrl}${banner.image}`}
                alt={banner.title}
                className="img-fluid w-100"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
              <div className="text-center mt-2">
              <h5>{banner.title}</h5>
              <p>{banner.description}</p>
            </div>
            </a>
            
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeaderBanner;
