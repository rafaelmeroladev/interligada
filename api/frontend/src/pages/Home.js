import React, { useEffect, useState } from 'react';
import Top10 from '../components/Top10';
import Programacao from '../components/Programacao';
import RequestForm from '../components/RequestForm';
import NewsList from '../components/NewsList';
import { getNews } from '../api/news';
import ProgramSchedule from '../components/ProgramSchedule';
import HeaderBanner from '../components/HeaderBanner';
import ProgramAlbums from '../components/ProgramAlbums';
import DownloadAppSection from '../components/DownloadAppSection';
import SponsorsBanners from '../components/SponsorsBanners';
import FloatingRequestButton from '../components/FloatingRequestButton';


function Home() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNews();
      setNoticias(data);
    };
    fetchData();
  }, []);

  return (
    <div className="tunein-home">
      {/* Hero Banner */}
      <section className="hero-banner">
        <HeaderBanner />
      </section>
      <section className="programAlbums">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 mb-4">
              <h2 className="section-title">Notícias</h2>
              <NewsList />
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <Top10 />
              <SponsorsBanners slot="medium" />
            </div>
          </div>
        </div>
      <div>
        <FloatingRequestButton />
      </div>
      </section>
      <SponsorsBanners slot="small" />
      <section className="section top10-section bg-dark text-white p-4">
        <div className="container">
          <DownloadAppSection />
        </div>
      </section>

      {/* Program Schedule */}
      <section className="schedule-section mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <ProgramAlbums />
            </div>
            <div className="col-md-4">
              <ProgramSchedule />
            </div>
          </div>

        </div>
      </section>

      {/* Top Charts */}


      {/* Latest News */}
      {/* <section className="section news-section">
        <div className="container">
          <h2 className="section-title">Últimas Notícias</h2>

        </div>
      </section> */}

      {/* Music Request */}
      {/* <section className="section request-section bg-dark text-white">
        <div className="container">
          <h2 className="section-title">Faça seu Pedido</h2>
          <RequestForm />
        </div>
      </section> */}
    </div>

  );
}

export default Home;
