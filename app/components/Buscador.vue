<script setup lang="ts">
const valor = defineModel<string>({ default: '' })
</script>

<template>
  <label class="search-field">
    <span class="sr-only">Buscar discos</span>
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 5 5" />
    </svg>
    <input
      v-model="valor"
      type="search"
      placeholder="Buscar disco o artista…"
      autocomplete="off"
    />
  </label>
</template>
