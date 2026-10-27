import { motion } from 'framer-motion'
import { about } from '../../data/about'
import { ease } from '../../lib/motion'
import { BlockTitle, Reveal, ServiceIcon } from './parts'

/** «Что я делаю»: five disciplines as tall tiles. */
export default function Services() {
  return (
    <div className="mx-auto max-w-[1760px] px-5 pt-24 sm:px-8 sm:pt-32 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <BlockTitle id="about-services">ЧТО Я ДЕЛАЮ</BlockTitle>
        <Reveal y={10}>
          <p className="max-w-sm text-[15px] leading-relaxed text-mute">
            Соединяю обучение, игру, видео, дизайн и AI в одном проекте.
          </p>
        </Reveal>
      </div>

      <ol aria-labelledby="about-services" className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {about.services.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.8, ease, delay: i * 0.08 }}
            className={`group relative flex min-h-0 flex-col overflow-hidden rounded-[10px] bg-surface/70 p-6 ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-[var(--ease-cine)] hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgb(255_46_63/0.5)] sm:min-h-[260px] xl:min-h-[300px] ${
              i === about.services.length - 1 && about.services.length % 2 ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
          >
            {/* hover light */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_110%,rgb(255_46_63/0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-tally transition-transform duration-700 ease-[var(--ease-cine)] group-hover:scale-x-100"
            />

            <div className="relative flex items-start justify-between">
              <span className="text-[13px] font-semibold tabular-nums text-mute">{String(i + 1).padStart(2, '0')}</span>
              <ServiceIcon
                name={s.icon}
                className="text-screen/70 transition-colors duration-500 group-hover:text-tally"
              />
            </div>
            <div className="relative mt-auto pt-8 sm:pt-10">
              <h4 className="type-display text-[2rem] leading-[0.95] text-screen">{s.title.toUpperCase()}</h4>
              <p className="mt-3 text-[15px] leading-relaxed text-screen/65">{s.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
