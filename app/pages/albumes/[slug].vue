<script setup lang="ts">
// Al cambiar entre fichas de una ruta dinámica, Nuxt vuelve a consultar el registro.
definePageMeta({ key: route => route.path })

const route = useRoute()
const slug = String(route.params.slug)

const [{ data: album }, { data: artistas }, { data: generos }] = await Promise.all([
  useAsyncData(`album-${slug}`, () => queryCollection('albumes').where('slug', '=', slug).first()),
  useAsyncData('artistas', () => queryCollection('artistas').order('nombre', 'ASC').all(), { default: () => [] }),
  useAsyncData('generos', () => queryCollection('generos').order('nombre', 'ASC').all(), { default: () => [] })
])

if (!album.value) {
  throw createError({ statusCode: 404, statusMessage: 'Álbum no encontrado', fatal: true })
}

const artista = computed(() => artistas.value.find(a => a.slug === album.value?.artistaSlug))
const genero = computed(() => generos.value.find(g => g.slug === album.value?.generoSlug))
useSeoMeta({
  title: `${album.value.titulo} | Sönglist`,
  description: album.value.descripcion,
  ogImage: album.value.portada
})
</script>

<template>
  <div class="page-section">
    <nav class="breadcrumbs" aria-label="Ruta de navegación">
      <NuxtLink to="/">Inicio</NuxtLink>
      <span>›</span>
      <NuxtLink :to="`/generos/${album?.generoSlug}`">{{ genero?.nombre }}</NuxtLink>
      <span>›</span>
      <strong>{{ album?.titulo }}</strong>
    </nav>

    <article v-if="album" class="product-detail">
      <div class="detail-cover">
        <img :src="album.portada" :alt="`Portada ilustrada de ${album.titulo}`" width="560" height="560" />
      </div>

      <div class="detail-body">
        <span class="eyebrow">{{ genero?.nombre }} / {{ album.formato }}</span>
        <h1>{{ album.titulo }}</h1>
        <p class="detail-artist">{{ artista?.nombre }}</p>
        <p class="detail-price">{{ precioUSD(album.precio) }}</p>
        <p class="detail-description">{{ album.descripcion }}</p>

        <div class="detail-info">
          <div><span>Formato</span><strong>{{ album.formato === 'LP' ? 'Vinilo LP' : 'CD' }}</strong></div>
          <div><span>Año</span><strong>{{ album.anio }}</strong></div>
          <div><span>Origen</span><strong>{{ artista?.pais }}</strong></div>
        </div>
        <ComprarButton :album="album" />
      </div>
    </article>

    <div v-if="album" class="detail-extras">
      <section class="tracks-section">
        <h2>Lista de canciones</h2>
        <ol>
          <li v-for="pista in album.pistas" :key="pista">{{ pista }}</li>
        </ol>
      </section>

      <section class="artist-section">
        <h2>Sobre el artista</h2>
        <p>{{ artista?.biografia }}</p>
        <NuxtLink :to="`/generos/${album.generoSlug}`" class="subtle-link">
          Más discos de {{ genero?.nombre }} →
        </NuxtLink>
      </section>
    </div>

    <ComentariosUtterances v-if="album" />
  </div>
</template>
