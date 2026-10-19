export default function CategoryShowcase({ categories, onCategorySelect }) {
  if (!categories?.length) return null

  return (
    <section
      id="categories"
      className="border-y border-sb-brown/10 bg-white"
    >
      <div className="section-container py-12 sm:py-14 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-sb-gold uppercase sm:text-xs">
              Curated for Your Routine
            </p>

            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-sb-charcoal sm:text-3xl lg:text-4xl">
              Explore by Category
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-sb-brown/65">
              The essentials for a grooming routine that feels like your own.
            </p>
          </div>

          <span className="hidden pb-1 text-xs tracking-wide text-sb-brown/50 sm:block">
            {String(categories.length).padStart(2, "0")} COLLECTIONS
          </span>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {categories.map((category, index) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => onCategorySelect(category.slug)}
              aria-label={`Explore ${category.label} products`}
              className="group relative flex min-h-36 flex-col justify-between overflow-hidden border border-sb-brown/10 bg-sb-cream/60 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-sb-gold/50 hover:bg-sb-cream hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold sm:min-h-40 sm:p-5 lg:min-h-44 lg:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-3xl font-medium leading-none text-sb-gold/35 transition-colors duration-300 group-hover:text-sb-gold sm:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sb-brown/15 text-sb-brown/60 transition-all duration-300 group-hover:border-sb-gold group-hover:bg-sb-gold group-hover:text-sb-charcoal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    stroke="currentColor"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-6-6 6 6-6 6"
                    />
                  </svg>
                </span>
              </div>

              <div className="mt-7">
                <h3 className="font-display text-base font-semibold leading-snug text-sb-charcoal transition-colors duration-300 group-hover:text-sb-gold-dark sm:text-lg lg:text-xl">
                  {category.label}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                  <span className="h-px w-5 bg-sb-gold transition-all duration-300 group-hover:w-9" />
                  <span className="text-[9px] font-semibold tracking-[0.16em] text-sb-brown/50 uppercase sm:text-[10px]">
                    Discover More
                  </span>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-sb-gold transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}