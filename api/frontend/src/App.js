import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Noticias from "./pages/Noticias";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import RequireAuth from "./components/RequireAuth";
import Programacao from './components/Programacao';
import NewsDetails from './pages/NewsDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Páginas públicas */}
          <Route index element={<Home />} />
          <Route path="notices" element={<Noticias />} />
          <Route path="pedidos" element={<div>Pedidos</div>} />
          <Route path="programacao" element={<Programacao />} />
          <Route path="contato" element={<div>Contato</div>} />
          <Route path="/notices/:slug" element={<NewsDetails />} />
          {/* Login + Admin */}
          <Route path="login" element={<Login />} />
          <Route path="admin" element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          } />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
