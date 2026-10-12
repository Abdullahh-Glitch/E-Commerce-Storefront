import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { selectLastOrder } from '../store/orderSlice'

export default function OrderConfirmation() {
  const order = useSelector(selectLastOrder)

  if (!order) {
    return <Navigate to="/" replace />
  }

  const orderDate = new Date(order.placedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="section-container py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="font-display text-3xl font-bold text-sb-charcoal sm:text-4xl">
          Order Placed!
        </h1>
        <p className="mt-3 text-sb-brown/70">
          Thank you, {order.customer.fullName}. Your order has been received.
        </p>
        <p className="mt-1 text-sm text-sb-brown/50">
          Order ID:{" "}
          <span className="font-semibold text-sb-charcoal">
            {order.orderId}
          </span>{" "}
          &middot; {orderDate}
        </p>
        <p className="mt-2 text-sm">
          Status:{" "}
          <span className="font-semibold capitalize text-green-600">
            {order.status}
          </span>
        </p>

        {order.trackingNumber && (
          <div className="mt-6 rounded-xl bg-sb-charcoal p-5 text-sb-cream">
            <p className="text-sm text-sb-cream/70">Your Tracking Number</p>
            <p className="mt-1 font-mono text-2xl font-bold text-sb-gold">
              {order.trackingNumber}
            </p>
            <Link
              to="/track-order"
              className="mt-3 inline-block text-sm text-sb-gold hover:underline"
            >
              Track your order anytime
            </Link>
          </div>
        )}
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-6">
        <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 font-display text-lg font-bold text-sb-charcoal">
            Shipping Details
          </h2>
          <div className="space-y-1 text-sm text-sb-brown/80">
            <p className="font-medium text-sb-charcoal">
              {order.customer.fullName}
            </p>
            <p>{order.customer.address}</p>
            <p>
              {order.customer.city}, {order.customer.postalCode}
            </p>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
            {order.customer.notes && (
              <p className="mt-3 border-t border-sb-charcoal/10 pt-3 text-sb-brown/60">
                <span className="font-medium text-sb-charcoal">Notes:</span>{" "}
                {order.customer.notes}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 font-display text-lg font-bold text-sb-charcoal">
            Order Items
          </h2>
          <ul className="space-y-3">
            {order.items.map((item) => (
              <li
                key={item.productId}
                className="flex items-center gap-4 text-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sb-charcoal">{item.name}</p>
                  <p className="text-sb-brown/60">
                    Qty: {item.quantity} &times; Rs {item.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-semibold text-sb-charcoal">
                  Rs {(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3 border-t border-sb-charcoal/10 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-sb-brown/70">Subtotal</span>
              <span className="font-medium text-sb-charcoal">
                Rs {order.subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sb-brown/70">Delivery</span>
              <span className="font-medium text-sb-charcoal">
                Rs {order.delivery.charge.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between border-t border-sb-charcoal/10 pt-3 text-lg font-bold">
              <span>Total</span>
              <span className="text-sb-gold">Rs {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
          <Link to="/track-order" className="btn-secondary text-sm">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
