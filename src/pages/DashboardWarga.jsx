import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { Badge, CatBadge, Card, CardTitle, MetricCard, FormGroup, inputStyle, Btn, Alert, EmptyState, ConfirmDialog } from '../components/ui'
import { aduanAPI, notifikasiAPI } from '../services/api'
import { KATEGORI_ADUAN } from '../data/mockData'
import { Home, PenSquare, ClipboardList, Bell, User, Trash2, CheckCircle, Sun, Moon, Shield } from 'lucide-react'

const NAV = [
  { key: 'beranda',    icon: <Home size={20} />,          label: 'Beranda' },
  { key: 'aduan-baru', icon: <PenSquare size={20} />,     label: 'Buat Aduan' },
  { key: 'riwayat',    icon: <ClipboardList size={20} />, label: 'Riwayat' },
  { key: 'notifikasi', icon: <Bell size={20} />,          label: 'Notif' },
  { key: 'profil',     icon: <User size={20} />,          label: 'Profil' },
]

export default function DashboardWarga() {
  const [active, setActive] = useState('beranda')
  const [aduan, setAduan]   = useState([])
  const [notifs, setNotifs] = useState([])
  const [unread, setUnread] = useState(0)
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()
  const [isDark, setIsDark] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const [aduanRes, notifRes] = await Promise.all([aduanAPI.getAll(), notifikasiAPI.getAll()])
      setAduan(aduanRes.aduan || [])
      setNotifs(notifRes.notifikasi || [])
      setUnread(notifRes.unread || 0)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const views = {
    beranda:      <Beranda user={user} aduan={aduan} setActive={setActive} loading={loading} isDark={isDark} />,
    'aduan-baru': <AduanBaru setActive={setActive} onSuccess={fetchData} isDark={isDark} />,
    riwayat:      <Riwayat aduan={aduan} loading={loading} onDelete={fetchData} isDark={isDark} />,
    notifikasi:   <Notifikasi notifs={notifs} onReadAll={async () => { await notifikasiAPI.readAll(); setUnread(0); fetchData() }} isDark={isDark} />,
    profil:       <Profil user={user} logout={logout} isDark={isDark} />,
  }

  const mainBg = isDark ? '#02140b' : '#f8fafc'
  const t = getWargaTheme(isDark)

  const mobileNavItems = [
    { key: 'beranda',    icon: <Home size={20} />,          label: 'Beranda' },
    { key: 'aduan-baru', icon: <PenSquare size={20} />,     label: 'Buat Aduan' },
    { key: 'theme-toggle', icon: isDark ? <Sun size={20} /> : <Moon size={20} />, label: isDark ? 'Terang' : 'Gelap', isAction: true },
    { key: 'notifikasi', icon: <Bell size={20} />,          label: 'Notif' },
    { key: 'profil',     icon: <User size={20} />,          label: 'Profil' },
  ]

  const desktopNavItems = [
    { key: 'beranda',    icon: <Home size={16} />,          label: 'Beranda' },
    { key: 'aduan-baru', icon: <PenSquare size={16} />,     label: 'Buat Pengaduan' },
    { key: 'riwayat',    icon: <ClipboardList size={16} />, label: 'Riwayat Aduan' },
    { key: 'notifikasi', icon: <Bell size={16} />,          label: 'Notifikasi' },
    { key: 'profil',     icon: <User size={16} />,          label: 'Data Diri' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: mainBg, transition: 'background 0.3s' }}>
      
      <div style={{ display: 'flex', flex: 1, position: 'relative' }} className="warga-master-wrapper">
        
        <aside className="warga-native-sidebar" style={{
          width: '260px', minWidth: '260px',
          background: isDark ? '#042010' : '#ffffff',
          borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'}`,
          display: 'flex', flexDirection: 'column',
          height: '100vh', position: 'sticky', top: 0,
          boxSizing: 'border-box', transition: 'background 0.3s'
        }}>
          <div style={{ padding: '1.5rem 1.25rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: isDark ? 'var(--gold)' : '#166534', color: isDark ? '#042010' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
              {user?.name?.[0]?.toUpperCase() || 'W'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: t.textMain, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.name}</div>
              <div style={{ fontSize: '11px', color: t.textSub, marginTop: '2px' }}>Warga Terverifikasi</div>
            </div>
          </div>

          <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ padding: '0 0.75rem 6px', fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8', letterSpacing: '1px', fontWeight: 700 }}>MENU WARGA</div>
            {desktopNavItems.map(n => {
              const isAct = active === n.key
              return (
                <div key={n.key} onClick={() => setActive(n.key)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0.75rem', cursor: 'pointer', fontSize: '13.5px', borderRadius: '12px', fontWeight: isAct ? 700 : 500, color: isAct ? (isDark ? '#ffffff' : '#042010') : (isDark ? 'rgba(255,255,255,0.65)' : '#475569'), background: isAct ? (isDark ? 'rgba(255,255,255,0.08)' : '#f0fdf4') : 'transparent', transition: 'all 0.2s' }} className="ws-item-desktop">
                  <span style={{ display: 'flex', color: isAct ? (isDark ? 'var(--gold)' : '#166534') : (isDark ? 'rgba(255,255,255,0.4)' : '#64748b') }}>{n.icon}</span>
                  <span style={{ flex: 1 }}>{n.label}</span>
                  {n.key === 'notifikasi' && unread > 0 && <span style={{ background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '99px' }}>{unread}</span>}
                </div>
              )
            })}
          </nav>

          <div style={{ padding: '1rem 0.75rem', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'}`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

            <button onClick={() => { logout(); window.location.href = '/' }} style={{ width: '100%', padding: '10px', background: isDark ? 'rgba(239,68,68,0.1)' : 'transparent', border: `1px solid ${isDark ? 'rgba(239,68,68,0.2)' : '#fee2e2'}`, color: '#fca5a5', borderRadius: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>Keluar Sistem</button>
          </div>
        </aside>

        <main style={{ flex: 1, overflowY: 'auto', background: mainBg, boxSizing: 'border-box' }} className="warga-scroller-area">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem 6rem' }} className="warga-content-responsive-wrapper">
            {views[active]}
          </div>
        </main>

        <nav className="warga-bottom-bar" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: isDark ? '#042010' : '#ffffff',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'}`,
          display: 'none', justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 4px calc(8px + env(safe-area-inset-bottom))', zIndex: 9998,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.04)'
        }}>
          {mobileNavItems.map(n => {
            const isAct = active === n.key
            return (
              <div 
                key={n.key} 
                onClick={() => n.isAction ? setIsDark(!isDark) : setActive(n.key)} 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', flex: 1, position: 'relative' }}
              >
                <div style={{ 
                  color: n.isAction 
                    ? (isDark ? 'var(--gold)' : '#d4a017') 
                    : (isAct ? (isDark ? 'var(--gold)' : '#166534') : (isDark ? 'rgba(255,255,255,0.35)' : '#64748b')), 
                  transition: 'all 0.2s', display: 'flex' 
                }}>
                  {n.icon}
                </div>
                <span style={{ fontSize: '10px', fontWeight: isAct ? 700 : 500, color: isAct ? (isDark ? '#ffffff' : '#0f172a') : (isDark ? 'rgba(255,255,255,0.4)' : '#64748b') }}>{n.label}</span>
                {n.key === 'notifikasi' && unread > 0 && (
                  <span style={{ position: 'absolute', top: '-2px', right: '24%', background: '#ef4444', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '99px', lineHeight: 1 }}>{unread}</span>
                )}
              </div>
            )
          })}
        </nav>

      </div>

      <style>{`
        .ws-item-desktop:hover { background: ${isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc'} !important; }
        .ws-btn-theme-desktop:hover { background: ${isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'} !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 1023px) {
          .warga-native-sidebar { display: none !important; }
          .warga-bottom-bar { display: flex !important; }
          .warga-desktop-table { display: none !important; }
          .warga-mobile-card-list { display: flex !important; }
          .warga-metric-grid, .warga-quick-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
      `}</style>
    </div>
  )
}

const getWargaTheme = (isDark) => ({
  cardBg: isDark ? '#062415' : '#ffffff',
  cardBorder: isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0',
  textMain: isDark ? '#ffffff' : '#0f172a',
  textSub: isDark ? '#a2bba9' : '#64748b',
  thBg: isDark ? '#02140b' : '#f8fafc',
  tdBorder: isDark ? 'rgba(255,255,255,0.04)' : '#f1f5f9',
  inputBg: isDark ? '#02140b' : '#ffffff',
  inputBorder: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
  quickBtnBg: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff'
})

function AduanTable({ data, onDelete, isDark }) {
  if (!data.length) return <EmptyState message="Belum ada pengaduan warga" />
  const t = getWargaTheme(isDark)
  return (
    <div style={{ width: '100%' }}>
      <div className="warga-desktop-table">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: t.thBg }}><th style={{ padding: '12px 14px', color: isDark ? '#a2bba9' : t.textSub, fontSize: '11px' }}>KODE</th><th style={{ padding: '12px 14px', color: isDark ? '#a2bba9' : t.textSub, fontSize: '11px' }}>KATEGORI</th><th style={{ padding: '12px 14px', color: isDark ? '#a2bba9' : t.textSub, fontSize: '11px' }}>JUDUL</th><th style={{ padding: '12px 14px', color: isDark ? '#a2bba9' : t.textSub, fontSize: '11px' }}>STATUS</th></tr>
          </thead>
          <tbody>
            {data.map(a => (
              <tr key={a.id} style={{ borderBottom: `1px solid ${t.tdBorder}`, color: t.textMain }}>
                <td style={{ padding: '12px 14px', fontWeight: 800, color: isDark ? 'var(--gold)' : '#166534' }}>#{a.nomor}</td>
                <td style={{ padding: '12px 14px' }}><CatBadge label={a.kategori} /></td>
                <td style={{ padding: '12px 14px', fontWeight: 600 }}>{a.judul}</td>
                <td style={{ padding: '12px 14px' }}><Badge value={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="warga-mobile-card-list" style={{ display: 'none', flexDirection: 'column', gap: '10px' }}>
        {data.map(a => (
          <div key={a.id} style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '16px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontWeight: 800, color: isDark ? 'var(--gold)' : '#166534', fontSize: '13px' }}>#{a.nomor}</span><Badge value={a.status} /></div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: t.textMain }}>{a.judul}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px', borderTop: `1px solid ${t.tdBorder}`, paddingTop: '6px' }}><CatBadge label={a.kategori} /><span style={{ fontSize: '11px', color: t.textSub }}>{a.created_at?.split('T')[0]}</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Beranda({ user, aduan, setActive, loading, isDark }) {
  const t = getWargaTheme(isDark)
  const counts = { total: aduan.length, proses: aduan.filter(a => a.status === 'Diproses').length, selesai: aduan.filter(a => a.status === 'Selesai').length, baru: aduan.filter(a => a.status === 'Baru').length }
  
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: t.textMain, margin: 0, letterSpacing: '-0.5px' }}>
            Halo, {user?.name?.split(' ')[0]}
          </h1>
        </div>
        
        <div style={{ fontSize: '11px', fontWeight: 700, background: isDark ? 'rgba(74,222,128,0.1)' : '#dcfce7', color: isDark ? '#4ade80' : '#15803d', padding: '4px 10px', borderRadius: '8px' }}>
          Portal Warga
        </div>
      </div>

      {loading ? (
        <p style={{ fontSize: '13px', color: t.textSub }}>Sinkronisasi berkas...</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '2rem' }} className="warga-metric-grid">
            {[
              { l: 'Total Aduan', v: counts.total, bg: isDark ? 'linear-gradient(135deg, #062415, #02140b)' : '#ffffff', border: isDark ? 'rgba(74,222,128,0.15)' : '#e2e8f0' },
              { l: 'Sedang Diproses', v: counts.proses, bg: t.cardBg, border: t.cardBorder },
              { l: 'Selesai Ditangani', v: counts.selesai, bg: t.cardBg, border: t.cardBorder },
              { l: 'Antrean Baru', v: counts.baru, bg: t.cardBg, border: t.cardBorder }
            ].map((m, i) => (
              <div key={i} style={{ background: m.bg, border: `1px solid ${m.border}`, padding: '1.5rem 1.25rem', borderRadius: '20px', transition: 'all 0.3s' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.l}</div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: t.textMain, marginTop: '6px', fontFamily: 'var(--font-display)' }}>{m.v}</div>
              </div>
            ))}
          </div>

          <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '24px', padding: '1.75rem', marginBottom: '2rem', transition: 'all 0.3s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: t.textMain, margin: 0 }}>Arus Berkas Pelaporan Warga</h3>
              <button onClick={() => setActive('riwayat')} style={{ background: 'transparent', border: `1px solid ${t.cardBorder}`, color: t.textMain, padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Buka Arsip</button>
            </div>
            <AduanTable data={aduan.slice(0, 3)} isDark={isDark} />
          </div>
        </>
      )}

      <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '24px', padding: '1.75rem', transition: 'all 0.3s' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: t.textMain, margin: '0 0 1.25rem' }}>Pusat Akses Layanan Cepat</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }} className="warga-quick-grid">
          <button onClick={() => setActive('aduan-baru')} style={{ background: '#166534', color: '#fff', border: 'none', padding: '14px', borderRadius: '14px', fontSize: '13px', fontWeight: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><PenSquare size={20}/>+ Lapor</button>
          <button onClick={() => setActive('riwayat')} style={{ background: t.quickBtnBg, border: `1px solid ${t.cardBorder}`, color: t.textMain, padding: '14px', borderRadius: '14px', fontSize: '13px', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><ClipboardList size={20} color={isDark?'var(--gold)':'#166534'}/>Arsip Riwayat</button>
          <button onClick={() => setActive('notifikasi')} style={{ background: t.quickBtnBg, border: `1px solid ${t.cardBorder}`, color: t.textMain, padding: '14px', borderRadius: '14px', fontSize: '13px', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><Bell size={20} color={isDark?'var(--gold)':'#166534'}/>Kotak Notif</button>
          <button onClick={() => setActive('profil')} style={{ background: t.quickBtnBg, border: `1px solid ${t.cardBorder}`, color: t.textMain, padding: '14px', borderRadius: '14px', fontSize: '13px', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><User size={20} color={isDark?'var(--gold)':'#166534'}/>Profil Warga</button>
        </div>
      </div>
    </div>
  )
}

function AduanBaru({ setActive, onSuccess, isDark }) {
  const t = getWargaTheme(isDark)
  const [form, setForm] = useState({ kategori: '', judul: '', deskripsi: '', lokasi: '', patokan: '', rt: '', rw: '', urgensi: 'Normal', is_anonim: false })
  const [foto, setFoto] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const submit = async () => {
    if (!form.kategori || !form.judul || !form.deskripsi) { alert('Kategori, judul, dan deskripsi aduan wajib diisi.'); return }
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, k === 'is_anonim' ? (v ? '1' : '0') : v))
      foto.forEach(f => fd.append('foto', f))
      await aduanAPI.create(fd); setSubmitted(true); onSuccess()
    } catch (e) { alert(e.message) } finally { setLoading(false) }
  }

  const dynInp = { width: '100%', padding: '11px 12px', borderRadius: '10px', fontSize: '13px', background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.textMain, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem', background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 800, color: t.textMain, marginBottom: '1rem' }}>Laporan Masuk Antrean Desa!</h2>
      <button onClick={() => setActive('riwayat')} style={{ background: '#166534', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 700 }}>Buka Arsip</button>
    </div>
  )

  return (
    <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '20px', padding: '1.25rem', color: t.textMain }}>
      <h2 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 1rem' }}>Form Pelaporan Kendala Lapangan</h2>
      <FormGroup label="Pilih Kategori Fasilitas"><select style={dynInp} value={form.kategori} onChange={e=>setForm(f=>({...f,kategori:e.target.value}))}><option value="">-- Ketuk Kategori --</option>{KATEGORI_ADUAN.map(k => <option key={k}>{k}</option>)}</select></FormGroup>
      <FormGroup label="Judul Aduan Masalah"><input style={dynInp} type="text" placeholder="Singkat & jelas" value={form.judul} onChange={e=>setForm(f=>({...f,judul:e.target.value}))} /></FormGroup>
      <FormGroup label="Kronologi Deskripsi Kendala"><textarea style={{ ...dynInp, minHeight: '80px' }} placeholder="Jelaskan detail kronologi kejadian..." value={form.deskripsi} onChange={e=>setForm(f=>({...f,deskripsi:e.target.value}))} /></FormGroup>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}><FormGroup label="RT"><input style={dynInp} type="text" placeholder="003" value={form.rt} onChange={e=>setForm(f=>({...f,rt:e.target.value}))} /></FormGroup><FormGroup label="RW"><input style={dynInp} type="text" placeholder="002" value={form.rw} onChange={e=>setForm(f=>({...f,rw:e.target.value}))} /></FormGroup></div>
      <FormGroup label="Lokasi / Patokan Tanah"><input style={dynInp} type="text" placeholder="Contoh: Samping mushola" value={form.patokan} onChange={e=>setForm(f=>({...f,patokan:e.target.value}))} /></FormGroup>
      <FormGroup label="Skala Urgensi Laporan"><select style={dynInp} value={form.urgensi} onChange={e=>setForm(f=>({...f,urgensi:e.target.value}))}><option>Normal</option><option>Mendesak</option><option>Darurat</option></select></FormGroup>
      <div style={{ background: isDark?'#02140b':'#f8fafc', padding: '10px', borderRadius: '12px', border: `1px solid ${t.inputBorder}`, marginBottom: '12px', display: 'flex', gap: '8px' }}><input type="checkbox" id="anon" checked={form.is_anonim} onChange={e=>setForm(f=>({...f,is_anonim:e.target.checked}))} /><label htmlFor="anon" style={{ fontSize: '12px', fontWeight: 700 }}>Sembunyikan Identitas Asli Saya (Anonim) 🔒</label></div>
      <FormGroup label="Unggah Bukti Gambar Fisik"><div style={{ background: isDark?'#02140b':'#f1f5f9', border: `2px dashed ${t.inputBorder}`, borderRadius: '12px', padding: '14px', textAlign: 'center', position: 'relative' }}><input type="file" accept="image/*" multiple onChange={e=>setFoto(Array.from(e.target.files))} style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%' }} />📷 Ketuk Ke Kamera / Ambil Gambar Lapangan{foto.length > 0 && <p style={{ fontSize: '11px', color: '#4ade80', margin: '4px 0 0', fontWeight: 700 }}>✅ {foto.length} Foto Siap Dikirim</p>}</div></FormGroup>
      <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }} className="warga-form-actions"><button onClick={submit} style={{ flex: 1, padding: '12px', background: '#166534', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700 }}>{loading ? 'Mengirim transmisi...' : 'Kirim Berkas Aduan'}</button><button onClick={() => setActive('beranda')} style={{ padding: '12px 16px', background: 'transparent', border: `1px solid ${t.cardBorder}`, color: t.textMain, borderRadius: '10px', fontSize: '13px' }}>Batal</button></div>
    </div>
  )
}

function Riwayat({ aduan, loading, onDelete, isDark }) {
  const t = getWargaTheme(isDark)
  const [confirm, setConfirm] = useState(null)
  return (
    <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '20px', padding: '1.25rem' }}>
      <ConfirmDialog open={!!confirm} title="Batalkan Berkas Laporan?" message="Berkas aduan akan dihapus secara permanen dari basis data desa." onConfirm={async()=>{try{await aduanAPI.delete(confirm.id);onDelete()}catch(e){alert(e.message)}finally{setConfirm(null)}}} onCancel={()=>setConfirm(null)} />
      <h2 style={{ fontSize: '16px', fontWeight: 800, color: t.textMain, margin: '0 0 1rem' }}>Rekam Jejak Arsip Pengaduan ({aduan.length})</h2>
      {loading ? <p style={{ fontSize: '12px', color: t.textSub }}>Memuat data arsip...</p> : <AduanTable data={aduan} onDelete={setConfirm} isDark={isDark} />}
    </div>
  )
}

