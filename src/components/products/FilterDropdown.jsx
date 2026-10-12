export default function FilterDropdown({ label, value, options, onChange, id }) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] font-semibold tracking-[0.16em] text-sb-brown/60 uppercase sm:text-xs"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-lg border border-sb-brown/10 bg-sb-cream/40 py-3 pr-10 pl-3.5 text-sm font-medium text-sb-charcoal transition-all duration-200 hover:border-sb-gold/40 focus:border-sb-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sb-gold/15"
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-sb-brown/50 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  )
}