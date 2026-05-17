import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ShieldCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function LoginAdmin() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const doLogin = async () => {
    if (!email || !pass) { setError('Email dan password wajib diisi.'); return }
    setLoading(true); setError('')
    try {
      const user = await login(email, pass)
      if (user.role !== 'admin' && user.role !== 'superadmin') {
        setError('Akses Ditolak: Anda bukan perangkat desa berotoritas.')
        return
      }
      navigate('/dashboard/admin')
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #02140b 0%, #042010 100%)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      padding: '2rem', position: 'relative', overflow: 'hidden' 
    }}>
      
      <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)', top: '-150px', right: '-150px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)', bottom: '-150px', left: '-150px', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1, animation: 'fadeIn 0.5s ease-out' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <ShieldCheck size={28} color="#d4a017" strokeWidth={2} />
            <span style={{ fontSize: '24px', fontWeight: 950, color: '#ffffff', letterSpacing: '-0.75px', fontFamily: 'var(--font-display), sans-serif', textTransform: 'uppercase' }}>
              SAPA DESA
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '6px', letterSpacing: '-0.5px' }}>Portal Otoritas Admin</h1>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.5)' }}>Masukkan kredensial perangkat desa Anda.</p>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.08)', 
          borderRadius: '24px', 
          padding: '2.5rem', 
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
        }}>
          
          {error && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '20px', lineHeight: 1.4 }}>
              <span style={{ marginTop: '2px' }}>⚠️</span> {error}
            </div>
          )}

          {/* Input Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: '8px', letterSpacing: '0.5px' }}>ALAMAT EMAIL RESMI</label>
            <input
              type="email"
              placeholder="email@desa.id"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              style={{ 
                width: '100%', padding: '14px 16px', background: 'rgba(0,0,0,0.2)', 
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', 
                fontSize: '14px', color: '#fff', outline: 'none', fontFamily: 'inherit',
                transition: 'all 0.2s', boxSizing: 'border-box'
              }}
              onFocus={e => { e.target.style.borderColor = '#d4a017'; e.target.style.boxShadow = '0 0 0 4px rgba(212,160,23,0.1)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Input Password */}
          <div style={{ marginBottom: '28px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.5px' }}>KATA SANDI</label>
            </div>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              value={pass}
              onChange={e => { setPass(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && doLogin()}
              style={{ 
                width: '100%', padding: '14px 44px 14px 16px', background: 'rgba(0,0,0,0.2)', 
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', 
                fontSize: '14px', color: '#fff', outline: 'none', fontFamily: 'inherit',
                transition: 'all 0.2s', boxSizing: 'border-box'
              }}
              onFocus={e => { e.target.style.borderColor = '#d4a017'; e.target.style.boxShadow = '0 0 0 4px rgba(212,160,23,0.1)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none' }}
            />
            <button 
              onClick={() => setShowPass(!showPass)} 
              style={{ position: 'absolute', right: '12px', bottom: '12px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            onClick={doLogin}
            disabled={loading}
            style={{ 
              width: '100%', padding: '14px', background: loading ? 'rgba(212,160,23,0.5)' : '#d4a017', 
              color: '#02140b', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 800, 
              cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 14px rgba(212,160,23,0.25)'
            }}
            onMouseEnter={e => { if(!loading) e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { if(!loading) e.currentTarget.style.transform = 'none' }}
          >
            {loading ? 'Memverifikasi Akses...' : 'Masuk ke Dashboard'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            onClick={() => navigate('/')}
            style={{ 
              background: 'transparent', border: 'none', fontSize: '13px', fontWeight: 600, 
              color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: '6px'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.transform = 'none' }}
          >
            <ArrowLeft size={14} /> Kembali ke Portal Warga
          </button>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}