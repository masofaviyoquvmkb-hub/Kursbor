import { motion } from 'framer-motion'
import { ease } from '../lib/motion'

/** Section heading revealed from behind a mask the first time it scrolls into view.
 *  The observer sits on the (visible) heading, not on the masked text inside it. */
export default function SectionTitle({ children, id, className = '' }) {
  return (
    <motion.h2
      id={id}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-10% 0px' }}
      className={`type-display -mt-[0.14em] overflow-hidden pt-[0.14em] text-[clamp(2.5rem,7vw,6.5rem)] ${className}`}
    >
      <motion.span
        className="block pb-[0.05em]"
        variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
        transition={{ duration: 1, ease }}
      >
        {children}
      </motion.span>
    </motion.h2>
  )
}
