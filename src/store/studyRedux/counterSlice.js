import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
  name: 'counters',
  initialState: {
    value: 100,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += Number(action.payload)
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
