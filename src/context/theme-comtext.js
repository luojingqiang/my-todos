import React from "react"

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
}
const personList=[
    {'name': '张三', age: 23, message: "我很好"},
    {'name': '张三1', age: 23, message: "我很好"},
    {'name': '张三2', age: 23, message: "我很好"},
    {'name': '张三3', age: 23, message: "我很好"},
    {'name': '张三4', age: 23, message: "我很好"},
    {'name': '张三5', age: 23, message: "我很好"},
    {'name': '张三6', age: 23, message: "我很好"},
    {'name': '张三7', age: 23, message: "我很好"}
]
export const getComments=() => personList
export const ThemeContext=React.createContext({
    theme: themes.dark
})
ThemeContext.displayName='Theme'