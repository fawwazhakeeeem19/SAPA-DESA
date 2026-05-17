import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home           from './pages/Home'
import Login          from './pages/Login'
import LoginAdmin     from './pages/LoginAdmin'
import DashboardWarga from './pages/DashboardWarga'
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardSuperAdmin from './pages/DashboardSuperAdmin'

function Guard({ children, roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role))
    return <Navigate to={redirectByRole(user.role)} replace />
  return children
}

function redirectByRole(role) {
  if (role === 'superadmin') return '/dashboard/superadmin'
  if (role === 'admin')      return '/dashboard/admin'
  return '/dashboard/warga'
}
function AnimatedRoutes() {
  const location = useLocation()
  const { user }  = useAuth()
  const [show, setShow] = useState(true)
  const [key,  setKey]  = useState(location.pathname)

  useEffect(() => {
    setShow(false)
    const t = setTimeout(() => { setKey(location.pathname); setShow(true) }, 170)
    return () => clearTimeout(t)
  }, [location.pathname])

  const isAuth = location.pathname.startsWith('/dashboard')

  return (
    <div style={{
      opacity:   show ? 1 : 0,
      transform: show ? 'translateY(0)' : `translateY(${isAuth ? '6px' : '10px'})`,
      transition: 'opacity .2s ease, transform .2s ease',
      minHeight: '100vh',
    }}>
      <Routes location={location} key={key}>
        <Route path="/"            element={<Home />} />
        <Route path="/login"       element={user ? <Navigate to={redirectByRole(user.role)} /> : <Login />} />
        <Route path="/admin/login" element={user ? <Navigate to={redirectByRole(user.role)} /> : <LoginAdmin />} />

        <Route path="/dashboard/warga" element={
          <Guard roles={['warga']}><DashboardWarga /></Guard>
        } />

        <Route path="/dashboard/admin" element={
          <Guard roles={['admin','superadmin']}><DashboardAdmin /></Guard>
        } />

        <Route path="/dashboard/superadmin" element={
          <Guard roles={['superadmin']}><DashboardSuperAdmin /></Guard>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AnimatedRoutes />
    </AuthProvider>
  )
}
