import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWilayah } from '../hooks/useWilayah'
import { MapPin, Camera, Bell, LayoutDashboard, Eye, EyeOff, Mail, Lock } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [tab, setTab]       = useState('masuk')
  const [email, setEmail]   = useState('')
  const [pass, setPass]     = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const doLogin = async () => {
    if (!email || !pass) { setError('Email dan password wajib diisi.'); return }
    setLoading(true); setError('')
    try {
      const user = await login(email, pass)
      navigate(user.role === 'admin' || user.role === 'superadmin' ? '/dashboard/admin' : '/dashboard/warga')
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="login-container" style={{ minHeight: '100vh', display: 'grid', background: '#ffffff' }}>

      <div className="desktop-info-panel" style={{ background: 'linear-gradient(160deg, #042010 0%, #0f4223 55%, #166534 100%)', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,.06) 0%, transparent 70%)', top: '-150px', right: '-150px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,.05) 0%, transparent 70%)', bottom: '-80px', left: '-80px', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '380px', width: '100%' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: '#fff', fontWeight: 800, marginBottom: '14px', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
            Suara Warga,<br /><span style={{ color: '#d4a017' }}>Desa Bergerak</span>
          </h1>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.6)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Platform pengaduan masyarakat desa yang transparan, cepat, dan terintegrasi penuh dengan aparatur wilayah.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {[
              { icon: <MapPin size={16} />, text: 'Lapor masalah infrastruktur desa' },
              { icon: <Camera size={16} />, text: 'Upload foto valid sebagai bukti' },
              { icon: <Bell size={16} />, text: 'Notifikasi perkembangan real-time' },
              { icon: <LayoutDashboard size={16} />, text: 'Dashboard transparansi publik' }
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                  {f.icon}
                </div>
                <span style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.75)', fontWeight: 500 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', background: '#fff', overflowY: 'auto' }} className="form-scroll-panel">
       
        <div className="mobile-header-branding" style={{ background: 'linear-gradient(135deg, #042010 0%, #0f4223 100%)', padding: '2.5rem 1.5rem 3rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,.08) 0%, transparent 70%)', top: '-60px', right: '-40px', pointerEvents: 'none' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
            Suara Warga
          </h1>
          <p style={{ fontSize: '12px', color: '#d4a017', fontWeight: 600, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Desa Bergerak & Transparan
          </p>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }} className="form-inner-wrapper">
          <div style={{ width: '100%', maxWidth: '380px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '4px', letterSpacing: '-0.5px' }} className="form-title">
              {tab === 'masuk' ? 'Selamat datang kembali' : 'Buat akun baru'}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '1.75rem' }} className="form-subtitle">
              {tab === 'masuk' ? 'Masuk untuk memantau perkembangan berkas' : 'Daftar sebagai warga desa resmi'}
            </p>

            <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '4px', marginBottom: '1.5rem' }}>
              {['masuk', 'daftar'].map(t => (
                <button key={t} onClick={() => { setTab(t); setError('') }} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '9px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: tab === t ? 700 : 500, background: tab === t ? '#fff' : 'transparent', color: tab === t ? '#0f172a' : '#64748b', boxShadow: tab === t ? '0 2px 8px rgba(0,0,0,.04)' : 'none', transition: 'all .2s' }}>
                  {t === 'masuk' ? 'Masuk' : 'Registrasi'}
                </button>
              ))}
            </div>

            {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 14px', borderRadius: '12px', fontSize: '13px', marginBottom: '1.25rem', fontWeight: 500 }}>{error}</div>}

            {tab === 'masuk' ? (
              <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                <Field label="Alamat Email Resmi">
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}><Mail size={16} /></span>
                    <input type="email" placeholder="contoh: warga@email.com" value={email} onChange={e => { setEmail(e.target.value); setError('') }} style={{ ...inp, paddingLeft: '42px' }} className="login-input" />
                  </div>
                </Field>
                
                <Field label="Kata Sandi Akun">
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}><Lock size={16} /></span>
                    <input type={showPass ? 'text' : 'password'} placeholder="Masukkan kata sandi" value={pass} onChange={e => { setPass(e.target.value); setError('') }} onKeyDown={e => e.key === 'Enter' && doLogin()} style={{ ...inp, paddingLeft: '42px', paddingRight: '44px' }} className="login-input" />
                    <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', padding: '6px' }}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>
                
                <SubmitBtn loading={loading} onClick={doLogin}>Autentikasi Masuk →</SubmitBtn>
                
                <div style={{ marginTop: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                    Belum punya akun warga? <span style={{ color: '#166534', fontWeight: 700, cursor: 'pointer' }} onClick={() => setTab('daftar')}>Daftar Sekarang</span>
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                    Aparatur Pemerintah? <span style={{ color: '#166534', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/admin/login')}>Masuk via Portal Admin</span>
                  </p>
                </div>
              </div>
            ) : (
              <RegisterForm setError={setError} loading={loading} setLoading={setLoading} register={register} navigate={navigate} />
            )}
          </div>
        </div>
      </div>
      

    </div>
  )
}

function RegisterForm({ setError, loading, setLoading, register, navigate }) {
  const [form, setForm] = useState({ nik: '', no_kk: '', name: '', email: '', password: '', hp: '', provinsi: '', provinsi_id: '', kabupaten: '', kabupaten_id: '', kecamatan: '', kecamatan_id: '', desa: '', dusun: '', rt: '', rw: '' })
  const set    = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const setNum = k => e => setForm(f => ({ ...f, [k]: e.target.value.replace(/\D/g, '') }))
  const { provinsi, kabupaten, kecamatan, desa, fetchKabupaten, fetchKecamatan, fetchDesa, loadingKab, loadingKec, loadingDes } = useWilayah()

  const doRegister = async () => {
    if (!form.nik || form.nik.length !== 16) { setError('NIK wajib 16 digit sesuai KTP.'); return }
    if (!form.no_kk || form.no_kk.length !== 16) { setError('No. KK wajib 16 digit sesuai berkas KK.'); return }
    if (!form.name || !form.email || !form.password) { setError('Nama, email, dan password wajib diisi.'); return }
    if (form.password.length < 6) { setError('Password minimal 6 karakter demi keamanan akun.'); return }
    if (!form.provinsi) { setError('Pilih wilayah provinsi terlebih dahulu.'); return }
    setLoading(true); setError('')
    try {
      await register({ ...form, role: 'warga' })
      navigate('/dashboard/warga')
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <Field label="Nomor Induk Kependudukan (NIK)" hint={`${form.nik.length}/16`} ok={form.nik.length===16}>
        <input style={inp} className="login-input" type="text" maxLength={16} placeholder="16 digit angka NIK KTP" value={form.nik} onChange={setNum('nik')} />
      </Field>
      <Field label="Nomor Kartu Keluarga (KK)" hint={`${form.no_kk.length}/16`} ok={form.no_kk.length===16}>
        <input style={inp} className="login-input" type="text" maxLength={16} placeholder="16 digit nomor KK" value={form.no_kk} onChange={setNum('no_kk')} />
      </Field>
      <Grid2>
        <Field label="Nama Lengkap KTP"><input style={inp} className="login-input" type="text" placeholder="Nama lengkap" value={form.name} onChange={set('name')} /></Field>
        <Field label="Email Aktif"><input style={inp} className="login-input" type="email" placeholder="warga@email.com" value={form.email} onChange={set('email')} /></Field>
      </Grid2>
      <Grid2>
        <Field label="Nomor HP"><input style={inp} className="login-input" type="tel" placeholder="08xxxxxxxx" value={form.hp} onChange={set('hp')} /></Field>
        <Field label="Kata Sandi Baru"><input style={inp} className="login-input" type="password" placeholder="Min. 6 karakter" value={form.password} onChange={set('password')} /></Field>
      </Grid2>
      
      <Divider label="LOKASI DOMISILI WILAYAH" />
      
      <Field label="Provinsi">
        <select style={sel} className="login-input" value={form.provinsi_id} onChange={e => { const o=e.target.options[e.target.selectedIndex]; setForm(f=>({...f,provinsi_id:e.target.value,provinsi:o.text,kabupaten:'',kabupaten_id:'',kecamatan:'',kecamatan_id:'',desa:''})); fetchKabupaten(e.target.value) }}>
          <option value="">-- Pilih Provinsi --</option>
          {provinsi.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </Field>
      <Grid2>
        <Field label="Kabupaten / Kota">
          <select style={sel} className="login-input" disabled={!form.provinsi_id||loadingKab} value={form.kabupaten_id} onChange={e => { const o=e.target.options[e.target.selectedIndex]; setForm(f=>({...f,kabupaten_id:e.target.value,kabupaten:o.text,kecamatan:'',kecamatan_id:'',desa:''})); fetchKecamatan(e.target.value) }}>
            <option value="">{loadingKab?'Memuat...':'-- Pilih --'}</option>
            {kabupaten.map(k=><option key={k.id} value={k.id}>{k.name}</option>)}
          </select>
        </Field>
        <Field label="Kecamatan">
          <select style={sel} className="login-input" disabled={!form.kabupaten_id||loadingKec} value={form.kecamatan_id} onChange={e => { const o=e.target.options[e.target.selectedIndex]; setForm(f=>({...f,kecamatan_id:e.target.value,kecamatan:o.text,desa:''})); fetchDesa(e.target.value) }}>
            <option value="">{loadingKec?'Memuat...':'-- Pilih --'}</option>
            {kecamatan.map(k=><option key={k.id} value={k.id}>{k.name}</option>)}
          </select>
        </Field>
      </Grid2>
      <Grid2>
        <Field label="Desa / Kelurahan">
          <select style={sel} className="login-input" disabled={!form.kecamatan_id||loadingDes} value={form.desa} onChange={e=>setForm(f=>({...f,desa:e.target.options[e.target.selectedIndex].text}))}>
            <option value="">{loadingDes?'Memuat...':'-- Pilih --'}</option>
            {desa.map(d=><option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </Field>
        <Field label="Nama Dusun"><input style={inp} className="login-input" type="text" placeholder="Nama dusun" value={form.dusun} onChange={set('dusun')} /></Field>
      </Grid2>
      <Grid2>
        <Field label="RT"><input style={inp} className="login-input" type="text" placeholder="001" value={form.rt} onChange={set('rt')} /></Field>
        <Field label="RW"><input style={inp} className="login-input" type="text" placeholder="004" value={form.rw} onChange={set('rw')} /></Field>
      </Grid2>
      <SubmitBtn loading={loading} onClick={doRegister}>Daftarkan Akun Kependudukan →</SubmitBtn>
    </div>
  )
}

const inp = { width:'100%', padding:'12px 14px', background:'#fff', border:'1px solid #e2e8f0', borderRadius:'12px', fontSize:'13.5px', color:'#0f172a', outline:'none', fontFamily:'inherit', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', boxSizing:'border-box' }
const sel = { ...inp, cursor:'pointer' }

function Field({ label, children, hint, ok }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
        <label style={{ fontSize:'12px', fontWeight:600, color:'#475569' }}>{label}</label>
        {hint && <span style={{ fontSize:'10.5px', color: ok ? '#166534' : '#94a3b8', fontWeight: ok ? 700 : 500 }}>{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function Grid2({ children }) {
  return <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:'10px' }}>{children}</div>
}

function Divider({ label }) {
  return <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px', margin: '20px 0 12px', display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />{label}<div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} /></div>
}

function SubmitBtn({ children, loading, onClick }) {
  const [h, setH] = useState(false)
  return (
    <button onClick={onClick} disabled={loading} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ width:'100%', padding:'14px', background: h ? '#0f4223' : '#166534', color:'#fff', border:'none', borderRadius:'12px', fontSize: '14px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily:'inherit', transition:'all .2s ease', opacity: loading ? .7 : 1, marginTop:'8px', boxShadow: h ? '0 8px 24px rgba(22,101,52,.25)' : 'none', transform: h ? 'translateY(-1px)' : 'none' }}>
      {loading ? 'Sedang Memproses Verifikasi...' : children}
    </button>
  )
}