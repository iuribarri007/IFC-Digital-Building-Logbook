import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm';


export default defineConfig({
  plugins: [wasm()],
  server: {
    // Puedes especificar el puerto del servidor de desarrollo
    port: 4000,
    // Habilita Hot Module Replacement (HMR)
    hmr: true,
  }
  
})