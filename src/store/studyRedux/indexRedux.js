import { createStore } from 'redux'
function counterReducer(state = { value: 0 }, action) {
  console.log(action)
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}

const store = createStore(counterReducer)

store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'counter/incremented', name: '张三' })
console.log(store.getState())
store.dispatch({ type: 'counter/incremented' })
console.log(store.getState())
