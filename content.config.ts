import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Cada registro se almacena en un documento JSON.
export default defineContentConfig({
  collections: {
    albumes: defineCollection({
      type: 'data',
      source: 'albumes/*.json',
      schema: z.object({
        slug: z.string(),
        titulo: z.string(),
        artistaSlug: z.string(),
        generoSlug: z.string(),
        formato: z.enum(['CD', 'LP']),
        anio: z.number().int(),
        precio: z.number().positive(),
        descripcion: z.string(),
        portada: z.string(),
        pistas: z.array(z.string()).min(1)
      })
    }),
    artistas: defineCollection({
      type: 'data',
      source: 'artistas/*.json',
      schema: z.object({ slug: z.string(), nombre: z.string(), pais: z.string(), biografia: z.string() })
    }),
    generos: defineCollection({
      type: 'data',
      source: 'generos/*.json',
      schema: z.object({ slug: z.string(), nombre: z.string(), descripcion: z.string(), imagen: z.string() })
    })
  }
})
