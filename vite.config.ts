import path from 'node:path'
import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { defineConfig, mergeConfig, type UserConfig } from 'vite'
import VitePluginUnoCss from 'unocss/vite'
import VitePluginVue from '@vitejs/plugin-vue'
import VitePluginEslint from 'vite-plugin-eslint'
import VitePluginVueJsx from '@vitejs/plugin-vue-jsx'
import VitePluginElectron from 'vite-plugin-electron'
import VitePluginVueI18n from '@intlify/unplugin-vue-i18n/vite'
import VitePluginElectronRenderer from 'vite-plugin-electron-renderer'
import { presetUno } from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'

import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist', { recursive: true, force: true })

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  const defaultViteConfig: UserConfig = {
    plugins: [
      VitePluginEslint({
        useEslintrc: true,
        fix: isServe
      }),
      VitePluginVue(),
      VitePluginVueJsx(),
      VitePluginUnoCss({
        presets: [presetUno(), presetAttributify()]
      }),
      VitePluginVueI18n({
        include: path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          './locales/**'
        )
      })
    ]
  }

  const config: UserConfig = {
    plugins: [
      VitePluginElectron([
        {
          // Main-Process entry file of the Electron App.
          entry: 'electron/main/index.ts',
          onstart(options) {
            if (process.env.VSCODE_DEBUG) {
              console.log(
                /* For `.vscode/.debug.script.mjs` */ '[startup] Electron App'
              )
            } else {
              options.startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist/main',
              rollupOptions: {
                external: Object.keys(
                  'dependencies' in pkg ? pkg.dependencies : {}
                )
              }
            }
          }
        },
        {
          entry: 'electron/preload/index.ts',
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
            // instead of restarting the entire Electron App.
            options.reload()
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist/preload',
              rollupOptions: {
                external: Object.keys(
                  'dependencies' in pkg ? pkg.dependencies : {}
                )
              }
            }
          }
        }
      ]),
      // Use Node.js API in the Renderer-process
      VitePluginElectronRenderer()
    ],
    server:
      process.env.VSCODE_DEBUG &&
      (() => {
        const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
        return {
          host: url.hostname,
          port: +url.port
        }
      })(),
    clearScreen: false
  }

  return mergeConfig(defaultViteConfig, config)
})
