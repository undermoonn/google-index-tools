import {
  darkTheme,
  lightTheme,
  type GlobalTheme,
  type GlobalThemeOverrides
} from 'naive-ui'
import { ref } from 'vue'

export type SetTheme = (type: 'dark' | 'light') => void

export function useNaiveUiTheme() {
  const theme = ref<GlobalTheme>(darkTheme)
  const setTheme: SetTheme = type => {
    const themeMap = {
      dark: darkTheme,
      light: lightTheme
    }
    theme.value = type in themeMap ? themeMap[type] : darkTheme
  }
  const themeOverrides: GlobalThemeOverrides = {
    common: {
      primaryColor: 'rgb(87, 91, 199)',
      primaryColorHover: 'rgb(87, 91, 199)'
    }
  }
  return { theme, setTheme, themeOverrides }
}
