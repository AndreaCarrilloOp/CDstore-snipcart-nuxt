import { readdirSync } from 'node:fs'

// Tutorial 9: Snipcart valida la información del artículo en su URL pública.
// Se prerenderizan todas las páginas de detalle y de género para acceso directo.
const rutasAlbumes = readdirSync('content/albumes')
  .filter(nombre => nombre.endsWith('.json'))
  .map(nombre => `/albumes/${nombre.slice(0, -5)}`)
const rutasGeneros = readdirSync('content/generos')
  .filter(nombre => nombre.endsWith('.json'))
  .map(nombre => `/generos/${nombre.slice(0, -5)}`)

export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'es-CR' },
      title: 'Sönglist | Tienda de música',
      meta: [
        { name: 'description', content: 'Catálogo demostrativo de CD y vinilos con géneros, búsqueda, compra de prueba y comentarios.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },
  runtimeConfig: {
    public: {
      snipcartApiKey: '',
      snipcartCurrency: 'usd',
      snipcartLanguage: 'es',
      utterancesRepo: '',
      siteUrl: 'http://localhost:3000'
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/catalogo', ...rutasGeneros, ...rutasAlbumes]
    }
  }
})
