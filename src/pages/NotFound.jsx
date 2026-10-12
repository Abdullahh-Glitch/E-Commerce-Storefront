import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="section-container py-20 text-center">
      <h1 className="font-display text-3xl font-bold text-sb-charcoal">Page Not Found</h1>
      <p className="mt-3 text-sb-brown/70">The page you are looking for is unavailable.</p>
      <Link to="/" className="btn-primary mt-8 inline-flex">Back to Shop</Link>
    </div>
  )
}
