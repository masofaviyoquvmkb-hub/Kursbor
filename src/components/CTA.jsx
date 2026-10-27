import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { brand, contacts, order } from '../data/site'
import { ease } from '../lib/motion'
import { ArrowRight, TelegramIcon } from './Icons'

const lines = ['ЕСТЬ ИДЕЯ?']

const field =
  'w-full rounded-[8px] bg-white/[0.04] px-4 py-3.5 text-[16px] text-screen ring-1 ring-white/12 transition-[box-shadow,background-color] duration-300 placeholder:text-screen/30 hover:ring-white/25 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-tally'

const Label = ({ htmlFor, children, hint }) => (
  <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between gap-3 text-[13px] font-medium text-screen/80">
    {children}
    {hint && <span className="text-[12px] font-normal text-mute">{hint}</span>}
  </label>
)

const Error = ({ id, children }) =>
  children ? (
    <p id={id} className="mt-2 text-[13px] text-tally">
      {children}
    </p>
  ) : null

/**
 * «Заказать проект» — order form. Every «ЗАКАЗАТЬ ПРОЕКТ» button on the site scrolls here.
 * Sending: if order.endpoint (src/data/site.js) is set, the request is POSTed there as JSON;
 * otherwise the request text is copied and Telegram opens on contacts.telegram — the visitor pastes and sends.
 */
