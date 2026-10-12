import { useState } from 'react'
import env from '../config/env'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!form.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
    setErrors({})
  }

  return (
    <div className="section-container py-8 sm:py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-sb-charcoal sm:text-4xl">Contact Us</h1>
        <p className="mt-3 text-sb-brown/70">
          Have a question about our products? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          {submitted && (
            <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800">
              Thank you for your message! We&apos;ll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-sb-charcoal">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-sm transition-colors focus:border-sb-gold focus:outline-none focus:ring-2 focus:ring-sb-gold/20 ${
                  errors.name ? 'border-red-400' : 'border-sb-charcoal/10'
                }`}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-sb-charcoal">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-sm transition-colors focus:border-sb-gold focus:outline-none focus:ring-2 focus:ring-sb-gold/20 ${
                  errors.email ? 'border-red-400' : 'border-sb-charcoal/10'
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-sb-charcoal">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`w-full resize-none rounded-lg border bg-white px-4 py-3 text-sm transition-colors focus:border-sb-gold focus:outline-none focus:ring-2 focus:ring-sb-gold/20 ${
                  errors.message ? 'border-red-400' : 'border-sb-charcoal/10'
                }`}
                placeholder="How can we help you?"
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto">
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl bg-sb-charcoal p-6 text-sb-cream sm:p-8">
            <h2 className="font-display text-xl font-bold text-sb-gold">{env.siteTitle} Barbershop</h2>
            <p className="mt-2 text-sm text-sb-cream/70">Visit us for a cut and browse our {env.siteSubtitle} products in person.</p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-sb-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-sb-cream/70">{env.contactAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-sb-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href={`tel:${env.contactPhone}`} className="text-sb-cream/70 transition-colors hover:text-sb-gold">{env.contactPhone}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-sb-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-semibold">Email</p>
                  <a href={`mailto:${env.contactEmail}`} className="text-sb-cream/70 transition-colors hover:text-sb-gold">{env.contactEmail}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-sb-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold">Hours</p>
                  <p className="text-sb-cream/70">{env.contactHours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-md">
            <div className="flex h-48 items-center justify-center bg-sb-cream sm:h-56">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-sb-brown/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="mt-2 text-sm text-sb-brown/50">Map placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
