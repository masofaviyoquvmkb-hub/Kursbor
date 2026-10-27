import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { ease } from '../../lib/motion'

/** Fades and lifts its children the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  )
}

/** Block heading inside «Обо мне»: smaller than section titles, revealed from behind a mask. */
export function BlockTitle({ children, id, className = '' }) {
  return (
    <motion.h3
      id={id}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-10% 0px' }}
      className={`type-display -mt-[0.14em] overflow-hidden pt-[0.14em] text-[clamp(2.25rem,4.4vw,4.25rem)] text-screen ${className}`}
    >
      <motion.span
        className="block pb-[0.05em]"
        variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
        transition={{ duration: 1, ease }}
      >
        {children}
      </motion.span>
    </motion.h3>
  )
}

/** Number that counts up from 0 the first time it is seen. Shows the final value without JS / with reduced motion. */
export function CountUp({ to, duration = 1.8, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    if (!inView) {
      el.textContent = '0'
      return
    }
    const controls = animate(0, to, {
      duration,
      delay,
      ease,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [inView, reduce, to, duration, delay])

  return (
    <span ref={ref} className="tabular-nums">
      {to}
    </span>
  )
}

/** Simple line icons for «Что я делаю». */
export function ServiceIcon({ name, className = '' }) {
  const p = {
    viewBox: '0 0 48 48',
    width: 40,
    height: 40,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }
  switch (name) {
    case 'course':
      return (
        <svg {...p}>
          <rect x="5" y="9" width="38" height="26" rx="3" />
          <path d="M20.5 16.5v11l9-5.5z" fill="currentColor" stroke="none" />
          <path d="M14 41h20M24 35v6" />
        </svg>
      )
    case 'game':
      return (
        <svg {...p}>
          <path d="M14 15h20a9 9 0 0 1 8.7 11.3l-2 7.6a4.5 4.5 0 0 1-7.7 1.9L29 31H19l-4 4.8a4.5 4.5 0 0 1-7.7-1.9l-2-7.6A9 9 0 0 1 14 15z" />
          <path d="M15 21v6M12 24h6" />
          <circle cx="31" cy="22.5" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="34.5" cy="26" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'ai':
      return (
        <svg {...p}>
          <path d="M22 7c1.2 8.5 4.5 11.8 13 13-8.5 1.2-11.8 4.5-13 13-1.2-8.5-4.5-11.8-13-13 8.5-1.2 11.8-4.5 13-13z" />
          <path d="M36 30c.5 3.4 1.6 4.5 5 5-3.4.5-4.5 1.6-5 5-.5-3.4-1.6-4.5-5-5 3.4-.5 4.5-1.6 5-5z" />
        </svg>
      )
    case 'video':
      return (
        <svg {...p}>
          <rect x="6" y="18" width="36" height="22" rx="2.5" />
          <path d="M6 18l2.6-9.3 34.4 0-2.6 9.3" />
          <path d="M16 8.7 13.4 18M27 8.7 24.4 18M38 8.7 35.4 18" />
        </svg>
      )
    case 'slides':
      return (
        <svg {...p}>
          <rect x="5" y="7" width="38" height="26" rx="2.5" />
          <path d="M14 27v-6M21 27v-10M28 27v-7M35 27V13" />
          <path d="M24 33v5M16 42l8-4 8 4" />
        </svg>
      )
    default:
      return null
  }
}
