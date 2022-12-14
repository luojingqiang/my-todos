import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCount } from './counterAPI'
const initialState = {
  value: 0,
  status: 'idle',
}

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    console.log(56)
    const response = await fetchCount(amount)
    return response.data
  },
)

export const incrementAsyncs = (amount) => (dispatch) => {
  fetchCount(amount).then((res) => {
    dispatch(incrementAsync(res.data))
  })
}
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
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
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.status = 'idle'
      state.value += action.payload
    })
  },
})
export const selectCount = (state) => state.counter.value
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const cutnetValue = selectCount(getState())
  console.log(cutnetValue)
  if (cutnetValue % 2 === 1) dispatch(incrementByAmount(amount))
}
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
