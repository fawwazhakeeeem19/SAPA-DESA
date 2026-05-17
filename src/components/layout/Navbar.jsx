import React from 'react'
import { useAuth } from '../../context/AuthContext' // Sesuaikan path lokasi context auth lu
import { Shield, LogOut } from 'lucide-react'

export default function Navbar({ isDark = true }) {
  const { user, logout } = useAuth()

  // Tema internal navbar penyeimbang Dashboard
  const navBg = isDark ? 'rgba(2, 20, 11, 0.8)' : 'rgba(255, 255, 255, 0.85)'
  const navBorder = isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0'
  const textColor = isDark ? '#ffffff' : '#0f172a'

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 9999,
      width: '100%',
      background: navBg,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${navBorder}`,
      boxSizing: 'border-box',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        
        {/* LOGO BARU: STRIP GAMBAR DIHAPUS, TEKS BOLD PREMIUM NAIK PANGGUNG */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'default' }}>
          <span style={{
            fontSize: '18px',
            fontWeight: 900,
            color: isDark ? 'var(--gold)' : '#166534',
            letterSpacing: '-0.75px',
            fontFamily: 'var(--font-display), sans-serif',
            textTransform: 'uppercase'
          }}>
            SAPA DESA
          </span>
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            background: isDark ? 'rgba(255,255,255,0.08)' : '#f0fdf4',
            color: isDark ? 'rgba(255,255,255,0.5)' : '#166534',
            padding: '2px 6px',
            borderRadius: '6px',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : '#bbf7d0'}`
          }}>
            v2.0
          </span>
        </div>

        {/* AREA PROFIL KANAN YANG SIMETRIS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc',
            padding: '5px 12px',
            borderRadius: '10px',
            border: `1px solid ${navBorder}`
          }} className="nav-user-badge">
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              background: isDark ? 'var(--gold)' : '#166534',
              color: isDark ? '#02140b' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '11px'
            }}>
              {user?.role?.[0]?.toUpperCase() || 'W'}
            </div>
            <span style={{ 
              fontSize: '12.5px', 
              fontWeight: 600, 
              color: textColor,
              maxWidth: '120px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}>
              {user?.name?.split(' ')[0]}
            </span>
          </div>
        </div>

      </div>
    </header>
  )
}