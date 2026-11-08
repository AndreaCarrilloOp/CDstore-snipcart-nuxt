<script setup lang="ts">
const props = defineProps<{ pagina: number; paginas: number }>()
const emit = defineEmits<{ cambiar: [pagina: number] }>()

const numeros = computed(() => Array.from({ length: props.paginas }, (_, indice) => indice + 1))

function cambiar(pagina: number) {
  if (pagina >= 1 && pagina <= props.paginas && pagina !== props.pagina) {
    emit('cambiar', pagina)
  }
}
</script>

<template>
  <nav v-if="paginas > 1" class="pagination" aria-label="Paginación de resultados">
    <button type="button" class="page-arrow" :disabled="pagina <= 1" aria-label="Página anterior" @click="cambiar(pagina - 1)">
      <span aria-hidden="true">←</span><span class="page-arrow-label"> Anterior</span>
    </button>
    <div class="page-numbers">
      <button
        v-for="numero in numeros"
        :key="numero"
        type="button"
        :class="{ 'page-active': numero === pagina }"
        :aria-current="numero === pagina ? 'page' : undefined"
        :aria-label="`Ir a la página ${numero}`"
        :disabled="numero === pagina"
        @click="cambiar(numero)"
      >{{ numero }}</button>
    </div>
    <button type="button" class="page-arrow" :disabled="pagina >= paginas" aria-label="Página siguiente" @click="cambiar(pagina + 1)">
      <span class="page-arrow-label">Siguiente </span><span aria-hidden="true">→</span>
    </button>
    <span class="sr-only">Página {{ pagina }} de {{ paginas }}</span>
  </nav>
</template>
