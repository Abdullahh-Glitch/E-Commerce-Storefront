import { useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchBrands } from '../api/metaApi'
import env from '../config/env'

export const useMeta = () => {
  const categoriesQuery = useQuery({
    queryKey: ['categories', env.storeSlug],
    queryFn: fetchCategories,
  })
  const brandsQuery = useQuery({
    queryKey: ['brands', env.storeSlug],
    queryFn: fetchBrands,
  })

  return {
    categories: categoriesQuery.data ?? [],
    brands: brandsQuery.data ?? [],
    isLoadingCategories: categoriesQuery.isLoading,
    isLoadingBrands: brandsQuery.isLoading,
  }
}
