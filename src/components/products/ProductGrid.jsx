import ProductCard from './ProductCard'

export default function ProductGrid({
  products,
  hasActiveFilters = false,
}) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center px-4 py-14 text-center sm:min-h-80">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-sb-brown/10 bg-white text-sb-brown/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35m1.35-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <h3 className="mt-5 font-display text-xl font-semibold text-sb-charcoal sm:text-2xl">
          {hasActiveFilters
            ? 'No matching products'
            : 'The collection is waiting'}
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-sb-brown/60">
          {hasActiveFilters
            ? 'Try adjusting your search or choosing a different category or brand.'
            : 'There are no products to display right now. Please check back soon.'}
        </p>

        {hasActiveFilters && (
          <span className="mt-5 h-px w-10 bg-sb-gold" />
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}