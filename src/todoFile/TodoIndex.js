import React from 'react'
import TodoApp from './TodoApp'
import {Provider} from "react-redux"
import store from '../store/'
export default function TodoIndex() {
  return (
    <div>
      <Provider store={store}>
        <TodoApp />
      </Provider> 
    </div>
  )
}
