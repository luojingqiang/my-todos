import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementAsyncs,
  incrementIfOdd,
} from '../store/counterStore/counterSlice'
export default function MyReduxTools() {
  const count = useSelector((state) => {
    console.log(state)
    return state.counter.value
  })
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState(2)
  const incrementValue = Number(incrementAmount) || 0
  return (
    <div>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <div>
        <input
          type="text"
          value={incrementValue}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </button>
        <button onClick={() => dispatch(incrementAsync(incrementValue))}>
          Add Async
        </button>
        <button onClick={() => dispatch(incrementAsyncs(incrementValue))}>
          Add Async
        </button>
        <button onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          Add If Odd
        </button>
      </div>
    </div>
  )
}
