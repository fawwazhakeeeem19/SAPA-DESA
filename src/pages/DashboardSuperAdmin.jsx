import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { Badge, CatBadge, Card, CardTitle, MetricCard, Btn, Alert, EmptyState, ConfirmDialog } from '../components/ui'
import { LayoutDashboard, Inbox, Users, ShieldAlert, Sun, Moon, Eye, ShieldCheck, UserX, UserCheck, LogOut } from 'lucide-react'

const BASE = 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('sapa_desa_token')
const saFetch = (path, opts = {}) => fetch(`${BASE}/superadmin${path}`, { ...opts, headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json', ...opts.headers } }).then(r => r.json()).then(d => { if (!d.success) throw new Error(d.message); return d.data })

const NAV = [
  { section: 'SUPER ADMIN' },
  { key: 'dashboard',   icon: <LayoutDashboard size={16} />, label: 'Dashboard Global' },
  { key: 'semua-aduan', icon: <Inbox size={16} />,           label: 'Semua Aduan' },
  { key: 'users',       icon: <Users size={16} />,           label: 'Manajemen Warga' },
  { key: 'admins',      icon: <ShieldAlert size={16} />,     label: 'Manajemen Admin' },
]

export default function DashboardSuperAdmin() {
  const { user, logout } = useAuth()
  const [active, setActive] = useState('dashboard')
  const [stats, setStats]   = useState(null)
  const [aduan, setAduan]   = useState([])
  const [users, setUsers]   = useState([])
  
  const [isDark, setIsDark] = useState(true)

  const fetchAll = useCallback(async () => {
    try {
      const [s, a, u] = await Promise.all([
        saFetch('/stats'),
        saFetch('/users?role=warga'),
        saFetch('/users'),
      ])
      setStats(s); setAduan(s.recentAduan || []); setUsers(u)
    } catch (e) { console.error(e) }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const views = {
    dashboard:     <SADashboard stats={stats} setActive={setActive} isDark={isDark} />,
    'semua-aduan': <SAAduan aduan={aduan} refetch={fetchAll} isDark={isDark} />,
    users:         <SAUsers users={users.filter(u => u.role === 'warga')} refetch={fetchAll} isDark={isDark} />,
    admins:        <SAAdmins users={users.filter(u => ['admin','superadmin'].includes(u.role))} refetch={fetchAll} isDark={isDark} />,
  }

  const mainBg = isDark ? '#02140b' : '#f8fafc'
  const sidebarBg = isDark ? '#042010' : '#ffffff'
  const sidebarBorder = isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'
  const textMain = isDark ? '#ffffff' : '#0f172a'
  const textSub = isDark ? '#a2bba9' : '#64748b'
  const textSection = isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8'

  return (
    <div style={{ 
      height: '100vh', 
      maxHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column', 
      background: mainBg, 
      transition: 'background 0.3s',
      overflow: 'hidden' 
    }}>
      
      <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
        
        <aside style={{
          width: '260px', minWidth: '260px',
          background: sidebarBg,
          borderRight: `1px solid ${sidebarBorder}`,
          display: 'flex', flexDirection: 'column',
          height: '100%', boxSizing: 'border-box', transition: 'background 0.3s'
        }}>
          <div style={{ padding: '1.5rem 1.25rem', borderBottom: `1px solid ${sidebarBorder}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '12px', 
              background: isDark ? 'var(--gold)' : '#166534', color: isDark ? '#02140b' : '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontWeight: 800, fontSize: '14px', flexShrink: 0
            }}>SA</div>
            
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: textMain, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.name}</div>
              <div style={{ fontSize: '11px', color: textSub, marginTop: '2px', fontWeight: 500 }}>Super Administrator</div>
            </div>
          </div>

          <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
            {NAV.map((n, i) => n.section ? (
              <div key={i} style={{ padding: '14px 0.75rem 6px', fontSize: '10px', color: textSection, letterSpacing: '1px', fontWeight: 700, textTransform: 'uppercase' }}>{n.section}</div>
            ) : (
              <div 
                key={n.key} 
                onClick={() => setActive(n.key)} 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0.75rem', cursor: 'pointer', fontSize: '13.5px', borderRadius: '12px',
                  fontWeight: active === n.key ? 700 : 500, 
                  color: active === n.key ? (isDark ? '#ffffff' : '#042010') : (isDark ? 'rgba(255,255,255,0.65)' : '#475569'), 
                  background: active === n.key ? (isDark ? 'rgba(255,255,255,0.08)' : '#f0fdf4') : 'transparent', transition: 'all 0.2s' 
                }}
                className="ws-item-desktop"
              >
                <span style={{ display: 'flex', color: active === n.key ? (isDark ? 'var(--gold)' : '#166534') : (isDark ? 'rgba(255,255,255,0.4)' : '#64748b') }}>{n.icon}</span>
                <span>{n.label}</span>
              </div>
            ))}
          </nav>
          <div style={{ padding: '1rem 0.75rem', borderTop: `1px solid ${sidebarBorder}`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={() => setIsDark(!isDark)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '10px', fontSize: '13px', borderRadius: '12px', fontWeight: 600, border: 'none',
                color: isDark ? 'var(--gold)' : '#166534',
                background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s'
              }}
              className="ws-btn-theme-desktop"
            >
              <span style={{ display: 'flex' }}>{isDark ? <Sun size={15} /> : <Moon size={15} />}</span>
              <span>Ubah Mode Visual</span>
            </button>

            <button 
              onClick={() => { logout(); window.location.href = '/' }} 
              style={{ 
                width: '100%', padding: '10px', background: isDark ? 'rgba(239,68,68,0.1)' : 'transparent', 
                border: `1px solid ${isDark ? 'rgba(239,68,68,0.2)' : '#fee2e2'}`, color: '#fca5a5', 
                borderRadius: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', 
                fontFamily: 'inherit', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' 
              }}
            >
              <LogOut size={14}/> Keluar Sistem
            </button>
          </div>
        </aside>

        <main style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '2.5rem 2rem 6rem', 
          background: mainBg, 
          transition: 'background 0.3s',
          height: '100%'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {views[active]}
          </div>
        </main>
      </div>
    </div>
  )
}

const getTableTheme = (isDark) => ({
  cardBg: isDark ? '#062415' : '#ffffff',
  cardBorder: isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0',
  textMain: isDark ? '#ffffff' : '#0f172a',
  textSub: isDark ? '#a2bba9' : '#64748b',
  thBg: isDark ? '#02140b' : '#f8fafc',
  thText: isDark ? 'rgba(255,255,255,0.4)' : '#64748b',
  tdBorder: isDark ? 'rgba(255,255,255,0.04)' : '#f1f5f9',
})

function SADashboard({ stats, setActive, isDark }) {
  if (!stats) return <p style={{ fontSize: '13px', color: '#94a3b8', padding: '2rem' }}>Memuat data statistik...</p>
  const getBarColor = (index) => {
    return (isDark ? ['#4ade80', '#fbbf24', '#38bdf8', '#f87171', '#c084fc'] : ['#166534', '#d4a017', '#0284c7', '#b45309', '#6b21a8'])[index % 5];
  }
  const t = getTableTheme(isDark);

  const cardBoxStyle = (variant) => {
    return {
      background: isDark 
        ? (variant === 'premium' ? 'linear-gradient(135deg, #062415, #02140b)' : '#062415') 
        : (variant === 'premium' ? 'linear-gradient(135deg, #ffffff, #f0fdf4)' : '#ffffff'),
      border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #e2e8f0',
      padding: '1.5rem 1.25rem',
      borderRadius: '20px',
      transition: 'all 0.3s ease'
    };
  };

  return (
    <div style={{ animation: 'fadeIn 0.4s' }}>
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: isDark ? 'var(--gold)' : '#166534', letterSpacing: '-0.75px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-display), sans-serif' }}>
            SAPA DESA
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: t.textMain, margin: 0, letterSpacing: '-0.5px' }}>Dashboard Global</h1>
          <p style={{ fontSize: '13.5px', color: t.textSub, marginTop: '4px', margin: '4px 0 0' }}>Pantau ringkasan statistik seluruh sistem SAPA DESA</p>
        </div>
        <div style={{ fontSize: '11px', fontWeight: 700, background: isDark ? 'rgba(56,189,248,0.15)' : '#e0f2fe', color: isDark ? '#38bdf8' : '#0369a1', padding: '4px 10px', borderRadius: '8px' }}>
          Super Otoritas
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '1.5rem' }} className="warga-metric-grid">
        <div style={{ ...cardBoxStyle('premium'), border: isDark ? '1px solid rgba(74,222,128,0.15)' : '1px solid #bbf7d0' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: isDark ? '#4ade80' : '#166534', textTransform: 'uppercase' }}>Total Aduan</div>

          <div style={{ fontSize: '32px', fontWeight: 900, color: t.textMain, marginTop: '6px', fontFamily: 'var(--font-display)' }}>{stats.totalAduan}</div>
        </div>
        {[
          { l: 'Warga Terdaftar', v: stats.totalWarga, b: 'User Aktif' },
          { l: 'Admin Wilayah', v: stats.totalAdmin, b: 'Aparatur Desa' },
          { l: 'Terselesaikan', v: stats.selesai, b: 'Tuntas 100%' },
          { l: 'Laporan Anonim', v: stats.anonim, b: 'Identitas Privat' }
        ].map((item, idx) => (
          <div key={idx} style={cardBoxStyle('default')}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: t.textSub, textTransform: 'uppercase' }}>{item.l}</div>
            <div style={{ fontSize: '32px', fontWeight: 900, color: t.textMain, marginTop: '6px', fontFamily: 'var(--font-display)' }}>{item.v}</div>
          </div>
        ))}
      </div>

      <div onClick={() => setActive('semua-aduan')} style={{ background: isDark ? 'linear-gradient(90deg, #1f1313 0%, #1a0a0a 100%)' : 'linear-gradient(90deg, #fffdfd 0%, #fff1f1 100%)', border: isDark ? '1px solid rgba(248,113,113,0.15)' : '1px solid #fecaca', padding: '1rem 1.5rem', borderRadius: '18px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} className="sa-action-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '10px', height: '24px', background: '#f87171', borderRadius: '99px' }} />
          <div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: isDark ? '#f87171' : '#991b1b' }}>Aduan Baru Perlu Tindakan Masuk Sistem!</span>
            <span style={{ fontSize: '12px', color: t.textSub, marginLeft: '8px' }}>Ada berkas masuk yang belum dieksekusi oleh admin wilayah.</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: 900, color: isDark ? '#f87171' : '#dc2626' }}>{stats.baru}</div>
          <span style={{ fontSize: '11px', background: isDark ? '#f87171' : '#dc2626', color: isDark ? '#042010' : '#fff', padding: '3px 10px', borderRadius: '8px', fontWeight: 700 }}>Tinjau</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }} className="sa-charts-grid">
        <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '24px', padding: '2rem' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: t.textMain, margin: 0 }}>Sebaran Per Kategori</h3>
          <p style={{ fontSize: '12.5px', color: t.textSub, marginTop: '2px', marginBottom: '1.5rem' }}>Aduan paling sering dikeluhkan oleh warga</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(stats.perKategori || []).map((k, index) => (
              <div key={k.kategori} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <span style={{ fontWeight: 600, color: t.textMain }}>{k.kategori}</span>
                  <span style={{ fontWeight: 700, color: t.textMain, background: isDark ? '#02140b' : '#f1f5f9', padding: '2px 8px', borderRadius: '6px' }}>{k.n} laporan</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: isDark ? '#02140b' : '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${(k.n / (stats.totalAduan || 1)) * 100}%`, height: '100%', background: getBarColor(index), borderRadius: '99px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '24px', padding: '2rem' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: t.textMain, margin: 0 }}>Efisiensi Status</h3>
          <p style={{ fontSize: '12.5px', color: t.textSub, marginTop: '2px', marginBottom: '1.5rem' }}>Metrik kecepatan penanganan berkas</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(stats.perStatus || []).map(s => (
              <div key={s.status} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 1rem', background: isDark ? '#02140b' : '#f8fafc', borderRadius: '16px', border: `1px solid ${t.cardBorder}` }}>
                <Badge value={s.status} />
                <span style={{ fontWeight: 800, fontSize: '16px', color: t.textMain }}>{s.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SAAduan({ aduan, refetch, isDark }) {
  const [identity, setIdentity] = useState(null)
  const t = getTableTheme(isDark)

  const doReveal = async (id) => {
    try {
      const data = await saFetch(`/aduan/${id}/identity`)
      setIdentity(data)
    } catch (e) { alert(e.message) }
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '20px', fontWeight: 900, color: isDark ? 'var(--gold)' : '#166534', letterSpacing: '-0.75px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-display), sans-serif' }}>
          SAPA DESA
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: t.textMain }}>Semua Berkas Aduan</h1>
        <p style={{ fontSize: '13.5px', color: t.textSub, marginTop: '4px' }}>Manajemen berkas laporan warga desa (Super Admin berhak mengungkap enkripsi pelapor)</p>
      </div>

      {identity && (
        <Card style={{ marginBottom: '1.5rem', border: '1px solid #fde047', background: isDark ? '#02140b' : '#fefce8', borderRadius: '20px', padding: '1.5rem' }}>
          <CardTitle action={<Btn variant="ghost" size="sm" onClick={() => setIdentity(null)} style={{color: '#ef4444'}}>✕ Tutup</Btn>}>
            <span style={{ color: t.textMain }}>🔍 Identitas Asli Pelapor — #{identity.nomor}</span>
          </CardTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', fontSize: '13px', marginTop: '1rem', color: t.textMain }}>
            {[['Nama', identity.name], ['Email', identity.email], ['No. HP', identity.hp], ['NIK KTP', identity.nik], ['Nomor KK', identity.no_kk], ['Alamat RT/RW', `${identity.desa}, RT ${identity.rt}/${identity.rw}`]].map(([l, v]) => (
              <div key={l} style={{ background: isDark ? 'rgba(0,0,0,0.2)' : '#fff', padding: '10px 14px', borderRadius: '12px', border: `1px solid ${t.cardBorder}` }}>
                <div style={{ color: t.textSub, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>{l}</div>
                <div style={{ fontWeight: 700 }}>{v || '—'}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '11.5px', color: '#b45309', marginTop: '12px', background: isDark ? 'rgba(217,119,6,0.05)' : '#fef3c7', padding: '8px 12px', borderRadius: '8px', fontWeight: 600 }}>⚠️ Peringatan: Log akses dekripsi identitas ini telah direkam secara permanen oleh sistem keamanan.</p>
        </Card>
      )}

      <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: t.thBg }}>
              {['KODE ADUAN', 'NAMA PELAPOR', 'KATEGORI MASALAH', 'STATUS', 'SENSE PRIVASI', 'OTORITAS'].map(h => (
                <th key={h} style={{ padding: '16px 20px', fontWeight: 700, color: t.thText, fontSize: '11px', letterSpacing: '0.5px', borderBottom: `1px solid ${t.cardBorder}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {aduan.length === 0 && Array(3).fill(0).map((_, idx) => <tr key={idx}><td colSpan={6} style={{ padding: '20px', textAlign: 'center' }}><EmptyState /></td></tr>)}
            {aduan.map(a => (
              <tr key={a.id} className="table-row-premium" style={{ borderBottom: `1px solid ${t.tdBorder}`, color: t.textMain }}>
                <td style={{ padding: '16px 20px', fontWeight: 800, color: isDark ? 'var(--gold)' : '#166534' }}>#{a.nomor}</td>
                <td style={{ padding: '16px 20px', fontWeight: 600 }}>{a.pelapor}</td>
                <td style={{ padding: '16px 20px' }}><CatBadge label={a.kategori} /></td>
                <td style={{ padding: '16px 20px' }}><Badge value={a.status} /></td>
                <td style={{ padding: '16px 20px' }}>
                  {a.is_anonim 
                    ? <span style={{ background: 'rgba(217,119,6,0.12)', color: '#d97706', fontSize: '10px', padding: '3px 10px', borderRadius: '8px', fontWeight: 700 }}>ANONIM</span> 
                    : <span style={{ color: t.textSub, fontSize: '12px' }}>Publik</span>
                  }
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <button onClick={() => doReveal(a.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#d4a017', color: '#042010', border: 'none', padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                    <Eye size={13} /> Reveal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SAUsers({ users, refetch, isDark }) {
  const t = getTableTheme(isDark)
  
  const promote = async (id) => {
    if (!window.confirm('Jadikan user ini sebagai Admin Wilayah?')) return
    try { await saFetch(`/users/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role: 'admin' }) }); refetch() }
    catch (e) { alert(e.message) }
  }
  
  const toggle = async (id) => {
    try { await saFetch(`/users/${id}/toggle`, { method: 'PATCH' }); refetch() }
    catch (e) { alert(e.message) }
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '20px', fontWeight: 900, color: isDark ? 'var(--gold)' : '#166534', letterSpacing: '-0.75px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-display), sans-serif' }}>
          SAPA DESA
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: t.textMain }}>Manajemen Akun Warga</h1>
        <p style={{ fontSize: '13.5px', color: t.textSub, marginTop: '4px' }}>Total {users.length} penduduk desa terverifikasi dalam sistem database</p>
      </div>

      <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: t.thBg }}>
              {['NAMA WARGA', 'ALAMAT EMAIL', 'WILAYAH DESA', 'KONTRIBUSI ADUAN', 'STATUS AKUN', 'TINDAKAN OTORITAS'].map(h => (
                <th key={h} style={{ padding: '16px 20px', fontWeight: 700, color: t.thText, fontSize: '11px', letterSpacing: '0.5px', borderBottom: `1px solid ${t.cardBorder}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="table-row-premium" style={{ borderBottom: `1px solid ${t.tdBorder}`, color: t.textMain }}>
                <td style={{ padding: '16px 20px', fontWeight: 700 }}>{u.name}</td>
                <td style={{ padding: '16px 20px', color: t.textSub }}>{u.email}</td>
                <td style={{ padding: '16px 20px', fontWeight: 600 }}><span style={{ color: isDark ? 'var(--gold)' : '#166534' }}></span> {u.desa || '—'}</td>
                <td style={{ padding: '16px 20px', fontWeight: 800, textAlign: 'center' }}>{u.total_aduan} Berkas</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    background: u.is_active ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', 
                    color: u.is_active ? '#22c55e' : '#ef4444', 
                    fontSize: '11px', padding: '4px 10px', borderRadius: '8px', fontWeight: 700 
                  }}>{u.is_active ? 'AKTIF' : 'SUSPEND'}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => promote(u.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent', border: `1px solid ${isDark ? '#d4a017' : '#166534'}`, color: isDark ? '#d4a017' : '#166534', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                      <ShieldCheck size={13} /> ↑ Admin
                    </button>
                    <button onClick={() => toggle(u.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: u.is_active ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: 'none', color: u.is_active ? '#ef4444' : '#22c55e', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                      {u.is_active ? <UserX size={13} /> : <UserCheck size={13} />} {u.is_active ? 'Suspend' : 'Aktifkan'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SAAdmins({ users, refetch, isDark }) {
  const t = getTableTheme(isDark)
  
  const demote = async (id) => {
    if (!window.confirm('Turunkan jabatan admin ini menjadi warga biasa?')) return
    try { await saFetch(`/users/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role: 'warga' }) }); refetch() }
    catch (e) { alert(e.message) }
  }
  
  const toggle = async (id) => {
    try { await saFetch(`/users/${id}/toggle`, { method: 'PATCH' }); refetch() }
    catch (e) { alert(e.message) }
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '20px', fontWeight: 900, color: isDark ? 'var(--gold)' : '#166534', letterSpacing: '-0.75px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-display), sans-serif' }}>
          SAPA DESA
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: t.textMain }}>Daftar Aparatur Admin Wilayah</h1>
        <p style={{ fontSize: '13.5px', color: t.textSub, marginTop: '4px' }}>Manajemen hak akses kendali admin tingkat kelurahan/desa</p>
      </div>

      <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: t.thBg }}>
              {['NAMA PETUGAS', 'EMAIL RESMI', 'LEVEL AKSES', 'JABATAN DINAS', 'STATUS', 'KENDALI OTORITAS'].map(h => (
                <th key={h} style={{ padding: '16px 20px', fontWeight: 700, color: t.thText, fontSize: '11px', letterSpacing: '0.5px', borderBottom: `1px solid ${t.cardBorder}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="table-row-premium" style={{ borderBottom: `1px solid ${t.tdBorder}`, color: t.textMain }}>
                <td style={{ padding: '16px 20px', fontWeight: 700 }}>{u.name}</td>
                <td style={{ padding: '16px 20px', color: t.textSub }}>{u.email}</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    background: u.role === 'superadmin' ? 'rgba(212,160,23,0.15)' : 'rgba(22,101,52,0.12)', 
                    color: u.role === 'superadmin' ? 'var(--gold)' : '#22c55e', 
                    fontSize: '10px', padding: '3px 10px', borderRadius: '8px', fontWeight: 800 
                  }}>{u.role.toUpperCase()}</span>
                </td>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: t.textSub }}>{u.jabatan || 'Aparatur Desa'}</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    background: u.is_active ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', 
                    color: u.is_active ? '#22c55e' : '#ef4444', 
                    fontSize: '11px', padding: '4px 10px', borderRadius: '8px', fontWeight: 700 
                  }}>{u.is_active ? 'AKTIF' : 'SUSPEND'}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  {u.role !== 'superadmin' ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => demote(u.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent', border: `1px solid ${isDark ? '#64748b' : '#64748b'}`, color: isDark ? '#94a3b8' : '#64748b', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                        ↓ Warga
                      </button>
                      <button onClick={() => toggle(u.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: u.is_active ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: 'none', color: u.is_active ? '#ef4444' : '#22c55e', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                        {u.is_active ? <UserX size={13} /> : <UserCheck size={13} />} {u.is_active ? 'Suspend' : 'Aktifkan'}
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, fontStyle: 'italic' }}>Hak Akses Utama</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .table-row-premium:hover { background: ${isDark ? 'rgba(255,255,255,0.015)' : '#f8fafc'} !important; }
        .ws-btn-theme-desktop:hover { background: ${isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'} !important; }
        .ws-item-desktop:hover { background: ${isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc'} !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}