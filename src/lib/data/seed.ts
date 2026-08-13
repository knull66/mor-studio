import { unsplash } from "@/lib/utils";
import type {
  PortfolioItem,
  ServicePackage,
  Testimonial,
} from "@/lib/types";

export const SEED_PACKAGES: ServicePackage[] = [
  {
    id: "mua-novia",
    title: "Maquillaje de Novia",
    category: "makeup",
    price: 285,
    duration: "2.5 — 3 horas",
    is_featured: true,
    is_active: true,
    sort_order: 1,
    description:
      "Piel luminosa, ojos a prueba de lágrimas y un acabado que se ve impecable en persona y en cámara.",
    features: [
      "Prueba previa opcional",
      "Maquillaje de larga duración",
      "Pestañas postizas incluidas",
      "Retoque de kit para el día",
      "Asistencia en preparación",
    ],
  },
  {
    id: "mua-prueba",
    title: "Prueba de Novia",
    category: "makeup",
    price: 125,
    duration: "90 minutos",
    is_featured: false,
    is_active: true,
    sort_order: 2,
    description:
      "La sesión para decidir piel, ojos y labios con calma, antes del gran día.",
    features: [
      "Consulta de estilo y referencias",
      "Prueba de dos looks",
      "Fotos de referencia en estudio",
      "Ajustes para el día de la boda",
    ],
  },
  {
    id: "mua-social",
    title: "Maquillaje Social",
    category: "makeup",
    price: 95,
    duration: "75 minutos",
    is_featured: false,
    is_active: true,
    sort_order: 3,
    description:
      "Para eventos, quinceañeras, graduaciones y noches que merecen un glow editorial.",
    features: [
      "Maquillaje social o de noche",
      "Pestañas según el look",
      "Asesoría de cejas",
      "Ideal para fotografía",
    ],
  },
  {
    id: "mua-editorial",
    title: "Beauty Editorial",
    category: "makeup",
    price: 175,
    duration: "2 horas",
    is_featured: false,
    is_active: true,
    sort_order: 4,
    description:
      "Maquillaje de carácter para campañas, lookbooks y retrato de autor.",
    features: [
      "Dirección de arte en conjunto",
      "Hasta dos cambios de look",
      "Productos de grado profesional",
      "Coordinación con fotógrafa",
    ],
  },
  {
    id: "foto-estudio",
    title: "Sesión de Estudio",
    category: "photography",
    price: 325,
    duration: "1.5 horas",
    is_featured: true,
    is_active: true,
    sort_order: 1,
    description:
      "Retrato dirigido en estudio con luz controlada, ideal para beauty, maternidad y personal branding.",
    features: [
      "20 fotografías editadas",
      "Dirección de pose",
      "2 cambios de outfit",
      "Galería privada digital",
      "Fondo y luz de estudio",
    ],
  },
  {
    id: "foto-exterior",
    title: "Sesión Exterior",
    category: "photography",
    price: 385,
    duration: "2 horas",
    is_featured: false,
    is_active: true,
    sort_order: 2,
    description:
      "Luz natural, locaciones con carácter y un ritmo pausado para retratos con alma.",
    features: [
      "25 fotografías editadas",
      "Locación en San Antonio",
      "Golden hour o luz suave",
      "Asesoría de vestuario",
    ],
  },
  {
    id: "foto-boda",
    title: "Cobertura de Boda",
    category: "photography",
    price: 2200,
    duration: "8 horas",
    is_featured: true,
    is_active: true,
    sort_order: 3,
    description:
      "Narrativa completa del día: getting ready, ceremonia, retratos y fiesta, con edición cinematográfica.",
    features: [
      "Cobertura de 8 horas",
      "250+ imágenes editadas",
      "Preview en 7 días",
      "Segunda fotógrafa opcional",
      "Galería de alta resolución",
    ],
  },
  {
    id: "mor-esencial",
    title: "Experiencia MOR Esencial",
    category: "bridal_combo",
    price: 650,
    duration: "Medio día",
    is_featured: false,
    is_active: true,
    sort_order: 1,
    description:
      "Maquillaje profesional + sesión beauty. El punto de partida para verse y sentirse novia.",
    features: [
      "Maquillaje de novia o social",
      "Sesión de 1.5 h en estudio",
      "25 fotos editadas",
      "Dirección de pose",
      "Mejor valor para sesiones preboda",
    ],
  },
  {
    id: "mor-premium",
    title: "Experiencia MOR Premium",
    category: "bridal_combo",
    price: 1100,
    duration: "Día completo de preparación",
    is_featured: true,
    is_active: true,
    sort_order: 2,
    description:
      "Nuestro paquete más pedido: prueba, maquillaje del día y retratos que se sienten de editorial.",
    features: [
      "Prueba de maquillaje incluida",
      "MUA el día del evento",
      "Sesión preboda 2 h",
      "40 fotos editadas",
      "Kit de retoque",
      "Prioridad de fechas 2026",
    ],
  },
  {
    id: "mor-elite",
    title: "Experiencia MOR Élite",
    category: "bridal_combo",
    price: 1800,
    duration: "Boda + preboda",
    is_featured: true,
    is_active: true,
    sort_order: 3,
    description:
      "Servicio integral para el gran día: belleza, retratos y cobertura con un solo equipo creativo.",
    features: [
      "Prueba + maquillaje de novia",
      "Cobertura fotográfica 6 h",
      "Getting ready documentado",
      "180 imágenes editadas",
      "Asistente de MUA",
      "Traslado local en San Antonio incluido",
    ],
  },
];

