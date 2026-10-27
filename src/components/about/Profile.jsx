import { useState } from 'react'
import { motion } from 'framer-motion'
import { about } from '../../data/about'
import { asset } from '../../data/site'
import { ease } from '../../lib/motion'
import { Reveal } from './parts'

const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

function Portrait() {
  const [broken, setBroken] = useState(false)
  return (
    <Reveal className="relative mx-auto w-full max-w-[440px] md:mx-0 md:max-w-none" y={30}>
      {/* soft red glow behind the frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 bg-[radial-gradient(50%_50%_at_60%_45%,rgb(255_46_63/0.22),transparent_70%)] blur-2xl"
      />
      <figure className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-surface shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)] ring-1 ring-white/10">
        {!broken ? (
          <motion.img
            src={asset(about.photo)}
            alt={about.name}
            loading="lazy"
            onError={() => setBroken(true)}
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease }}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[radial-gradient(70%_60%_at_60%_40%,rgb(255_46_63/0.3),transparent_70%),linear-gradient(160deg,#17151c,#060608)]">
            <span className="type-display text-[9rem] text-screen/20">{initials(about.name)}</span>
          </div>
        )}
        {/* cinematic finish: soft vignette at the edges, faint red light, dark only behind the caption */}
        <div aria-hidden="true" className="absolute inset-0 shadow-[inset_0_0_120px_rgb(0_0_0/0.55)]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(60%_45%_at_100%_0%,rgb(255_46_63/0.14),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(0deg,rgb(6_6_8/0.92)_0%,rgb(6_6_8/0.6)_17%,rgb(6_6_8/0.15)_32%,transparent_42%)]"
        />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
          <div>
            <p className="type-wide flex items-center gap-2 text-[10.5px] text-screen/75">
              <span className="tally-dot" aria-hidden="true" />
              АВТОР KURSBOR
            </p>
            <p className="mt-1.5 text-[17px] font-semibold text-screen">{about.name}</p>
          </div>
        </figcaption>
      </figure>
    </Reveal>
  )
}

export default function Profile() {
  return (
    <div className="mx-auto max-w-[1760px] px-5 pt-24 sm:px-8 sm:pt-32 lg:px-12">
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <Portrait />

        <div className="min-w-0">
          <Reveal y={12}>
            <p className="type-wide mb-5 flex items-center gap-2.5 text-[11px] text-screen/80">
              <span className="tally-dot" aria-hidden="true" />
              ОБО МНЕ
            </p>
          </Reveal>

          <motion.h2
            id="about-title"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="type-display text-[clamp(3rem,6vw,6.25rem)] text-screen"
          >
            {about.name.toUpperCase().split(' ').map((word, i) => (
              <span key={word} className="block overflow-hidden -mt-[0.14em] pt-[0.14em] pb-[0.04em]">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
                  transition={{ duration: 1.05, ease, delay: i * 0.12 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <Reveal delay={0.2} y={12}>
            <p className="type-wide mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-screen/70 sm:text-[12px]">
              {about.roles.map((r, i) => (
                <span key={r} className="flex items-center gap-3">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-tally" aria-hidden="true" />}
                  {r.toUpperCase()}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 text-[clamp(1.4rem,2.2vw,2.1rem)] font-semibold leading-[1.15] tracking-[0.01em] text-screen">
              {(Array.isArray(about.lead) ? about.lead : [about.lead]).map((line) => {
                const i = about.leadAccent ? line.indexOf(about.leadAccent) : -1
                return (
                  <span key={line} className="block">
                    {i < 0 ? (
                      line
                    ) : (
                      <>
                        {line.slice(0, i)}
                        <span className="text-tally">{about.leadAccent}</span>
                        {line.slice(i + about.leadAccent.length)}
                      </>
                    )}
                  </span>
                )
              })}
            </p>
            <p className="mt-5 max-w-[36rem] text-[16px] leading-[1.7] text-screen/65 sm:text-[17px]">{about.bio}</p>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
