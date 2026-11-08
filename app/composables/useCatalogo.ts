import { computed, ref, watch, type Ref } from 'vue'

// Tutorial 5: filtrado local, búsqueda normalizada y paginación de una colección Nuxt Content.
type AlbumBuscable = {
  titulo: string
  artistaSlug: string
  generoSlug: string
  formato: string
  anio?: number
  descripcion?: string
  pistas?: string[]
}

type Filtros = {
  busqueda?: string
  genero?: string
  formato?: string
  artistas?: Record<string, string>
  generos?: Record<string, string>
}

function normalizar(texto: string | number): string {
  return String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim()
}

export function filtrarAlbumes<T extends AlbumBuscable>(albumes: T[], filtros: Filtros = {}): T[] {
  const busqueda = normalizar(filtros.busqueda || '')

  return albumes.filter((album) => {
    if (filtros.genero && album.generoSlug !== filtros.genero) return false
    if (filtros.formato && album.formato !== filtros.formato) return false
    if (!busqueda) return true

    const campos = [
      album.titulo,
      album.artistaSlug.replaceAll('-', ' '),
      filtros.artistas?.[album.artistaSlug] || '',
      album.generoSlug.replaceAll('-', ' '),
      filtros.generos?.[album.generoSlug] || '',
      album.formato,
      album.anio ?? '',
      album.descripcion || '',
      ...(album.pistas || [])
    ]

    return campos.some(campo => normalizar(campo).includes(busqueda))
  })
}

export function paginar<T>(items: T[], pagina: number, porPagina = 6) {
  // Una página no puede ser decimal, negativa, infinita ni NaN.
  const tamano = Number.isFinite(porPagina) && porPagina >= 1 ? Math.trunc(porPagina) : 6
  const paginas = Math.max(1, Math.ceil(items.length / tamano))
  const solicitada = Number.isFinite(pagina) ? Math.trunc(pagina) : 1
  const actual = Math.min(Math.max(1, solicitada), paginas)

  return {
    elementos: items.slice((actual - 1) * tamano, actual * tamano),
    pagina: actual,
    paginas,
    total: items.length
  }
}

export function precioUSD(precio: number) {
  return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'USD' }).format(precio)
}

// Paginación compartida: al cambiar los resultados, volver a la primera página.
export function usePaginacion<T>(elementos: Ref<T[]>, porPagina: number) {
  const pagina = ref(1)
  watch(elementos, () => { pagina.value = 1 })

  const resultado = computed(() => paginar(elementos.value, pagina.value, porPagina))

  function cambiarPagina(nuevaPagina: number) {
    if (Number.isInteger(nuevaPagina) && nuevaPagina >= 1 && nuevaPagina <= resultado.value.paginas) {
      pagina.value = nuevaPagina
    }
  }

  return { resultado, cambiarPagina }
}

export function mapaNombres<T extends { slug: string; nombre: string }>(items: T[]): Record<string, string> {
  return Object.fromEntries(items.map(item => [item.slug, item.nombre]))
}

export function nombreVisible(nombres: Record<string, string>, slug: string): string {
  return nombres[slug] || slug.replaceAll('-', ' ')
}
