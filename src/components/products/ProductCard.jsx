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
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-sb-brown/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-sb-gold/30 hover:shadow-lg">
      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-sb-cream"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category */}
        {categoryLabels[product.category] && (
          <span className="absolute left-3 top-3 rounded-full bg-sb-charcoal/85 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-sb-gold uppercase backdrop-blur-sm sm:px-3 sm:text-xs">
            {categoryLabels[product.category]}
          </span>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-sb-charcoal/90 px-2.5 py-1 text-[10px] font-semibold text-sb-cream backdrop-blur-sm sm:px-3 sm:text-xs">
            Out of Stock
          </span>
        )}
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-sb-gold uppercase sm:text-xs">
          {product.brand}
        </p>

        <Link to={`/product/${product.id}`} className="mt-1.5">
          <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-sb-charcoal transition-colors duration-200 group-hover:text-sb-gold sm:text-lg">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 text-xs text-sb-brown/60 sm:text-sm">
          {product.size}
        </p>

        {/* Price + Action */}
        <div className="mt-auto pt-4 sm:pt-5">
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <span className="whitespace-nowrap text-sm font-bold text-sb-charcoal sm:text-xl">
      Rs {product.price.toFixed(2)}
    </span>

    <button
      onClick={handleAddToCart}
      disabled={!product.inStock}
      className="w-full rounded-lg bg-sb-gold px-2 py-2 text-[10px] font-semibold text-sb-charcoal transition-colors duration-200 hover:bg-sb-gold-dark disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-4 sm:py-2.5 sm:text-xs"
    >
      {product.inStock ? 'Add to Cart' : 'Unavailable'}
    </button>
  </div>
</div>
      </div>
    </article>
  )
}