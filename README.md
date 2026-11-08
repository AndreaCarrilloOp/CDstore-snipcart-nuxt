# Tienda de música

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxtdotjs&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Nuxt Content](https://img.shields.io/badge/Nuxt%20Content-3-00DC82)](https://content.nuxt.com/)
[![Snipcart](https://img.shields.io/badge/Snipcart-TEST-222222)](https://snipcart.com/)
[![Utterances](https://img.shields.io/badge/Comentarios-Utterances-4C5C68)](https://utteranc.es/)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)

Aplicación académica de comercio electrónico para explorar y comprar en **modo de prueba** CD y vinilos. Desarrollada para el Curso de Arquitectura de Información (UNA)**, utilizando Nuxt 4, Vue 3, Nuxt Content, Snipcart y Utterances.

**[Ver sitio publicado](https://songlist-store.netlify.app/)**

## Funcionalidades

- **Categorías en Inicio:** seis géneros musicales como punto de entrada a la navegación.
- **Listados paginados:** cada género muestra sus álbumes en páginas de tres registros.
- **Catálogo general:** 36 álbumes con búsqueda por palabras clave, filtros por género/formato y paginación de seis registros.
- **Detalle de álbum:** portada, artista, formato, año, precio, descripción y canciones.
- **Comercio electrónico:** botones de compra y carrito Snipcart configurado en modo TEST.
- **Comentarios:** Utterances integrado en las fichas mediante GitHub Issues.

> Los 36 álbumes, precios, artistas y descripciones son datos ficticios de demostración académica: **18 CD y 18 LP**, organizados en **6 géneros** y vinculados con **12 artistas**.

## Arquitectura de información

```text
Inicio /  (seis categorías)
    └── /generos/[slug]  (listado y paginación)
          └── /albumes/[slug]  (detalle, compra y comentarios)

Catálogo /catalogo  (búsqueda, filtros y paginación)
    └── /albumes/[slug]
```

El contenido se gestiona con colecciones JSON de **Nuxt Content** (`albumes`, `artistas`, `generos`) y consultas `queryCollection()`. La navegación utiliza rutas dinámicas de Nuxt; los componentes de tarjetas, paginación y compra se reutilizan entre vistas.

## Estructura principal

```text
app/
  components/         # Tarjetas, buscador, paginación, compra y comentarios
  composables/         # Filtros y paginación compartida
  pages/               # Inicio, catálogo, género y detalle
  plugins/             # Integración cliente de Snipcart
content/
  albumes/             # 36 archivos JSON
  artistas/            # 12 archivos JSON
  generos/             # 6 archivos JSON
public/
  covers/              # 36 portadas WebP
  generos/             # 6 imágenes horizontales WebP
content.config.ts     # Colecciones y validación de datos
nuxt.config.ts        # Configuración de Nuxt y prerenderizado
netlify.toml          # Compilación y publicación
```

## Ejecutar localmente

**Requisito:** Node.js 22.19 o superior.

```bash
npm install
cp .env.example .env
npm run dev
```

En PowerShell podés sustituir `cp` por `Copy-Item .env.example .env`. El sitio local se abre en `http://localhost:3000`.

### Variables de entorno

| Variable | Uso |
| --- | --- |
| `NUXT_PUBLIC_SNIPCART_API_KEY` | Clave **pública TEST** de Snipcart. |
| `NUXT_PUBLIC_UTTERANCES_REPO` | Repositorio público con Issues habilitados y Utterances autorizado. |
| `NUXT_PUBLIC_SITE_URL` | URL del sitio, por ejemplo `https://songlist-store.netlify.app`. |
| `NUXT_PUBLIC_SNIPCART_CURRENCY` | Opcional; valor predeterminado `usd`. |
| `NUXT_PUBLIC_SNIPCART_LANGUAGE` | Opcional; valor predeterminado `es`. |

## Publicación y entrega

- **Build en Netlify:** `npm run generate`
- **Carpeta publicada:** `.output/public` (según `netlify.toml`)
- **Rutas estáticas:** inicio, catálogo, géneros y fichas individuales prerenderizadas.
- **Aula Virtual:** entregar el código fuente, **sin** `node_modules`, `.nuxt`, `.output` ni el sitio generado.

La publicación y las pantallas de catálogo, fichas, carrito TEST e interfaz de Utterances se muestran en las evidencias de la entrega. Una compra finalizada y la publicación de un comentario requieren su comprobación independiente.

---

