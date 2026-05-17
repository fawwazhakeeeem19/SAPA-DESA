import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [phase, setPhase] = useState('in') // 'in' | 'out'
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setPhase('out')
    const t = setTimeout(() => {
      setDisplayChildren(children)
      setPhase('in')
    }, 200)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div style={{
      opacity: phase === 'in' ? 1 : 0,
      transform: phase === 'in' ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity .25s ease, transform .25s ease',
    }}>
      {displayChildren}
    </div>
  )
}
