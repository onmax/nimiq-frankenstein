import type { Theme as ThemeConfig } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './style.css'
import 'uno.css'

export const Theme: ThemeConfig = {
  extends: DefaultTheme,
  // enhanceApp({}) {
  // },
}

export default Theme
