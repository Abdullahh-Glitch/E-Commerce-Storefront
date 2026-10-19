
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItemCount } from '../../store/cartSlice'
import env from '../../config/env'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/track-order', label: 'Track Order' },
  { to: '/contact', label: 'Contact' },
]

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H6"
      />
      <circle cx="10" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </svg>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartCount = useSelector(selectCartItemCount)

  const closeMenu = () => setIsMenuOpen(false)

  const navLinkClass = ({ isActive }) =>
    `relative inline-flex h-full items-center text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-sb-gold after:transition-transform after:duration-300 ${
      isActive
        ? 'text-sb-gold-dark after:scale-x-100'
        : 'text-sb-charcoal/70 after:scale-x-0 hover:text-sb-gold-dark hover:after:scale-x-100'
    }`

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Compact Announcement Strip */}
      <div className="relative flex min-h-7 items-center justify-center bg-sb-charcoal px-4 py-1.5 text-center">
        <p className="text-[9px] font-medium tracking-[0.16em] text-sb-cream/90 uppercase sm:text-[10px] sm:tracking-[0.2em]">
          {env.siteTagline}
        </p>
        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-sb-gold" />
      </div>

      {/* Main Header */}
      <div className="w-full border-b border-sb-gold/20">
        <div className="grid min-h-[64px] grid-cols-[1fr_auto] items-center gap-2 px-4 sm:px-7 lg:min-h-[70px] lg:grid-cols-[1fr_auto_1fr] lg:px-10 xl:px-14">
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            aria-label={`${env.siteTitle} home`}
            className="group flex min-w-0 items-center justify-self-start gap-2 sm:gap-2.5"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center bg-sb-charcoal transition-colors duration-300 group-hover:bg-sb-brown sm:h-10 sm:w-10">
              <span className="absolute inset-1 border border-sb-gold/70" />
              <span className="relative font-display text-sm font-semibold text-sb-gold sm:text-base">
                {env.logoText}
              </span>
            </span>

            <span className="min-w-0">
              <span className="block truncate font-display text-sm font-semibold leading-tight text-sb-charcoal sm:text-base lg:text-lg">
                {env.siteTitle}
              </span>
              <span className="mt-0.5 block truncate text-[8px] font-semibold tracking-[0.14em] text-sb-brown/70 uppercase sm:text-[9px]">
                {env.siteSubtitle}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden h-full items-center gap-6 lg:flex xl:gap-9"
          >
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Cart and Future Action */}
          <div className="flex items-center justify-self-end gap-1.5 sm:gap-2.5">
            <Link
              to="/cart"
              onClick={closeMenu}
              aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              className="relative flex h-9 w-9 items-center justify-center text-sb-charcoal transition-colors hover:text-sb-gold-dark"
            >
              <CartIcon />

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-sb-gold px-1 text-[9px] font-bold text-sb-charcoal ring-2 ring-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Future Action */}
            <button
              type="button"
              disabled
              title="We can configure this action later"
              className="hidden h-9 items-center justify-center border border-sb-gold bg-sb-gold px-3.5 text-[9px] font-bold tracking-[0.1em] text-sb-charcoal uppercase transition-colors hover:bg-sb-gold-dark lg:inline-flex xl:px-4"
            >
              Discover More
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center text-sb-charcoal transition-colors hover:text-sb-gold-dark lg:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 6 12 12M18 6 6 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-sb-gold/20 bg-white px-4 pb-3 pt-2 sm:px-7 lg:hidden"
          >
            <div className="flex flex-col">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `border-b border-sb-charcoal/5 px-2 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors ${
                      isActive
                        ? 'text-sb-gold-dark'
                        : 'text-sb-charcoal/75 hover:text-sb-gold-dark'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <Link
                to="/cart"
                onClick={closeMenu}
                className="flex items-center justify-between px-2 py-3 text-[11px] font-semibold tracking-[0.12em] text-sb-charcoal uppercase"
              >
                Shopping Cart
                {cartCount > 0 && (
                  <span className="bg-sb-gold px-2 py-1 text-[9px] tracking-normal">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
