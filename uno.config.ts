import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { presetNimiq } from 'nimiq-css'
import { dirname } from 'pathe'
import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'
import { presetFluidSizing } from 'unocss-preset-fluid-sizing'
import { presetScalePx } from 'unocss-preset-scale-px'

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetNimiq({
      utilities: true,
      attributifyUtilities: true,
      fonts: {
        cwd: dirname(import.meta.url),
        fontAssetsDir: '../public/assets/fonts',
        fontServeBaseUrl: '/assets/fonts',
      },
    }),
    presetScalePx(),
    presetFluidSizing(),
    presetIcons({
      collections: {
        ...createExternalPackageIconLoader('@iconify-json/nimiq'),
      },
    }),
  ],
})
