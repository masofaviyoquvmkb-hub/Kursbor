import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { about } from '../../data/about'
import { asset, hero } from '../../data/site'
import { ease } from '../../lib/motion'
import { Reveal } from './parts'

/** A few seconds of the hero video, looped, playing only while visible. */
function Clip() {
  const box = useRef(null)
  const video = useRef(null)
  const reduce = useReducedMotion()
  const { from, to } = about.quoteClip

  useEffect(() => {
    const v = video.current
    const el = box.current
    if (!v || !el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduce) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])

  if (!hero.webm && !hero.mp4) return null

  return (
    <Reveal y={30} delay={0.15}>
      <div
        ref={box}
        className="relative aspect-video overflow-hidden rounded-[10px] bg-surface shadow-[0_40px_120px_-40px_rgb(255_46_63/0.45)] ring-1 ring-white/10"
      >
        <video
          ref={video}
          className="h-full w-full object-cover"
          poster={asset(hero.image)}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = from
          }}
          onTimeUpdate={(e) => {
            const v = e.currentTarget
            if (v.currentTime >= to || v.currentTime < from - 0.5) v.currentTime = from
          }}
          onEnded={(e) => {
            e.currentTarget.currentTime = from
            e.currentTarget.play().catch(() => {})
          }}
        >
          {hero.webm && <source src={asset(hero.webm)} type="video/webm" />}
          {hero.mp4 && <source src={asset(hero.mp4)} type="video/mp4" />}
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" />
      </div>
    </Reveal>
  )
}

/** Big philosophy quote next to a fragment of the showreel. */
export default function Philosophy() {
  return (
    <div className="mx-auto mt-24 grid max-w-[1760px] items-center gap-12 px-5 sm:mt-36 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-12">
      <figure className="min-w-0">
        <motion.blockquote
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="type-display text-[clamp(2.25rem,4.4vw,4.5rem)] leading-[0.98]"
        >
          {about.quote.map((stanza, si) => (
            <p key={si} className={si === 0 ? 'text-screen/40' : 'mt-5 text-screen'}>
              {stanza.map((line, li) => (
                <span key={line} className="block overflow-hidden -mt-[0.14em] pt-[0.14em] pb-[0.05em]">
                  <motion.span
                    className="block"
                    variants={{ hidden: { y: '105%', opacity: 0 }, shown: { y: 0, opacity: 1 } }}
                    transition={{ duration: 1.05, ease, delay: si * 0.35 + li * 0.12 }}
                  >
                    {line.toUpperCase()}
                  </motion.span>
                </span>
              ))}
            </p>
          ))}
        </motion.blockquote>
        <Reveal delay={0.6} y={8}>
          <figcaption className="type-wide mt-8 flex items-center gap-3 text-[11px] text-mute">
            <span className="h-px w-8 bg-tally" aria-hidden="true" />
            {about.name.toUpperCase()}
          </figcaption>
        </Reveal>
      </figure>

      <Clip />
    </div>
  )
}
