import { Link } from 'react-router-dom'
import env from '../../config/env'

export default function Footer() {
  return (
    <footer className="bg-sb-charcoal text-sb-cream/70">
      <div className="section-container py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-sb-gold">
                <span className="font-display text-lg font-bold text-sb-gold">{env.logoText}</span>
              </div>
              <div>
                <p className="font-display text-lg font-bold text-sb-cream">{env.siteTitle}</p>
                <p className="text-xs tracking-widest text-sb-gold uppercase">{env.siteSubtitle}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Products crafted for {env.siteTitle} Barbershop. Premium grooming essentials for the modern gentleman.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-sb-gold uppercase">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="transition-colors hover:text-sb-gold">Shop All</Link></li>
              <li><Link to="/cart" className="transition-colors hover:text-sb-gold">Your Cart</Link></li>
              <li><Link to="/track-order" className="transition-colors hover:text-sb-gold">Track Order</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-sb-gold">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-sb-gold uppercase">Visit Us</h3>
            <ul className="space-y-2 text-sm">
              <li>{env.siteTitle} Barbershop</li>
              <li>{env.contactAddress}</li>
              <li>{env.contactHours}</li>
              <li>
                <a href={`tel:${env.contactPhone}`} className="transition-colors hover:text-sb-gold">{env.contactPhone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-sb-cream/10 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {env.siteTitle} / {env.siteSubtitle}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
