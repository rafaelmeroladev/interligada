// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Noticias from "./pages/Noticias";
import NewsDetails from "./pages/NewsDetails";
import Programacao from './components/Programacao';
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import SpeakerDashboard from "./pages/SpeakerDashboard";
import RequireAuth from "./components/RequireAuth";

const ADMIN_ROUTE = process.env.REACT_APP_ADMIN_ROUTE;  // painel-secreto-123

function App() {
  console.log('Admin route:', ADMIN_ROUTE); // só pra checar no console do navegador

  return (
    <Router>
      <Routes>
        {/* tudo que fica dentro do Layout */}
        <Route path="/" element={<Layout />}>
          {/* públicas */}
          <Route index element={<Home />} />
          <Route path="notices" element={<Noticias />} />
          <Route path="notices/:slug" element={<NewsDetails />} />
          <Route path="programacao" element={<Programacao />} />
          <Route path="pedidos" element={<div>Pedidos</div>} />
          <Route path="contato" element={<div>Contato</div>} />

          {/* rota de login do admin, ex: /painel-secreto-123/login */}
          <Route path={`${ADMIN_ROUTE}/login`} element={<Login />} />

          {/* rota admin protegida, ex: /painel-secreto-123 */}
          <Route
            path={ADMIN_ROUTE}
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />

          {/* painel locução */}
          <Route
            path={`${ADMIN_ROUTE}/locucao`}
            element={<RequireAuth><SpeakerDashboard/></RequireAuth>}
          />

        </Route>

         {/* <Route
           path={`${ADMIN_ROUTE}/banners`}
           element={
             <RequireAuth>
               <BannersList />
             </RequireAuth>
           }
         />
         <Route
           path={`${ADMIN_ROUTE}/notices`}
           element={
             <RequireAuth>
               <NoticesListAdmin />
             </RequireAuth>
           }
         /> */}

        {/* qualquer outra URL cai na home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
