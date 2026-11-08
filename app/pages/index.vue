<script setup lang="ts">
// Tutoriales 3 y 5: categorías almacenadas en JSON y consultadas con Nuxt Content.
const { data: generos } = await useAsyncData(
  'generos',
  () => queryCollection('generos').order('nombre', 'ASC').all(),
  { default: () => [] }
)

useSeoMeta({
  title: 'Sönglist | Tienda de música',
  description: 'Explorá nuestra colección de CD y vinilos organizada por géneros musicales.'
})
</script>

<template>
  <section class="page-section" aria-labelledby="titulo-inicio">
    <div class="page-intro">
      <span class="eyebrow">Sönglist / Tienda de música</span>
      <h1 id="titulo-inicio">Explorá por género</h1>
      <p>Elegí un género para descubrir sus CD y vinilos. Cada categoría tiene su listado de álbumes.</p>
    </div>

    <div class="genres-grid">
      <NuxtLink
        v-for="genero in generos"
        :key="genero.slug"
        :to="`/generos/${genero.slug}`"
        class="genre-card"
        :aria-label="`Explorar álbumes de ${genero.nombre}`"
      >
        <img
          class="genre-card-image"
          :src="genero.imagen"
          alt=""
          width="1280"
          height="720"
          loading="lazy"
          decoding="async"
        />
        <div class="genre-card-info">
          <h2>{{ genero.nombre }}</h2>
          <p>{{ genero.descripcion }}</p>
        </div>
        <span class="genre-arrow" aria-hidden="true"><FlechaDiagonal /></span>
      </NuxtLink>
    </div>
  </section>
</template>
