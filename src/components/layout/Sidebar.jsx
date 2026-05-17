import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Sidebar({ items, active, onSelect, role = 'warga', isDark = true }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // CONFIGURASI WARNA SIDEBAR DINAMIS YANG IKUT ARUS INDUK
  const sTheme = {
    bg: isDark ? '#042010' : '#ffffff',
    border: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
    textMain: isDark ? '#ffffff' : '#0f172a',
    textSub: isDark ? 'rgba(255,255,255,0.4)' : '#64748b',
    textSection: isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8',
    itemText: isDark ? 'rgba(255,255,255,0.65)' : '#475569',
    itemActiveBg: isDark ? 'rgba(255,255,255,0.08)' : '#f0fdf4',
    itemActiveText: isDark ? '#ffffff' : '#042010',
    itemHoverBg: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc',
    iconColor: isDark ? 'rgba(255,255,255,0.4)' : '#64748b'
  }

  const avatarBg = role === 'admin' ? 'var(--gold)' : '#0f4223'
  const avatarColor = role === 'admin' ? '#042010' : '#fff'

  return (
    <aside style={{
      width: '260px', minWidth: '260px',
      background: sTheme.bg,
      borderRight: `1px solid ${sTheme.border}`,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      height: 'calc(100vh - 64px)',
      boxSizing: 'border-box',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* User Info Card */}
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: `1px solid ${sTheme.border}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px',
          background: avatarBg, color: avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '14px', flexShrink: 0,
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>{user?.avatar || user?.name?.[0]?.toUpperCase()}</div>
        
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: sTheme.textMain, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {user?.name}
          </div>
          <div style={{ fontSize: '11px', color: sTheme.textSub, marginTop: '2px', fontWeight: 500 }}>
            {role === 'admin' ? user?.jabatan || 'Admin Wilayah' : `Warga — ${user?.desa}`}
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.75rem' }}>
        {items.map((item, i) => {
          if (item.section) return (
            <div key={i} style={{ padding: '14px 0.75rem 6px', fontSize: '10px', color: sTheme.textSection, letterSpacing: '1px', fontWeight: 700, textTransform: 'uppercase' }}>
              {item.section}
            </div>
          )
          
          const isActive = active === item.key
          return (
            <div
              key={item.key}
              onClick={() => onSelect(item.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 0.75rem', cursor: 'pointer', fontSize: '13.5px',
                borderRadius: '12px',
                color: isActive ? sTheme.itemActiveText : sTheme.itemText,
                background: isActive ? sTheme.itemActiveBg : 'transparent',
                fontWeight: isActive ? 700 : 500,
                transition: 'all 0.2s ease',
                marginBottom: '4px',
                boxSizing: 'border-box'
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = sTheme.itemHoverBg }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ 
                fontSize: '16px', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: isActive ? (isDark ? 'var(--gold)' : '#166534') : sTheme.iconColor,
                transition: 'color 0.2s'
              }}>
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '99px' }}>
                  {item.badge}
                </span>
              )}
            </div>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div style={{ padding: '1rem 0.75rem', borderTop: `1px solid ${sTheme.border}` }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', background: isDark ? 'rgba(239,68,68,0.12)' : 'transparent',
            border: `1px solid ${isDark ? 'rgba(239,68,68,0.2)' : '#fee2e2'}`, color: '#fca5a5',
            padding: '10px', borderRadius: '12px',
            fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(239,68,68,0.12)' : 'transparent'; e.currentTarget.style.borderColor = isDark ? 'rgba(239,68,68,0.2)' : '#fee2e2' }}
        >Keluar Sistem</button>
      </div>
    </aside>
  )
}