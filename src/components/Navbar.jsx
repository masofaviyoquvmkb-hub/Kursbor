import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { brand, navLinks, socials } from '../data/site'
import { ease, intro } from '../lib/motion'
import { afterUnlock, useEscape, useLockBody } from '../lib/dom'
import { SearchIcon } from './Icons'

export function Wordmark({ className = '' }) {
  return (
    <span className={`type-display inline-flex items-start leading-none ${className}`}>
      KURSBOR
      <span className="ml-[0.08em] mt-[0.06em] inline-block h-[0.2em] w-[0.2em] rounded-full bg-tally" aria-hidden="true" />
    </span>
  )
}

export default function Navbar({ active, onNavigate, onSearch, onLetsWork }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))
  useLockBody(open)
  useEscape(open, () => setOpen(false))

  // Close the mobile menu if the viewport grows past the burger breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const go = (link) => {
    if (!open) return onNavigate(link)
    setOpen(false)
    afterUnlock(() => onNavigate(link)) // let the menu release the page first
  }

  const solid = scrolled && !open

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: intro.nav }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* backdrop: transparent over the hero, dense once the page scrolls */}
        <div
          className={`absolute inset-0 transition-[background-color,backdrop-filter,box-shadow] duration-700 ease-[var(--ease-cine)] ${
            solid
              ? 'bg-ink/85 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl'
              : 'bg-gradient-to-b from-ink/70 to-transparent'
          }`}
        />

        <nav
          aria-label="Основное меню"
          className={`relative mx-auto flex max-w-[1760px] items-center justify-between px-5 transition-[height] duration-700 ease-[var(--ease-cine)] sm:px-8 lg:px-12 ${
            solid ? 'h-16' : 'h-20'
          }`}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              go(navLinks[0])
            }}
            aria-label={`${brand.name} — на главную`}
            className="relative z-10"
          >
            <Wordmark className="text-[30px] sm:text-[34px]" />
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 xl:flex xl:gap-9">
            {navLinks.map((link) => {
              const isActive = active === link.label
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      go(link)
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`type-wide group relative block whitespace-nowrap py-2 text-[11px] transition-colors duration-300 xl:text-[12px] ${
                      isActive ? 'text-screen' : 'text-screen/55 hover:text-screen'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 mx-auto h-[2px] origin-center bg-tally transition-transform duration-500 ease-[var(--ease-cine)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onSearch}
              aria-label="Поиск по работам"
              className="grid h-10 w-10 place-items-center rounded-full text-screen/80 transition-colors hover:bg-white/10 hover:text-screen"
            >
              <SearchIcon />
            </button>

            <motion.button
              type="button"
              onClick={onLetsWork}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="type-wide hidden rounded-[6px] border border-white/25 px-4 py-2.5 text-[11px] text-screen transition-colors duration-300 hover:border-tally hover:bg-tally sm:block xl:text-[12px]"
            >
              ЗАКАЗАТЬ ПРОЕКТ
            </motion.button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-white/10 xl:hidden"
            >
              <span
                className={`absolute h-[2px] w-5 bg-screen transition-transform duration-500 ease-[var(--ease-cine)] ${
                  open ? 'rotate-45' : '-translate-y-[4px]'
                }`}
              />
              <span
                className={`absolute h-[2px] bg-screen transition-all duration-500 ease-[var(--ease-cine)] ${
                  open ? 'w-5 -rotate-45' : 'w-3.5 translate-x-[3px] translate-y-[4px]'
                }`}
              />
            </button>
          </div>
        </nav>

        {/* red playback line = how far through the page you are */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-tally transition-opacity duration-500 ${
            solid ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-ink xl:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_100%_100%,rgb(255_46_63/0.22),transparent_70%)]"
            />
            <nav aria-label="Мобильное меню" className="relative flex flex-1 flex-col justify-center px-6 pt-20 sm:px-10">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <li key={link.label} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        go(link)
                      }}
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.06 }}
                      className={`type-display flex items-center gap-4 py-1 text-[clamp(2.75rem,12vw,5.5rem)] transition-colors ${
                        active === link.label ? 'text-screen' : 'text-screen/45 active:text-screen'
                      }`}
                    >
                      {active === link.label && <span className="tally-dot shrink-0" />}
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-6 sm:px-10"
            >
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  afterUnlock(onLetsWork)
                }}
                className="type-wide rounded-[6px] bg-tally px-5 py-3.5 text-[12px] text-white"
              >
                ЗАКАЗАТЬ ПРОЕКТ
              </button>
              <div className="flex gap-5 text-sm text-mute">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-screen">
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
