import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { Badge, CatBadge, Card, CardTitle, MetricCard, Btn, Alert, EmptyState, ConfirmDialog } from '../components/ui'
import { aduanAPI, userAPI } from '../services/api'
import { LayoutDashboard, Inbox, FileText, Loader2, CheckCircle, Users, Eye, Trash2, XCircle, Check, Sun, Moon, LogOut } from 'lucide-react'

const NAV = [
  { section: 'MENU UTAMA' },
  { key: 'dashboard',   icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
  { key: 'semua-aduan', icon: <Inbox size={16} />,           label: 'Semua Aduan' },
  { key: 'aduan-baru',  icon: <FileText size={16} />,        label: 'Aduan Baru' },
  { key: 'diproses',    icon: <Loader2 size={16} className="ani-spin" />, label: 'Sedang Diproses' },
  { key: 'selesai',     icon: <CheckCircle size={16} />,     label: 'Selesai' },
  { section: 'PENGATURAN' },
  { key: 'akun-warga',  icon: <Users size={16} />,           label: 'Akun Warga' },
]

export default function DashboardAdmin() {
  const [active, setActive] = useState('dashboard')
  const [aduan, setAduan]   = useState([])
  const [stats, setStats]   = useState(null)
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()
  
  const [isDark, setIsDark] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const [aduanRes, statsRes] = await Promise.all([aduanAPI.getAll(), aduanAPI.getStats()])
      setAduan(aduanRes.aduan || [])
      setStats(statsRes)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const updateStatus = async (id, status, extra = {}) => {
    try { await aduanAPI.updateStatus(id, { status, ...extra }); fetchData() }
    catch (e) { alert(e.message) }
  }

  const views = {
    dashboard:   <DashboardView aduan={aduan} stats={stats} setActive={setActive} updateStatus={updateStatus} loading={loading} isDark={isDark} />,
    'semua-aduan': <SemuaAduan aduan={aduan} updateStatus={updateStatus} isDark={isDark} />,
    'aduan-baru': <FilteredAduan title="Aduan Baru" status="Baru" aduan={aduan} updateStatus={updateStatus} isDark={isDark} />,
    diproses:     <FilteredAduan title="Sedang Diproses" status="Diproses" aduan={aduan} updateStatus={updateStatus} isDark={isDark} />,
    selesai:      <FilteredAduan title="Aduan Selesai" status="Selesai" aduan={aduan} updateStatus={updateStatus} isDark={isDark} />,
    'akun-warga': <AkunWarga isDark={isDark} />,
  }

  const mainBg = isDark ? '#02140b' : '#f8fafc'
  const t = getAdminTheme(isDark)

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
          background: isDark ? '#042010' : '#ffffff',
          borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'}`,
          display: 'flex', flexDirection: 'column',
          height: '100%', boxSizing: 'border-box', transition: 'background 0.3s'
        }}>
          <div style={{ padding: '1.5rem 1.25rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: isDark ? 'var(--gold)' : '#166534', color: isDark ? '#042010' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: t.textMain, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.name || 'Sugiyanto, S.IP'}</div>
              <div style={{ fontSize: '11px', color: t.textSub, marginTop: '2px' }}>{user?.jabatan || 'Kasi Pembangunan'}</div>
            </div>
          </div>

          <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
            {NAV.map((n, i) => n.section ? (
              <div key={i} style={{ padding: '14px 0.75rem 6px', fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8', letterSpacing: '1px', fontWeight: 700, textTransform: 'uppercase' }}>{n.section}</div>
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
                <span style={{ flex: 1 }}>{n.label}</span>
                {n.key === 'aduan-baru' && aduan.filter(a => a.status === 'Baru').length > 0 && (
                  <span style={{ background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '99px' }}>
                    {aduan.filter(a => a.status === 'Baru').length}
                  </span>
                )}
              </div>
            ))}
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

const getAdminTheme = (isDark) => ({
  cardBg: isDark ? '#062415' : '#ffffff', 
  cardBorder: isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0',
  textMain: isDark ? '#ffffff' : '#0f172a',
  textSub: isDark ? '#a2bba9' : '#64748b',
  thBg: isDark ? '#02140b' : '#f8fafc',
  thText: isDark ? 'rgba(255,255,255,0.4)' : '#64748b',
  tdBorder: isDark ? 'rgba(255,255,255,0.04)' : '#f1f5f9',
})

function AdminTable({ data, onDetail, onDelete, isDark }) {
  if (!data.length) return <EmptyState />
  const t = getAdminTheme(isDark)

  return (
    <div style={{ overflowX: 'auto', background: t.cardBg, borderRadius: '18px', border: `1px solid ${t.cardBorder}` }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: t.thBg }}>
            {['NO. ADUAN', 'NAMA PELAPOR', 'KATEGORI', 'LOKASI KEJADIAN', 'URGENSI', 'STATUS BERKAS', 'AKSI'].map(h => (
              <th key={h} style={{ padding: '16px 20px', fontWeight: 700, color: t.thText, fontSize: '11px', letterSpacing: '0.5px', borderBottom: `1px solid ${t.cardBorder}` }}>{h}</th>
            ))}
            {onDelete && <th style={{ padding: '16px 20px', fontWeight: 700, color: t.thText, fontSize: '11px', borderBottom: `1px solid ${t.cardBorder}` }}>HAPUS</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(a => (
            <tr key={a.id} className="adm-row-premium" style={{ borderBottom: `1px solid ${t.tdBorder}`, color: t.textMain }}>
              <td style={{ padding: '16px 20px', fontWeight: 800, color: isDark ? 'var(--gold)' : '#166534' }}>{a.nomor}</td>
              <td style={{ padding: '16px 20px', fontWeight: 600 }}>{a.pelapor}</td>
              <td style={{ padding: '16px 20px' }}><CatBadge label={a.kategori} /></td>
              <td style={{ padding: '16px 20px', color: t.textSub }}>{a.lokasi?.split(',')[0] || '-'}</td>
              <td style={{ padding: '16px 20px' }}><Badge type="urgensi" value={a.urgensi} /></td>
              <td style={{ padding: '16px 20px' }}><Badge value={a.status} /></td>
              <td style={{ padding: '16px 20px' }}>
                <button onClick={() => onDetail(a)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9', color: t.textMain, border: `1px solid ${t.cardBorder}`, padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  <Eye size={13} /> Periksa
                </button>
              </td>
              {onDelete && (
                <td style={{ padding: '16px 20px' }}>
                  <button onClick={() => onDelete(a)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Trash2 size={13} /> Hapus
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .adm-row-premium:hover { background: ${isDark ? 'rgba(255,255,255,0.015)' : '#f8fafc'} !important; }
        .ws-btn-theme-desktop:hover { background: ${isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'} !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .ani-spin { animation: spin 2s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

function DetailAduan({ aduan, onClose, updateStatus, isDark }) {
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)
  const t = getAdminTheme(isDark)

  useEffect(() => {
    setLoading(true)
    import('../services/api').then(({ aduanAPI }) =>
      aduanAPI.getOne(aduan.id)
        .then(setDetail)
        .catch(() => setDetail(null))
        .finally(() => setLoading(false))
    )
  }, [aduan.id])

  const rows = [
    ['Nama Pelapor', aduan.pelapor],
    ['Kategori Masalah', aduan.kategori],
    ['Lokasi Presisi', aduan.lokasi || '-'],
    ['Patokan Wilayah', aduan.patokan || '-'],
    ['Waktu Pelaporan', new Date(aduan.created_at).toLocaleString('id-ID')],
  ]

  return (
    <>
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <img src={lightbox} alt="Bukti riil" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '12px', objectFit: 'contain' }} />
        </div>
      )}

      <Card style={{ border: `1px solid ${isDark ? 'rgba(74,222,128,0.2)' : 'var(--green-pale)'}`, marginTop: '1.5rem', background: t.cardBg, padding: '1.5rem', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '16px', fontWeight: 800, color: t.textMain }}>Pemeriksaan Berkas — {aduan.nomor}</span>
          <Btn variant="ghost" size="sm" onClick={onClose} style={{ color: '#ef4444' }}>✕ Tutup</Btn>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '1.5rem', color: t.textMain }}>
          {rows.map(([lbl, val]) => (
            <div key={lbl} style={{ background: isDark ? '#02140b' : '#f8fafc', padding: '10px 14px', borderRadius: '12px', border: `1px solid ${t.cardBorder}` }}>
              <div style={{ color: t.textSub, fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>{lbl}</div>
              <div style={{ fontWeight: 700 }}>{val}</div>
            </div>
          ))}
          <div style={{ background: isDark ? '#02140b' : '#f8fafc', padding: '10px 14px', borderRadius: '12px', border: `1px solid ${t.cardBorder}` }}>
            <div style={{ color: t.textSub, fontSize: '10px', fontWeight: 700, marginBottom: '4px' }}>TINGKAT URGENSI</div>
            <Badge type="urgensi" value={aduan.urgensi} />
          </div>
        </div>

        <div style={{ background: isDark ? '#02140b' : '#f8fffe', border: `1px solid ${t.cardBorder}`, borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ color: t.textSub, fontSize: '10px', fontWeight: 700, marginBottom: '8px' }}>DESKRIPSI KRONOLOGI LENGKAP</div>
          <p style={{ fontSize: '13.5px', color: t.textMain, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{aduan.deskripsi}</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ color: t.textSub, fontSize: '10px', fontWeight: 700, marginBottom: '10px' }}>LAMPIRAN FOTO BUKTI LAPANGAN</div>
          {loading ? <p style={{ fontSize: '12px', color: t.textSub }}>Sinkronisasi media berkas...</p> : (
            detail?.foto?.length > 0 ? (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {detail.foto.map((f, i) => (
                  <div key={i} onClick={() => setLightbox(`http://localhost:5000${f.url}`)} style={{ position: 'relative', cursor: 'zoom-in', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${t.cardBorder}` }}>
                    <img src={`http://localhost:5000${f.url}`} alt="Bukti" style={{ width: '140px', height: '105px', objectFit: 'cover', display: 'block' }} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: isDark ? '#02140b' : '#f1f5f9', borderRadius: '12px', padding: '14px', textAlign: 'center', fontSize: '12.5px', color: t.textSub }}>📷 Tidak ada lampiran media riil dalam aduan ini</div>
            )
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', paddingTop: '1.25rem', borderTop: `1px solid ${t.tdBorder}` }}>
          {aduan.status === 'Baru' && (
            <><button onClick={() => { updateStatus(aduan.id, 'Diproses'); onClose() }} style={{ background: '#166534', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14}/> Proses Aduan</button>
            <button onClick={() => { updateStatus(aduan.id, 'Ditolak'); onClose() }} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}><XCircle size={14}/> Tolak</button></>
          )}
          {aduan.status === 'Diproses' && (
            <><button onClick={() => { updateStatus(aduan.id, 'Selesai'); onClose() }} style={{ background: '#d4a017', color: '#042010', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>✓ Rampungkan Berkas</button>
            <button onClick={() => { updateStatus(aduan.id, 'Ditolak'); onClose() }} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 16px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>✕ Batalkan</button></>
          )}
          {(aduan.status === 'Selesai' || aduan.status === 'Ditolak') && (
            <span style={{ fontSize: '13px', color: t.textSub, fontWeight: 600, fontStyle: 'italic' }}>Berkas aduan ini telah bersifat arsip tertutup ({aduan.status.toLowerCase()})</span>
          )}
        </div>
      </Card>
    </>
  )
}

function DashboardView({ aduan, stats, setActive, updateStatus, loading, isDark }) {
  const detailState = useState(null)
  const [detail, setDetail] = detailState
  const t = getAdminTheme(isDark)

  const cardBoxStyle = (variant) => {
    const isDefault = variant === 'default';
    return {
      background: isDark 
        ? (isDefault ? '#062415' : 'linear-gradient(135deg, #062415, #02140b)') 
        : (isDefault ? '#ffffff' : 'linear-gradient(135deg, #ffffff, #f0fdf4)'),
      border: isDark 
        ? `1px solid ${isDefault ? 'rgba(255,255,255,0.05)' : 'rgba(74,222,128,0.15)'}` 
        : `1px solid ${isDefault ? '#e2e8f0' : '#bbf7d0'}`,
      padding: '1.5rem 1.25rem',
      borderRadius: '20px',
      boxShadow: isDark ? 'none' : '0 4px 20px -2px rgba(22,101,52,0.02)',
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
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: t.textMain, margin: 0, letterSpacing: '-0.5px', transition: 'color 0.3s' }}>
            Dashboard Analitik Wilayah
          </h1>
          <p style={{ fontSize: '13.5px', color: t.textSub, marginTop: '6px', transition: 'color 0.3s', margin: '4px 0 0' }}>
            Laporan pengaduan masuk — Mei 2026
          </p>
        </div>
        <div style={{ fontSize: '11px', fontWeight: 700, background: isDark ? 'rgba(74,222,128,0.1)' : '#dcfce7', color: isDark ? '#4ade80' : '#15803d', padding: '4px 10px', borderRadius: '8px' }}>
          Portal Admin
        </div>
      </div>

      {loading ? (
        <p style={{ fontSize: '13px', color: t.textSub }}>Sinkronisasi panel data...</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '2rem' }} className="warga-metric-grid">
            <div style={cardBoxStyle('premium')}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: isDark ? '#4ade80' : '#166534', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Total Masuk</div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: t.textMain, marginTop: '6px', fontFamily: 'var(--font-display)' }}>{stats?.total || 0}</div>
            </div>

            <div style={cardBoxStyle('default')}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: isDark ? '#f87171' : '#dc2626', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Aduan Baru</div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: isDark ? '#f87171' : '#dc2626', marginTop: '6px', fontFamily: 'var(--font-display)' }}>{stats?.baru || 0}</div>
            </div>

            <div style={cardBoxStyle('default')}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: isDark ? '#fbbf24' : '#b45309', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Dalam Proses</div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: isDark ? '#fbbf24' : '#d97706', marginTop: '6px', fontFamily: 'var(--font-display)' }}>{stats?.proses || 0}</div>
            </div>

            <div style={cardBoxStyle('default')}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: isDark ? '#4ade80' : '#15803d', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Tuntas</div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: isDark ? '#4ade80' : '#166534', marginTop: '6px', fontFamily: 'var(--font-display)' }}>{stats?.selesai || 0}</div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: t.textMain, margin: 0 }}>Arus Masuk Berkas Terbaru</h2>
              <button onClick={() => setActive('semua-aduan')} style={{ background: 'transparent', border: `1px solid ${t.cardBorder}`, color: t.textMain, padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Buka Semua Berkas</button>
            </div>
            <AdminTable data={aduan.slice(0, 5)} onDetail={a => setDetail(detail?.id === a.id ? null : a)} isDark={isDark} />
          </div>

          {detail && <DetailAduan aduan={detail} onClose={() => setDetail(null)} updateStatus={updateStatus} isDark={isDark} />}

          {stats?.per_kategori?.length > 0 && (
            <Card style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, padding: '1.5rem', borderRadius: '24px' }}>
              <CardTitle><span style={{ color: t.textMain }}>Volume Pengaduan Per Kategori</span></CardTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '12px', marginTop: '1rem' }}>
                {stats.per_kategori.map(k => (
                  <div key={k.kategori} style={{ textAlign: 'center', padding: '14px', background: isDark ? '#02140b' : '#f8fafc', borderRadius: '14px', border: `1px solid ${t.cardBorder}` }}>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: isDark ? 'var(--gold)' : '#166534' }}>{k.total}</div>
                    <div style={{ fontSize: '12px', color: t.textMain, fontWeight: 600, marginTop: '4px' }}>{k.kategori}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  )
}

function SemuaAduan({ aduan, updateStatus, isDark }) {
  const [filter, setFilter] = useState('Semua')
  const [detail, setDetail] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const t = getAdminTheme(isDark)
  const filtered = filter === 'Semua' ? aduan : aduan.filter(a => a.status === filter)

  const handleDelete = async () => {
    try {
      await import('../services/api').then(({ aduanAPI }) => aduanAPI.delete(confirm.id))
      updateStatus(confirm.id, '__deleted__')
      setConfirm(null)
      setDetail(null)
    } catch (e) { alert(e.message); setConfirm(null) }
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <ConfirmDialog open={!!confirm} title="Hapus Berkas?" message={`Aduan "${confirm?.judul}" akan dihapus permanen dari sistem.`} onConfirm={handleDelete} onCancel={() => setConfirm(null)} />
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '20px', fontWeight: 900, color: isDark ? 'var(--gold)' : '#166534', letterSpacing: '-0.75px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-display), sans-serif' }}>
          SAPA DESA
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: t.textMain }}>Pusat Arsip aduan</h1>
        <p style={{ fontSize: '13.5px', color: t.textSub, marginTop: '4px' }}>Penyaringan berkas aduan wilayah hukum kelurahan</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {['Semua','Baru','Diproses','Selesai','Ditolak'].map(s => {
          const isAct = filter === s
          return (
            <button key={s} onClick={() => setFilter(s)} style={{ padding: '8px 16px', borderRadius: '99px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', background: isAct ? (isDark ? 'var(--gold)' : '#166534') : t.cardBg, color: isAct ? '#042010' : t.textMain, border: `1px solid ${isAct ? 'transparent' : t.cardBorder}`, transition: 'all 0.15s' }}>{s}</button>
          )
        })}
      </div>

      <AdminTable data={filtered} onDetail={a => setDetail(detail?.id === a.id ? null : a)} onDelete={setConfirm} isDark={isDark} />
      {detail && <DetailAduan aduan={detail} onClose={() => setDetail(null)} updateStatus={updateStatus} isDark={isDark} />}
    </div>
  )
}

function FilteredAduan({ title, status, aduan, updateStatus, isDark }) {
  const [detail, setDetail] = useState(null)
  const t = getAdminTheme(isDark)
  const filtered = aduan.filter(a => a.status === status)
  
  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '20px', fontWeight: 900, color: isDark ? 'var(--gold)' : '#166534', letterSpacing: '-0.75px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-display), sans-serif' }}>
          SAPA DESA
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: t.textMain }}>{title}</h1>
        <p style={{ fontSize: '13.5px', color: t.textSub, marginTop: '4px' }}>Ditemukan {filtered.length} laporan dengan status penanganan</p>
      </div>

      {status === 'Selesai' && filtered.length > 0 && <Alert variant="success">Kerja bagus! {filtered.length} laporan warga berhasil tuntas dieksekusi lapangan.</Alert>}
      
      <AdminTable data={filtered} onDetail={a => setDetail(detail?.id === a.id ? null : a)} isDark={isDark} />
      {detail && <DetailAduan aduan={detail} onClose={() => setDetail(null)} updateStatus={updateStatus} isDark={isDark} />}
    </div>
  )
}

