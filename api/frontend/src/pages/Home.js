import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import HeaderBanner from '../components/HeaderBanner';
import Top10 from '../components/Top10';
import NewsList from '../components/NewsList';
import ProgramSchedule from '../components/ProgramSchedule';
import ProgramAlbums from '../components/ProgramAlbums';
import DownloadAppSection from '../components/DownloadAppSection';
import SponsorsBanners from '../components/SponsorsBanners';
import FloatingRequestButton from '../components/FloatingRequestButton';

export default function Home() {
  const { setHero } = useOutletContext();

  useEffect(() => {
    // registra o hero da página
    setHero(<HeaderBanner />);
    // limpa ao sair da página
    return () => setHero(null);
  }, [setHero]);

  return (
    <div className="tunein-home">
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
    </div>
  );
}