export default function CTA() {
  const tg = contacts.telegram
  const [form, setForm] = useState({ name: '', contact: '', types: [], message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | telegram | failed
  const [copied, setCopied] = useState(false)
  const [text, setText] = useState('')

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }
  const toggleType = (t) =>
    setForm((f) => ({ ...f, types: f.types.includes(t) ? f.types.filter((x) => x !== t) : [...f.types, t] }))

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Укажите имя, чтобы я знал, как к вам обращаться.'
    if (!form.contact.trim()) er.contact = 'Оставьте Telegram, телефон или e-mail, иначе я не смогу ответить.'
    setErrors(er)
    if (er.name) document.getElementById('order-name')?.focus()
    else if (er.contact) document.getElementById('order-contact')?.focus()
    return !er.name && !er.contact
  }

  const requestText = () => {
    const out = ['Здравствуйте! Хочу заказать проект.', '', `Имя: ${form.name.trim()}`, `Контакт: ${form.contact.trim()}`]
    if (form.types.length) out.push(`Что нужно: ${form.types.join(', ')}`)
    if (form.message.trim()) out.push('', 'О проекте:', form.message.trim())
    return out.join('\n')
  }

  // Synchronous copy, so Telegram can open in the same tap (iPhone blocks new tabs opened after a wait).
  const copyNow = (t) => {
    try {
      const ta = document.createElement('textarea')
      ta.value = t
      ta.setAttribute('readonly', '')
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    if (!order.endpoint) {
      // Telegram can't prefill a message to a person, so the request is copied for the visitor to paste.
      const t = requestText()
      setText(t)
      const ok = copyNow(t)
      setCopied(ok)
      if (!ok) navigator.clipboard?.writeText(t).then(() => setCopied(true), () => {})
      window.open(tg.href, '_blank', 'noopener,noreferrer')
      setStatus('telegram')
      return
    }
    setStatus('sending')
    try {
      const r = await fetch(order.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, source: brand.domain }),
      })
      if (!r.ok) throw new Error(String(r.status))
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  const reset = () => {
    setForm({ name: '', contact: '', types: [], message: '' })
    setCopied(false)
    setText('')
    setStatus('idle')
  }

  const done = status === 'sent' || status === 'telegram'

  return (
    <section id="start" aria-labelledby="start-title" className="relative isolate overflow-hidden border-t border-white/10 bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_85%_60%,rgb(255_46_63/0.12),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-[1760px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:px-12">
        {/* left: invitation */}
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="type-wide mb-6 flex items-center gap-3 text-[11px] text-screen/70"
          >
            <span className="tally-dot" aria-hidden="true" />
            ЗАКАЗАТЬ ПРОЕКТ
          </motion.p>
          <motion.h2
            id="start-title"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="type-display text-[clamp(3.25rem,7vw,7rem)] text-screen"
          >
            {lines.map((line) => (
              <span key={line} className="block overflow-hidden -mt-[0.14em] pt-[0.14em] pb-[0.04em]">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
                  transition={{ duration: 1.1, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="mt-6 max-w-md text-[18px] leading-relaxed text-screen/75 sm:text-[20px]"
          >
            Давайте превратим её в то, что захочется смотреть. Расскажите коротко о задаче, а детали обсудим лично.
          </motion.p>

          <motion.a
            href={tg.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            className="group mt-10 flex w-fit flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/10 pt-6 text-[15px] text-screen/75 transition-colors hover:text-screen"
          >
            <TelegramIcon className="text-tally transition-transform duration-300 group-hover:scale-110" />
            Удобнее сразу написать?
            <span className="underline decoration-white/25 underline-offset-4 group-hover:decoration-tally">
              Telegram {tg.handle}
            </span>
          </motion.a>
        </div>

        {/* right: the form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="relative min-w-0 overflow-hidden rounded-[12px] bg-surface/80 p-5 shadow-[0_40px_120px_-50px_rgb(255_46_63/0.5)] ring-1 ring-white/10 sm:p-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease }}
                className="flex min-h-[420px] flex-col justify-center sm:min-h-[560px]"
                role="status"
              >
                <span className="tally-dot mb-6" aria-hidden="true" />
                <p className="type-display text-[clamp(2.25rem,4vw,3.5rem)] text-screen">
                  {status === 'sent' ? 'ЗАЯВКА ОТПРАВЛЕНА.' : 'ОСТАЛСЯ ОДИН ШАГ.'}
                </p>
                {status === 'sent' ? (
                  <p className="mt-4 max-w-md text-[16px] leading-relaxed text-screen/70">
                    Спасибо! Я свяжусь с вами по указанному контакту.
                  </p>
                ) : (
                  <>
                    <p className="mt-4 max-w-md text-[16px] leading-relaxed text-screen/70">
                      {copied
                        ? 'Текст заявки скопирован. В Telegram откроется чат со мной — вставьте текст и нажмите «Отправить».'
                        : 'Скопируйте текст заявки ниже. В Telegram откроется чат со мной — вставьте текст и нажмите «Отправить».'}{' '}
                      Если Telegram не открылся, нажмите кнопку ниже.
                    </p>
                    <pre className="mt-5 max-h-40 select-all overflow-auto whitespace-pre-wrap rounded-[8px] bg-white/[0.04] p-4 font-sans text-[14px] leading-relaxed text-screen/80 ring-1 ring-white/10">
                      {text}
                    </pre>
                    <a
                      href={tg.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-wide mt-5 flex w-fit items-center gap-2.5 rounded-[6px] bg-tally px-5 py-3 text-[12px] text-white transition-colors hover:bg-screen hover:text-ink"
                    >
                      <TelegramIcon width="18" height="18" />
                      ОТКРЫТЬ TELEGRAM
                    </a>
                  </>
                )}
                <button
                  type="button"
                  onClick={reset}
                  className="type-wide mt-8 w-fit rounded-[6px] px-5 py-3 text-[12px] text-screen ring-1 ring-white/25 transition-colors hover:bg-white/10"
                >
                  НОВАЯ ЗАЯВКА
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="order-name">Как вас зовут</Label>
                    <input
                      id="order-name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={set('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'order-name-error' : undefined}
                      placeholder="Имя"
                      className={field}
                    />
                    <Error id="order-name-error">{errors.name}</Error>
                  </div>
                  <div>
                    <Label htmlFor="order-contact">Как с вами связаться</Label>
                    <input
                      id="order-contact"
                      name="contact"
                      value={form.contact}
                      onChange={set('contact')}
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? 'order-contact-error' : undefined}
                      placeholder="Telegram, телефон или e-mail"
                      className={field}
                    />
                    <Error id="order-contact-error">{errors.contact}</Error>
                  </div>
                </div>

                <fieldset>
                  <legend className="mb-3 flex w-full items-baseline justify-between gap-3 text-[13px] font-medium text-screen/80">
                    Что нужно создать
                    <span className="text-[12px] font-normal text-mute">можно несколько</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {order.types.map((t) => {
                      const on = form.types.includes(t)
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleType(t)}
                          aria-pressed={on}
                          className={`rounded-full px-4 py-2.5 text-[14px] transition-colors duration-300 ${
                            on
                              ? 'bg-tally text-white ring-1 ring-tally'
                              : 'text-screen/75 ring-1 ring-white/15 hover:text-screen hover:ring-white/40'
                          }`}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <div>
                  <Label htmlFor="order-message" hint="необязательно">
                    Коротко о проекте
                  </Label>
                  <textarea
                    id="order-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Например: курс на 20 минут для сотрудников банка, нужен к декабрю"
                    className={`${field} resize-y`}
                  />
                </div>

                {status === 'failed' && (
                  <p className="rounded-[8px] bg-tally/10 px-4 py-3 text-[14px] text-screen ring-1 ring-tally/40" role="alert">
                    Заявка не отправилась — проверьте интернет и нажмите ещё раз. Или напишите в{' '}
                    <a href={tg.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                      Telegram
                    </a>
                    .
                  </p>
                )}

                <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="type-wide group flex items-center justify-center gap-3 rounded-[6px] bg-tally px-8 py-4 text-[13px] text-white shadow-[0_16px_50px_-15px_rgb(255_46_63/0.8)] transition-colors duration-300 hover:bg-screen hover:text-ink disabled:opacity-60"
                  >
                    {status === 'sending' ? 'ОТПРАВЛЯЕМ…' : 'ЗАКАЗАТЬ ПРОЕКТ'}
                    <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
                  </motion.button>
                  <p className="text-[12px] leading-snug text-mute sm:max-w-[16rem] sm:text-right">
                    {order.endpoint ? 'Заявка придёт мне напрямую.' : 'Текст заявки скопируется, и откроется мой Telegram.'}
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
