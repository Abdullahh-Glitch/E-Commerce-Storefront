import ProductCard from './ProductCard'

export default function ProductGrid({ products, hasActiveFilters = false }) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-sb-brown/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="mt-4 text-lg text-sb-brown/70">
          {hasActiveFilters
            ? 'No products match your search or filters.'
            : 'No products found.'}
        </p>
        {hasActiveFilters && (
          <p className="mt-2 text-sm text-sb-brown/50">Try a different name, category, or brand.</p>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
