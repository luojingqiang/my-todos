import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/counterStore'
import reportWebVitals from './reportWebVitals'
import TodoIndex from './todoFile/TodoIndex'
import StudyJsx from './components/StudyJsx'
import BaseHook from './components/studyHooksBase/BaseHook'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StudyJsx />
    </Provider>

    {/* <App /> */}
    <p>jj00 </p>
    <TodoIndex />
    <BaseHook></BaseHook>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
