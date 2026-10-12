import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { trackOrder } from '../api/orderApi'
import OrderStatusBadge from '../components/common/OrderStatusBadge'

const statusSteps = ['pending', 'confirmed', 'on_the_way', 'completed']

const stepLabels = {
  pending: 'Order Placed',
  confirmed: 'Confirmed',
  on_the_way: 'On the Way',
  completed: 'Delivered',
}

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState('')

  const { mutate, data: order, isPending, isError, error, reset } = useMutation({
    mutationFn: (num) => trackOrder(num),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!trackingNumber.trim()) return
    mutate(trackingNumber.trim())
  }

  const currentStep = order ? statusSteps.indexOf(order.status) : -1

  return (
    <div className="section-container py-12 sm:py-16">
      <div className="mx-auto max-w-xl">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-sb-charcoal sm:text-4xl">
            Track Your Order
          </h1>
          <p className="mt-3 text-sb-brown/70">
            Enter your tracking number to see order status
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => {
              setTrackingNumber(e.target.value.toUpperCase());
              reset();
            }}
            placeholder="e.g. SB-XXXXXXXX"
            className="flex-1 rounded-xl border border-sb-charcoal/10 bg-white px-4 py-3 text-sm uppercase shadow-sm focus:border-sb-gold focus:outline-none focus:ring-2 focus:ring-sb-gold/20"
          />
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary shrink-0"
          >
            {isPending ? "Tracking..." : "Track"}
          </button>
        </form>

        {isError && (
          <div className="rounded-xl bg-red-50 p-4 text-center text-sm text-red-700">
            {error?.response?.data?.message || "Order not found"}
          </div>
        )}

        {order && (
          <div className="rounded-xl bg-white p-6 shadow-md sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-sb-brown/60">Tracking Number</p>
                <p className="font-mono font-bold text-sb-charcoal">
                  {order.trackingNumber}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>

            {order.status === "cancelled" ? (
              <div className="mb-8 rounded-xl bg-red-50 p-4 text-center text-sm text-red-700">
                This order has been cancelled.
              </div>
            ) : (
              <div className="mb-8 w-full">
                <div className="flex w-full">
                  {statusSteps.map((step, i) => (
                    <div
                      key={step}
                      className="flex w-1/4 flex-col items-center text-center"
                    >
                      <div
                        className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                          i <= currentStep
                            ? "bg-sb-gold text-sb-charcoal"
                            : "bg-sb-charcoal/10 text-sb-brown/40"
                        }`}
                      >
                        {i < currentStep ? "✓" : i + 1}
                      </div>
                      <p
                        className={`text-xs font-medium ${
                          i <= currentStep
                            ? "text-sb-charcoal"
                            : "text-sb-brown/40"
                        }`}
                      >
                        {stepLabels[step]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order details */}
            <div className="border-t border-sb-charcoal/10 pt-5">
              <h2 className="mb-3 text-sm font-semibold text-sb-charcoal">
                Order Details
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-sb-brown/60">Order ID</span>
                  <span className="font-medium">{order.orderId}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sb-brown/60">Placed</span>
                  <span className="font-medium">
                    {new Date(order.placedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mt-6 border-t border-sb-charcoal/10 pt-5">
              <h2 className="mb-4 text-sm font-semibold text-sb-charcoal">
                Items
              </h2>

              <ul className="space-y-4">
                {order.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sb-charcoal">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-sb-brown/60">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <span className="shrink-0 font-medium text-sb-charcoal">
                      Rs {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price summary */}
            <div className="mt-6 border-t border-sb-charcoal/10 pt-5">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-sb-brown/60">Subtotal</span>
                  <span>Rs {order.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sb-brown/60">Delivery</span>
                  <span>Rs {order.delivery.charge.toFixed(2)}</span>
                </div>

                <div className="mt-3 flex justify-between border-t border-sb-charcoal/10 pt-3">
                  <span className="font-semibold text-sb-charcoal">Total</span>
                  <span className="text-lg font-bold text-sb-gold">
                    Rs {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
