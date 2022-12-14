import React, { Component } from 'react'
import {connect} from "react-redux"
import {addTodo} from "../actions"
class AddTodo extends Component {
  constructor(props, context) {
    super(props, context)
    this.state={
      value: ''
    }
    this.handleChange=this.handleChange.bind(this)
    this.submit=this.submit.bind(this)
  }
  handleChange(e) {
    this.setState({value: e.target.value})
  }
  submit(e) {
    e.preventDefault()
    this.props.onAdd(this.state.value)
  }
  render() {
    return (
      <div className='add-todo'>
          <form>
            <input value={this.state.value} onChange={this.handleChange} />
            <button onClick={this.submit}>添加</button>
          </form>
      </div>
    )
  }
}
const mapDispathToProps=(dispatch) => {
  return {
    onAdd: (text) => {
      dispatch(addTodo(text))
      this.setState({value: ''})
    }
  }
}
export default connect(null, mapDispathToProps)(AddTodo)