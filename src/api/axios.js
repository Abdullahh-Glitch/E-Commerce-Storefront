import axios from 'axios'
import env from '../config/env'

const api = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-Store-Slug': env.storeSlug,
  },
  timeout: env.isDev ? 30000 : 15000,
  withCredentials: false,
})

export default api
