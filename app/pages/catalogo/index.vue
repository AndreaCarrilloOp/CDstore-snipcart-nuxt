<script setup lang="ts">
// Tutorial 5: filtros reactivos locales y consulta de colecciones con useAsyncData.
const [{ data: albumes }, { data: generos }, { data: artistas }] = await Promise.all([
  useAsyncData('albumes', () => queryCollection('albumes').order('titulo', 'ASC').all(), { default: () => [] }),
  useAsyncData('generos', () => queryCollection('generos').order('nombre', 'ASC').all(), { default: () => [] }),
  useAsyncData('artistas', () => queryCollection('artistas').order('nombre', 'ASC').all(), { default: () => [] })
])

const busqueda = ref('')
const genero = ref('')
const formato = ref('')

const nombreArtistas = computed(() => mapaNombres(artistas.value))
const nombreGeneros = computed(() => mapaNombres(generos.value))
const encontrados = computed(() => filtrarAlbumes(albumes.value, {
  busqueda: busqueda.value,
  genero: genero.value,
  formato: formato.value,
  artistas: nombreArtistas.value,
  generos: nombreGeneros.value
}))
const { resultado, cambiarPagina } = usePaginacion(encontrados, 6)
const hayFiltros = computed(() => Boolean(busqueda.value.trim() || genero.value || formato.value))
function limpiarFiltros() {
  busqueda.value = ''
  genero.value = ''
  formato.value = ''
}

useSeoMeta({
  title: 'Catálogo | Sönglist',
  description: 'Buscar discos en CD y LP con paginación, categorías y filtros.'
})
</script>

<template>
  <div class="page-section">
    <div class="page-intro">
      <span class="eyebrow">ENCONTRÁ TU PRÓXIMO DISCO</span>
      <h1>Catálogo</h1>
      <p>Buscá por título o artista y refiná los resultados con los filtros.</p>
    </div>

    <div id="busqueda" class="filter-panel">
      <Buscador v-model="busqueda" />
      <label class="filter-select">
        <span>Género</span>
        <select v-model="genero">
          <option value="">Todos los géneros</option>
          <option v-for="item in generos" :key="item.slug" :value="item.slug">{{ item.nombre }}</option>
        </select>
      </label>
      <label class="filter-select">
        <span>Formato</span>
        <select v-model="formato">
          <option value="">CD y LP</option>
          <option value="CD">CD</option>
          <option value="LP">Vinilo LP</option>
        </select>
      </label>
    </div>

    <div class="catalog-toolbar">
      <p class="result-count" role="status">{{ resultado.total }} {{ resultado.total === 1 ? 'disco encontrado' : 'discos encontrados' }}</p>
      <button v-if="hayFiltros" type="button" class="reset-button" @click="limpiarFiltros">Limpiar filtros</button>
    </div>
    <div v-if="resultado.total" class="album-grid">
      <AlbumCard
        v-for="album in resultado.elementos"
        :key="album.slug"
        :album="album"
        :artista="nombreVisible(nombreArtistas, album.artistaSlug)"
      />
    </div>
    <p v-else class="notice">No encontramos discos con esos filtros. Probá otra palabra o categoría.</p>

    <Paginacion :pagina="resultado.pagina" :paginas="resultado.paginas" @cambiar="cambiarPagina" />
  </div>
</template>
