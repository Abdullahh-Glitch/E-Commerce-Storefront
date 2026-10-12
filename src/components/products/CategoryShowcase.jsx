export default function CategoryShowcase({ categories, onCategorySelect }) {
  if (!categories?.length) return null

  return (
    <section
      id="categories"
      className="border-y border-sb-brown/10 bg-sb-cream"
    >
      <div className="section-container py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-sb-gold uppercase">
            Explore the Collection
          </p>

          <h2 className="mt-3 font-display text-3xl font-bold text-sb-charcoal sm:text-4xl">
            Shop by Category
          </h2>

          <p className="mt-3 text-sm leading-6 text-sb-brown/70 sm:text-base">
            Find the professional grooming essentials made for your routine.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {categories.map((category, index) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => onCategorySelect(category.slug)}
              className="group relative overflow-hidden rounded-xl border border-sb-brown/10 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-sb-gold/50 hover:shadow-lg sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-3xl font-bold text-sb-brown/10 transition-colors duration-300 group-hover:text-sb-gold/20 sm:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-sb-brown/10 text-sb-brown/50 transition-all duration-300 group-hover:border-sb-gold group-hover:text-sb-gold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-6-6 6 6-6 6"
                    />
                  </svg>
                </span>
              </div>

              <div className="mt-8 sm:mt-10">
                <h3 className="font-display text-lg font-semibold text-sb-charcoal transition-colors group-hover:text-sb-gold sm:text-xl">
                  {category.label}
                </h3>

                <p className="mt-2 text-xs font-medium tracking-wide text-sb-brown/50 uppercase">
                  Explore products
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-sb-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}