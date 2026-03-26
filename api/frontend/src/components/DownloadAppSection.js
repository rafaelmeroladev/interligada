// import React from 'react';

// function DownloadAppSection() {
//     return (
//         <section className="download-app-section bg-dark text-white py-0 position-relative">
//             <div className="container d-flex flex-wrap align-items-center justify-content-between position-relative z-1">
//                 <div className="content col-md-6">
//                     <h2 className="section-title">Baixe o App e leve a rádio com você</h2>
//                     <p className="mb-4">
//                         Curta a programação ao vivo, envie pedidos e fique por dentro das novidades direto do seu celular.
//                     </p>
//                     <div className="buttons">
//                         <a href="#" className="btn btn-light me-3">📱 Google Play</a>
//                         <a href="#" className="btn btn-outline-light">🍎 App Store</a>
//                     </div>
//                 </div>

//                 {/* Mockup flutuante */}
//                 <div className="col-md-6 mockup d-none d-md-block">
//                     <img src="/mockups/interligada-app-mockup.png" alt="App da Rádio" className="floating-phone" />
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default DownloadAppSection;
import React from 'react';

function DownloadAppSection() {
  return (
    <section className="download-app-section bg-dark text-white py-0 position-relative">
      <div className="container d-flex flex-wrap align-items-center justify-content-between position-relative z-1">
        <div className="content col-md-6">
          <h2 className="section-title">Baixe o App e leve a rádio com você</h2>
          <p className="mb-4">
            Curta a programação ao vivo, envie pedidos e fique por dentro das novidades direto do seu celular.
          </p>
          <div className="buttons">
            <a
              href="https://play.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light me-3"
            >
              <span role="img" aria-label="smartphone">📱</span> Google Play
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
            >
              <span role="img" aria-label="maçã">🍎</span> App Store
            </a>
          </div>
        </div>

        {/* Mockup flutuante */}
        <div className="col-md-6 mockup d-none d-md-block">
          <img src="/mockups/interligada-app-mockup.png" alt="App da Rádio" className="floating-phone" />
        </div>
      </div>
    </section>
  );
}

export default DownloadAppSection;
