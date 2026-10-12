import { createSlice } from '@reduxjs/toolkit'

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('sb-cart')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('sb-cart', JSON.stringify(items))
  } catch {
    // ignore storage errors
  }
}

const initialState = {
  items: loadCartFromStorage(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, name, price, image, quantity = 1 } = action.payload
      const existing = state.items.find((item) => item.productId === productId)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ productId, name, price, image, quantity })
      }
      saveCartToStorage(state.items)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.productId !== action.payload)
      saveCartToStorage(state.items)
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload
      const item = state.items.find((i) => i.productId === productId)
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.productId !== productId)
        } else {
          item.quantity = quantity
        }
      }
      saveCartToStorage(state.items)
    },
    clearCart: (state) => {
      state.items = []
      saveCartToStorage(state.items)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

export default cartSlice.reducer