export const SEED_PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    title: "Luz de novia",
    category: "brides",
    image_url: unsplash("photo-1511285560929-80b456fe3cff"),
    alt: "Novia con velo y ramo en luz suave",
    sort_order: 1,
    is_published: true,
  },
  {
    id: "p2",
    title: "Beauty close-up",
    category: "makeup",
    image_url: unsplash("photo-1487412947147-5cebf100ffc2"),
    alt: "Detalle de maquillaje profesional en estudio",
    sort_order: 2,
    is_published: true,
  },
  {
    id: "p3",
    title: "Retrato de estudio",
    category: "studio",
    image_url: unsplash("photo-1534528741775-53994a69daeb"),
    alt: "Retrato editorial de estudio",
    sort_order: 3,
    is_published: true,
  },
  {
    id: "p4",
    title: "Jardín al atardecer",
    category: "exteriors",
    image_url: unsplash("photo-1465495976277-4387d4b0b4c6"),
    alt: "Pareja de novios en jardín",
    sort_order: 4,
    is_published: true,
  },
  {
    id: "p5",
    title: "Piel y glow",
    category: "makeup",
    image_url: unsplash("photo-1522335789203-aabd1fc54bc9"),
    alt: "Maquillaje de piel luminosa",
    sort_order: 5,
    is_published: true,
  },
  {
    id: "p6",
    title: "Vestido y arquitectura",
    category: "brides",
    image_url: unsplash("photo-1606800052052-a08af7148866"),
    alt: "Novia con vestido en interior elegante",
    sort_order: 6,
    is_published: true,
  },
  {
    id: "p7",
    title: "Editorial moda",
    category: "studio",
    image_url: unsplash("photo-1469334031218-e382a71b716b"),
    alt: "Fotografía editorial de moda",
    sort_order: 7,
    is_published: true,
  },
  {
    id: "p8",
    title: "Ceremonia",
    category: "brides",
    image_url: unsplash("photo-1519741497674-611481863552"),
    alt: "Ceremonia de boda",
    sort_order: 8,
    is_published: true,
  },
  {
    id: "p9",
    title: "Retrato natural",
    category: "exteriors",
    image_url: unsplash("photo-1529626455594-4ff0802cfb7e"),
    alt: "Retrato femenino con luz natural",
    sort_order: 9,
    is_published: true,
  },
  {
    id: "p10",
    title: "Mesa de artist",
    category: "makeup",
    image_url: unsplash("photo-1487412720507-e7ab37603c6f"),
    alt: "Artista de maquillaje trabajando",
    sort_order: 10,
    is_published: true,
  },
  {
    id: "p11",
    title: "Novia en ventana",
    category: "brides",
    image_url: unsplash("photo-1583939411023-147831b0ce50"),
    alt: "Novia junto a una ventana",
    sort_order: 11,
    is_published: true,
  },
  {
    id: "p12",
    title: "Estudio en clave baja",
    category: "studio",
    image_url: unsplash("photo-1524504388940-b1c1722653e1"),
    alt: "Retrato de estudio en clave baja",
    sort_order: 12,
    is_published: true,
  },
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    client_name: "Valeria M.",
    role: "Novia · San Antonio, 2025",
    quote:
      "Me maquillaron como si me conocieran de siempre. En las fotos se ve mi piel, no una máscara, y duró hasta el último baile.",
    rating: 5,
  },
  {
    id: "t2",
    client_name: "Camila & Diego",
    role: "Boda · Hill Country, Texas",
    quote:
      "El equipo entendió el ritmo del día. Las fotos se sienten cine, no poses rígidas. Reservamos Experiencia MOR sin pensarlo.",
    rating: 5,
  },
  {
    id: "t3",
    client_name: "Andrea R.",
    role: "Sesión editorial · San Antonio",
    quote:
      "Dirección clara, luz preciosa y un maquillaje que se ve de revista. Salí del estudio sintiendo que por fin me vi como me imagino.",
    rating: 5,
  },
];

export const HERO_SLIDES = [
  {
    src: unsplash("photo-1487412947147-5cebf100ffc2", 2400),
    alt: "Maquillaje de estudio en primer plano",
    caption: "Beauty · Estudio",
  },
  {
    src: unsplash("photo-1511285560929-80b456fe3cff", 2400),
    alt: "Novia con ramo en luz natural",
    caption: "Novias · Bodas",
  },
  {
    src: unsplash("photo-1534528741775-53994a69daeb", 2400),
    alt: "Retrato editorial",
    caption: "Retrato · Editorial",
  },
];

export const CATEGORIES = [
  {
    id: "photography" as const,
    href: "#portafolio",
    image: unsplash("photo-1534528741775-53994a69daeb", 1200),
  },
  {
    id: "makeup" as const,
    href: "#antes-despues",
    image: unsplash("photo-1522335789203-aabd1fc54bc9", 1200),
  },
  {
    id: "brides" as const,
    href: "#paquetes",
    image: unsplash("photo-1606800052052-a08af7148866", 1200),
  },
];

export const INSTAGRAM_STRIP = [
  unsplash("photo-1512496015851-a90fb38ba796", 800),
  unsplash("photo-1616394584738-fc6e612e71b9", 800),
  unsplash("photo-1591604466107-ec97de577aff", 800),
  unsplash("photo-1515934751635-c81c6bc9a2d8", 800),
  unsplash("photo-1522337660859-02fbefca4702", 800),
  unsplash("photo-1479936343636-73cdc5aae0c3", 800),
  unsplash("photo-1488426862026-3ee34a7d66df", 800),
  unsplash("photo-1570172619604-71d7823e9a43", 800),
];

export const BEFORE_AFTER = {
  before: unsplash("photo-1544005313-94ddf0286df2", 1400),
  after: unsplash("photo-1487412947147-5cebf100ffc2", 1400),
};
