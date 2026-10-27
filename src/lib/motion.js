// Shared motion language: one easing curve and one intro timeline.
export const ease = [0.22, 1, 0.36, 1]

// Page-entrance order (seconds): background → nav → label → title → text → buttons.
export const intro = {
  background: 0,
  nav: 0.55,
  frames: 0.9,
  label: 0.85,
  title: 1.05,
  formats: 1.55,
  description: 1.7,
  buttons: 1.85,
  timeline: 2.2,
}

export const fadeUp = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
})
