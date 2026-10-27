import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// For kursbor.uz the site lives at the domain root, so base stays '/'.
// Build with `vite build --base=./` if you ever need to host it in a sub-folder.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
