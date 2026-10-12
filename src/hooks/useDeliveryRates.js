import { useQuery } from '@tanstack/react-query'
import { fetchDeliveryRates } from '../api/metaApi'

export const useDeliveryRates = () => {
  return useQuery({
    queryKey: ['delivery-rates'],
    queryFn: fetchDeliveryRates,
  })
}