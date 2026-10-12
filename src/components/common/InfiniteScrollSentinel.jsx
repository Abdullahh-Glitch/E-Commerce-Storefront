import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'

export default function InfiniteScrollSentinel({ onLoadMore, hasMore, isLoading }) {
  const ref = useInfiniteScroll({ onLoadMore, hasMore, isLoading })

  return (
    <div ref={ref} className="flex justify-center py-8">
      {isLoading && (
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sb-gold border-t-transparent" />
      )}
      {!hasMore && !isLoading && (
        <p className="text-sm text-sb-brown/50">No more items to load</p>
      )}
    </div>
  )
}
