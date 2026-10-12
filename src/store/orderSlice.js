import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lastOrder: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.lastOrder = action.payload
    },
    clearLastOrder: (state) => {
      state.lastOrder = null
    },
  },
})

export const { placeOrder, clearLastOrder } = orderSlice.actions
export const selectLastOrder = (state) => state.order.lastOrder

export default orderSlice.reducer
