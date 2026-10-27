import { motion } from 'framer-motion'
import { about } from '../../data/about'
import { asset, brand, hero } from '../../data/site'
import { ease } from '../../lib/motion'
import { ArrowRight } from '../Icons'

/** Closing frame of «Обо мне», styled like the last shot of a trailer. */
export default function EndCard({ onOrder }) {
  return (
    <div className="relative isolate mt-24 overflow-hidden sm:mt-36">
      {/* backdrop: dimmed key frame + red floor light */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img src={asset(hero.image)} alt="" loading="lazy" className="h-full w-full scale-110 object-cover opacity-25 blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_80%_at_50%_100%,rgb(255_46_63/0.3),transparent_70%)]" />
      </div>
      {/* letterbox bars */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-x-0 top-0 h-10 origin-top border-b border-white/[0.06] bg-black sm:h-14"
      />
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-x-0 bottom-0 h-10 origin-bottom border-t border-white/[0.06] bg-black sm:h-14"
      />

      <div className="mx-auto flex min-h-[80svh] max-w-[1760px] flex-col items-center justify-center px-5 py-28 text-center sm:px-8 sm:py-36 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="type-wide mb-8 text-[11px] text-screen/60"
        >
          {about.name.toUpperCase()} <span className="mx-2 text-tally">×</span> {brand.name}
        </motion.p>

        <motion.h3
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="type-display text-[clamp(2.75rem,8vw,8rem)] text-screen"
        >
          {about.ending.lines.map((line, i) => (
            <span key={line} className="block overflow-hidden -mt-[0.14em] pt-[0.14em] pb-[0.04em]">
              <motion.span
                className={`block ${i === 0 ? 'text-screen/55' : ''}`}
                variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
                transition={{ duration: 1.2, ease, delay: 0.15 + i * 0.25 }}
              >
                {line.toUpperCase()}
              </motion.span>
            </span>
          ))}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.7 }}
          className="mt-7 max-w-xl text-[17px] leading-relaxed text-screen/70 sm:text-[20px]"
        >
          {about.ending.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.85 }}
          className="mt-10"
        >
          <motion.button
            type="button"
            onClick={onOrder}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="type-wide group flex items-center gap-3 rounded-[6px] bg-tally px-8 py-4.5 text-[13px] text-white shadow-[0_20px_60px_-15px_rgb(255_46_63/0.8)] transition-colors duration-300 hover:bg-screen hover:text-ink sm:px-10 sm:py-5"
          >
            ЗАКАЗАТЬ ПРОЕКТ
            <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
