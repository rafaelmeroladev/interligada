import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import RequestForm from './RequestForm';
import { FaMusic, FaWhatsapp } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const api = process.env.REACT_APP_API_URL;
const imageBaseUrl = process.env.REACT_APP_API_URL_IMAGE;

export default function FloatingRequestButton() {
  const [isActive, setIsActive] = useState(false);
  const [programLogo, setProgramLogo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const whatsappLink = 'https://chat.whatsapp.com/seulinkdogrupo';

  useEffect(() => {
    axios.get(`${api}/statusRequestSystem`)
      .then(res => {
        setIsActive(res.data.active);
        if (res.data.active && res.data.logo) setProgramLogo(res.data.logo);
      })
      .catch(() => setIsActive(false));
  }, []);

  const toggleModal = () => setShowModal(v => !v);

  // Wrapper que engloba botão + ícone extra
  const wrapperStyle = {
    position: 'fixed',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1050,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  };

  // Estilo do botão flutuante, com cor para offline e online
  const btnStyle = {
    width: '110px',
    height: '110px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isActive
      ? (programLogo ? 'transparent' : '#dc3545')
      : '#25D366',
    backgroundImage: isActive && programLogo
      ? `url(${imageBaseUrl}${programLogo})`
      : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  };

  const badgeStyle = {
    marginTop: '80px',
    width: '130px',
    height: 'auto',
  };

  return (
    <>
      {/* Invólucro clicável */}
      <div style={wrapperStyle} onClick={toggleModal} title={isActive ? 'No Ar' : 'Entre no nosso grupo do WhatsApp'}>
        <div style={btnStyle}>
          {isActive ? <FaMusic size={24} /> : <FaWhatsapp size={45} />}
          {isActive && (
            <img
              src={`${imageBaseUrl}/images/voice-icon.png`}
              alt="Voice Icon"
              style={badgeStyle}
            />
          )}
        </div>
      </div>

      {/* Modal de pedidos */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={toggleModal}>
          <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isActive ? '🎤 Faça seu pedido' : '📲 Entre no nosso WhatsApp'}
                </h5>
                <button type="button" className="btn-close" onClick={toggleModal} />
              </div>
              <div className="modal-body">
                {isActive ? (
                  <RequestForm onSuccess={toggleModal} />
                ) : (
                  <div className="text-center">
                    <p>O sistema de pedidos está fechado no momento.</p>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success">
                      Entrar no WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
