import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves a project site from /<repo>/, so the built asset URLs
  // need that prefix. The deploy workflow sets BASE_PATH; locally (and on a
  // custom domain, where you'd leave it unset) it stays '/'.
  base: process.env.BASE_PATH || '/',
})
