<script setup lang="ts">
const props = defineProps<{
  album: {
    slug: string
    titulo: string
    artistaSlug: string
    formato: string
    precio: number
    descripcion: string
    portada: string
  }
  compacto?: boolean
}>()

const config = useRuntimeConfig()
const tieneClave = computed(() => Boolean(String(config.public.snipcartApiKey || '').trim()))
const carritoListo = useState<boolean>('cart-ready', () => false)
const habilitado = computed(() => tieneClave.value && carritoListo.value)
const sitio = computed(() => String(config.public.siteUrl || '').replace(/\/$/, ''))

// La misma URL e ID se usan en las tarjetas y la ficha para validación Snipcart.
// En Netlify debe configurarse NUXT_PUBLIC_SITE_URL con el dominio publicado.
const urlProducto = computed(() => `${sitio.value}/albumes/${props.album.slug}`)
const urlPortada = computed(() => `${sitio.value}${props.album.portada}`)
</script>

<template>
  <div class="buy-area" :class="{ 'buy-area-compact': compacto }">
    <button
      type="button"
      class="button snipcart-add-item"
      :class="compacto ? 'button-compact' : 'button-dark'"
      :disabled="!habilitado"
      :aria-label="`Agregar ${album.titulo} al carrito`"
      :title="habilitado ? `Agregar ${album.titulo} al carrito` : tieneClave ? 'Cargando carrito' : 'Configurá Snipcart para activar la compra'"
      :data-item-id="album.slug"
      :data-item-name="`${album.titulo} (${album.formato})`"
      :data-item-price="album.precio.toFixed(2)"
      :data-item-url="urlProducto"
      :data-item-description="album.descripcion"
      :data-item-image="urlPortada"
    >
      {{ compacto ? 'Comprar' : 'Agregar al carrito' }}
    </button>
    <p v-if="!habilitado && !compacto" class="helper-text">
      {{ tieneClave ? 'Cargando carrito de compras…' : 'Configurá la clave pública de Snipcart para comprar.' }}
    </p>
  </div>
</template>
