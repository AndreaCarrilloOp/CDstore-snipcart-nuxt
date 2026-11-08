<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()
const repo = String(config.public.utterancesRepo || '').trim()
const contenedor = ref<HTMLElement | null>(null)

function cargarComentarios() {
  if (!import.meta.client || !contenedor.value || !repo) return
  contenedor.value.replaceChildren()
  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.setAttribute('repo', repo)
  script.setAttribute('issue-term', 'pathname')
  script.setAttribute('label', 'comentarios')
  script.setAttribute('theme', 'github-light')
  script.crossOrigin = 'anonymous'
  script.async = true
  contenedor.value.appendChild(script)
}
onMounted(cargarComentarios)
watch(() => route.path, () => nextTick(cargarComentarios))
</script>
<template>
  <section class="comments-section" aria-label="Comentarios del disco">
    <h2>Comentarios</h2>
    <p class="muted">Compartí tu opinión sobre este álbum.</p>
    <div v-if="repo" ref="contenedor" class="comments-host" />
    <p v-else class="notice">Los comentarios estarán disponibles al configurar un repositorio de GitHub para Utterances.</p>
  </section>
</template>
