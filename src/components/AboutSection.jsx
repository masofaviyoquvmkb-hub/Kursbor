import Profile from './about/Profile'
import Stats from './about/Stats'
import Services from './about/Services'
import AiStudio from './about/AiStudio'
import Toolkit from './about/Toolkit'
import Partners from './about/Partners'
import Philosophy from './about/Philosophy'
import EndCard from './about/EndCard'

/**
 * «Обо мне» — creator profile.
 * All texts live in src/data/about.js; the photo is public/images/about/ravshan.jpg.
 */
export default function AboutSection({ onOrder }) {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-x-clip bg-ink">
      <Profile />
      <Stats />
      <Services />
      <AiStudio />
      <Toolkit />
      <Partners />
      <Philosophy />
      <EndCard onOrder={onOrder} />
    </section>
  )
}
