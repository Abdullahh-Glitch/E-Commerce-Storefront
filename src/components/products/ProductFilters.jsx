import { useEffect, useRef, useState } from 'react'
import FilterDropdown from './FilterDropdown'

function getLabel(list, id) {
  return list.find((item) => item.id === id)?.label ?? id
}

function CloseIcon({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6l12 12M18 6 6 18"
      />
    </svg>
  )
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

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsPanelOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const removeCategory = () => onCategoryChange('all')
  const removeBrand = () => onBrandChange('all')
  const removeSearch = () => onSearchChange('')

  const chipClass =
    'inline-flex max-w-full items-center gap-2 border border-sb-brown/10 bg-white px-3 py-1.5 text-xs font-medium text-sb-charcoal'

  const removeButtonClass =
    'shrink-0 rounded-full p-0.5 text-sb-brown/55 transition-colors hover:bg-sb-cream hover:text-sb-charcoal focus-visible:outline-2 focus-visible:outline-sb-gold'

  return (
    <div className="relative mb-7 sm:mb-8">
      {/* Search and Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-sb-brown/45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.5-5.5m2.5-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>

          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search the collection..."
            aria-label="Search products by name"
            className="h-12 w-full border border-sb-brown/15 bg-white pr-10 pl-12 text-sm text-sb-charcoal transition-colors placeholder:text-sb-brown/40 hover:border-sb-brown/30 focus:border-sb-gold focus:outline-none focus:ring-2 focus:ring-sb-gold/15 sm:h-[50px]"
          />

          {search && (
            <button
              type="button"
              onClick={removeSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-sb-brown/50 transition-colors hover:bg-sb-cream hover:text-sb-charcoal"
              aria-label="Clear search"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Button and Count */}
        <div className="flex items-center justify-between gap-4 sm:justify-start">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsPanelOpen((open) => !open)}
            className={`inline-flex h-12 items-center justify-center gap-2 border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold sm:h-[50px] ${
              isPanelOpen || hasActiveFilters
                ? 'border-sb-charcoal bg-sb-charcoal text-sb-cream'
                : 'border-sb-brown/15 bg-white text-sb-charcoal hover:border-sb-gold/60'
            }`}
            aria-expanded={isPanelOpen}
            aria-haspopup="true"
            aria-controls="product-filter-panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.7}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M7 12h10m-7 6h4"
              />
            </svg>

            Filters

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center bg-sb-gold px-1.5 text-[10px] font-bold text-sb-charcoal">
                {activeFilterCount}
              </span>
            )}
          </button>

          <p
            className="whitespace-nowrap text-xs text-sb-brown/60 sm:text-sm"
            aria-live="polite"
          >
            <span className="font-semibold text-sb-charcoal">
              {resultCount}
            </span>{' '}
            {resultCount === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      {/* Filter Panel */}
      {isPanelOpen && (
        <div
          ref={panelRef}
          id="product-filter-panel"
          className="absolute right-0 z-50 mt-3 w-full border border-sb-brown/10 bg-white p-5 shadow-[0_16px_45px_rgba(26,26,26,0.12)] sm:w-80 sm:p-6"
        >
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.2em] text-sb-gold-dark uppercase">
                Refine Your Search
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-sb-charcoal">
                Filter Products
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsPanelOpen(false)}
              className="rounded-full p-2 text-sb-brown/50 transition-colors hover:bg-sb-cream hover:text-sb-charcoal"
              aria-label="Close filters"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-5">
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

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                onClearAll()
                setIsPanelOpen(false)
              }}
              className="mt-5 w-full border border-sb-brown/15 px-4 py-2.5 text-xs font-semibold text-sb-brown transition-colors hover:border-sb-gold hover:text-sb-charcoal"
            >
              Clear all filters
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsPanelOpen(false)}
            className="btn-primary mt-3 w-full py-3 text-xs tracking-wide uppercase"
          >
            Show {resultCount} {resultCount === 1 ? 'Product' : 'Products'}
          </button>
        </div>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[9px] font-semibold tracking-[0.16em] text-sb-brown/50 uppercase">
            Active
          </span>

          {search.trim() && (
            <span className={chipClass}>
              <span className="max-w-48 truncate">
                Search: &quot;{search.trim()}&quot;
              </span>
              <button
                type="button"
                onClick={removeSearch}
                className={removeButtonClass}
                aria-label="Remove search filter"
              >
                <CloseIcon />
              </button>
            </span>
          )}

          {activeCategory !== 'all' && (
            <span className={chipClass}>
              <span className="max-w-36 truncate">
                {getLabel(categories, activeCategory)}
              </span>
              <button
                type="button"
                onClick={removeCategory}
                className={removeButtonClass}
                aria-label="Remove category filter"
              >
                <CloseIcon />
              </button>
            </span>
          )}

          {activeBrand !== 'all' && (
            <span className={chipClass}>
              <span className="max-w-36 truncate">
                {getLabel(brands, activeBrand)}
              </span>
              <button
                type="button"
                onClick={removeBrand}
                className={removeButtonClass}
                aria-label="Remove brand filter"
              >
                <CloseIcon />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onClearAll}
            className="px-1 py-1 text-[10px] font-semibold tracking-wide text-sb-brown/60 underline decoration-sb-brown/25 underline-offset-4 transition-colors hover:text-sb-gold-dark"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}