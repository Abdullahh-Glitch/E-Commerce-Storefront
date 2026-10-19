import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'

const categoryLabels = {
  shampoos: 'Shampoo',
  waxes: 'Wax',
  creams: 'Cream',
  keratins: 'Keratin',
}

export default function ProductCard({ product }) {
  const dispatch = useDispatch()

  const handleAddToCart = (e) => {
    e.preventDefault()

    if (!product.inStock) return

    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    )
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-sb-brown/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-sb-gold/40 hover:shadow-[0_12px_35px_rgba(61,43,31,0.09)]">
      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        aria-label={`View ${product.name}`}
        className="relative block aspect-[4/4.5] overflow-hidden bg-sb-cream"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
            !product.inStock ? 'opacity-60' : ''
          }`}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sb-charcoal/10 via-transparent to-white/5" />

        {/* Category */}
        {categoryLabels[product.category] && (
          <span className="absolute left-2.5 top-2.5 border border-white/50 bg-white/90 px-2 py-1 text-[9px] font-semibold tracking-[0.12em] text-sb-charcoal uppercase backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
            {categoryLabels[product.category]}
          </span>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="border border-white/30 bg-sb-charcoal/90 px-3 py-2 text-[10px] font-semibold tracking-[0.16em] text-white uppercase sm:text-xs">
              Out of Stock
            </span>
          </span>
        )}

        {/* Hover Detail */}
        <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-sb-charcoal opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.7}
            stroke="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14m-6-6 6 6-6 6"
            />
          </svg>
        </span>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 lg:p-5">
        <p className="truncate text-[9px] font-semibold tracking-[0.17em] text-sb-gold-dark uppercase sm:text-[10px]">
          {product.brand || 'The Collection'}
        </p>

        <Link to={`/product/${product.id}`} className="mt-1.5">
          <h3 className="line-clamp-2 min-h-[2.75rem] font-display text-sm font-semibold leading-snug text-sb-charcoal transition-colors duration-200 group-hover:text-sb-gold-dark sm:text-base lg:text-lg">
            {product.name}
          </h3>
        </Link>

        {product.size && (
          <p className="mt-1.5 text-xs text-sb-brown/55">
            {product.size}
          </p>
        )}

        {/* Price */}
        <div className="mt-auto border-t border-sb-brown/10 pt-3 sm:pt-4">
          <p className="text-[9px] font-medium tracking-[0.12em] text-sb-brown/50 uppercase">
            Price
          </p>

          <div className="mt-1 flex flex-col gap-3">
            <span className="text-base font-semibold tracking-tight text-sb-charcoal sm:text-lg lg:text-xl">
              Rs {Number(product.price).toFixed(2)}
            </span>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="inline-flex w-full items-center justify-center gap-2 border border-sb-gold bg-sb-gold px-3 py-2.5 text-[10px] font-semibold tracking-[0.08em] text-sb-charcoal uppercase transition-all duration-200 hover:border-sb-charcoal hover:bg-sb-charcoal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:border-sb-brown/10 disabled:bg-sb-cream disabled:text-sb-brown/45 sm:text-xs"
            >
              {product.inStock ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6"
                    />
                    <circle cx="10" cy="20" r="1" />
                    <circle cx="18" cy="20" r="1" />
                  </svg>
                  Add to Cart
                </>
              ) : (
                'Unavailable'
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}