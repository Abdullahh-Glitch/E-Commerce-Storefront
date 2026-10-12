import api from './axios'

export const createOrder = async (payload) => {
  const { data } = await api.post('/orders', payload)
  return data.data
}

export const trackOrder = async (trackingNumber) => {
  const { data } = await api.get(`/orders/track/${trackingNumber}`)
  return data.data
}
