// ─────────────────────────────────────────────────────────────
// Избранные работы — заглушки для видео, презентаций, Reels и Love story.
// Электронные курсы сюда добавлять не нужно: они берутся из courses.js автоматически.
//
// category: 'elearning' | 'presentations' | 'video' | 'reels' | 'love'
//           (должно совпадать с id в categories, src/data/site.js)
// image:    картинка 16:9 в /public/works/ (лучше 1280×720 или больше)
// runtime:  короткая подпись на превью (уроки, слайды, минуты…)
// watched:  0–1, насколько заполняется красная полоска при наведении
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 'pitch-deck',
    title: 'Питч-дек для инвесторов',
    category: 'presentations',
    year: 2026,
    image: '/works/pitch-deck.jpg',
    runtime: '24 слайда',
    watched: 0.4,
    summary: 'История на 24 слайда, построенная вокруг одной цифры и одной понятной просьбы.',
  },
  {
    id: 'brand-film',
    title: 'Горизонт — имиджевый фильм',
    category: 'video',
    year: 2026,
    image: '/works/brand-film.jpg',
    runtime: '2:40',
    watched: 0.78,
    summary: 'Фильм на две с половиной минуты, снятый в золотой час и смонтированный под один трек.',
  },
  {
    id: 'reels-series',
    title: 'Reels о студенческой жизни',
    category: 'reels',
    year: 2025,
    image: '/works/reels-series.jpg',
    runtime: '12 роликов',
    watched: 0.3,
    summary: 'Серия из двенадцати вертикальных роликов для запуска Instagram университета.',
  },
  {
    id: 'love-story',
    title: 'Мадина и Тимур',
    category: 'love',
    year: 2025,
    image: '/works/love-story.jpg',
    runtime: '4:12',
    watched: 0.55,
    summary: 'Свадебная история, рассказанная через письма, которые пара написала друг другу до свадьбы.',
  },
]
