import { useEffect, useRef, useState } from 'react'
import FilterDropdown from './FilterDropdown'

function getLabel(list, id) {
  return list.find((item) => item.id === id)?.label ?? id
}

export default function ProductFilters({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  activeBrand,
  onBrandChange,
  onClearAll,
  resultCount,
  categories = [{ id: 'all', label: 'All' }],
  brands = [{ id: 'all', label: 'All Brands' }],
}) {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)

  const activeFilterCount =
    (activeCategory !== 'all' ? 1 : 0) +
    (activeBrand !== 'all' ? 1 : 0) +
    (search.trim() ? 1 : 0)

  const hasActiveFilters = activeFilterCount > 0

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsPanelOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const removeCategory = () => onCategoryChange('all')
  const removeBrand = () => onBrandChange('all')
  const removeSearch = () => onSearchChange('')

  return (
     <div className="relative mb-8">
      {/* Search + Filter Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sb-brown/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products by name..."
            className="w-full rounded-lg border border-sb-brown/15 bg-white py-3 pr-10 pl-12 text-sm text-sb-charcoal transition-colors placeholder:text-sb-brown/40 focus:border-sb-gold focus:outline-none focus:ring-2 focus:ring-sb-gold/15"
          />

          {search && (
            <button
              type="button"
              onClick={removeSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-sb-brown/50 transition-colors hover:bg-sb-cream hover:text-sb-charcoal"
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Filter + Result Count */}
        <div className="flex items-center justify-between gap-3 sm:justify-start">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsPanelOpen((open) => !open)}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
              isPanelOpen || hasActiveFilters
                ? 'border-sb-gold bg-sb-charcoal text-sb-gold'
                : 'border-sb-brown/15 bg-white text-sb-charcoal hover:border-sb-gold/50'
            }`}
            aria-expanded={isPanelOpen}
            aria-haspopup="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>

            Filters

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sb-gold px-1.5 text-xs font-bold text-sb-charcoal">
                {activeFilterCount}
              </span>
            )}
          </button>

          <p className="text-sm whitespace-nowrap text-sb-brown/60 sm:block">
            <span className="sm:hidden">
              {resultCount} {resultCount === 1 ? 'product' : 'products'}
            </span>

            <span className="hidden sm:inline">
              {resultCount} {resultCount === 1 ? 'product' : 'products'}
            </span>
          </p>
        </div>
      </div>

      {/* Filter Panel */}
      {isPanelOpen && (
        <div
    ref={panelRef}
    className="absolute right-0 z-50 mt-3 w-full max-w-full rounded-xl border border-sb-brown/10 bg-white p-4 shadow-xl sm:w-80"
  >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-sb-charcoal">
              Filter Products
            </h3>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  onClearAll()
                  setIsPanelOpen(false)
                }}
                className="text-xs font-semibold text-sb-gold transition-colors hover:text-sb-gold-dark"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-4">
            <FilterDropdown
              id="filter-category"
              label="Category"
              value={activeCategory}
              options={categories}
              onChange={onCategoryChange}
            />

            <FilterDropdown
              id="filter-brand"
              label="Brand"
              value={activeBrand}
              options={brands}
              onChange={onBrandChange}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsPanelOpen(false)}
            className="btn-primary mt-5 w-full py-2.5 text-sm"
          >
            Done
          </button>
        </div>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {search.trim() && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sb-charcoal/5 px-3 py-1 text-xs font-medium text-sb-charcoal">
              Search: &quot;{search}&quot;

              <button
                type="button"
                onClick={removeSearch}
                className="rounded-full p-0.5 transition-colors hover:bg-sb-charcoal/10"
                aria-label="Remove search filter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          )}

          {activeCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sb-charcoal/5 px-3 py-1 text-xs font-medium text-sb-charcoal">
              {getLabel(categories, activeCategory)}

              <button
                type="button"
                onClick={removeCategory}
                className="rounded-full p-0.5 transition-colors hover:bg-sb-charcoal/10"
                aria-label="Remove category filter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          )}

          {activeBrand !== 'all' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sb-gold/15 px-3 py-1 text-xs font-medium text-sb-charcoal">
              {getLabel(brands, activeBrand)}

              <button
                type="button"
                onClick={removeBrand}
                className="rounded-full p-0.5 transition-colors hover:bg-sb-gold/20"
                aria-label="Remove brand filter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-semibold text-sb-brown/60 transition-colors hover:text-sb-gold"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}