import React from 'react'
import { connect } from 'react-redux'
import {toggleTodo, removeTodo} from "../actions"
import {FilterTypes} from "../../constants"
import TodoItem from './TodoItem'
const TodoList=({todos, onToggleTodo, onRemoveTodo}) => {
  return (
    <ul className='todo-list'>
     {
       todos.map(item => (
        <TodoItem
            key={item.id}
            text={item.text}
            completed={item.completed}
            onToggle={() => onToggleTodo(item.id)}
            onRemove={() => onRemoveTodo(item.id)}
        />
       ))
     }
    </ul>
  )
}
const selectVisibleTodos=(todos, filter="全部") => {
  switch(filter) {
    case FilterTypes.ALL:
      return todos
    case FilterTypes.COMPLETED:
      return todos.filter(item => item.completed)
    case FilterTypes.UNCOMPLETED:
      return todos.filter(item => !item.completed)  
    default:
      throw new Error("unsupporte filter")
  }
}
const mapStateProps=(state) => {
  return {
    todos: selectVisibleTodos(state.todos, state.filter)
  }
}
const mapDispatchToProps=(dispatch) => {
  return {
    ontoggleTodo: (id) => {
      dispatch(toggleTodo(id))
    },
    onRemoveTodo: (id) => {
      dispatch(removeTodo(id))
    }
  }
}
export default connect(mapStateProps, mapDispatchToProps)(TodoList)