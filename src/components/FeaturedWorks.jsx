import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { asset, caps, categories, categoryTitle } from '../data/site'
import { works } from '../data/works'
import { ease } from '../lib/motion'
import SectionTitle from './SectionTitle'
import { ArrowLeft, ArrowRight, PlayIcon } from './Icons'



const filters = [{ id: 'all', label: 'ВСЕ' }, ...categories.map((c) => ({ id: c.id, label: c.short }))]

function WorkTile({ project, onOpen, index }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease, delay: index * 0.05 }}
      className="w-[82vw] shrink-0 snap-start sm:w-[56vw] lg:w-[38vw] xl:w-[31vw] 2xl:w-[27vw]"
    >
      <button type="button" onClick={() => onOpen(project)} className="group block w-full text-left">
        <div className="relative aspect-video overflow-hidden rounded-[6px] bg-surface ring-1 ring-white/10 transition-[box-shadow] duration-500 group-hover:shadow-[0_30px_80px_-30px_rgb(255_46_63/0.55)] group-hover:ring-white/25">
          <img
            src={asset(project.image)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-cine)] group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          <span className="absolute left-3 top-3 rounded-[4px] bg-black/55 px-2 py-1 text-[11px] font-medium tabular-nums text-screen/90 backdrop-blur-md sm:left-4 sm:top-4">
            {project.runtime}
          </span>

          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-tally text-white opacity-0 shadow-[0_0_40px_rgb(255_46_63/0.6)] transition-all duration-500 ease-[var(--ease-cine)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100">
            <PlayIcon width="20" height="20" />
          </span>

          {/* watch bar: fills on hover, like a half-watched title */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15" aria-hidden="true">
            <div
              className="h-full origin-left scale-x-0 bg-tally transition-transform duration-[900ms] ease-[var(--ease-cine)] group-hover:scale-x-100"
              style={{ width: `${project.watched * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-4 transition-transform duration-500 ease-[var(--ease-cine)] group-hover:translate-x-1">
          <h3 className="text-[18px] font-semibold leading-tight text-screen sm:text-[20px]">{project.title}</h3>
          <p className="type-wide mt-1.5 text-[11px] text-mute">
            {[categoryTitle(project.category, true), project.year].filter(Boolean).join(' · ')}
          </p>
        </div>
      </button>
    </motion.li>
  )
}

export default function FeaturedWorks({ filter, onFilter, onOpen }) {
  const rail = useRef(null)
  const chips = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const list = filter === 'all' ? works : works.filter((p) => p.category === filter)

  const measure = useCallback(() => {
    const el = rail.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }, [])

  useEffect(() => {
    // keep the active chip in view on phones (horizontal only, so the page scroll isn't interrupted)
    const strip = chips.current
    const chip = strip?.querySelector('[aria-pressed="true"]')
    if (strip && chip) strip.scrollTo({ left: chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2, behavior: 'smooth' })
    rail.current?.scrollTo({ left: 0, behavior: 'smooth' })
    const t = setTimeout(measure, 700)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', measure)
    }
  }, [filter, measure])

  const page = (dir) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <section id="works" aria-labelledby="works-title" className="relative overflow-hidden bg-ink pt-8 pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1760px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="works-title">ИЗБРАННЫЕ РАБОТЫ</SectionTitle>
          <div className="hidden gap-2 md:flex">
            {[
              [-1, ArrowLeft, 'Предыдущие работы', edges.start],
              [1, ArrowRight, 'Следующие работы', edges.end],
            ].map(([dir, Icon, label, disabled]) => (
              <button
                key={label}
                type="button"
                onClick={() => page(dir)}
                disabled={disabled}
                aria-label={label}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-screen transition-colors hover:border-tally hover:bg-tally disabled:pointer-events-none disabled:opacity-30"
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>

        <div ref={chips} role="group" aria-label="Фильтр работ по формату" className="no-scrollbar relative -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((f) => {
            const on = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onFilter(f.id)}
                aria-pressed={on}
                className={`type-wide shrink-0 rounded-full px-4 py-2.5 text-[11px] transition-colors duration-300 ${
                  on ? 'bg-screen text-ink' : 'border border-white/15 text-screen/70 hover:border-white/40 hover:text-screen'
                }`}
              >
                {caps(f.label)}
              </button>
            )
          })}
        </div>
      </div>

      <ul
        ref={rail}
        onScroll={measure}
        className="rail no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-6"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <WorkTile key={p.id} project={p} index={i} onOpen={onOpen} />
          ))}
        </AnimatePresence>
      </ul>
    </section>
  )
}
