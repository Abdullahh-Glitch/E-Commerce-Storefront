import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItemCount } from '../../store/cartSlice'
import env from '../../config/env'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartCount = useSelector(selectCartItemCount)

  const closeMenu = () => setIsMenuOpen(false)

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-colors ${
      isActive
        ? 'text-sb-gold'
        : 'text-sb-cream/80 hover:text-sb-gold'
    }`

  return (
    <header className="sticky top-0 z-50 bg-sb-charcoal shadow-lg">
      <div className="mx-auto w-full px-3 sm:px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-sb-gold bg-sb-charcoal sm:h-12 sm:w-12">
              <span className="font-display text-lg font-bold text-sb-gold sm:text-xl">
                {env.logoText}
              </span>
            </div>

            <div className="hidden sm:block">
              <p className="font-display text-lg font-bold leading-tight text-sb-cream">
                {env.siteTitle}
              </p>
              <p className="text-xs tracking-widest text-sb-gold uppercase">
                {env.siteSubtitle}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            <nav className="hidden items-center gap-6 md:flex">
              <NavLink to="/" end className={navLinkClass}>
                Shop
              </NavLink>

              <NavLink to="/track-order" className={navLinkClass}>
                Track
              </NavLink>

              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </nav>

            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-sb-cream/80 transition-colors hover:bg-sb-cream/5 hover:text-sb-gold"
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sb-gold px-1 text-xs font-bold text-sb-charcoal">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="rounded-lg p-2 text-sb-cream/80 transition-colors hover:bg-sb-cream/5 hover:text-sb-gold md:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M6 18L18 6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-sb-cream/10 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sb-gold/10 text-sb-gold'
                      : 'text-sb-cream/80 hover:bg-sb-cream/5 hover:text-sb-gold'
                  }`
                }
                onClick={closeMenu}
              >
                Shop
              </NavLink>

              <NavLink
                to="/track-order"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sb-gold/10 text-sb-gold'
                      : 'text-sb-cream/80 hover:bg-sb-cream/5 hover:text-sb-gold'
                  }`
                }
                onClick={closeMenu}
              >
                Track Order
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sb-gold/10 text-sb-gold'
                      : 'text-sb-cream/80 hover:bg-sb-cream/5 hover:text-sb-gold'
                  }`
                }
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}