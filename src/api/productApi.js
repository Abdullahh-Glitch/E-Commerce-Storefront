import api from './axios'

const normalizeProduct = (p) => ({
  ...p,
  id: p._id || p.id,
})

export const fetchProducts = async ({ page = 1, limit = 12, search = '', category = 'all', brand = 'all' }) => {
  const { data } = await api.get('/products', { params: { page, limit, search, category, brand } })
  return {
    products: data.data.map(normalizeProduct),
    pagination: data.pagination,
  }
}

export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`)
  return normalizeProduct(data.data)
}
