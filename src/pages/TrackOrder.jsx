import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { trackOrder } from "../api/orderApi";
import OrderStatusBadge from "../components/common/OrderStatusBadge";

const statusSteps = ["pending", "confirmed", "on_the_way", "completed"];

const stepLabels = {
  pending: "Order Placed",
  confirmed: "Confirmed",
  on_the_way: "On the Way",
  completed: "Delivered",
};

function formatPrice(value) {
  const amount = Number(value);

  return Number.isFinite(amount)
    ? `Rs ${amount.toLocaleString("en-PK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "—";
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

function SectionHeading({ eyebrow, children }) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <p className="text-[9px] font-bold tracking-[0.2em] text-sb-gold-dark uppercase">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-1 font-display text-xl font-semibold text-sb-charcoal">
        {children}
      </h2>
    </div>
  );
}

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const {
    mutate,
    data: order,
    isPending,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: (num) => trackOrder(num),
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const number = trackingNumber.trim();
    if (!number || isPending) return;

    mutate(number);
  };

  const currentStep = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <main className="min-h-[65vh] w-full bg-white">
      {/* Page introduction */}
      <section className="border-b border-sb-brown/15 bg-sb-cream/60 px-4 pt-6 pb-8 sm:px-8 sm:pt-8 sm:pb-10 lg:px-14 lg:pt-10 lg:pb-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold tracking-[0.24em] text-sb-gold-dark uppercase">
            Order Updates
          </p>

          <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <h1 className="font-display text-3xl font-semibold leading-tight text-sb-charcoal sm:text-4xl lg:text-5xl">
                Track Your Order
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-sb-brown/80 sm:text-base">
                Follow your order from confirmation to delivery. Enter the
                tracking number provided with your order to see its latest
                status and details.
              </p>
            </div>

            <div className="flex items-center gap-3 lg:justify-end">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-sb-gold/55 bg-white text-sb-gold-dark">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M3 7h11v11H3z" />
                  <path d="M14 11h4l3 3v4h-7z" />
                  <circle cx="7.5" cy="18" r="1.5" />
                  <circle cx="17.5" cy="18" r="1.5" />
                </svg>
              </div>

              <div>
                <p className="text-sm font-semibold text-sb-charcoal">
                  Stay in the know
                </p>
                <p className="mt-1 text-xs text-sb-brown/75">
                  Your order details, all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking content */}
      <section className="w-full px-4 pt-6 pb-8 sm:px-8 sm:pt-8 sm:pb-10 lg:px-14 lg:pt-10 lg:pb-12">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.5fr)] lg:gap-12">
          {/* Search panel */}
          <aside className="border border-sb-brown/15 bg-white p-5 sm:p-7 lg:sticky lg:top-28">
            <p className="text-[9px] font-bold tracking-[0.2em] text-sb-gold-dark uppercase">
              Shipment Lookup
            </p>

            <h2 className="mt-2 font-display text-2xl font-semibold text-sb-charcoal">
              Where's your order?
            </h2>

            <p className="mt-2 text-sm leading-6 text-sb-brown/80">
              Enter your tracking number below to retrieve your order status.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <label
                htmlFor="tracking-number"
                className="mb-2 block text-[10px] font-bold tracking-[0.12em] text-sb-charcoal uppercase"
              >
                Tracking Number
              </label>

              <input
                id="tracking-number"
                type="text"
                value={trackingNumber}
                onChange={(event) => {
                  setTrackingNumber(event.target.value.toUpperCase());
                  reset();
                }}
                placeholder="e.g. SB-XXXXXXXX"
                autoComplete="off"
                required
                className="h-12 w-full border border-sb-brown/25 bg-sb-cream/40 px-4 text-sm uppercase text-sb-charcoal outline-none transition-colors placeholder:normal-case placeholder:text-sb-brown/55 focus:border-sb-gold-dark focus:bg-white focus:ring-2 focus:ring-sb-gold/20"
              />

              <button
                type="submit"
                disabled={isPending || !trackingNumber.trim()}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 bg-sb-charcoal px-5 text-[10px] font-bold tracking-[0.16em] text-white uppercase transition-colors hover:bg-sb-brown disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Finding Order...
                  </>
                ) : (
                  <>
                    Track Order <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>

            {isError && (
              <div
                role="alert"
                className="mt-4 border border-red-200 bg-red-50 p-4"
              >
                <p className="text-xs font-semibold text-red-800">
                  Unable to find your order
                </p>

                <p className="mt-1 text-xs leading-5 text-red-700">
                  {error?.response?.data?.message ||
                    error?.message ||
                    "Please check your tracking number and try again."}
                </p>
              </div>
            )}

            {!order && !isError && (
              <div className="mt-6 border-t border-sb-brown/15 pt-5">
                <p className="text-xs font-semibold text-sb-charcoal">
                  Need your tracking number?
                </p>

                <p className="mt-1 text-xs leading-5 text-sb-brown/75">
                  Check your order confirmation details for the tracking
                  number.
                </p>
              </div>
            )}
          </aside>

          {/* Order result */}
          <div className="min-w-0">
            {!order && !isError && !isPending && (
              <div className="flex min-h-[300px] flex-col items-center justify-center border border-dashed border-sb-brown/25 bg-sb-cream/30 px-6 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center border border-sb-gold/45 bg-white text-sb-gold-dark">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m16 16 4 4" />
                    <path d="M8.5 11h5M11 8.5v5" />
                  </svg>
                </div>

                <h2 className="mt-5 font-display text-xl font-semibold text-sb-charcoal">
                  Your order journey starts here
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-sb-brown/75">
                  Submit your tracking number to view order progress, items,
                  and payment summary.
                </p>
              </div>
            )}

            {isPending && (
              <div className="flex min-h-[300px] flex-col items-center justify-center border border-sb-brown/15 bg-white px-6 py-12 text-center">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-sb-gold-dark border-t-transparent" />

                <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-sb-brown/75 uppercase">
                  Retrieving order details
                </p>
              </div>
            )}

            {order && (
              <div className="min-w-0 border border-sb-brown/15 bg-white">
                {/* Order summary header */}
                <div className="border-b border-sb-brown/15 bg-sb-cream/50 p-5 sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold tracking-[0.2em] text-sb-gold-dark uppercase">
                        Tracking Summary
                      </p>

                      <h2 className="mt-2 break-words font-mono text-lg font-bold text-sb-charcoal sm:text-xl">
                        {order.trackingNumber}
                      </h2>

                      <p className="mt-1 text-xs text-sb-brown/75">
                        Order placed {formatDate(order.placedAt)}
                      </p>
                    </div>

                    <div className="self-start">
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>
                </div>

                {/* Progress timeline */}
                {order.status === "cancelled" ? (
                  <div className="border-b border-red-100 bg-red-50 p-5 sm:p-6">
                    <p className="text-sm font-semibold text-red-800">
                      This order has been cancelled.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-red-700">
                      Please contact the store if you need further information
                      about this order.
                    </p>
                  </div>
                ) : (
                  <div className="border-b border-sb-brown/15 p-5 sm:p-7">
                    <SectionHeading eyebrow="Delivery Progress">
                      Order Status
                    </SectionHeading>

                    <div className="grid grid-cols-4 gap-1">
                      {statusSteps.map((step, index) => {
                        const isComplete = index < currentStep;
                        const isCurrent = index === currentStep;
                        const isReached = index <= currentStep;

                        return (
                          <div key={step} className="min-w-0 text-center">
                            <div className="relative flex items-center justify-center">
                              {index > 0 && (
                                <span
                                  className={`absolute right-1/2 top-1/2 h-0.5 w-full -translate-y-1/2 ${
                                    index <= currentStep
                                      ? "bg-sb-gold-dark"
                                      : "bg-sb-brown/20"
                                  }`}
                                />
                              )}

                              <span
                                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                  isReached
                                    ? "bg-sb-gold text-sb-charcoal"
                                    : "border border-sb-brown/25 bg-white text-sb-brown/60"
                                } ${
                                  isCurrent
                                    ? "ring-4 ring-sb-gold/20"
                                    : ""
                                }`}
                              >
                                {isComplete ? "✓" : index + 1}
                              </span>
                            </div>

                            <p
                              className={`mt-3 px-0.5 text-[9px] leading-4 sm:text-xs ${
                                isReached
                                  ? "font-semibold text-sb-charcoal"
                                  : "text-sb-brown/65"
                              }`}
                            >
                              {stepLabels[step]}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Order details */}
                <div className="p-5 sm:p-7">
                  <SectionHeading eyebrow="Overview">
                    Order Details
                  </SectionHeading>

                  <div className="divide-y divide-sb-brown/15 border-y border-sb-brown/15">
                    <div className="flex items-start justify-between gap-4 py-3">
                      <span className="text-xs text-sb-brown/75">
                        Order ID
                      </span>

                      <span className="max-w-[65%] break-all text-right text-xs font-medium text-sb-charcoal">
                        {order.orderId || "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 py-3">
                      <span className="text-xs text-sb-brown/75">
                        Date Placed
                      </span>

                      <span className="text-right text-xs font-medium text-sb-charcoal">
                        {formatDate(order.placedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mt-7">
                    <SectionHeading eyebrow="In Your Order">
                      Items
                    </SectionHeading>

                    <ul className="divide-y divide-sb-brown/15 border-y border-sb-brown/15">
                      {(order.items ?? []).map((item, index) => (
                        <li
                          key={`${item.productId || item.name}-${index}`}
                          className="flex items-start justify-between gap-4 py-4"
                        >
                          <div className="min-w-0">
                            <p className="break-words text-sm font-medium text-sb-charcoal">
                              {item.name}
                            </p>

                            <p className="mt-1 text-xs text-sb-brown/75">
                              Quantity: {item.quantity}
                            </p>

                            <p className="mt-1 text-xs text-sb-brown/65">
                              {formatPrice(item.price)} each
                            </p>
                          </div>

                          <span className="shrink-0 text-sm font-semibold text-sb-charcoal">
                            {formatPrice(
                              Number(item.price) * Number(item.quantity),
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price summary */}
                  <div className="mt-7 bg-sb-cream/55 p-4 sm:p-5">
                    <SectionHeading eyebrow="Payment Summary">
                      Order Total
                    </SectionHeading>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-sb-brown/80">Subtotal</span>

                        <span className="text-right font-medium text-sb-charcoal">
                          {formatPrice(order.subtotal)}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-sb-brown/80">Delivery</span>

                        <span className="text-right font-medium text-sb-charcoal">
                          {formatPrice(order.delivery?.charge)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 border-t border-sb-brown/20 pt-4">
                        <span className="font-semibold text-sb-charcoal">
                          Total
                        </span>

                        <span className="font-display text-xl font-semibold text-sb-gold-dark sm:text-2xl">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}