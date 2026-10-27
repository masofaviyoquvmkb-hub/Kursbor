import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { asset, hero } from '../data/site'
import { ease, fadeUp, intro } from '../lib/motion'
import { ArrowDown, PlayIcon } from './Icons'

const fmt = (s) => {
  const t = Math.max(0, Math.round(s || 0))
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
}

const SoundOnIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" />
    <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
  </svg>
)

const SoundOffIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" />
    <path d="m16 9.5 5 5M21 9.5l-5 5" />
  </svg>
)

/** Paints one word of the headline in the KURSBOR red (punctuation after it stays white). */
function AccentLine({ line, accent }) {
  const i = accent ? line.indexOf(accent) : -1
  if (i < 0) return line
  return (
    <>
      {line.slice(0, i)}
      <span className="text-tally">{accent}</span>
      {line.slice(i + accent.length)}
    </>
  )
}

/** Bottom bar of the hero: the video's real timeline, sound switch and scroll cue. */
function Timeline({ hasVideo, time, total, muted, onSound, onSeek, onScroll }) {
  const bar = useRef(null)
  const reduce = useReducedMotion()
  const pct = total ? Math.min((time / total) * 100, 100) : 0

  const seekAt = (clientX) => {
    const r = bar.current?.getBoundingClientRect()
    if (r) onSeek(Math.min(Math.max((clientX - r.left) / r.width, 0), 1) * total)
  }

  return (
    <motion.div {...fadeUp(intro.timeline, 0)} className="absolute inset-x-0 bottom-0 z-20 pb-4 sm:pb-6">
      <div className="mx-auto flex max-w-[1760px] items-center justify-between gap-3 px-5 sm:gap-5 sm:px-8 lg:px-12">
        {hasVideo && (
          <>
            <span className="hidden text-[11px] tabular-nums tracking-wide text-screen/60 sm:block">{fmt(time)}</span>
            <div
              ref={bar}
              role="slider"
              tabIndex={0}
              aria-label="Перемотка видео"
              aria-valuemin={0}
              aria-valuemax={Math.round(total)}
              aria-valuenow={Math.round(time)}
              aria-valuetext={fmt(time)}
              onPointerDown={(e) => seekAt(e.clientX)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') onSeek(Math.min(time + 1, total))
                if (e.key === 'ArrowLeft') onSeek(Math.max(time - 1, 0))
              }}
              className="group/bar relative hidden h-5 min-w-0 flex-1 cursor-pointer touch-none items-center sm:flex"
            >
              {/* hairline that thickens on hover, like a streaming player */}
              <div className="relative h-[2px] w-full rounded-full bg-white/15 transition-[height] duration-300 group-hover/bar:h-[4px]">
                <div className="absolute inset-y-0 left-0 rounded-full bg-tally" style={{ width: `${pct}%` }} />
                <div
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-tally shadow-[0_0_12px_rgb(255_46_63/0.8)] transition-transform duration-300 group-hover/bar:scale-100 group-focus-visible/bar:scale-100"
                  style={{ left: `${pct}%` }}
                />
              </div>
            </div>
            <span className="hidden text-[11px] tabular-nums tracking-wide text-screen/35 sm:block">{fmt(total)}</span>

            <button
              type="button"
              onClick={onSound}
              aria-pressed={!muted}
              className={`type-wide flex shrink-0 items-center gap-2 rounded-full py-2 pl-3 pr-3.5 text-[10px] transition-colors duration-300 sm:text-[10.5px] ${
                muted
                  ? 'text-screen/80 ring-1 ring-white/20 hover:bg-white/10 hover:text-screen'
                  : 'bg-tally text-white ring-1 ring-tally hover:bg-tally-deep'
              }`}
            >
              {muted ? <SoundOffIcon width="16" height="16" /> : <SoundOnIcon width="16" height="16" />}
              {muted ? 'ВКЛЮЧИТЬ ЗВУК' : 'ВЫКЛЮЧИТЬ ЗВУК'}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={onScroll}
          aria-label="Листайте вниз"
          className={`type-wide group flex shrink-0 items-center gap-2.5 text-[10.5px] text-screen/60 transition-colors hover:text-screen ${
            hasVideo ? '' : 'mx-auto'
          }`}
        >
          <span className={hasVideo ? 'hidden lg:inline' : ''}>ЛИСТАЙТЕ ВНИЗ</span>
          <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full ring-1 ring-white/20 transition-colors group-hover:ring-tally">
            <motion.span
              animate={reduce ? undefined : { y: [-12, 0, 0, 12] }}
              transition={{ duration: 2.2, times: [0, 0.35, 0.65, 1], repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown width="14" height="14" />
            </motion.span>
          </span>
        </button>
      </div>
    </motion.div>
  )
}

export default function Hero({ onExplore, onScrollDown, onLetsWork, suspended = false }) {
  const ref = useRef(null)
  const video = useRef(null)
  const reduce = useReducedMotion()
  const hasVideo = Boolean(hero.webm || hero.mp4)

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // "Cinema mode": while the video plays with sound, the headline steps aside.
  const cinema = playing && !muted

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '22%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-18%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  // Silent = ambient loop; with sound = one full viewing.
  useEffect(() => {
    const v = video.current
    if (!v) return
    v.muted = muted
    v.loop = muted
  }, [muted])

  // Play while the hero is on screen, pause once it scrolls away.
  useEffect(() => {
    const el = ref.current
    const v = video.current
    if (!el || !v) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || suspended) return v.pause()
        if (reduce && muted) return
        v.play().catch(() => {
          v.muted = true
          setMuted(true)
          v.play().catch(() => {})
        })
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce, muted, suspended])

  // A course (or any viewer) opened on top: go quiet and wait.
  useEffect(() => {
    const v = video.current
    if (!suspended || !v) return
    v.muted = true
    setMuted(true)
    v.pause()
  }, [suspended])

  // Never keep talking from a background tab.
  useEffect(() => {
    const onHide = () => document.hidden && !muted && video.current?.pause()
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [muted])

  // Smooth timeline while playing.
  useEffect(() => {
    if (!playing) return
    let id
    const tick = () => {
      if (video.current) setTime(video.current.currentTime)
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [playing])

  const toggleSound = useCallback(() => {
    const v = video.current
    if (!v) return
    const on = v.muted
    v.muted = !on
    setMuted(!on)
    if (on && v.paused) v.play().catch(() => {}) // inside a click, so sound is allowed
  }, [])

  // After a full viewing with sound, slip back into the silent loop.
  const onEnded = () => {
    const v = video.current
    if (!v) return
    v.muted = true
    setMuted(true)
    v.currentTime = 0
    if (!reduce) v.play().catch(() => {})
  }

  const seek = (t) => {
    const v = video.current
    if (!v) return
    v.currentTime = t
    setTime(t)
  }

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Главный экран"
      className="relative isolate h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink"
    >
      {/* 1 — background: your video (image while it loads) */}
      <motion.div
        style={{ y: bgY }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ opacity: { duration: 1.6, ease }, scale: { duration: 2.8, ease } }}
        className="absolute inset-0 -z-20"
      >
        {hasVideo ? (
          <video
            ref={video}
            className="h-full w-full object-cover object-[32%_center] md:object-center"
            poster={asset(hero.image)}
            muted
            loop
            playsInline
            preload="auto"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={onEnded}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
            aria-hidden="true"
          >
            {hero.webm && <source src={asset(hero.webm)} type="video/webm" />}
            {hero.mp4 && <source src={asset(hero.mp4)} type="video/mp4" />}
          </video>
        ) : (
          <img src={asset(hero.image)} alt="" className="h-full w-full object-cover" fetchPriority="high" />
        )}
      </motion.div>

      {/* Light, directional shading: dark only where the text sits, the video stays alive on the right.
          In cinema mode (sound on) it lifts almost completely. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* lower-left corner — behind the text (desktop); the upper half and the right stay untouched */}
        <motion.div
          animate={{ opacity: cinema ? 0.1 : 1 }}
          transition={{ duration: 1, ease }}
          className="absolute inset-0 hidden bg-[radial-gradient(ellipse_62%_72%_at_0%_100%,rgb(6_6_8/0.88)_0%,rgb(6_6_8/0.6)_42%,rgb(6_6_8/0.12)_72%,transparent_88%),linear-gradient(90deg,rgb(6_6_8/0.35)_0%,transparent_38%)] md:block"
        />
        {/* bottom — behind the text on phones, behind the controls everywhere */}
        <motion.div
          animate={{ opacity: cinema ? 0.5 : 1 }}
          transition={{ duration: 1, ease }}
          className="absolute inset-0 bg-[linear-gradient(0deg,rgb(6_6_8/0.92)_0%,rgb(6_6_8/0.72)_30%,rgb(6_6_8/0.15)_55%,transparent_70%)] md:bg-[linear-gradient(0deg,rgb(6_6_8/0.7)_0%,rgb(6_6_8/0.2)_14%,transparent_28%)]"
        />
        {/* top — just enough for the menu */}
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgb(6_6_8/0.55),transparent)]" />
      </div>

      {/* text block: left safe zone, never over the centre of the video */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1760px] flex-col justify-end px-5 pb-20 pt-24 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28"
      >
        <motion.div
          animate={{ opacity: cinema ? 0 : 1, y: cinema ? 24 : 0 }}
          transition={{ duration: 0.9, ease }}
          className={`max-w-[34rem] md:max-w-[min(44rem,58vw)] lg:max-w-[min(46rem,44vw)] ${cinema ? 'pointer-events-none' : ''}`}
          aria-hidden={cinema || undefined}
        >
          {/* label */}
          <motion.div
            {...fadeUp(intro.label, 10)}
            className="type-wide mb-5 inline-flex w-fit items-center gap-2.5 text-[10.5px] text-screen/85 sm:mb-6 sm:text-[11px]"
          >
            <span className="tally-dot" aria-hidden="true" />
            {hero.label}
          </motion.div>

          {/* headline — fade + slight rise, line by line */}
          <h1 className="type-display text-[clamp(2.15rem,9.4vw,3rem)] leading-[0.98] text-screen [text-shadow:0_2px_30px_rgb(0_0_0/0.45)] sm:text-[clamp(2.75rem,6.2vw,3.5rem)] md:text-[clamp(3rem,4.3vw,4.75rem)]">
            {hero.titleLines.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease, delay: intro.title + i * 0.15 }}
              >
                <AccentLine line={line} accent={hero.titleAccent} />
              </motion.span>
            ))}
          </h1>

          {/* formats + description: quieter than the headline */}
          <motion.p
            {...fadeUp(intro.formats, 10)}
            className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] font-medium text-screen/90 sm:mt-6 sm:text-[14px]"
          >
            {hero.formats.map((f, i) => (
              <span key={f} className="flex items-center gap-2.5">
                {i > 0 && <span className="h-[3px] w-[3px] rounded-full bg-tally" aria-hidden="true" />}
                {f}
              </span>
            ))}
          </motion.p>
          <motion.p
            {...fadeUp(intro.description, 10)}
            className="mt-3 max-w-[28rem] text-[14px] leading-relaxed text-screen/60 sm:text-[15px] md:max-w-[32rem]"
          >
            {hero.description}
          </motion.p>

          {/* buttons */}
          <motion.div {...fadeUp(intro.buttons, 10)} className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <motion.button
              type="button"
              onClick={onExplore}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="type-wide flex items-center gap-2.5 rounded-[6px] bg-tally px-5 py-3.5 text-[11.5px] text-white shadow-[0_10px_30px_-10px_rgb(255_46_63/0.7)] transition-colors duration-300 hover:bg-screen hover:text-ink sm:px-6 sm:text-[12px]"
            >
              <PlayIcon width="14" height="14" />
              СМОТРЕТЬ РАБОТЫ
            </motion.button>
            <motion.button
              type="button"
              onClick={onLetsWork}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="type-wide rounded-[6px] bg-black/25 px-5 py-3.5 text-[11.5px] text-screen ring-1 ring-white/30 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:ring-white/60 sm:px-6 sm:text-[12px]"
            >
              ЗАКАЗАТЬ ПРОЕКТ
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <Timeline
        hasVideo={hasVideo}
        time={time}
        total={duration}
        muted={muted}
        onSound={toggleSound}
        onSeek={seek}
        onScroll={onScrollDown}
      />
    </section>
  )
}
