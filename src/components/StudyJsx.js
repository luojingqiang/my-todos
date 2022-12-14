import React from 'react'

import { useState } from 'react'

import { useReducer } from 'react'
import PropTypes from 'prop-types'
import ControlPanel from './baseRedux/ControlPanel'
import '../store/studyRedux/indexRedux'
import '../store/studyRedux/reduxToolkit'

import MyReduxTools from "./MyReduxTools"

class CounterButton extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      count: 1,
      name: 'myRenerProps'
    }
  }
  shouldComponentUpdate(nextProp, nextState) {
    // if(next){}
    console.log(nextProp, nextState)
    if(nextState.count>5) {
      console.log(nextState.count, "====")
      return false
    }else
      return true    
  }
  render() {
    return (<button onClick={() => {
      this.setState(state => ({count: state.count+1}))
    }}>Count:{this.state.count}{this.props.children(this.state.name)}</button>)
  }
}
CounterButton.propTypes={
  children: PropTypes.func.isRequired
}

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef()
    this.focusTextInput = this.focusTextInput.bind(this)
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus()
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input
            type="text"
            ref={this.textInput} />
        <input
            type="button"
            value="Focus the text input"
            onClick={this.focusTextInput}
        />
      </div>
    )
  }
}

class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  // componentDidMount() {
  //   this.textInput.current.focusTextInput()
  // }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    )
  }
}
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse
    return (
      <img src="../../public/logo192.png" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    )
  }
}
class Mouse extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }

  render() {
    return (
      // style={{ height: '100vh' }}
      <div onMouseMove={this.handleMouseMove}>
        <p>lldkdkdl</p>
        {this.props.children}
        {/*
        
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    )
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )} >我想测试一下</Mouse>
      </div>
    )
  }
}

function Counter({initialCount}) {
  const [count, setCount]=useState(initialCount)
  return (<>
  Count:{count}
  <button onClick={() => setCount(initialCount)}>Reset</button>
  <button onClick={() => setCount(prevCount => prevCount-1)}>-</button>
  <button onClick={() => setCount(prevCount => prevCount+1)}>+</button>

  </>)
}


const initialState={count: 0}
function reducer(state, action) {
  switch(action.type) {
    case 'increment':
      return {count: state.count+1}
    case 'decrement':
      return {count: state.count-1}
    default:
      throw new Error()
  }
}
function CounterReducer() {
  const [state, dispatch]=useReducer(reducer, initialState)
  return (<>
    Count:{state.count}
    <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    <button onClick={() => dispatch({type: 'increment'})}>-</button>
  </>)
}
class CountClass extends React.Component {
  constructor(props) {
    super(props)
    const {count}=this.props
    this.state={count}
  }
  render() {
    return <p>PropsTypes{this.state.count}</p>
  }
}
CountClass.propTypes={
  count: PropTypes.number
}
CountClass.defaultProps={
  count: 0
}
const ref=React.createRef()
export default function studyJsx() {
  console.log(ref, 'res')
  return (
    <div>
      <h1>Study React</h1>
      <MyReduxTools />
      <CountClass count={23} ref={ref} />
      <ControlPanel />,
      <CounterReducer></CounterReducer>
      <Counter initialCount={1}></Counter>
      <MouseTracker />
      <AutoFocusTextInput />
      <p>232323232323</p>
      <CounterButton>{name => (<span>{'render'+name}</span>)}</CounterButton>
    </div>
  )
}
