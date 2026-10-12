import api from './axios'

export const fetchCategories = async () => {
  const { data } = await api.get('/meta/categories')
  return data.data
}

export const fetchBrands = async () => {
  const { data } = await api.get('/meta/brands')
  return data.data
}

export const fetchDeliveryRates = async () => {
  const { data } = await api.get('/meta/delivery-rates')

  return data.data
}