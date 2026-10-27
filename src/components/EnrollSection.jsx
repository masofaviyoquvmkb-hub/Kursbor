import { motion } from 'framer-motion'
import { asset, contacts, enroll } from '../data/site'
import { ease } from '../lib/motion'
import { ArrowRight, TelegramIcon } from './Icons'

const external = { target: '_blank', rel: 'noopener noreferrer' }

const ExpandIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </svg>
)

/** Red Telegram CTA, used at the top and the bottom of the section. */
function TelegramButton({ big = false }) {
  return (
    <motion.a
      href={contacts.telegram.href}
      {...external}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`type-wide group inline-flex w-full items-center justify-center gap-3 rounded-[8px] bg-tally text-white shadow-[0_20px_60px_-15px_rgb(255_46_63/0.8)] transition-colors duration-300 hover:bg-screen hover:text-ink sm:w-auto ${
        big ? 'px-9 py-5 text-[14px] sm:px-11 sm:py-6 sm:text-[15px]' : 'px-8 py-4.5 text-[13px]'
      }`}
    >
      <TelegramIcon width="20" height="20" />
      {enroll.cta}
      <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
    </motion.a>
  )
}

/** «Записаться на курс»: the promise, the program picture and a Telegram CTA. */
export default function EnrollSection({ onOpenProgram }) {
  return (
    <section id="enroll" aria-labelledby="enroll-title" className="relative isolate overflow-hidden border-t border-white/10 bg-ink">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(50%_60%_at_15%_0%,rgb(255_46_63/0.16),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-[radial-gradient(60%_60%_at_50%_100%,rgb(255_46_63/0.12),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-[1760px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        {/* promise + CTA */}
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-16">
          <div className="min-w-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              className="type-wide mb-6 flex items-center gap-3 text-[11px] text-screen/70"
            >
              <span className="tally-dot" aria-hidden="true" />
              {enroll.label}
            </motion.p>
            <motion.h2
              id="enroll-title"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="type-display text-[clamp(2.75rem,6vw,6.5rem)] text-screen"
            >
              {enroll.titleLines.map((line, i) => (
                <span key={line} className="block overflow-hidden -mt-[0.14em] pt-[0.14em] pb-[0.04em]">
                  <motion.span
                    className={`block ${line === enroll.titleAccent ? 'text-tally' : ''}`}
                    variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
                    transition={{ duration: 1.1, ease, delay: i * 0.13 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.25 }}
            className="min-w-0"
          >
            <p className="text-[18px] font-semibold leading-snug text-screen sm:text-[20px]">{enroll.course}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-[15px] text-screen/75">
              {enroll.facts.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-tally" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TelegramButton big />
              <p className="mt-3 text-[14px] text-mute">Откроется чат со мной в Telegram.</p>
            </div>
          </motion.div>
        </div>

        {/* course program picture */}
        <div className="mt-16 sm:mt-20">
          <div className="mx-auto max-w-[1312px]">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <h3 className="type-wide text-[11px] text-screen/80 sm:text-[12px]">ПРОГРАММА КУРСА</h3>
              <button
                type="button"
                onClick={onOpenProgram}
                className="type-wide flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] text-screen/80 ring-1 ring-white/20 transition-colors hover:text-screen hover:ring-tally"
              >
                <ExpandIcon width="15" height="15" />
                ОТКРЫТЬ НА ВЕСЬ ЭКРАН
              </button>
            </div>

            <motion.button
              type="button"
              onClick={onOpenProgram}
              aria-label="Открыть программу курса на весь экран"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1.1, ease }}
              className="group relative block w-full overflow-hidden rounded-[12px] bg-surface text-left shadow-[0_50px_140px_-50px_rgb(255_46_63/0.55)] ring-1 ring-white/10 transition-[box-shadow] duration-500 hover:ring-white/25"
            >
              <img
                src={asset(enroll.image)}
                alt={enroll.imageAlt}
                width="1312"
                height="1199"
                loading="lazy"
                className="block h-auto w-full"
              />
              <span className="pointer-events-none absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-screen opacity-0 ring-1 ring-white/20 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:right-5 sm:top-5">
                <ExpandIcon />
              </span>
            </motion.button>
            <p className="mt-3 text-center text-[13px] text-mute sm:hidden">Нажмите на программу, чтобы открыть её крупнее.</p>
          </div>
        </div>

        {/* closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="mx-auto mt-14 flex max-w-[1312px] flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center"
        >
          <p className="max-w-xl text-[17px] leading-relaxed text-screen/75 sm:text-[18px]">
            Остались вопросы о программе или формате? Напишите мне в Telegram — расскажу подробнее.
          </p>
          <TelegramButton />
        </motion.div>
      </div>
    </section>
  )
}
