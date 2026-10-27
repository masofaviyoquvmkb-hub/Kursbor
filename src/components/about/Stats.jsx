import { about } from '../../data/about'
import { CountUp, Reveal } from './parts'

/** Profile statistics: big numbers in one band, count up on first view. */
export default function Stats() {
  return (
    <div className="mt-20 border-y border-white/10 sm:mt-28">
      <div className="mx-auto max-w-[1760px] px-5 sm:px-8 lg:px-12">
        <dl className="grid grid-cols-2 gap-y-10 py-10 md:grid-cols-5 md:gap-y-0 md:py-0">
          {about.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={0.08 * i}
              className={`flex flex-col-reverse md:border-white/10 md:py-12 md:pl-8 lg:pl-10 ${
                i === 0 ? 'md:!pl-0' : 'md:border-l'
              } ${i === about.stats.length - 1 && about.stats.length % 2 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <dt className="type-wide mt-3 max-w-[14rem] text-[10.5px] leading-snug text-mute sm:text-[11px]">
                {s.label.toUpperCase()}
              </dt>
              <dd className="type-display text-[clamp(3.25rem,6vw,6rem)] leading-[0.85] text-screen">
                {s.text ? (
                  <span className="text-tally">{s.text}</span>
                ) : (
                  <>
                    <CountUp to={s.value} delay={0.1 + 0.08 * i} />
                    <span className="text-tally">{s.suffix}</span>
                  </>
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
      {about.alsoMade?.length > 0 && (
        <div className="border-t border-white/10">
          <Reveal
            y={10}
            className="mx-auto flex max-w-[1760px] flex-col gap-x-4 gap-y-2 px-5 py-5 text-[14px] text-screen/65 sm:flex-row sm:flex-wrap sm:items-center sm:px-8 lg:px-12"
          >
            <span className="text-mute">Также в портфолио:</span>
            {about.alsoMade.map((t, i) => (
              <span key={t} className="flex items-center gap-4">
                {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" aria-hidden="true" />}
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      )}
    </div>
  )
}
