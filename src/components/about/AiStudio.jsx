import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { about } from '../../data/about'
import { ease } from '../../lib/motion'
import { Reveal } from './parts'

/** Three tiny bars that pulse like a live signal. */
function Signal({ delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
      {[0.45, 0.8, 0.6].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-tally"
          style={{ height: `${h * 100}%` }}
          animate={reduce ? undefined : { scaleY: [1, 0.35, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: delay + i * 0.15 }}
        />
      ))}
    </span>
  )
}

/** «AI — мой инструмент»: statement on the left, an interface-style AI studio panel on the right. */
export default function AiStudio() {
  const { ai } = about
  const panel = useRef(null)
  const inView = useInView(panel, { margin: '-15% 0px' })
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)

  // walk through the pipeline while the panel is on screen
  useEffect(() => {
    if (!inView || reduce) return
    const id = setInterval(() => setStep((s) => (s + 1) % (ai.pipeline.length + 1)), 1100)
    return () => clearInterval(id)
  }, [inView, reduce, ai.pipeline.length])

  const lit = reduce ? ai.pipeline.length : step

  return (
    <div className="relative mt-24 overflow-hidden sm:mt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_60%_at_80%_50%,rgb(255_46_63/0.12),transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-[1760px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:px-12">
        <div className="min-w-0">
          <motion.h3
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="type-display text-[clamp(2.25rem,4.4vw,4.25rem)] text-screen"
          >
            {ai.title.map((line, i) => (
              <span key={line} className="block overflow-hidden -mt-[0.14em] pt-[0.14em] pb-[0.05em]">
                <motion.span
                  className={`block ${i === 0 ? '' : 'text-screen/55'}`}
                  variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
                  transition={{ duration: 1, ease, delay: i * 0.12 }}
                >
                  {line.toUpperCase()}
                </motion.span>
              </span>
            ))}
          </motion.h3>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[34rem] text-[16px] leading-relaxed text-screen/70 sm:text-[17px]">{ai.text}</p>
          </Reveal>
        </div>

        {/* AI studio panel */}
        <Reveal y={30} delay={0.1}>
          <div
            ref={panel}
            className="overflow-hidden rounded-[12px] bg-[#0b0b0f] shadow-[0_40px_120px_-40px_rgb(255_46_63/0.45)] ring-1 ring-white/10"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
              <p className="type-wide text-[10.5px] text-screen/85 sm:text-[11px]">AI-СТУДИЯ KURSBOR</p>
              <p className="type-wide flex items-center gap-2 text-[10px] text-screen/60">
                <span className="tally-dot" aria-hidden="true" />
                В РАБОТЕ
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <p className="type-wide text-[10px] text-mute">МОДЕЛИ</p>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {ai.models.map((m, i) => (
                  <li
                    key={m}
                    className="flex items-center justify-between gap-2 rounded-[8px] bg-white/[0.04] px-3.5 py-3 ring-1 ring-white/10"
                  >
                    <span className="truncate text-[15px] font-semibold text-screen">{m}</span>
                    <Signal delay={i * 0.2} />
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-[13px] text-mute">+ другие современные AI-инструменты</p>

              <p className="type-wide mt-7 text-[10px] text-mute">ЧТО СОЗДАЮ</p>
              <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                {ai.pipeline.map((p, i) => {
                  const active = !reduce && i === step
                  const done = i < lit
                  return (
                    <li key={p} className="flex items-center gap-1.5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-[13px] font-medium ring-1 transition-all duration-500 ${
                          active
                            ? 'bg-tally/20 text-screen ring-tally shadow-[0_0_24px_rgb(255_46_63/0.45)]'
                            : done
                              ? 'text-screen/85 ring-white/20'
                              : 'text-screen/45 ring-white/10'
                        }`}
                      >
                        {p}
                      </span>
                      {i < ai.pipeline.length - 1 && (
                        <span className={`text-[12px] transition-colors duration-500 ${done ? 'text-tally' : 'text-white/20'}`} aria-hidden="true">
                          →
                        </span>
                      )}
                    </li>
                  )
                })}
              </ol>

              <div className="mt-6 h-[2px] overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-tally transition-[width] duration-700 ease-[var(--ease-cine)]"
                  style={{ width: `${(Math.min(lit, ai.pipeline.length) / ai.pipeline.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
