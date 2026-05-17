import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Camera, Zap, ShieldCheck, ArrowRight } from 'lucide-react'

const CONFIG = {
  heroBg: '/image/1.jpg',
  galeri: [
    { foto: '/image/sawah.jpeg', title: 'Potensi Alam',    desc: 'Sawah dan alam asri kebanggaan warga desa.',        bg: '#0f4223', icon: '🌾' },
    { foto: '/image/rukun.jpg', title: 'Komunitas Warga', desc: 'Kebersamaan warga jadi kekuatan membangun desa.',   bg: '#92400e', icon: '🤝' },
    { foto: '/image/infrastruktur.jpg', title: 'Infrastruktur',   desc: 'Jalan, jembatan, dan fasilitas desa yang memadai.', bg: '#1e3a5f', icon: '🛣️' },
    { foto: '/image/balaidesa.jpg', title: 'Pemerintahan',    desc: 'Perangkat desa siap melayani setiap aduan warga.',  bg: '#3b0764', icon: '🏛️' },
  ]
}

const FEATURES = [
  { 
    icon: <Send size={28} strokeWidth={1.5} color="#0f4223" />, 
    bg: '#ecfdf5', 
    title: 'Lapor Langsung',  
    desc: 'Kirim aduan dari HP atau laptop kapan pun dan di mana pun dengan sistem yang terintegrasi.' 
  },
  { 
    icon: <Camera size={28} strokeWidth={1.5} color="#0f4223" />, 
    bg: '#ecfdf5', 
    title: 'Bukti Visual',      
    desc: 'Lampirkan foto sebagai bukti autentik agar aduan diproses dengan data lapangan yang akurat.' 
  },
  { 
    icon: <Zap size={28} strokeWidth={1.5} color="#d4a017" />, 
    bg: '#fffbeb', 
    title: 'Respons Terukur',   
    desc: 'Sistem memastikan perangkat desa merespons dalam waktu kurang dari 72 jam secara transparan.' 
  },
  { 
    icon: <ShieldCheck size={28} strokeWidth={1.5} color="#0f4223" />, 
    bg: '#ecfdf5', 
    title: 'Keamanan Identitas',  
    desc: 'Privasi warga terlindungi sepenuhnya dengan enkripsi data and opsi pelaporan anonim.' 
  },
]

const STEPS = [
  { n: '01', t: 'Daftar & Login',  d: 'Buat akun pakai NIK + data wilayah, login, siap.' },
  { n: '02', t: 'Pilih Masalah',   d: 'Pilih kategori: jalan rusak, PJU, sanitasi, dll.' },
  { n: '03', t: 'Isi + Upload',    d: 'Deskripsi masalah, patokan lokasi, upload foto.' },
  { n: '04', t: 'Kirim & Pantau',  d: 'Aduan masuk ke pemdes. Track status realtime.' },
]

