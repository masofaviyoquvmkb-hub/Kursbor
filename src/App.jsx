import { useCallback, useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatICreate from './components/WhatICreate'
import CoursesSection from './components/CoursesSection'
import CourseViewerModal from './components/CourseViewerModal'
import EmbedViewerModal from './components/EmbedViewerModal'
import EnrollSection from './components/EnrollSection'
import FeaturedWorks from './components/FeaturedWorks'
import AboutSection from './components/AboutSection'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'
import SearchOverlay from './components/SearchOverlay'
import { asset, enroll, navLinks } from './data/site'
import { afterUnlock, scrollToId } from './lib/dom'

const HOME = navLinks[0].label // 'ГЛАВНАЯ'
const ABOUT = navLinks.find((l) => l.href === '#about')?.label ?? '' // 'ОБО МНЕ'
const ENROLL = navLinks.find((l) => l.href === '#enroll')?.label ?? '' // 'ЗАПИСАТЬСЯ НА КУРС'
const COURSES = navLinks.find((l) => l.href === '#courses')?.label ?? '' // 'КУРСЫ'

// Which nav item to highlight for a given works filter.
const linkForFilter = (filter) =>
  navLinks.find((l) => l.filter === filter)?.label ?? navLinks.find((l) => l.filter === 'all').label

export default function App() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(HOME)
  const [project, setProject] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [course, setCourse] = useState(null) // course open in the viewer
  const [programOpen, setProgramOpen] = useState(false) // course program picture in the viewer

  const showWorks = useCallback((nextFilter = 'all') => {
    setFilter(nextFilter)
    setActive(linkForFilter(nextFilter))
    scrollToId('#works')
  }, [])

  const navigate = useCallback(
    (link) => {
      if (link.filter) return showWorks(link.filter)
      setActive(link.label)
      scrollToId(link.href)
    },
    [showWorks],
  )

  // Scroll-spy: the nav highlight follows the section in view.
  const filterRef = useRef(filter)
  filterRef.current = filter
  useEffect(() => {
    const map = { top: HOME, create: HOME, courses: COURSES, works: null, about: ABOUT, start: '', enroll: ENROLL }
    const pick = (id) => (id === 'works' ? linkForFilter(filterRef.current) : map[id])
    const middle = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(pick(e.target.id))),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    Object.keys(map).forEach((id) => {
      const el = document.getElementById(id)
      if (el) middle.observe(el)
    })
    return () => middle.disconnect()
  }, [])

  // Every «ЗАКАЗАТЬ ПРОЕКТ» lands on the order form; on desktop the first field gets focus.
  const letsWork = useCallback(() => {
    scrollToId('#start')
    if (window.matchMedia('(pointer: fine)').matches)
      window.setTimeout(() => document.getElementById('order-name')?.focus({ preventScroll: true }), 900)
  }, [])
  const closeProject = useCallback(() => setProject(null), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const closeCourse = useCallback(() => setCourse(null), [])
  const closeProgram = useCallback(() => setProgramOpen(false), [])

  // A tile in «Избранные работы» or search: real courses open the course, the rest open the project card.
  const openWork = useCallback((work) => (work.course ? setCourse(work.course) : setProject(work)), [])

  // «Электронные курсы» row goes to the course catalogue; other formats filter the works.
  const pickFormat = useCallback(
    (id) => {
      if (id === 'elearning' && document.getElementById('courses')) {
        setActive(COURSES)
        scrollToId('#courses')
      } else showWorks(id)
    },
    [showWorks],
  )

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#create"
        className="type-wide fixed left-4 top-4 z-[80] -translate-y-24 rounded bg-tally px-4 py-2 text-[12px] text-white focus:translate-y-0"
      >
        К СОДЕРЖАНИЮ
      </a>

      <Navbar active={active} onNavigate={navigate} onSearch={() => setSearchOpen(true)} onLetsWork={letsWork} />

      <main>
        <Hero
          onExplore={() => showWorks('all')}
          onScrollDown={() => scrollToId('#create')}
          onLetsWork={letsWork}
          suspended={Boolean(course) || programOpen}
        />
        <WhatICreate onSelect={pickFormat} />
        <CoursesSection onOpen={setCourse} />
        <FeaturedWorks
          filter={filter}
          onFilter={(f) => {
            setFilter(f)
            setActive(linkForFilter(f))
          }}
          onOpen={openWork}
        />
        <AboutSection onOrder={letsWork} />
        <CTA />
        <EnrollSection onOpenProgram={() => setProgramOpen(true)} />
      </main>

      <Footer onNavigate={navigate} />

      <ProjectModal project={project} onClose={closeProject} onStart={letsWork} />
      <SearchOverlay
        open={searchOpen}
        onClose={closeSearch}
        onOpenProject={openWork}
        onPickCategory={(id) => afterUnlock(() => pickFormat(id))}
      />
      <CourseViewerModal course={course} onClose={closeCourse} />
      <EmbedViewerModal
        item={
          programOpen
            ? {
                type: 'image',
                src: asset(enroll.image),
                alt: enroll.imageAlt,
                title: 'Программа курса',
                label: enroll.course,
                loadingText: 'Загружаем программу…',
              }
            : null
        }
        onClose={closeProgram}
      />

      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
