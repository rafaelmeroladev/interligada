import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SiteNav.css';

function SiteNav() {
  const { pathname } = useLocation();

  const isActive = (to) =>
    pathname === to ? 'text-white fw-semibold' : 'text-white-50';

  return (
    <nav className="site-nav shadow-sm">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="brand d-flex align-items-center gap-2">
          <span className="h6 m-0 text-white">Interligada Hits</span>
          <span role="img" aria-label="nota musical">🎵</span>
        </div>

        <div className="links d-flex align-items-center gap-3">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/notices" className={isActive('/notices')}>Notícias</Link>
          <Link to="/programacao" className={isActive('/programacao')}>Programação</Link>
          <Link to="/pedidos" className={isActive('/pedidos')}>Pedidos</Link>
          <Link to="/contato" className={isActive('/contato')}>Contato</Link>
        </div>
      </div>
    </nav>
  );
}

export default SiteNav;
