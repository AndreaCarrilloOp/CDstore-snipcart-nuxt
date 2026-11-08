<template>
  <div class="site-shell">
    <a class="skip-link" href="#contenido">Ir al contenido</a>
    <HeaderView />
    <main id="contenido" class="container main-content">
      <slot />
    </main>
    <FooterView />
  </div>
</template>