function Notifikasi({ notifs, onReadAll, isDark }) {
  const t = getWargaTheme(isDark)
  return (
    <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '20px', padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}><h2 style={{ fontSize: '15px', fontWeight: 800, color: t.textMain, margin: 0 }}>Kotak Masuk Disposisi</h2>{notifs.some(n=>!n.is_read)&&<button onClick={onReadAll} style={{ background: 'transparent', border: `1px solid ${isDark?'#d4a017':'#166534'}`, color: isDark?'#d4a017':'#166534', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}>Tandai Dibaca</button>}</div>
      {notifs.length === 0 ? <EmptyState message="Belum ada update penanganan berkas" /> : notifs.map(n => (
        <div key={n.id} style={{ display: 'flex', gap: '10px', padding: '10px 0', borderBottom: `1px solid ${t.tdBorder}`, fontSize: '13px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: n.is_read ? 'rgba(255,255,255,0.1)' : '#4ade80', marginTop: '6px' }} /><div><div style={{ color: t.textMain, fontWeight: n.is_read ? 500 : 700 }}>{n.pesan}</div><div style={{ fontSize: '11px', color: t.textSub, marginTop: '3px' }}>{n.created_at?.split('T')[0]}</div></div></div>
      ))}
    </div>
  )
}

function Profil({ user, logout, isDark }) {
  const t = getWargaTheme(isDark)
  return (
    <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '20px', padding: '1.25rem', color: t.textMain }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}><div style={{ width: '48px', height: '48px', borderRadius: '50%', background: isDark?'#02140b':'#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark?'var(--gold)':'#fff', fontWeight: 900, fontSize: '18px' }}>{user?.name?.[0]?.toUpperCase()}</div><div><div style={{ fontSize: '15px', fontWeight: 800 }}>{user?.name}</div><span style={{ fontSize: '10px', padding: '1px 8px', borderRadius: '6px', background: 'rgba(34,197,94,0.15)', color: '#4ade80', fontWeight: 700 }}>PROFIL TERVERIFIKASI KTP</span></div></div>
      {[['Akun Email', user?.email], ['No. Handphone', user?.hp], ['Zonasi Desa', user?.desa], ['RT / RW', `RT ${user?.rt || '00'} / RW ${user?.rw || '00'}`]].map(([l, v]) => (
        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${t.tdBorder}`, fontSize: '13px' }}><span>{l}</span><span style={{ fontWeight: 700 }}>{v || '—'}</span></div>
      ))}
      <button onClick={() => { logout(); window.location.href = '/' }} style={{ width: '100%', marginTop: '1.5rem', padding: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }} className="warga-logout-hp-btn">Keluar Sistem</button>
    </div>
  )
}