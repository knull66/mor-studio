# MOR Studio

Sitio web y panel de administración para **MOR Studio** en **San Antonio, Texas**: fotografía y maquillaje dirigidos por **Elisabeth Morao**. Estética cálida tipo *warm luxury*: crema, taupe, serif editorial y mucho aire.

El sitio es **bilingüe (español / inglés)** y funciona de inmediato con contenido de demostración. Cuando conectas Supabase, paquetes, portafolio y citas pasan a ser dinámicos.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Motion (animaciones)
- Embla Carousel
- Supabase (Postgres, Auth, Storage)
- Despliegue pensado para Vercel

## Mejoras respecto al brief original

- **Bilingüe ES / EN** con selector de idioma en el header.
- **El sitio se ve completo sin backend.** Si no hay `.env`, se usan paquetes, galería y testimonios de ejemplo.
- **Formulario de reserva** además de WhatsApp: guarda la solicitud en `inquiries` y abre un chat precargado.
- **SEO local:** metadata, Open Graph, `sitemap.xml`, `robots.txt` y JSON-LD de negocio.
- **Paquetes con duración, orden y activar/desactivar** (no hace falta borrar un precio de temporada).
- **Testimonios** listos para una tabla en Supabase.
- **Slider antes/después accesible** (puntero + teclado/range).
- **Barra de anuncio descartable** y menú móvil a pantalla completa.
- Next.js 16 con `proxy.ts` (el sucesor de `middleware`) para proteger `/admin`.

## Arranque local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El admin está en `/admin/login`.

## Conectar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com).
2. Pega en `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. En el SQL Editor ejecuta `supabase/schema.sql` (tablas, RLS y bucket `portfolio`).
4. Authentication → Users → invita o crea el correo del estudio.
5. Storage: confirma que el bucket `portfolio` es **público**.
6. Teléfono, WhatsApp y dirección viven en `src/lib/constants.ts` (San Antonio, Texas · `+1 (210) 548-5300`).

Sin estas claves, la web pública sigue viva con el contenido seed; el login admin muestra instrucciones de configuración.

## Paleta y tipografías

| Uso | Valor |
| --- | --- |
| Fondo | `#FAF8F5` |
| Arena | `#F2ECE4` / `#EBE3D8` |
| Taupe | `#9E8B82` |
| Texto | `#1C1917` |
| Títulos | Cormorant Garamond |
| UI | Plus Jakarta Sans |

## Rutas

| Ruta | Qué es |
| --- | --- |
| `/` | Landing pública |
| `/admin/login` | Acceso |
| `/admin` | Resumen |
| `/admin/portfolio` | Subir / ordenar / borrar fotos |
| `/admin/packages` | Precios y paquetes |
| `/admin/inquiries` | Citas y formularios |

## Despliegue en Vercel

1. Sube el repo y importa el proyecto.
2. Añade las mismas variables de entorno.
3. Pon `NEXT_PUBLIC_SITE_URL` con el dominio final.

## Personalización rápida

- Textos de negocio, FAQ y navegación: `src/lib/constants.ts`
- Fotos y precios de demo: `src/lib/data/seed.ts`
- Esquema de base de datos: `supabase/schema.sql`
