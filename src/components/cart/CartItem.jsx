import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart, updateQuantity } from '../../store/cartSlice'

export default function CartItem({ item }) {
  const dispatch = useDispatch()

  return (
    <div className="flex gap-4 rounded-xl bg-white p-4 shadow-sm sm:gap-6 sm:p-5">
      <Link to={`/product/${item.productId}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-lg object-cover sm:h-24 sm:w-24"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              to={`/product/${item.productId}`}
              className="font-display text-base font-semibold text-sb-charcoal hover:text-sb-gold sm:text-lg"
            >
              {item.name}
            </Link>
            <p className="mt-1 text-sm text-sb-brown/70">Rs {item.price.toFixed(2)} each</p>
          </div>
          <button
            onClick={() => dispatch(removeFromCart(item.productId))}
            className="text-sb-brown/50 transition-colors hover:text-red-500"
            aria-label="Remove item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center rounded-lg border border-sb-charcoal/10">
            <button
              onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))}
              className="px-3 py-1.5 text-lg font-medium text-sb-charcoal transition-colors hover:bg-sb-cream"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-[2rem] px-2 text-center text-sm font-semibold">{item.quantity}</span>
            <button
              onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))}
              className="px-3 py-1.5 text-lg font-medium text-sb-charcoal transition-colors hover:bg-sb-cream"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="text-lg font-bold text-sb-charcoal">
            Rs {(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
