// src/RoutesConfig.js
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Noticias from './pages/Noticias'
import NewsDetails from './pages/NewsDetails'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'

const secret = process.env.REACT_APP_ADMIN_ROUTE  // ex: painel-secreto-123

export default function RoutesConfig() {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      Routes,
      null,
      // rota pública
      React.createElement(Route, { path: '/', element: React.createElement(Home) }),
      React.createElement(Route, { path: '/noticias', element: React.createElement(Noticias) }),
      React.createElement(Route, { path: '/noticia/:slug', element: React.createElement(NewsDetails) }),

      // login admin na rota secreta
      React.createElement(Route, {
        path: `/${secret}/login`,
        element: React.createElement(Login)
      }),

      // painel admin
      React.createElement(Route, {
        path: `/${secret}`,
        element: React.createElement(AdminDashboard)
      }),

      // qualquer outra => home
      React.createElement(Route, {
        path: '*',
        element: React.createElement(Navigate, { to: '/' })
      })
    )
  )
}
