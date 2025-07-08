import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import axios from '../api/axios'

const ADMIN_ROUTE = process.env.REACT_APP_ADMIN_ROUTE 

export default function RequireAuth({ children }) {
  const [status, setStatus] = useState('loading')
  const location = useLocation()

  useEffect(() => {
    axios.get('/admin/user')
      .then(() => setStatus('ok'))
      .catch(() => {
        localStorage.removeItem('admin_token')
        setStatus('fail')
      })
  }, [])

  if (status === 'loading') {
    return <div style={{ padding: 20 }}>Carregando...</div>
  }

  if (status === 'fail') {
    return (
      <Navigate
        to={`/${ADMIN_ROUTE}/login`}
        replace
        state={{ from: location }}
      />
    )
  }

  return children
}
