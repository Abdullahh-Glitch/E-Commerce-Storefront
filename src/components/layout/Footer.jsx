
import { Link } from 'react-router-dom'
import env from '../../config/env'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-sb-charcoal text-sb-cream/70">
      {/* Gold Accent */}
      <div className="h-[3px] w-full bg-sb-gold" />

      <div className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 xl:px-16 2xl:px-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-12 xl:gap-20">
          {/* Brand */}
          <div>
            <Link
              to="/"
              aria-label={`${env.siteTitle} home`}
              className="group mb-5 inline-flex items-center gap-3"
            >
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-sb-gold/70 transition-colors duration-300 group-hover:bg-sb-gold/10">
                <span className="absolute inset-1 border border-sb-gold/25" />
                <span className="relative font-display text-lg font-semibold text-sb-gold">
                  {env.logoText}
                </span>
              </span>

              <span>
                <span className="block font-display text-lg font-semibold leading-tight text-white sm:text-xl">
                  {env.siteTitle}
                </span>
                <span className="mt-1 block text-[9px] font-semibold tracking-[0.2em] text-sb-gold uppercase">
                  {env.siteSubtitle}
                </span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-sb-cream/60">
              Premium grooming essentials selected for the modern gentleman.
              Discover quality products designed to elevate your daily routine.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-8 bg-sb-gold" />
              <span className="text-[9px] font-semibold tracking-[0.2em] text-sb-gold/90 uppercase">
                {env.siteTagline}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold tracking-[0.18em] text-sb-gold uppercase">
              Explore
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-sb-gold"
                >
                  <span className="h-px w-0 bg-sb-gold transition-all duration-200 group-hover:w-3" />
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-sm transition-colors duration-200 hover:text-sb-gold"
                >
                  Your Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="text-sm transition-colors duration-200 hover:text-sb-gold"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm transition-colors duration-200 hover:text-sb-gold"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold tracking-[0.18em] text-sb-gold uppercase">
              Get in Touch
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-sb-gold" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s7-5.25 7-12a7 7 0 1 0-14 0c0 6.75 7 12 7 12Z"
                    />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-semibold tracking-wider text-sb-cream/40 uppercase">
                    Address
                  </p>
                  <p className="leading-6 text-sb-cream/70">
                    {env.contactAddress}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-sb-gold" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7v5l3 2"
                    />
                  </svg>
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-semibold tracking-wider text-sb-cream/40 uppercase">
                    Business Hours
                  </p>
                  <p className="leading-6 text-sb-cream/70">
                    {env.contactHours}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-sb-gold" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5.5A2.5 2.5 0 0 1 5.5 3H8l2 5-2.5 1.5a14 14 0 0 0 7 7L16 14l5 2v2.5a2.5 2.5 0 0 1-2.5 2.5A18.5 18.5 0 0 1 3 5.5Z"
                    />
                  </svg>
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-semibold tracking-wider text-sb-cream/40 uppercase">
                    Phone
                  </p>
                  <a
                    href={`tel:${env.contactPhone}`}
                    className="transition-colors duration-200 hover:text-sb-gold"
                  >
                    {env.contactPhone}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-sb-cream/10 pt-5 sm:mt-12 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <p className="text-center text-[10px] leading-5 text-sb-cream/45 sm:text-left">
            © {currentYear} {env.siteTitle}. All rights reserved.
          </p>

          <Link
            to="/"
            className="mt-2 block text-center text-[9px] font-semibold tracking-[0.16em] text-sb-gold/80 uppercase transition-colors hover:text-sb-gold sm:mt-0 sm:text-right"
          >
            Crafted with care
          </Link>
        </div>
      </div>
    </footer>
  )
}
