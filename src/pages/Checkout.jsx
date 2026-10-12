import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { clearCart, selectCartItems } from '../store/cartSlice'
import { placeOrder } from '../store/orderSlice'
import { createOrder } from '../api/orderApi'
import CheckoutSummary from '../components/checkout/CheckoutSummary'
import { useDeliveryRates } from '../hooks/useDeliveryRates'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  notes: '',
}

export default function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  // const total = useSelector(selectCartTotal)

  const { data: deliveryRates = [], isLoading: deliveryRatesLoading } = useDeliveryRates()

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const deliveryCharge = deliveryRates.find((rate) => rate.city === form.city)?.charge ?? 0

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      dispatch(
        placeOrder({
          orderId: data.orderId,
          trackingNumber: data.trackingNumber,
          id: data.orderId,
          customer: data.customer,
          items: data.items,
          subtotal: data.subtotal,
          delivery: data.delivery,
          total: data.total,
          status: data.status,
          placedAt: data.placedAt,
        }),
      );
      dispatch(clearCart())
      navigate('/order-confirmation')
    },
    onError: (err) => {
      setSubmitError(err.response?.data?.message || 'Failed to place order. Please try again.')
    },
  })

  if (items.length === 0) {
    return (
      <div className="section-container py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-sb-charcoal">Nothing to Checkout</h1>
        <p className="mt-3 text-sb-brown/70">Your cart is empty. Add some products first.</p>
        <Link to="/" className="btn-primary mt-8 inline-flex">
          Back to Shop
        </Link>
      </div>
    )
  }

  const validate = () => {
    const newErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s+\-()]{7,}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    if (!form.address.trim()) newErrors.address = 'Address is required'
    if (!form.city.trim()) newErrors.city = 'City is required'
    if (!form.postalCode.trim()) newErrors.postalCode = 'Postal code is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitError('')
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    orderMutation.mutate({
      customer: { ...form },
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });
  }

  const inputClass = (field) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm transition-colors focus:border-sb-gold focus:outline-none focus:ring-2 focus:ring-sb-gold/20 ${
      errors[field] ? 'border-red-400' : 'border-sb-charcoal/10'
    }`

  return (
    <div className="section-container py-8 sm:py-12">
      <nav className="mb-6 text-sm text-sb-brown/60">
        <Link to="/cart" className="transition-colors hover:text-sb-gold">
          Cart
        </Link>
        <span className="mx-2">/</span>
        <span className="text-sb-charcoal">Checkout</span>
      </nav>

      <h1 className="mb-8 font-display text-3xl font-bold text-sb-charcoal sm:text-4xl">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 lg:col-span-2"
          noValidate
        >
          <section className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 font-display text-xl font-bold text-sb-charcoal">
              Contact Information
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block text-sm font-semibold text-sb-charcoal"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputClass("fullName")}
                  placeholder="Muhammad Ali"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold text-sb-charcoal"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-semibold text-sb-charcoal"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass("phone")}
                  placeholder="0300-0000000"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 font-display text-xl font-bold text-sb-charcoal">
              Shipping Address
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="mb-1.5 block text-sm font-semibold text-sb-charcoal"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className={inputClass("address")}
                  placeholder="123 Main Street"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="mb-1.5 block text-sm font-semibold text-sb-charcoal"
                >
                  City
                </label>

                <select
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={`${inputClass('city')} w-full min-w-0 max-w-full`}
                  disabled={deliveryRatesLoading}
                >
                  <option value="">
                    {deliveryRatesLoading
                      ? "Loading cities..."
                      : "Select your city"}
                  </option>

                  {deliveryRates.map((rate) => (
                    <option key={rate.city} value={rate.city}>
                      {rate.city.charAt(0).toUpperCase() + rate.city.slice(1)}
                    </option>
                  ))}
                </select>

                {errors.city && (
                  <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="mb-1.5 block text-sm font-semibold text-sb-charcoal"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  className={inputClass("postalCode")}
                  placeholder="12345"
                />
                {errors.postalCode && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.postalCode}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 font-display text-xl font-bold text-sb-charcoal">
              Order Notes
            </h2>
            <label
              htmlFor="notes"
              className="mb-1.5 block text-sm font-semibold text-sb-charcoal"
            >
              Special Instructions{" "}
              <span className="font-normal text-sb-brown/50">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-sb-charcoal/10 bg-white px-4 py-3 text-sm transition-colors focus:border-sb-gold focus:outline-none focus:ring-2 focus:ring-sb-gold/20"
              placeholder="Delivery instructions, gift message, etc."
            />
          </section>

          {submitError && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={orderMutation.isPending}
              className="btn-primary flex-1 sm:flex-none"
            >
              {orderMutation.isPending ? "Placing Order..." : "Place Order"}
            </button>
            <Link to="/cart" className="btn-secondary text-sm">
              Back to Cart
            </Link>
          </div>
        </form>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <CheckoutSummary deliveryCharge={deliveryCharge} />
        </div>
      </div>
    </div>
  );
}
