import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from '../lib/motion'
import { useEscape, useLockBody } from '../lib/dom'
import { CloseIcon } from './Icons'

const FullIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" {...p}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
)

/**
 * Universal full-screen viewer that keeps the visitor on KURSBOR.
 *
 * item = {
 *   type:   'iframe' (iSpring, any embed player)  |  'video' (mp4/webm file),
 *   src:    address of the course / video,
 *   title:  shown in the top bar,
 *   label:  small category label (optional),
 *   loadingText: text while it loads (optional),
 *   allow:  iframe permissions (optional),
 * }
 *
 * To support a new kind of content later (presentation, gallery…),
 * add one more branch in <Content> — the window, animation, scroll lock and close logic stay the same.
 */
function Content({ item, onReady }) {
  if (item.type === 'image') {
    // Full-resolution picture in a scrollable area: readable on phones (scroll + pinch-zoom).
    return (
      <div className="absolute inset-0 overflow-auto overscroll-contain bg-ink">
        <img
          src={item.src}
          alt={item.alt ?? item.title}
          onLoad={onReady}
          className="mx-auto block h-auto w-auto max-w-full"
        />
      </div>
    )
  }
  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        poster={item.poster}
        controls
        autoPlay
        playsInline
        onLoadedData={onReady}
        className="absolute inset-0 h-full w-full bg-black object-contain"
      />
    )
  }
  // default: iframe (iSpring Cloud embed player and similar)
  return (
    <iframe
      src={item.src}
      title={item.title}
      onLoad={onReady}
      allow={item.allow ?? 'fullscreen; autoplay; clipboard-write; encrypted-media; picture-in-picture'}
      className="absolute inset-0 h-full w-full border-0 bg-transparent"
    />
  )
}

export default function EmbedViewerModal({ item, onClose }) {
  const open = Boolean(item)
  const panel = useRef(null)
  const closeBtn = useRef(null)
  const [ready, setReady] = useState(false)
  const [canFull, setCanFull] = useState(false)
  const close = useCallback(() => onClose(), [onClose])

  useLockBody(open)
  useEscape(open, close)

  // reset loader for each new item; focus the close button; give focus back on close
  useEffect(() => {
    if (!open) return
    setReady(false)
    setCanFull(Boolean(document.fullscreenEnabled))
    const last = document.activeElement
    const t = setTimeout(() => closeBtn.current?.focus({ preventScroll: true }), 80)
    // if the player never reports "loaded", don't keep the loader up forever
    const giveUp = setTimeout(() => setReady(true), 12000)
    return () => {
      clearTimeout(t)
      clearTimeout(giveUp)
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
      last?.focus?.({ preventScroll: true })
    }
  }, [open, item?.src])

  const fullscreen = () => {
    const el = panel.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    else el.requestFullscreen?.().catch(() => {})
  }

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="embed-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.1 } }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md"
          // A click on the dark edge never closes the course by accident: only × or Esc do.
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="embed-title"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.6, ease }}
            className="absolute inset-0 flex flex-col overflow-hidden bg-ink sm:inset-3 sm:rounded-[12px] sm:shadow-[0_40px_140px_-30px_rgb(255_46_63/0.35)] sm:ring-1 sm:ring-white/10 lg:inset-5"
            style={{
              paddingTop: 'env(safe-area-inset-top, 0px)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            {/* top bar */}
            <div className="flex h-14 shrink-0 items-center gap-3 border-b border-white/10 bg-ink px-3 sm:h-16 sm:gap-4 sm:px-5">
              <span className="tally-dot shrink-0" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                {item.label && (
                  <p className="type-wide truncate text-[10px] text-tally sm:text-[11px]">{item.label.toUpperCase()}</p>
                )}
                <h2 id="embed-title" className="truncate text-[15px] font-semibold leading-tight text-screen sm:text-[17px]">
                  {item.title}
                </h2>
              </div>
              {canFull && (
                <button
                  type="button"
                  onClick={fullscreen}
                  aria-label="На весь экран"
                  title="На весь экран"
                  className="hidden h-11 w-11 shrink-0 place-items-center rounded-full text-screen/80 transition-colors hover:bg-white/10 hover:text-screen sm:grid"
                >
                  <FullIcon />
                </button>
              )}
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                aria-label="Закрыть"
                title="Закрыть (Esc)"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-screen ring-1 ring-white/15 transition-colors hover:bg-tally hover:ring-tally"
              >
                <CloseIcon />
              </button>
            </div>

            {/* content fills all remaining space */}
            <div className="relative min-h-0 flex-1 bg-black">
              <AnimatePresence>
                {!ready && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-ink"
                  >
                    <div className="flex flex-col items-center gap-5">
                      <div className="relative h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="absolute inset-y-0 w-1/3 rounded-full bg-tally"
                          animate={{ x: ['-100%', '300%'] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </div>
                      <p className="text-[14px] text-mute">{item.loadingText ?? 'Загружаем…'}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <Content item={item} onReady={() => setReady(true)} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
