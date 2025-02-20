import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/nimiq-frankenstein/',
  title: 'Nimiq Frankenstein',
  description: 'A collection of Components made for Nimiq',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Modal', link: '/components/modal' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/onmax/nimiq-frankenstein' },
    ],
  },
  vite: {
    plugins: [UnoCSS()],
    optimizeDeps: {
      exclude: [
        'vitepress',
      ],
    },
  },
})
