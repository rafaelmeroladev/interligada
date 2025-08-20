import React, { useState, useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

/**
 * Layout com "hero slot":
 * - A página define o hero via setHero (Outlet context).
 * - O menu fica DEPOIS do hero e é sticky quando rola.
 */
export default function Layout() {
  const [hero, setHero] = useState(null);

  // Passa setHero para as páginas via context do Outlet
  const outletCtx = useMemo(() => ({ setHero }), []);

  return (
    <>
      {/* HERO DA PÁGINA (opcional) */}
      {hero && (
        <div className="hero-wrapper">
          {hero}
        </div>
      )}

      {/* MENU STICKY (fica entre hero e conteúdo) */}
      <nav className="main-nav sticky-top shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h5 m-0">
            Interligada Hits{' '}
            <span role="img" aria-label="nota musical">🎵</span>
          </h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/notices" className="nav-link">Notícias</Link>
            <Link to="/programacao" className="nav-link">Programação</Link>
            <Link to="/pedidos" className="nav-link">Pedidos</Link>
            <Link to="/contato" className="nav-link">Contato</Link>
          </div>
        </div>
      </nav>

      {/* CONTEÚDO */}
      <main>
        <Outlet context={outletCtx} />
      </main>

      {/* FOOTER / PLAYER */}
      <footer className="site-footer">
        <small>
          <span role="img" aria-label="música tocando">🎶</span>{' '}
          Tocando agora: <b>Interligada Hits - Sua rádio conectada</b>
        </small>
      </footer>
    </>
  );
}
