import courses from '../data/courses'
import { plural } from '../data/site'
import SectionTitle from './SectionTitle'
import CourseCard from './CourseCard'

/**
 * Catalogue of e-learning courses. Everything it shows comes from src/data/courses.js.
 * One course → a wide featured card; two or more → a grid.
 */
export default function CoursesSection({ onOpen }) {
  if (!courses.length) return null
  const single = courses.length === 1

  return (
    <section id="courses" aria-labelledby="courses-title" className="relative bg-ink pt-8 pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1760px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
          <SectionTitle id="courses-title">ЭЛЕКТРОННЫЕ КУРСЫ</SectionTitle>
          <div className="max-w-sm text-[15px] leading-relaxed text-mute">
            <p>Электронные курсы, интерактивные сценарии и геймифицированное обучение. Курс открывается прямо здесь.</p>
            <p className="mt-2 text-screen/60">
              {courses.length} {plural(courses.length, ['курс', 'курса', 'курсов'])}
            </p>
          </div>
        </div>

        {single ? (
          <CourseCard course={courses[0]} onOpen={onOpen} variant="feature" />
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} onOpen={onOpen} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
