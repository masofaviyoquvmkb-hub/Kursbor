import { useState } from 'react'
import { asset } from '../data/site'
import { PlayIcon } from './Icons'

/** Cover with a graceful fallback if the picture is missing or the path has a typo. */
function Cover({ course, className = '' }) {
  const [broken, setBroken] = useState(false)
  if (!course.image || broken) {
    return (
      <div
        className={`grid h-full w-full place-items-center bg-[radial-gradient(80%_80%_at_70%_30%,rgb(255_46_63/0.35),transparent_70%),linear-gradient(135deg,#17151c,#060608)] p-6 ${className}`}
      >
        <span className="type-display text-center text-[clamp(1.75rem,4vw,3rem)] text-screen/90">
          {course.title.toUpperCase()}
        </span>
      </div>
    )
  }
  return (
    <img
      src={asset(course.image)}
      alt=""
      loading="lazy"
      onError={() => setBroken(true)}
      className={`h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-cine)] group-hover:scale-[1.06] ${className}`}
    />
  )
}

const Meta = ({ course }) => {
  const bits = [course.duration, course.year].filter(Boolean)
  if (!bits.length) return null
  return <p className="text-[13px] tabular-nums text-mute">{bits.join(' · ')}</p>
}

const WatchButton = ({ big = false }) => (
  <span
    className={`type-wide inline-flex items-center gap-2.5 rounded-[6px] bg-tally text-white shadow-[0_12px_40px_-12px_rgb(255_46_63/0.8)] transition-colors duration-300 group-hover:bg-screen group-hover:text-ink ${
      big ? 'px-7 py-4 text-[13px]' : 'px-5 py-3 text-[12px]'
    }`}
  >
    <PlayIcon />
    СМОТРЕТЬ КУРС
  </span>
)

/**
 * One course card. Gets a course object from src/data/courses.js and calls onOpen(course).
 * variant="feature" — wide layout used when there is only one course.
 */
export default function CourseCard({ course, onOpen, variant = 'grid' }) {
  const open = () => onOpen(course)
  const label = `Смотреть курс «${course.title}»`

  if (variant === 'feature') {
    return (
      <article className="group grid items-center gap-8 md:grid-cols-[1.45fr_1fr] lg:gap-14">
        <button
          type="button"
          onClick={open}
          aria-label={label}
          className="relative block aspect-video w-full overflow-hidden rounded-[10px] bg-surface text-left ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-[var(--ease-cine)] hover:-translate-y-1 hover:shadow-[0_40px_100px_-30px_rgb(255_46_63/0.55)]"
        >
          <Cover course={course} />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-colors duration-500 group-hover:bg-black/30" />
          <span className="type-wide absolute left-4 top-4 flex items-center gap-2 rounded-[4px] bg-black/55 px-2.5 py-1.5 text-[11px] text-screen backdrop-blur-md">
            <span className="tally-dot" aria-hidden="true" />
            {course.category.toUpperCase()}
          </span>
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 scale-90 place-items-center rounded-full bg-tally text-white opacity-0 shadow-[0_0_60px_rgb(255_46_63/0.6)] transition-all duration-500 ease-[var(--ease-cine)] group-hover:scale-100 group-hover:opacity-100">
            <PlayIcon width="26" height="26" />
          </span>
        </button>

        <div className="min-w-0">
          {course.subtitle && <p className="type-wide mb-4 text-[11px] text-tally">{course.subtitle.toUpperCase()}</p>}
          <h3 className="type-display text-[clamp(2.75rem,6vw,5.5rem)] text-screen">{course.title.toUpperCase()}</h3>
          {course.description && (
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-screen/75 sm:text-[17px]">{course.description}</p>
          )}
          <div className="mt-4">
            <Meta course={course} />
          </div>
          <button type="button" onClick={open} className="mt-8 rounded-[6px]" aria-label={label}>
            <WatchButton big />
          </button>
        </div>
      </article>
    )
  }

  return (
    <article>
      <button
        type="button"
        onClick={open}
        aria-label={label}
        className="group block w-full text-left transition-transform duration-500 ease-[var(--ease-cine)] hover:-translate-y-1.5"
      >
        <div className="relative aspect-video overflow-hidden rounded-[8px] bg-surface ring-1 ring-white/10 transition-shadow duration-500 group-hover:shadow-[0_30px_80px_-30px_rgb(255_46_63/0.55)] group-hover:ring-white/25">
          <Cover course={course} />
          <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-colors duration-500 group-hover:bg-black/35" />
          <span className="type-wide absolute left-3 top-3 flex items-center gap-2 rounded-[4px] bg-black/55 px-2.5 py-1.5 text-[10px] text-screen backdrop-blur-md">
            <span className="tally-dot" aria-hidden="true" />
            {course.category.toUpperCase()}
          </span>
          <span className="absolute inset-x-0 bottom-0 flex justify-center pb-5 opacity-0 transition-all duration-500 ease-[var(--ease-cine)] group-hover:opacity-100 group-focus-visible:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0">
            <WatchButton />
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-[20px] font-semibold leading-tight text-screen">{course.title}</h3>
          {course.subtitle && <p className="type-wide mt-1.5 text-[11px] text-tally">{course.subtitle.toUpperCase()}</p>}
          {course.description && (
            <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-screen/65">{course.description}</p>
          )}
          <div className="mt-2">
            <Meta course={course} />
          </div>
        </div>
      </button>
    </article>
  )
}
