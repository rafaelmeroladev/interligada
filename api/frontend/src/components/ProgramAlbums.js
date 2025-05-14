import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const baseUrl = process.env.REACT_APP_API_URL_IMAGE;

function ProgramAlbums() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/programs/unique')
      .then(res => setPrograms(res.data))
      .catch(err => console.error('Erro ao carregar programas únicos:', err))
      .finally(() => setLoading(false));
  }, []);

  const renderSkeletons = () => (
    Array(8).fill().map((_, index) => (
      <div className="col-md-3 col-sm-6 mb-4" key={index}>
        <div className="card shadow-sm h-100 album-card position-relative overflow-hidden">
          {/* esqueleto da imagem */}
          <Skeleton height={200} />

          {/* esqueleto do conteúdo */}
          <div className="p-3">
            <Skeleton width="60%" height={20} style={{ marginBottom: '0.5rem' }} />
            <Skeleton count={2} />
          </div>
        </div>
      </div>
    ))
  );

  return (
    <section className=" album-section">
      <div className="container">
        <h2 className="section-title">Nossos Programas</h2>
        <div className="row">
          {loading
            ? renderSkeletons()
            : programs.map((program, index) => (
                <div className="col-md-3 col-sm-6 mb-4" key={index}>
                  <div className="card shadow-sm h-100 album-card position-relative overflow-hidden">
                    <img
                      src={`${baseUrl}${program.imagem}`}
                      alt={program.program_name}
                      className="card-img-top"
                    />
                    <div className="overlay d-flex align-items-center justify-content-center">
                      <div className="text-white text-center p-3">
                        <h5>{program.program_name}</h5>
                        <p>{program.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </section>
  );
}

export default ProgramAlbums;