export default function Home() {
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const [vis, setVis]         = useState(new Set())

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setVis(s => new Set([...s, e.target.id])) }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-anim]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const nav = scrollY > 40

  return (
    <div style={{ background: '#fff' }}>

      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10000, 
        height: '76px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        background: nav ? 'rgba(4, 32, 16, 0.95)' : 'transparent', 
        backdropFilter: nav ? 'blur(16px)' : 'none', 
        WebkitBackdropFilter: nav ? 'blur(16px)' : 'none',
        borderBottom: nav ? '1px solid rgba(255,255,255,0.08)' : 'none', 
        boxShadow: nav ? '0 8px 32px 0 rgba(0, 0, 0, 0.15)' : 'none', 
        transition: 'all 0.3s ease',
        boxSizing: 'border-box'
      }} className="main-navbar-engine">

        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{
            fontSize: '20px',
            fontWeight: 950,
            color: '#ffffff',
            letterSpacing: '-0.75px',
            fontFamily: 'var(--font-display), sans-serif',
            textTransform: 'uppercase'
          }}>
            SAPA DESA
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }} className="nav-links-desktop-group">
          {['Fitur','Cara Pakai'].map((lbl, i) => (
            <span key={lbl} onClick={() => document.getElementById(i === 0 ? 'fitur' : 'cara')?.scrollIntoView({ behavior: 'smooth' })} style={{ fontSize: '13.5px', fontWeight: 600, color: 'rgba(255, 251, 235, 0.8)', cursor: 'pointer', padding: '8px 14px', borderRadius: '10px', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#d4a017'} onMouseLeave={e => e.currentTarget.style.color='rgba(255, 251, 235, 0.8)'}>{lbl}</span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="nav-action-buttons-wrapper">
          <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '9px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>Masuk</button>
          <button onClick={() => navigate('/login')} style={{ background: '#ffffff', border: 'none', color: '#042010', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }} onMouseEnter={e => e.currentTarget.style.transform='translateY(-1px)'} onMouseLeave={e => e.currentTarget.style.transform='none'}>Daftar</button>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            .main-navbar-engine { padding: 0 4rem !important; }
            .nav-links-desktop-group { display: flex !important; }
          }
          @media (max-width: 1023px) {
            .main-navbar-engine { padding: 0 1.25rem !important; height: 72px !important; }
            .nav-links-desktop-group { display: none !important; }
          }
        `}</style>
      </nav>

      <section style={{ 
        minHeight: '100vh', 
        background: CONFIG.heroBg ? `linear-gradient(rgba(4,32,16,0.7), rgba(4,32,16,0.6)), url(${CONFIG.heroBg}) center/cover` : 'linear-gradient(150deg,#042010 0%,#0f4223 45%,#166534 80%)', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', 
        padding: 'clamp(95px, 16vw, 140px) 1.25rem 4rem', 
        position: 'relative', overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', top: '-150px', right: '-100px' }} />
          <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.05) 0%, transparent 70%)', bottom: '-100px', left: '-100px' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', padding: '6px 14px', borderRadius: '99px', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Platform Pengaduan Desa Digital</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(34px, 5.5vw, 62px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '18px' }}>
            Laporkan Masalah<br />
            <span style={{ color: '#d4a017', fontStyle: 'italic' }}>Desa Kamu</span> Sekarang
          </h1>

          <p style={{ fontSize: 'clamp(13.5px, 2vw, 16px)', color: 'rgba(255, 251, 235, 0.85)', maxWidth: '520px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Jalan rusak, PJU mati, sanitasi buruk — lapor langsung ke pemerintah desa. Transparan, cepat, dan bisa dipantau real-time.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: '44px' }}>
            <button onClick={() => navigate('/login')} style={{ padding: '14px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, background: '#ffffff', color: '#042010', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(0,0,0,0.15)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform='none'}>Mulai Lapor →</button>
            <button onClick={() => document.getElementById('cara')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '14px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer' }}>Cara Kerja</button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            background: 'rgba(255,255,255,0.06)', 
            border: '1px solid rgba(255,255,255,0.12)', 
            borderRadius: '20px',
            overflow: 'hidden'
          }} className="hero-stats-grid-wrapper">
            {[
              { v: '1.247+', l: 'Aduan Selesai' },
              { v: '34',     l: 'Provinsi Live' },
              { v: '96%',    l: 'Tingkat Kepuasan' },
              { v: '<72 jam', l: 'Respons Cepat' }
            ].map((st, idx) => (
              <div key={idx} style={{ padding: '16px 12px', textAlign: 'center', borderRight: idx < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }} className="stat-box-cell">
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>{st.v}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255, 251, 235, 0.7)', marginTop: '4px', fontWeight: 500 }}>{st.l}</div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .hero-stats-grid-wrapper { grid-template-columns: repeat(2, 1fr) !important; }
            .stat-box-cell { border-bottom: 1px solid rgba(255,255,255,0.1); }
            .stat-box-cell:nth-child(2) { border-right: none !important; }
            .stat-box-cell:nth-child(3) { border-bottom: none !important; }
            .stat-box-cell:nth-child(4) { border-bottom: none !important; }
          }
        `}</style>
      </section>

      <div style={{ background: '#d4a017', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'inline-flex', gap: '28px', animation: 'marquee 22s linear infinite' }}>
          {[...Array(4)].flatMap(() =>
            ['Jalan Rusak','PJU Mati','Drainase','Sanitasi','Fasilitas Umum','Jembatan','Air Bersih','Irigasi'].map((t,i) => (
              <span key={`${t}${i}`} style={{ fontSize: '11px', fontWeight: 700, color: '#042010', letterSpacing: '.8px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(4,32,16,.4)', display: 'inline-block' }} />
                LAPOR {t.toUpperCase()}
              </span>
            ))
          )}
        </div>
      </div>

      <section id="fitur" style={{ 
        padding: 'clamp(4rem, 10vw, 6rem) 0', 
        background: '#fffbeb',
        width: '100%',
        overflow: 'hidden'
      }}>
        <div style={{ 
          maxWidth: '1080px', 
          margin: '0 auto',
          padding: '0 1.5rem',
          boxSizing: 'border-box'
        }}>
          
          <Anim id="s-fitur" vis={vis} center>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#166534', background: 'rgba(255,255,255,0.8)', padding: '5px 14px', borderRadius: '99px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>FITUR UNGGULAN</div>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(28px, 5vw, 46px)', 
              fontWeight: 800, 
              color: '#0f172a', 
              marginTop: '15px',
              letterSpacing: '-1px',
              lineHeight: 1.2
            }}>
              Satu platform, semua masalah <br/>
              <span style={{ color: '#d4a017', fontStyle: 'italic' }}>desa tertangani</span>
            </h2>
          </Anim>

          <div className="features-grid-sultan" style={{ 
            display: 'grid', 
            gap: '24px', 
            marginTop: '3.5rem',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {FEATURES.map((f, i) => (
              <div 
                key={i}
                className="feature-card-sultan"
                style={{ 
                  background: 'var(--white)', 
                  padding: '2.25rem 2rem', 
                  borderRadius: '24px', 
                  border: '1px solid rgba(212,160,23,0.15)', 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'flex-start',
                  gap: '20px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#d4a017';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(212,160,23,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(212,160,23,0.15)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                }}
              >
                <div className="feature-icon-wrapper" style={{ 
                  width: '60px', height: '60px', 
                  borderRadius: '16px', 
                  background: f.bg, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  flexShrink: 0,
                  border: '1px solid rgba(0,0,0,0.03)'
                }}>
                  {f.icon}
                </div>

                <div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 800, 
                    color: '#0f172a', 
                    marginBottom: '8px',
                    lineHeight: 1.2,
                    letterSpacing: '-0.5px'
                  }}>
                    {f.title}
                  </h3>
                  <p style={{ 
                    fontSize: '14.5px', 
                    color: '#475569', 
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      <section id="cara" style={{ 
        background: '#fffbeb', 
        padding: 'clamp(3rem, 8vw, 6rem) 0', 
        width: '100%',
        overflow: 'hidden'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 1.25rem',
          boxSizing: 'border-box'
        }}>
          
          <Anim id="s-cara" vis={vis} center>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#166534', background: 'rgba(255,255,255,0.6)', padding: '5px 14px', borderRadius: '99px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>ALUR PELAPORAN</div>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(24px, 4vw, 42px)', 
              fontWeight: 800, 
              color: '#0f172a', 
              marginTop: '12px',
              letterSpacing: '-1px',
              lineHeight: 1.2
            }}>
              Mudah & Cepat, <br className="hide-desktop" /> Cuma 4 Langkah
            </h2>
          </Anim>

          <div className="steps-container" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', 
            gap: '16px', 
            marginTop: '2.5rem',
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {STEPS.map((s, i) => (
              <div 
                key={i} 
                className="step-card"
                style={{ 
                  opacity: vis.has('s-cara') ? 1 : 0, 
                  transform: vis.has('s-cara') ? 'translateY(0)' : 'translateY(20px)', 
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 80}ms`,
                  background: '#fff',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 4px 14px -4px rgba(0,0,0,0.03)',
                  position: 'relative',
                  display: 'flex',
                  boxSizing: 'border-box'
                }}
              >
                <div className="step-number" style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 900, 
                  color: 'rgba(74, 124, 47, 0.08)', 
                  lineHeight: 1, 
                  letterSpacing: '-2px',
                  flexShrink: 0
                }}>{s.n}</div>
                
                <div style={{ flex: 1 }} className="step-content">
                  <h3 style={{ 
                    fontWeight: 800, 
                    color: '#0f172a', 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    margin: 0
                  }} className="step-title">
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#d4a017', display: 'inline-block' }} />
                    {s.t}
                  </h3>
                  <p style={{ color: '#475569', margin: 0 }} className="step-desc">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (min-width: 769px) {
            .step-card { flex-direction: column !important; padding: 2rem 1.75rem !important; }
            .step-number { font-size: 56px !important; margin-bottom: 1rem !important; }
            .step-title { font-size: 16px !important; margin-bottom: 10px !important; }
            .step-desc { font-size: 13.5px !important; line-height: 1.65 !important; }
            .step-card { zIndex: 1; }
            .step-card:hover {
              transform: translateY(-6px) !important;
              border-color: rgba(74, 124, 47, 0.3) !important;
              box-shadow: 0 15px 25px -5px rgba(74, 124, 47, 0.1) !important;
            }
            .step-card:hover .step-number { color: #d4a017 !important; transition: color 0.3s ease; }
          }
          @media (max-width: 768px) {
            .steps-container { gap: 12px !important; }
            .step-card { flex-direction: row !important; align-items: center !important; padding: 1.1rem 1.25rem !important; border-radius: 16px !important; }
            .step-number { font-size: 32px !important; margin-right: 14px !important; color: #d4a017 !important; width: 40px !important; text-align: center !important; }
            .step-title { font-size: 14px !important; margin-bottom: 2px !important; }
            .step-desc { font-size: 12px !important; line-height: 1.45 !important; }
            .hide-desktop { display: block !important; }
          }
          @media (min-width: 769px) { .hide-desktop { display: none !important; } }
        `}</style>
      </section>

      <section style={{ padding: '6rem 2rem', background: '#fffbeb' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Anim id="s-galeri" vis={vis} center>
            <Label>GALERI DESA</Label>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3.8vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-.5px', marginTop: '14px' }}>Wajah Desa Kita</h2>
          </Anim>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px', marginTop: '2.5rem' }}>
            {CONFIG.galeri.map((g, i) => <GCard key={i} {...g} />)}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg,#042010 0%,#0f4223 50%,#166534 100%)', padding: '6rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(255,255,255,.1) 0%, transparent 50%), radial-gradient(circle at 85% 50%, rgba(212,160,23,.05) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <Label light>BERGABUNG SEKARANG</Label>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,46px)', color: '#fff', fontWeight: 600, margin: '14px 0 12px', letterSpacing: '-.5px', lineHeight: 1.12 }}>
            Desa yang baik dimulai dari<br />
            <span style={{ color: '#d4a017', fontStyle: 'italic' }}>warga yang berani suara</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '15px', marginBottom: '32px' }}>Daftar gratis. Lapor mudah. Desa bergerak bersama.</p>
          <button
            onClick={() => navigate('/login')}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px) scale(1.03)'; e.currentTarget.style.boxShadow='0 10px 36px rgba(212,160,23,.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 20px rgba(212,160,23,.3)' }}
            style={{ padding: '14px 44px', borderRadius: '99px', fontSize: '15px', fontWeight: 700, background: '#d4a017', color: '#042010', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(212,160,23,.3)', transition: 'all .2s' }}
          >Daftar Gratis Sekarang →</button>
        </div>
      </section>

      <footer style={{ background: '#042010', padding: '1.8rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)' }}>
          ©<span style={{ color: '#d4a017' }}>SAPA DESA</span> — Platform Pengaduan Masyarakat Desa Indonesia
        </span>
        <span onClick={() => navigate('/admin/login')} style={{ fontSize: '11px', color: 'rgba(255,255,255,.25)', cursor: 'pointer', fontWeight: 600 }}
          onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,.6)'}
          onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.25)'}
        >Portal Admin</span>
      </footer>

      <style>{`
        @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-25%)} }
        @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes scrollDot { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(7px);opacity:.2} }
      `}</style>
    </div>
  )
}

function Btn({ children, gold, ghost, hero, primary, nav, onClick }) {
  const [h, setH] = useState(false)
  let style = { padding: hero ? '12px 28px' : '8px 18px', borderRadius: '99px', fontSize: hero ? '14px' : '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', border: 'none' }
  if (gold || (hero && primary)) {
    style = { ...style, background: h ? '#ffffff' : '#f8fafc', color: '#4A7C2F', boxShadow: h ? '0 8px 28px rgba(0,0,0,.15)' : '0 4px 14px rgba(0,0,0,.05)', transform: h ? 'translateY(-2px)' : 'none' }
  } else if (ghost) {
    style = { ...style, background: h ? (nav ? '#f1f5f9' : 'rgba(255,255,255,.12)') : 'transparent', color: nav ? '#475569' : '#fff', border: nav ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,.25)' }
  } else if (hero) {
    style = { ...style, background: h ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)' }
  }
  return <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={style}>{children}</button>
}

function Label({ children, light }) {
  return <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: light ? 'rgba(255,255,255,.5)' : '#166534', background: light ? 'rgba(255,255,255,.08)' : '#dcfce7', padding: '5px 14px', borderRadius: '99px' }}>{children}</div>
}

function H2({ children, mt }) {
  return <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3.8vw,40px)', fontWeight: 600, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-.5px', marginTop: mt ? '10px' : 0 }}>{children}</h2>
}

function Anim({ id, vis, center, children }) {
  return <div data-anim id={id} style={{ textAlign: center ? 'center' : 'left', opacity: vis.has(id) ? 1 : 0, transform: vis.has(id) ? 'translateY(0)' : 'translateY(16px)', transition: 'all .5s ease' }}>{children}</div>
}

function Card({ children, style: extra = {} }) {
  const [h, setH] = useState(false)
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: '#fff', border: `1px solid ${h ? '#d4a017' : 'rgba(0,0,0,0.05)'}`, borderRadius: '16px', padding: '1.6rem 1.4rem', boxShadow: h ? '0 8px 30px rgba(212,160,23,.1)' : '0 4px 20px rgba(0,0,0,.03)', transform: h ? 'translateY(-3px)' : 'none', transition: 'all .22s', ...extra }}
    >{children}</div>
  )
}

function GCard({ foto, title, desc, bg, icon }) {
  const [err, setErr] = useState(false)
  const [h, setH]     = useState(false)
  const hasFoto = foto && !err
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ borderRadius: '16px', overflow: 'hidden', background: '#fff', border: `1px solid ${h ? '#d4a017' : 'rgba(0,0,0,0.05)'}`, boxShadow: h ? '0 10px 30px rgba(212,160,23,.15)' : '0 4px 15px rgba(0,0,0,.04)', transform: h ? 'translateY(-4px)' : 'none', transition: 'all .25s' }}>
      <div style={{ height: '195px', background: hasFoto ? 'transparent' : bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {hasFoto
          ? <img src={foto} alt={title} onError={() => setErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: h ? 'scale(1.05)' : 'scale(1)', transition: 'transform .4s' }} />
          : <span style={{ fontSize: '52px', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.15))' }}>{icon}</span>
        }
        {!hasFoto && <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,.28)', color: '#fff', fontSize: '10px', padding: '3px 10px', borderRadius: '99px', whiteSpace: 'nowrap' }}>📷 Belum ada foto</div>}
      </div>
      <div style={{ padding: '1rem 1.2rem 1.2rem' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '5px' }}>{title}</h4>
        <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  )
}