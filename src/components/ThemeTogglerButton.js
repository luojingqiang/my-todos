import { ThemeContext } from '../context/theme-comtext'
function ThemeTogglerButton() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleThemes }) => {
        console.log(theme)
        return (
          <button
            onClick={toggleThemes}
            style={{ backgroundColor: theme.background }}
          >
            Toggle Theme
          </button>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default ThemeTogglerButton
