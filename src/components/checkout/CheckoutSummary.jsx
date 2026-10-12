import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal, selectCartItemCount } from '../../store/cartSlice'

export default function CheckoutSummary({deliveryCharge = 0 }) {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const itemCount = useSelector(selectCartItemCount)

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 font-display text-xl font-bold text-sb-charcoal">
        Your Order
      </h2>

      <ul className="mb-4 max-h-64 space-y-3 overflow-y-auto border-b border-sb-charcoal/10 pb-4">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center gap-3 text-sm">
            <img
              src={item.image}
              alt={item.name}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium text-sb-charcoal">
                {item.name}
              </p>
              <p className="text-sb-brown/60">Qty: {item.quantity}</p>
            </div>
            <span className="font-semibold text-sb-charcoal">
              Rs {(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-sb-brown/70">Items ({itemCount})</span>
          <span className="font-medium">Rs {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sb-brown/70">Shipping</span>
          <span className="font-medium">Rs {deliveryCharge.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-sb-charcoal/10 pt-4 text-lg font-bold">
        <span className="text-sb-gold">
          Rs {(total + deliveryCharge).toFixed(2)}
        </span>
        <span className="text-sb-gold">Rs {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
