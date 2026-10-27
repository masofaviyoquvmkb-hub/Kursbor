// ─────────────────────────────────────────────────────────────
// KURSBOR — тексты и настройки сайта.
// Всё, что вы захотите поменять, находится здесь или в projects.js.
// Пути, начинающиеся с "/", ведут в папку /public.
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: 'KURSBOR',
  domain: 'kursbor.uz',
  tagline: 'Цифровые впечатления, которые хочется смотреть.',
}

// Фон главного экрана — ваше видео.
// • webm — лёгкая версия для Chrome / Android, mp4 — для Safari / iPhone.
// • image — кадр-обложка: показывается, пока видео грузится (и как фон блока «Начать проект»).
// Видео запускается без звука (браузеры запрещают автозвук), звук включается кнопкой.
// Чтобы убрать видео и оставить картинку, поставьте webm: '' и mp4: ''.
export const hero = {
  image: '/hero/hero.jpg',
  webm: '/hero/hero.webm',
  mp4: '/hero/hero.mp4',
  label: 'KURSBOR ПРЕДСТАВЛЯЕТ',
  // Заголовок: максимум 2 строки. titleAccent — слово, которое будет красным.
  // Вариант на замену: ['ВМЕСТЕ СОЗДАДИМ', 'СВОЙ NETFLIX.'] и titleAccent: 'NETFLIX'
  titleLines: ['СОЗДАЁМ ТО,', 'ЧТО ХОЧЕТСЯ СМОТРЕТЬ'],
  titleAccent: 'СМОТРЕТЬ',
  formats: ['Электронные курсы', 'Презентации', 'Видео', 'Reels', 'Креативный контент'],
  description:
    'Интерактивные курсы, сильные презентации и кинематографичный контент — чтобы ваши идеи невозможно было не заметить.',
}

// Меню. `filter` прокручивает к «Избранным работам» и показывает нужную категорию.
// Когда появятся отдельные страницы, замените `href` на адреса вроде '/courses'.
export const navLinks = [
  { label: 'ГЛАВНАЯ', href: '#top' },
  { label: 'МОИ РАБОТЫ', href: '#works', filter: 'all' },
  { label: 'КУРСЫ', href: '#courses' },
  { label: 'ВИДЕО', href: '#works', filter: 'video' },
  { label: 'ПРЕЗЕНТАЦИИ', href: '#works', filter: 'presentations' },
  { label: 'ОБО МНЕ', href: '#about' },
  { label: 'ЗАПИСАТЬСЯ НА КУРС', href: '#enroll' },
]

// Пять направлений в блоке «Что я создаю».
export const categories = [
  {
    id: 'elearning',
    title: 'ЭЛЕКТРОННЫЕ КУРСЫ',
    short: 'КУРСЫ',
    line: 'Интерактивное обучение',
    formats: 'Курсы, симуляции, тесты',
    image: '/create/elearning.jpg',
  },
  {
    id: 'presentations',
    title: 'ПРЕЗЕНТАЦИИ',
    short: 'ПРЕЗЕНТАЦИИ',
    line: 'Презентации, которые держат зал',
    formats: 'Питч, стратегия, выступление',
    image: '/create/presentations.jpg',
  },
  {
    id: 'video',
    title: 'ВИДЕО',
    short: 'ВИДЕО',
    line: 'Имиджевые фильмы и кинематографичный монтаж',
    formats: 'Бренд, мероприятие, объяснение',
    image: '/create/video.jpg',
  },
  {
    id: 'reels',
    title: 'REELS',
    short: 'REELS',
    line: 'Вертикальные истории для ленты',
    formats: 'Instagram, TikTok, Shorts',
    image: '/create/reels.jpg',
  },
  {
    id: 'love',
    title: 'Love story',
    short: 'Love story',
    line: 'Фильмы о двоих',
    formats: 'Свадьбы, предложения, годовщины',
    image: '/create/love-stories.jpg',
  },
]

// Форма «Заказать проект».
// endpoint пока пустой: при отправке текст заявки копируется, и у посетителя открывается ваш Telegram —
// ему остаётся вставить текст и нажать «Отправить».
// Позже сюда можно вставить адрес своего сервера, Telegram-бота или сервиса форм (например, Formspree):
// тогда заявка будет уходить туда POST-запросом в формате JSON { name, contact, types, message, source }.
export const order = {
  endpoint: '',
  types: ['Электронный курс', 'Презентация', 'Видео', 'Reels', 'Love story', 'AI-контент', 'Другое'],
}

// ─── Раздел «Записаться на курс» ───────────────────────────
// image — программа курса (public/images/enroll/program.jpg). Чтобы обновить, замените файл.
export const enroll = {
  label: 'ЗАПИСАТЬСЯ НА КУРС',
  titleLines: ['ЗА МЕСЯЦ', 'СДЕЛАЮ ИЗ ВАС', 'РАЗРАБОТЧИКА', 'ЭЛЕКТРОННЫХ КУРСОВ'],
  titleAccent: 'ЗА МЕСЯЦ',
  course: 'Онлайн-курс «Разработка электронных курсов»',
  facts: ['8 уроков', 'Онлайн в Zoom', 'Практика на каждом уроке', 'Готовый курс в конце обучения'],
  image: '/images/enroll/program.jpg',
  imageAlt:
    'Программа онлайн-курса «Разработка электронных курсов»: 8 уроков — от планирования и сценариев до ИИ-инструментов, iSpring Learn, дизайна в iSpring Suite, интерактивности и публикации курса.',
  cta: 'ОБСУДИТЬ ОБУЧЕНИЕ',
}

// ─── Контакты ───────────────────────────────────────────────
// Telegram — главный способ связи: на него ведут «НАЧАТЬ ПРОЕКТ» и форма заказа.
export const contacts = {
  telegram: { label: 'Telegram', href: 'https://t.me/ravshanjonnn', handle: '@ravshanjonnn' },
  instagram: {
    label: 'Instagram',
    href: 'https://www.instagram.com/invites/contact/?utm_content=tleh1d&exln=c5rg39a45w96',
  },
  // label — как номер показан на сайте, href — для звонка (tel: и цифры без пробелов)
  phones: [
    { label: '+998 91 504-02-12', href: 'tel:+998915040212' },
    { label: '+998 90 255-22-88', href: 'tel:+998902552288' },
  ],
  address: ['Ташкент,', 'Юнусабадский район,', '15/19/53'],
}

// Соцсети в меню на телефоне
export const socials = [contacts.telegram, contacts.instagram]

// Добавляет базовый путь Vite, чтобы сайт работал и из подпапки.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

// Названия, которые всегда пишутся именно так, даже там, где остальной текст заглавными.
export const keepCase = ['Love story']
export const caps = (text) => (keepCase.includes(text) ? text : text.toUpperCase())

// 'elearning' → 'ЭЛЕКТРОННЫЕ КУРСЫ' (short: 'КУРСЫ' — для меток на карточках)
export const categoryTitle = (id, short = false) => {
  const c = categories.find((x) => x.id === id)
  return c ? (short ? c.short : c.title) : id
}

// Русское склонение: plural(5, ['работа', 'работы', 'работ']) → 'работ'
export const plural = (n, [one, few, many]) => {
  const a = Math.abs(n) % 100
  const b = a % 10
  if (a > 10 && a < 20) return many
  if (b > 1 && b < 5) return few
  if (b === 1) return one
  return many
}
