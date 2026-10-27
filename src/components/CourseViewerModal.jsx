import EmbedViewerModal from './EmbedViewerModal'

/**
 * Opens an iSpring Cloud course on top of KURSBOR.
 * Gets a course object from src/data/courses.js — only its embedUrl, title and category are used here.
 */
export default function CourseViewerModal({ course, onClose }) {
  const item = course
    ? {
        type: 'iframe',
        src: course.embedUrl,
        title: course.title,
        label: course.category,
        loadingText: 'Загружаем курс…',
      }
    : null

  return <EmbedViewerModal item={item} onClose={onClose} />
}
