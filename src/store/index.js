import {createStore, combineReducers} from "redux"
import {reducer as todoReducer} from "../todoFile/todos"
const reducer=combineReducers({
  todos: todoReducer
})
export default createStore(reducer)
