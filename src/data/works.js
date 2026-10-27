// Joins your real courses (courses.js) with the other works (projects.js)
// for «Избранные работы» and search. You don't need to edit this file.
import courses from './courses'
import { projects } from './projects'

const courseToWork = (c) => ({
  id: `course-${c.id}`,
  title: c.title,
  category: 'elearning',
  year: c.year,
  image: c.image,
  runtime: c.duration || 'Курс',
  watched: 0.6,
  summary: c.description,
  course: c, // clicking it opens the course itself
})

export const works = [...courses.map(courseToWork), ...projects]
