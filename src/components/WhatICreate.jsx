import { asset, categories, plural } from '../data/site'
import { works } from '../data/works'
import SectionTitle from './SectionTitle'
import { ArrowRight } from './Icons'

export default function WhatICreate({ onSelect }) {
  const count = (id) => works.filter((p) => p.category === id).length

  return (
    <section id="create" aria-labelledby="create-title" className="relative bg-ink pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-[1760px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
          <SectionTitle id="create-title">ЧТО Я СОЗДАЮ</SectionTitle>
          <p className="max-w-xs text-[15px] leading-relaxed text-mute">
            Пять форматов и одна планка: это должно хотеться досмотреть до конца.
          </p>
        </div>
      </div>

      <ul className="group/list border-b border-white/10">
        {categories.map((c) => {
          const n = count(c.id)
          return (
            <li
              key={c.id}
              className="border-t border-white/10 transition-opacity duration-500 group-hover/list:opacity-40 hover:opacity-100!"
            >
              <button
                type="button"
                onClick={() => onSelect(c.id)}
                aria-label={`${c.title}: ${c.line}. Показать ${n} ${plural(n, ['работу', 'работы', 'работ'])}`}
                className="group relative block h-[132px] w-full overflow-hidden text-left sm:h-[160px] lg:h-[clamp(160px,19vh,210px)]"
              >
                {/* picture strip on the right, comes alive on hover */}
                <div className="absolute inset-y-0 right-0 w-full md:w-[60%]">
                  <img
                    src={asset(c.image)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full scale-100 object-cover opacity-35 transition-[transform,opacity] duration-[1400ms] ease-[var(--ease-cine)] group-hover:scale-110 group-hover:opacity-90 group-focus-visible:opacity-90 md:opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10 md:via-ink/40" />
                </div>

                {/* red key light + accent bar */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(50%_120%_at_0%_50%,rgb(255_46_63/0.22),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-tally transition-transform duration-700 ease-[var(--ease-cine)] group-hover:scale-y-100"
                />

                <div className="relative mx-auto flex h-full max-w-[1760px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
                  <div className="transition-transform duration-700 ease-[var(--ease-cine)] group-hover:translate-x-3 md:group-hover:translate-x-6">
                    <span className="type-display block text-[clamp(2.4rem,7vw,6rem)] text-screen">{c.title}</span>
                    <span className="mt-2 block text-[14px] text-mute transition-colors duration-500 group-hover:text-screen sm:text-[16px]">
                      {c.line}
                    </span>
                  </div>

                  <div className="flex items-center gap-8">
                    <span className="hidden text-right text-[13px] leading-snug text-screen/60 transition-opacity duration-500 group-hover:opacity-0 lg:block">
                      {c.formats}
                      <br />
                      <span className="text-mute">
                        {n} {plural(n, ['работа', 'работы', 'работ'])} в библиотеке
                      </span>
                    </span>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-screen opacity-60 transition-all duration-500 ease-[var(--ease-cine)] group-hover:border-tally group-hover:bg-tally group-hover:opacity-100 sm:h-14 sm:w-14 md:-translate-x-3 md:opacity-0 md:group-hover:translate-x-0 md:group-focus-visible:opacity-100">
                      <ArrowRight />
                    </span>
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
