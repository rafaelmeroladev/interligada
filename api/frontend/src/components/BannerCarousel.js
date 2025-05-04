import React from 'react';

function BannerCarousel() {
  // Dados fake por enquanto (depois puxamos da API)
  const banners = [
    {
      id: 1,
      title: 'Conecte-se à música!',
      image: 'https://via.placeholder.com/1200x400?text=Banner+1',
    },
    {
      id: 2,
      title: 'Sintonize com estilo',
      image: 'https://via.placeholder.com/1200x400?text=Banner+2',
    },
    {
      id: 3,
      title: 'Interligada Hits no ar!',
      image: 'https://via.placeholder.com/1200x400?text=Banner+3',
    },
  ];

  return (
    <div id="mainBanner" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div key={banner.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={banner.image} className="d-block w-100" alt={banner.title} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{banner.title}</h5>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#mainBanner" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#mainBanner" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Próximo</span>
      </button>
    </div>
  );
}

export default BannerCarousel;
