import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal, selectCartItemCount } from '../../store/cartSlice'

export default function CartSummary() {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const itemCount = useSelector(selectCartItemCount)

  if (items.length === 0) return null

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 font-display text-xl font-bold text-sb-charcoal">Order Summary</h2>

      <div className="space-y-3 border-b border-sb-charcoal/10 pb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-sb-brown/70">Items ({itemCount})</span>
          <span className="font-medium">Rs {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-sb-gold">Rs {total.toFixed(2)}</span>
      </div>

      <Link to="/checkout" className="btn-primary mt-6 w-full">
        Proceed to Checkout
      </Link>
      <p className="mt-3 text-center text-xs text-sb-brown/50">
        Demo checkout — no payment processing
      </p>
    </div>
  )
}
