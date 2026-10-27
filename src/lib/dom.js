import { useEffect } from 'react'

/** Smooth-scrolls to an element id ('#works' or 'works'); '#top' goes to the page top. */
export function scrollToId(id, block = 'start') {
  const clean = id.replace(/^#/, '')
  if (!clean || clean === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(clean)?.scrollIntoView({ behavior: 'smooth', block })
}

/**
 * Runs `fn` right after an overlay has closed and released the page,
 * so a scroll started from inside the overlay isn't lost.
 */
export const afterUnlock = (fn) => window.setTimeout(fn, 40)

// One shared lock, so overlays can hand over to each other without the page jumping.
const lock = { count: 0, y: 0, saved: null }

/**
 * Freezes the page under an overlay and puts the visitor back on exactly the same spot afterwards.
 * Pins <body> in place (works on iPhone too, where overflow:hidden alone doesn't stop scrolling).
 */
export function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return
    const body = document.body
    const html = document.documentElement

    if (lock.count === 0) {
      lock.y = window.scrollY
      const s = body.style
      lock.saved = {
        position: s.position,
        top: s.top,
        left: s.left,
        right: s.right,
        width: s.width,
        overflow: s.overflow,
        paddingRight: s.paddingRight,
      }
      const gap = window.innerWidth - html.clientWidth
      Object.assign(s, {
        position: 'fixed',
        top: `-${lock.y}px`,
        left: '0',
        right: '0',
        width: '100%',
        overflow: 'hidden',
      })
      if (gap > 0) s.paddingRight = `${gap}px`
    }
    lock.count += 1

    return () => {
      lock.count -= 1
      if (lock.count > 0) return
      Object.assign(body.style, lock.saved)
      // jump back instantly (the page normally scrolls smoothly)
      const behavior = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'
      window.scrollTo(0, lock.y)
      html.style.scrollBehavior = behavior
    }
  }, [locked])
}

/** Calls handler when Escape is pressed while `active`. */
export function useEscape(active, handler) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && handler()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, handler])
}
