<script setup lang="ts">
// Igual que en el Tutorial 9: contador compartido y carrito Snipcart.
const cartCount = useState<number>('cart-count', () => 0)
const cartReady = useState<boolean>('cart-ready', () => false)
const { snipcartApiKey } = useRuntimeConfig().public
const hasKey = computed(() => Boolean(String(snipcartApiKey || '').trim()))
</script>

<template>
  <header class="topbar">
    <div class="container header-content">
      <NuxtLink class="brand" to="/" aria-label="Sönglist: volver al inicio">
        <span class="brand-symbol" aria-hidden="true"><span /></span>
        <span>Sönglist</span>
      </NuxtLink>

      <nav class="main-nav" aria-label="Navegación principal">
        <NuxtLink to="/">Inicio</NuxtLink>
        <NuxtLink to="/catalogo">Catálogo</NuxtLink>
      </nav>

      <button
        type="button"
        class="cart-link snipcart-checkout"
        :disabled="!hasKey || !cartReady"
        :title="!hasKey ? 'Configurá la clave pública de Snipcart' : !cartReady ? 'Cargando carrito' : 'Abrir carrito'"
        :aria-label="`Abrir carrito, ${cartCount} ${cartCount === 1 ? 'disco' : 'discos'}`"
      >
        <span aria-hidden="true">🛒</span>
        <span>Carrito</span>
        <ClientOnly>
          <span class="cart-count">{{ cartCount }}</span>
          <template #fallback><span class="cart-count">0</span></template>
        </ClientOnly>
      </button>
    </div>
  </header>
</template>
