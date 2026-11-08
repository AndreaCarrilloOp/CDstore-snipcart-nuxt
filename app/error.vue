<script setup lang="ts">
const props = defineProps<{ error: {statusCode?:number, statusMessage?:string} }>()
</script>
<template>
  <main class="container error-page"><span class="eyebrow">{{ error.statusCode || 'ERROR' }}</span><h1>No encontramos esta página</h1><p>{{ error.statusMessage || 'Intentá volver al catálogo.' }}</p><NuxtLink to="/catalogo" class="button button-dark">Volver al catálogo</NuxtLink></main>
</template>
