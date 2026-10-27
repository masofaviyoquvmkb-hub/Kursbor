import { motion } from 'framer-motion'
import { brand, contacts, navLinks } from '../data/site'
import { ease } from '../lib/motion'
import { Wordmark } from './Navbar'
import { ArrowRight, ArrowUpRight, InstagramIcon, PhoneIcon, PinIcon, TelegramIcon } from './Icons'

const external = { target: '_blank', rel: 'noopener noreferrer' }

/** One contact row: icon, label, value. Big tap target on phones. */
function Row({ href, icon: Icon, label, value, primary = false }) {
  return (
    <a
      href={href}
      {...external}
      className={`group flex min-h-[64px] items-center gap-4 rounded-[10px] px-4 py-3.5 transition-[background-color,box-shadow,transform,opacity] duration-300 ease-[var(--ease-cine)] hover:-translate-y-0.5 sm:px-5 ${
        primary
          ? 'bg-tally/10 ring-1 ring-tally/50 hover:bg-tally/15 hover:ring-tally'
          : 'opacity-90 ring-1 ring-white/10 hover:opacity-100 hover:ring-tally/50'
      }`}
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
          primary ? 'bg-tally text-white' : 'bg-white/[0.06] text-screen/85 group-hover:text-tally'
        }`}
      >
        <Icon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] text-mute">{label}</span>
        <span className="block text-[16px] font-medium text-screen [overflow-wrap:anywhere] sm:text-[17px]">{value}</span>
      </span>
      <ArrowUpRight className="shrink-0 text-screen/40 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tally" />
    </a>
  )
}

/** Static info row (phones, address). */
function Info({ icon: Icon, label, children }) {
  return (
    <div className="flex min-h-[64px] items-start gap-4 rounded-[10px] px-4 py-3.5 ring-1 ring-white/10 sm:px-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/[0.06] text-screen/85">
        <Icon />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] text-mute">{label}</p>
        {children}
      </div>
    </div>
  )
}

/** Footer: cinematic contact block (Telegram first) + site map and copyright. */
export default function Footer({ onNavigate }) {
  const links = navLinks.slice(1) // всё, кроме «Главная»
  const { telegram, instagram, phones, address } = contacts

  return (
    <footer id="contacts" className="relative isolate overflow-hidden border-t border-white/10 bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%] bg-[radial-gradient(55%_70%_at_20%_0%,rgb(255_46_63/0.14),transparent_70%)]"
      />

      {/* contact block */}
      <div className="mx-auto grid max-w-[1760px] gap-12 px-5 pt-24 pb-16 sm:px-8 sm:pt-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20 lg:px-12">
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="type-wide mb-6 flex items-center gap-3 text-[11px] text-screen/70"
          >
            <span className="tally-dot" aria-hidden="true" />
            СВЯЗАТЬСЯ СО МНОЙ
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="type-display text-[clamp(3rem,6.5vw,7rem)] text-screen"
          >
            {['ДАВАЙТЕ НАЧНЁМ', 'СЛЕДУЮЩИЙ ПРОЕКТ.'].map((line, i) => (
              <span key={line} className="block overflow-hidden -mt-[0.14em] pt-[0.14em] pb-[0.04em]">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
                  transition={{ duration: 1.1, ease, delay: i * 0.14 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            className="mt-10"
          >
            <motion.a
              href={telegram.href}
              {...external}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="type-wide group inline-flex w-full items-center justify-center gap-3 rounded-[8px] bg-tally px-9 py-5 text-[14px] text-white shadow-[0_20px_60px_-15px_rgb(255_46_63/0.8)] transition-colors duration-300 hover:bg-screen hover:text-ink sm:w-auto sm:px-11 sm:py-6 sm:text-[15px]"
            >
              НАЧАТЬ ПРОЕКТ
              <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
            </motion.a>
            <p className="mt-4 text-[14px] text-mute">Откроется чат со мной в Telegram.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="min-w-0 space-y-3 self-end"
        >
          <Row href={telegram.href} primary icon={TelegramIcon} label={telegram.label} value={telegram.handle} />
          <Row href={instagram.href} icon={InstagramIcon} label={instagram.label} value="Профиль в Instagram" />
          <Info icon={PhoneIcon} label="Телефон">
            {phones.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="block w-fit py-1 text-[16px] font-medium tabular-nums text-screen underline decoration-transparent underline-offset-4 transition-colors hover:text-tally hover:decoration-tally sm:text-[17px]"
              >
                {p.label}
              </a>
            ))}
          </Info>
          <Info icon={PinIcon} label="Адрес">
            <address className="text-[16px] font-medium not-italic leading-snug text-screen [overflow-wrap:anywhere] sm:text-[17px]">
              {address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </Info>
        </motion.div>
      </div>

      {/* site map + copyright */}
      <div className="mx-auto max-w-[1760px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 border-t border-white/10 py-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Wordmark className="text-[clamp(3rem,7vw,5.5rem)]" />
            <p className="mt-3 max-w-sm text-[16px] text-screen/65">{brand.tagline}</p>
          </div>
          <nav aria-label="Меню в подвале">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate(l)
                    }}
                    className="type-wide text-[12px] text-screen/75 transition-colors hover:text-tally"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-[13px] text-mute">
          <p>© 2026 KURSBOR</p>
          <p>{brand.domain}</p>
        </div>
      </div>
    </footer>
  )
}
