// Tutorial 9: Snipcart solo en el navegador, con un contador compartido por useState().
const SNIPCART_CDN = 'https://cdn.snipcart.com/themes/v3.0/default'

type EstadoSnipcart = {
  cart?: { items?: { count?: number } }
}

type SnipcartSDK = {
  store: {
    getState: () => EstadoSnipcart
    subscribe: (actualizar: () => void) => () => void
  }
  api?: { session?: { setLanguage?: (idioma: string) => Promise<void> } }
}

type NavegadorSnipcart = Window & {
  Snipcart?: SnipcartSDK
  SnipcartSettings?: Record<string, string>
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const clave = String(config.snipcartApiKey || '').trim()
  const cantidad = useState<number>('cart-count', () => 0)
  const listo = useState<boolean>('cart-ready', () => false)

  if (!clave) return

  const navegador = window as NavegadorSnipcart
  navegador.SnipcartSettings = {
    publicApiKey: clave,
    modalStyle: 'side',
    currency: String(config.snipcartCurrency || 'usd'),
    language: String(config.snipcartLanguage || 'es')
  }

  const actualizar = () => {
    cantidad.value = navegador.Snipcart?.store.getState()?.cart?.items?.count ?? 0
  }

  const cuandoEsteListo = () => {
    if (!navegador.Snipcart?.store || listo.value) return
    listo.value = true
    actualizar()
    navegador.Snipcart.store.subscribe(actualizar)
    void navegador.Snipcart.api?.session?.setLanguage?.(String(config.snipcartLanguage || 'es'))
  }

  document.addEventListener('snipcart.ready', cuandoEsteListo, { once: true })

  nuxtApp.hook('app:mounted', () => {
    if (navegador.Snipcart?.store) {
      cuandoEsteListo()
      return
    }
    if (document.getElementById('snipcart')) return

    const contenedor = document.createElement('div')
    contenedor.id = 'snipcart'
    contenedor.hidden = true
    document.body.appendChild(contenedor)

    if (!document.querySelector('link[data-songlist-snipcart]')) {
      const css = document.createElement('link')
      css.rel = 'stylesheet'
      css.href = `${SNIPCART_CDN}/snipcart.css`
      css.dataset.songlistSnipcart = ''
      document.head.appendChild(css)
    }

    const script = document.createElement('script')
    script.src = `${SNIPCART_CDN}/snipcart.js`
    script.async = true
    script.onerror = () => { listo.value = false }
    document.head.appendChild(script)
  })
})
