import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css'; // cria esse arquivo pra customização extra

function Layout() {
  return (
    <>
      {/* HEADER */}
      <header className="bg-dark text-white py-3 sticky-top shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h4 m-0">Interligada Hits 🎵</h1>
          <nav>
            <Link to="/" className="text-white me-3">Home</Link>
            <Link to="/noticias" className="text-white me-3">Notícias</Link>
            <Link to="/programacao" className="text-white me-3">Programação</Link>
            <Link to="/pedidos" className="text-white me-3">Pedidos</Link>
            <Link to="/contato" className="text-white">Contato</Link>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main>
        <Outlet />
      </main>

      {/* PLAYER FIXO */}
      <footer className="bg-black text-white py-3 fixed-bottom text-center">
        <small>🎶 Tocando agora: <b>Interligada Hits - Sua rádio conectada</b></small>
      </footer>
    </>
  );
}

export default Layout;
