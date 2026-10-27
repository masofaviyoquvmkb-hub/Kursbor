import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { asset, categories, categoryTitle, plural } from '../data/site'
import { works } from '../data/works'
import { ease } from '../lib/motion'
import { useEscape, useLockBody } from '../lib/dom'

import { CloseIcon, SearchIcon } from './Icons'

/** Searches the placeholder library (titles, formats, years). */
export default function SearchOverlay({ open, onClose, onOpenProject, onPickCategory }) {
  const [q, setQ] = useState('')
  const input = useRef(null)
  const close = useCallback(() => onClose(), [onClose])

  useLockBody(open)
  useEscape(open, close)

  useEffect(() => {
    if (!open) return
    setQ('')
    const t = setTimeout(() => input.current?.focus(), 80)
    return () => clearTimeout(t)
  }, [open])

  const term = q.trim().toLowerCase()
  const results = useMemo(() => {
    if (!term) return works
    return works.filter((p) =>
      [p.title, categoryTitle(p.category), categoryTitle(p.category, true), String(p.year), p.summary, p.runtime].join(' ').toLowerCase().includes(term),
    )
  }, [term])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-ink/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Поиск по работам"
        >
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mx-auto max-w-5xl px-5 pb-16 pt-6 sm:px-8 sm:pt-10"
          >
            <div className="flex items-center gap-4 border-b border-white/15 pb-4 focus-within:border-tally">
              <SearchIcon width="26" height="26" className="shrink-0 text-mute" />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && results[0]) {
                    onClose()
                    onOpenProject(results[0])
                  }
                }}
                placeholder="Курсы, фильмы, презентации…"
                aria-label="Поиск по работам"
                className="type-display min-w-0 flex-1 bg-transparent text-[clamp(2rem,6vw,4rem)] text-screen placeholder:text-screen/25 focus:outline-none"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Закрыть поиск"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-screen/80 hover:bg-white/10 hover:text-screen"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    onClose()
                    onPickCategory(c.id)
                  }}
                  className="type-wide rounded-full border border-white/15 px-4 py-2 text-[11px] text-screen/70 transition-colors hover:border-tally hover:text-screen"
                >
                  {c.short}
                </button>
              ))}
            </div>

            <p className="mt-10 text-[13px] text-mute" aria-live="polite">
              {term ? `${plural(results.length, ['Найдена', 'Найдено', 'Найдено'])} ${results.length} ${plural(results.length, ['работа', 'работы', 'работ'])}` : 'Все работы'}
            </p>

            {results.length ? (
              <ul className="mt-4 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        onOpenProject(p)
                      }}
                      className="group block w-full text-left"
                    >
                      <div className="aspect-video overflow-hidden rounded-[6px] ring-1 ring-white/10">
                        <img
                          src={asset(p.image)}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-3 font-semibold text-screen">{p.title}</p>
                      <p className="type-wide mt-1 text-[11px] text-mute">
                        {[categoryTitle(p.category, true), p.year].filter(Boolean).join(' · ')}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-screen/70">
                По запросу «{q.trim()}» ничего не нашлось. Попробуйте формат: курсы, видео или Reels.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
