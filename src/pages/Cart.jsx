import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../store/cartSlice'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'

export default function Cart() {
  const items = useSelector(selectCartItems)

  if (items.length === 0) {
    return (
      <div className="section-container py-20 text-center">
        <div className="mx-auto max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-sb-brown/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <h1 className="mt-6 font-display text-3xl font-bold text-sb-charcoal">Your Cart is Empty</h1>
          <p className="mt-3 text-sb-brown/70">
            Looks like you haven&apos;t added any products yet. Explore our barbershop collection.
          </p>
          <Link to="/" className="btn-primary mt-8 inline-flex">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="section-container py-8 sm:py-12">
      <h1 className="mb-8 font-display text-3xl font-bold text-sb-charcoal sm:text-4xl">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
          <Link to="/" className="btn-secondary mt-4 inline-flex text-sm">
            Continue Shopping
          </Link>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}
