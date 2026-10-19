import { useState } from "react";
import env from "../config/env";

const storeCoordinates = "32.6332772,74.2046143";

const mapEmbedUrl = `https://maps.google.com/maps?q=${storeCoordinates}&z=16&output=embed`;

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${storeCoordinates}`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (submitted) setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  };

  const inputClass = (field) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-sb-charcoal transition-colors placeholder:text-sb-brown/50 focus:border-sb-gold-dark focus:outline-none focus:ring-2 focus:ring-sb-gold/20 ${
      errors[field] ? "border-red-400" : "border-sb-brown/25"
    }`;

  return (
    <div className="section-container py-8 sm:py-12">
      <div className="mb-10 text-center">
        <p className="mb-2 text-[10px] font-bold tracking-[0.22em] text-sb-gold-dark uppercase">
          Get In Touch
        </p>

        <h1 className="font-display text-3xl font-bold text-sb-charcoal sm:text-4xl">
          Contact Us
        </h1>

        <p className="mt-3 text-sb-brown/80">
          Have a question about our products? We'd love to hear from you.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          {submitted && (
            <div
              role="status"
              className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
            >
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold text-sb-charcoal"
              >
                Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass("name")}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />

              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-sb-charcoal"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass("email")}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />

              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-semibold text-sb-charcoal"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`${inputClass("message")} resize-none`}
                placeholder="How can we help you?"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />

              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-red-600">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto">
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl border border-sb-gold/20 bg-sb-charcoal p-6 text-sb-cream shadow-sm sm:p-8">
            <p className="text-[10px] font-bold tracking-[0.2em] text-sb-gold uppercase">
              Visit or Contact Us
            </p>

            <h2 className="mt-2 font-display text-xl font-bold text-sb-gold">
              {env.siteTitle} Barbershop
            </h2>

            <p className="mt-2 text-sm leading-6 text-sb-cream/85">
              Visit us for a cut and browse our {env.siteSubtitle} products in
              person.
            </p>

            <div className="mt-6 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-0.5 h-5 w-5 shrink-0 text-sb-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <div>
                  <p className="font-semibold text-white">Address</p>
                  <p className="mt-1 leading-6 text-sb-cream/85">
                    {env.contactAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-0.5 h-5 w-5 shrink-0 text-sb-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <a
                    href={`tel:${env.contactPhone}`}
                    className="mt-1 inline-block text-sb-cream/85 transition-colors hover:text-sb-gold"
                  >
                    {env.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-0.5 h-5 w-5 shrink-0 text-sb-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a
                    href={`mailto:${env.contactEmail}`}
                    className="mt-1 inline-block break-all text-sb-cream/85 transition-colors hover:text-sb-gold"
                  >
                    {env.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-0.5 h-5 w-5 shrink-0 text-sb-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <div>
                  <p className="font-semibold text-white">Hours</p>
                  <p className="mt-1 leading-6 text-sb-cream/85">
                    {env.contactHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Maps */}
          <div className="overflow-hidden rounded-xl border border-sb-brown/15 bg-white shadow-sm">
            <div className="relative h-64 bg-sb-cream sm:h-72">
              <iframe
                title="Safi Bhai Barbershop location on Google Maps"
                src={mapEmbedUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-base font-bold text-sb-charcoal">
                  Find Our Salon
                </p>
                <p className="mt-1 text-xs text-sb-brown/75">
                  Explore the area and locate our Salon.
                </p>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-sb-charcoal px-4 py-3 text-sm font-semibold text-sb-cream transition-colors hover:bg-sb-gold-dark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 18l6-6-6-6"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12h12"
                  />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}