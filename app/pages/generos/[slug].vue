<script setup lang="ts">
// Tutorial 3: consulta directa por categoría mediante .where().
definePageMeta({ key: route => route.path })

const route = useRoute()
const slug = String(route.params.slug)

const [{ data: genero }, { data: albumes }, { data: artistas }] = await Promise.all([
  useAsyncData(`genero-${slug}`, () => queryCollection('generos').where('slug', '=', slug).first()),
  useAsyncData(`albumes-genero-${slug}`, () => queryCollection('albumes').where('generoSlug', '=', slug).order('titulo', 'ASC').all(), { default: () => [] }),
  useAsyncData('artistas', () => queryCollection('artistas').order('nombre', 'ASC').all(), { default: () => [] })
])

if (!genero.value) {
  throw createError({ statusCode: 404, statusMessage: 'Género no encontrado', fatal: true })
}

const nombreArtistas = computed(() => mapaNombres(artistas.value))
const { resultado, cambiarPagina } = usePaginacion(albumes, 3)

useSeoMeta({ title: `${genero.value.nombre} | Sönglist`, description: genero.value.descripcion })
</script>

<template>
  <div class="page-section">
    <nav class="breadcrumbs" aria-label="Ruta de navegación">
      <NuxtLink to="/">Inicio</NuxtLink>
      <span>›</span>
      <strong>{{ genero?.nombre }}</strong>
    </nav>

    <div class="page-intro">
      <span class="eyebrow">DISCOS POR GÉNERO</span>
      <h1>{{ genero?.nombre }}</h1>
      <p>{{ genero?.descripcion }}</p>
    </div>

    <p class="result-count genre-total" role="status">
      {{ resultado.total }} {{ resultado.total === 1 ? 'disco' : 'discos' }}
    </p>

    <div v-if="resultado.total" class="album-grid">
      <AlbumCard
        v-for="album in resultado.elementos"
        :key="album.slug"
        :album="album"
        :artista="nombreVisible(nombreArtistas, album.artistaSlug)"
      />
    </div>
    <p v-else class="notice">Este género no tiene discos disponibles.</p>

    <Paginacion :pagina="resultado.pagina" :paginas="resultado.paginas" @cambiar="cambiarPagina" />
  </div>
</template>
