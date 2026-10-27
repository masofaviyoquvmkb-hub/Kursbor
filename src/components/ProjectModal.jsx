import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { asset, categoryTitle } from '../data/site'
import { ease } from '../lib/motion'
import { afterUnlock, useEscape, useLockBody } from '../lib/dom'

import { CloseIcon } from './Icons'

/** Placeholder "title page" for a project until its full case study exists. */
export default function ProjectModal({ project, onClose, onStart }) {
  const open = Boolean(project)
  const closeBtn = useRef(null)
  const close = useCallback(() => onClose(), [onClose])

  useLockBody(open)
  useEscape(open, close)

  useEffect(() => {
    if (!open) return
    const last = document.activeElement
    const t = setTimeout(() => closeBtn.current?.focus(), 50)
    return () => {
      clearTimeout(t)
      last?.focus?.({ preventScroll: true })
    }
  }, [open])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={close}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/75 p-0 backdrop-blur-md sm:items-center sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.6, ease }}
            className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[14px] bg-surface shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9)] ring-1 ring-white/10 sm:rounded-[10px]"
          >
            <div className="relative aspect-video overflow-hidden">
              <motion.img
                src={asset(project.image)}
                alt=""
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                aria-label="Закрыть"
                className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-screen backdrop-blur-md transition-colors hover:bg-tally sm:right-4 sm:top-4"
              >
                <CloseIcon />
              </button>
              <div className="absolute inset-x-0 bottom-0 px-6 pb-2 sm:px-10">
                <p className="type-wide mb-3 flex items-center gap-2.5 text-[11px] text-screen/80">
                  <span className="tally-dot" aria-hidden="true" />
                  СКОРО ПРЕМЬЕРА
                </p>
                <h2 id="project-title" className="type-display text-[clamp(2.25rem,6vw,4.5rem)] text-screen">
                  {project.title.toUpperCase()}
                </h2>
              </div>
            </div>

            <div className="px-6 pb-8 pt-5 sm:px-10 sm:pb-10">
              <p className="type-wide flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-mute">
                <span className="text-tally">{categoryTitle(project.category, true)}</span>
                <span>{project.year}</span>
                <span>{project.runtime}</span>
              </p>
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-screen/85 sm:text-[17px]">{project.summary}</p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mute">
                Полный кейс с процессом, кадрами и результатами сейчас в монтаже и скоро появится здесь.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <motion.button
                  type="button"
                  onClick={() => {
                    onClose()
                    afterUnlock(onStart)
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="type-wide rounded-[6px] bg-tally px-6 py-4 text-[12px] text-white transition-colors hover:bg-screen hover:text-ink"
                >
                  ХОЧУ ТАКОЙ ЖЕ ПРОЕКТ
                </motion.button>
                <button
                  type="button"
                  onClick={close}
                  className="type-wide rounded-[6px] border border-white/20 px-6 py-4 text-[12px] text-screen transition-colors hover:bg-white/10"
                >
                  НАЗАД К РАБОТАМ
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
