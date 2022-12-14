import React from 'react'
import { ThemeContext } from '../context/theme-comtext'
class ThemeButton extends React.Component {
  //   static contextType = ThemeContext
  render() {
    let props = this.props
    let theme = this.context
    let btnRef = React.createRef()
    return (
      <button
        {...props}
        ref={btnRef}
        style={{ backgroundColor: theme.background }}
      ></button>
    )
  }
}
ThemeButton.contextType = ThemeContext
export default ThemeButton