function AkunWarga({ isDark }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const t = getAdminTheme(isDark)

  useEffect(() => {
    userAPI.getAll({ role: 'warga' }).then(setUsers).catch(console.error).finally(() => setLoading(false))
  }, [])

  const toggle = async (id) => {
    try { await userAPI.toggleActive(id); setUsers(u => u.map(x => x.id === id ? { ...x, is_active: x.is_active ? 0 : 1 } : x)) }
    catch (e) { alert(e.message) }
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '20px', fontWeight: 900, color: isDark ? 'var(--gold)' : '#166534', letterSpacing: '-0.75px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-display), sans-serif' }}>
          SAPA DESA
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: t.textMain }}>Manajemen Verifikasi Penduduk</h1>
        <p style={{ fontSize: '13.5px', color: t.textSub, marginTop: '4px' }}>Kontrol hak akses masuk aplikasi untuk masyarakat</p>
      </div>

      <div style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: t.thBg }}>
              {['NAMA PENDUDUK', 'ALAMAT EMAIL', 'ZONASI DOMISILI', 'TOTAL LAPORAN', 'STATUS AKUN', 'AKSI'].map(h => (
                <th key={h} style={{ padding: '16px 20px', fontWeight: 700, color: t.thText, fontSize: '11px', borderBottom: `1px solid ${t.cardBorder}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={6} style={{ padding: '20px', textAlign: 'center', color: t.textSub }}>Sinkronisasi tabel warga...</td></tr> : (
              users.map(u => (
                <tr key={u.id} className="adm-row-premium" style={{ borderBottom: `1px solid ${t.tdBorder}`, color: t.textMain }}>
                  <td style={{ padding: '16px 20px', fontWeight: 700 }}>{u.name}</td>
                  <td style={{ padding: '16px 20px', color: t.textSub }}>{u.email}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}><span style={{ color: isDark ? 'var(--gold)' : '#166534' }}>📍</span> {u.desa ? `${u.desa}, RT ${u.rt}` : '-'}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 800, textAlign: 'center', width: '130px' }}>{u.total_aduan} Berkas</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ background: u.is_active ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', color: u.is_active ? '#22c55e' : '#ef4444', fontSize: '11px', padding: '4px 10px', borderRadius: '8px', fontWeight: 700 }}>{u.is_active ? 'AKTIF' : 'NONAKTIF'}</span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <button onClick={() => toggle(u.id)} style={{ background: u.is_active ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: 'none', color: u.is_active ? '#ef4444' : '#22c55e', padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                      {u.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}