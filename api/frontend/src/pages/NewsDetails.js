import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import Top10 from '../components/Top10';

const imageBase = process.env.REACT_APP_API_URL_IMAGE;
const apiBase = process.env.REACT_APP_API_URL;

function NewsDetails() {
  const { slug } = useParams();
  const [noticia, setNoticia] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`${apiBase}/notices/${slug}`)
      .then(res => setNoticia(res.data))
      .catch(err => console.error('Erro ao buscar notícia:', err));
  }, [slug]);

  if (!noticia) return <p className="text-center mt-5">Carregando notícia...</p>;

  return (
    <div className="container mt-4">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Início</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/noticies">Notícias</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {noticia?.title?.slice(0, 40)}...
            </li>
          </ol>
        </nav>

        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
      </div>
      <div className="row">
        {/* Conteúdo principal */}
        <div className="col-md-8">
          {noticia.image && (
            <img
              src={`${imageBase}${noticia.image}`}
              className="img-fluid mb-3"
              alt={noticia.title}
            />
          )}
          <h2>{noticia.title}</h2>
          <small className="text-muted">
            Publicado em: {new Date(noticia.date_time).toLocaleDateString()}
          </small>
          <hr />
          <p style={{ whiteSpace: 'pre-line' }}>{noticia.text}</p>

          {noticia.audio && (
            <div className="mt-4">
              <audio controls src={`${imageBase}${noticia.audio}`} />
            </div>
          )}
        </div>

        {/* Sidebar: Top 10 */}
        <div className="col-md-4">
          <Top10 />
        </div>
      </div>
    </div>
  );
}

export default NewsDetails;
