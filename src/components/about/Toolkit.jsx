import { motion } from 'framer-motion'
import { about } from '../../data/about'
import { ease } from '../../lib/motion'
import { BlockTitle, Reveal } from './parts'

/** «Инструменты»: grouped software with plain-language levels (no fake percentages). */
export default function Toolkit() {
  let n = 0
  return (
    <div className="mx-auto max-w-[1760px] px-5 pt-24 sm:px-8 sm:pt-32 lg:px-12">
      <BlockTitle id="about-tools">ИНСТРУМЕНТЫ</BlockTitle>

      <div className="mt-10 grid gap-x-10 gap-y-12 sm:mt-12 sm:grid-cols-2 xl:grid-cols-4">
        {about.tools.map((g) => (
          <div key={g.group} className="min-w-0">
            <Reveal y={10}>
              <p className="type-wide border-b border-white/15 pb-3 text-[10.5px] text-mute sm:text-[11px]">
                {g.group.toUpperCase()}
              </p>
            </Reveal>
            <ul>
              {g.items.map((t) => {
                const d = 0.05 * n++
                return (
                  <motion.li
                    key={t.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5% 0px' }}
                    transition={{ duration: 0.7, ease, delay: d }}
                    className="group flex items-center gap-4 border-b border-white/[0.07] py-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] bg-white/[0.05] text-[14px] font-semibold text-screen/85 ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-tally/15 group-hover:text-screen group-hover:ring-tally/60">
                      {t.mark}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-medium leading-snug text-screen">{t.name}</p>
                      {t.level && !t.pro && <p className="mt-0.5 text-[13px] text-mute">{t.level}</p>}
                    </div>
                    {t.pro && (
                      <span className="type-wide shrink-0 rounded-[4px] bg-tally px-2 py-1 text-[10.5px] text-white">
                        {t.level}
                      </span>
                    )}
                  </motion.li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
