<script setup lang="ts">
defineProps<{
  album: {
    slug: string
    titulo: string
    formato: string
    portada: string
    precio: number
    anio: number
    generoSlug: string
    artistaSlug: string
    descripcion: string
  }
  artista?: string
}>()
</script>

<template>
  <article class="album-card">
    <NuxtLink :to="`/albumes/${album.slug}`" class="album-art-link" :aria-label="`Ver detalles de ${album.titulo}`">
      <img :src="album.portada" :alt="`Portada ilustrada de ${album.titulo}`" loading="lazy" width="360" height="360" />
    </NuxtLink>

    <div class="album-card-body">
      <div class="album-meta"><span>{{ album.formato === 'LP' ? 'Vinilo LP' : 'CD' }}</span><span>{{ album.anio }}</span></div>
      <h3><NuxtLink :to="`/albumes/${album.slug}`">{{ album.titulo }}</NuxtLink></h3>
      <p class="muted">{{ artista || album.artistaSlug.replaceAll('-', ' ') }}</p>
      <div class="album-bottom">
        <strong>{{ precioUSD(album.precio) }}</strong>
        <ComprarButton :album="album" compacto />
      </div>
    </div>
  </article>
</template>
