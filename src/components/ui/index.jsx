import { STATUS_COLOR, URGENSI_COLOR } from '../../data/mockData'

export function Badge({ type = 'status', value }) {
  const map = type === 'status' ? STATUS_COLOR : URGENSI_COLOR
  const style = map[value] || { bg: '#f3f4f6', color: '#374151' }
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '99px',
      fontSize: '11px',
      fontWeight: 500,
      background: style.bg,
      color: style.color,
    }}>{value}</span>
  )
}

export function CatBadge({ label }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 9px',
      borderRadius: '4px',
      fontSize: '11px',
      background: 'var(--gray-100)',
      color: 'var(--gray-800)',
      fontWeight: 500,
    }}>{label}</span>
  )
}

export function Btn({ children, variant = 'primary', size = 'md', onClick, style: extra = {}, type = 'button' }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: '6px', fontFamily: 'inherit', cursor: 'pointer', border: 'none',
    fontWeight: 500, transition: 'opacity .15s, transform .1s',
  }
  const variants = {
    primary:  { background: 'var(--green-dark)', color: '#fff', borderRadius: 'var(--radius-md)' },
    outline:  { background: 'transparent', color: 'var(--green-mid)', border: '1px solid var(--green-mid)', borderRadius: 'var(--radius-md)' },
    ghost:    { background: 'transparent', color: 'var(--gray-600)', borderRadius: 'var(--radius-md)' },
    danger:   { background: 'var(--red-pale)', color: '#991b1b', border: '1px solid #fca5a5', borderRadius: 'var(--radius-md)' },
    gold:     { background: 'var(--gold)', color: 'var(--green-darkest)', borderRadius: '99px' },
    success:  { background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7', borderRadius: 'var(--radius-md)' },
    amber:    { background: 'var(--amber-pale)', color: '#92400e', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)' },
  }
  const sizes = {
    sm: { fontSize: '12px', padding: '5px 14px' },
    md: { fontSize: '13px', padding: '8px 18px' },
    lg: { fontSize: '14px', padding: '11px 28px' },
    full: { fontSize: '14px', padding: '11px', width: '100%' },
  }
  return (
    <button type={type} onClick={onClick} style={{ ...base, ...variants[variant], ...sizes[size], ...extra }}>
      {children}
    </button>
  )
}

export function Card({ children, style: extra = {} }) {
  return (
    <div style={{
      background: '#fff',
      border: '0.5px solid var(--gray-200)',
      borderRadius: 'var(--radius-md)',
      padding: '1.2rem',
      marginBottom: '1rem',
      boxShadow: 'var(--shadow-card)',
      ...extra,
    }}>{children}</div>
  )
}

export function CardTitle({ children, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--green-dark)' }}>{children}</span>
      {action}
    </div>
  )
}

export function MetricCard({ value, label, badge, badgeVariant = 'blue' }) {
  const badgeStyles = {
    blue:   { bg: 'var(--blue-pale)', color: '#1e40af' },
    green:  { bg: 'var(--green-pale)', color: '#065f46' },
    amber:  { bg: 'var(--amber-pale)', color: '#92400e' },
    red:    { bg: 'var(--red-pale)', color: '#991b1b' },
  }
  const bs = badgeStyles[badgeVariant]
  return (
    <div style={{ background: '#fff', border: '0.5px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '1rem', boxShadow: 'var(--shadow-card)' }}>
      <div style={{ fontSize: '26px', fontWeight: 600, color: 'var(--green-dark)' }}>{value}</div>
      <div style={{ fontSize: '11px', color: 'var(--gray-600)', marginTop: '3px' }}>{label}</div>
      {badge && <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: bs.bg, color: bs.color }}>{badge}</span>}
    </div>
  )
}

export function FormGroup({ label, required, children }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '5px' }}>
        {label}{required && <span style={{ color: 'var(--red)', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

export const inputStyle = {
  width: '100%', padding: '9px 12px', border: '1px solid var(--gray-200)',
  borderRadius: 'var(--radius-sm)', fontSize: '13px', outline: 'none',
  background: '#fff', color: 'var(--gray-800)', fontFamily: 'inherit',
  transition: 'border-color var(--transition)',
}

export function Alert({ children, variant = 'info' }) {
  const styles = {
    info:    { bg: 'var(--blue-pale)', color: '#1e40af', border: '#3b82f6' },
    success: { bg: '#d1fae5', color: '#065f46', border: '#10b981' },
    warning: { bg: 'var(--amber-pale)', color: '#92400e', border: '#f59e0b' },
    danger:  { bg: 'var(--red-pale)', color: '#991b1b', border: '#ef4444' },
  }
  const s = styles[variant]
  return (
    <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', marginBottom: '12px', background: s.bg, color: s.color, borderLeft: `3px solid ${s.border}` }}>
      {children}
    </div>
  )
}

export function EmptyState({ icon = '📭', message = 'Tidak ada data' }) {
  return (
    <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--gray-400)', fontSize: '13px' }}>
      <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
      {message}
    </div>
  )
}

export function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = 'Hapus', confirmVariant = 'danger' }) {
  if (!open) return null
  const variantStyle = {
    danger:  { background: '#ef4444', color: '#fff', border: 'none' },
    primary: { background: 'var(--green-dark)', color: '#fff', border: 'none' },
  }
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '14px', padding: '1.8rem', width: '100%', maxWidth: '380px', boxShadow: '0 8px 32px rgba(0,0,0,.18)' }}>
        <div style={{ fontSize: '28px', textAlign: 'center', marginBottom: '12px' }}>🗑️</div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--green-dark)', textAlign: 'center', marginBottom: '8px' }}>{title}</h3>
        <p style={{ fontSize: '13px', color: 'var(--gray-600)', textAlign: 'center', lineHeight: 1.6, marginBottom: '1.5rem' }}>{message}</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onCancel} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--gray-200)', background: '#fff', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--gray-600)' }}>Batal</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: '10px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, ...variantStyle[confirmVariant] }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
