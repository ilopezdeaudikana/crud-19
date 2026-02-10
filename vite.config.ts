import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')
  console.log(env.API_URL)
  return {
    define: {
      __API_URL__: JSON.stringify(env.API_URL),
    },
    plugins: [react(
      {
        babel: {
          plugins: [
            'babel-plugin-react-compiler'
          ]
        }
      }
    ), 
    tailwindcss()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
