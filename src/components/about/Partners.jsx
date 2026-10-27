import { motion } from 'framer-motion'
import { about } from '../../data/about'
import { ease } from '../../lib/motion'
import { BlockTitle } from './parts'

/** «С кем я работал»: opening-credits style line with red markers. Horizontal on desktop, vertical on phones. */
export default function Partners() {
  const items = [...about.partners.map((p) => ({ ...p, more: false })), { name: about.partnersMore, kind: '', more: true }]

  return (
    <div className="mx-auto max-w-[1760px] px-5 pt-24 sm:px-8 sm:pt-32 lg:px-12">
      <BlockTitle id="about-partners">С КЕМ Я РАБОТАЛ</BlockTitle>

      <div className="relative mt-12 sm:mt-14">
        {/* the line draws itself */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.6, ease }}
          className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gradient-to-r from-white/30 via-white/20 to-transparent xl:block"
        />
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.6, ease }}
          className="absolute bottom-3 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-white/30 via-white/20 to-transparent xl:hidden"
        />

        <ol aria-labelledby="about-partners" className="grid gap-9 xl:grid-cols-5 xl:gap-6">
          {items.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, ease, delay: 0.3 + i * 0.15 }}
              className="group relative min-w-0 pl-9 xl:pl-0 xl:pt-10"
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full ring-4 ring-ink transition-transform duration-500 ease-[var(--ease-cine)] group-hover:scale-125 xl:top-0 ${
                  p.more ? 'bg-ink ring-offset-0 outline outline-1 outline-tally/70' : 'bg-tally shadow-[0_0_16px_rgb(255_46_63/0.6)]'
                }`}
              />
              {p.kind && <p className="type-wide text-[10.5px] text-mute">{p.kind.toUpperCase()}</p>}
              <p
                className={`type-display mt-2 text-[clamp(1.75rem,4vw,2.4rem)] leading-[0.95] [overflow-wrap:anywhere] xl:text-[clamp(1.5rem,1.9vw,2.4rem)] transition-[color,transform] duration-500 ease-[var(--ease-cine)] group-hover:translate-x-1 ${
                  p.more ? 'text-screen/40 group-hover:text-screen/70' : 'text-screen/80 group-hover:text-screen'
                }`}
              >
                {p.name.toUpperCase()}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  )
}
