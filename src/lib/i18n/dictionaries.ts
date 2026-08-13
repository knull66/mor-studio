import type { Locale } from "@/lib/i18n/config";

const es = {
  announcement:
    "50% de descuento en paquetes de Maquillaje + Foto para Novias 2026 — ¡Reserva hoy!",
  closeAnnouncement: "Cerrar anuncio",
  nav: {
    home: "Inicio",
    about: "Sobre Elisabeth",
    packages: "Servicios & Paquetes",
    portfolio: "Portafolio",
    faq: "Preguntas Frecuentes",
    book: "Reservar Cita",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  hero: {
    eyebrow: "Fotografía y maquillaje",
    headline: "El arte de capturar y resaltar tu belleza",
    primaryCta: "Ver paquetes de bodas & novias",
    secondaryCta: "Explorar portafolio",
    prev: "Anterior",
    next: "Siguiente",
    goToSlide: "Ir a la imagen",
  },
  categories: {
    eyebrow: "Explorar",
    title: "Por categoría",
    description:
      "Tres universos, un mismo criterio estético: piel verdadera, luz cuidada y un ritmo de estudio calmado.",
    exploreMore: "Explorar más",
    items: {
      photography: {
        title: "Fotografía Profesional",
        subtitle: "Retrato, editorial, maternidad y estudio",
      },
      makeup: {
        title: "Maquillaje Social & Editorial",
        subtitle: "Social, quinceañeras y noche",
      },
      brides: {
        title: "Especial Novias & Bodas",
        subtitle: "Servicio integral MUA + foto",
      },
    },
  },
  about: {
    eyebrow: "La artista",
    title: "Elisabeth Morao",
    role: "Fundadora · Maquillista y fotógrafa",
    p1: "Elisabeth Morao es la artista y dueña de MOR Studio. Une maquillaje y fotografía en una sola mirada: prepara la piel para la cámara y dirige la luz para la piel, sin prisas ni looks que no sobreviven al flash.",
    p2: "Desde San Antonio, Texas, acompaña a novias, familias y marcas que buscan un lujo cálido: menos filtro, más presencia. Cada sesión se siente íntima, editorial y hecha a tu medida.",
    cta: "Reservar con Elisabeth",
    photoAlt1: "Elisabeth Morao, artista y dueña de MOR Studio",
    photoAlt2: "Retrato de estudio de Elisabeth Morao",
  },
  beforeAfter: {
    eyebrow: "El detalle que cambia todo",
    title: "Antes y después",
    description:
      "Arrastra la línea para ver el paso del rostro al natural al maquillaje de estudio. Piel respetada, rasgos definidos, luz lista para fotografía.",
    natural: "Al natural",
    glam: "Maquillaje de estudio",
    slider: "Comparar antes y después",
  },
  packages: {
    eyebrow: "Servicios",
    title: "Paquetes & precios",
    description:
      "Precios orientativos en USD. Cada fecha se cotiza según locación, horario y número de personas. El 50% reserva tu día.",
    comboNote:
      "La combinación foto + maquillaje es nuestro mejor valor: un solo equipo, un solo criterio estético.",
    featured: "Recomendado",
    from: "Precio desde · USD",
    cta: "Solicitar disponibilidad",
    tabs: {
      makeup: "Maquillaje",
      hair: "Peinados",
      photography: "Fotografía",
      bridal_combo: "Experiencia MOR",
    },
  },
  packageItems: {
    "mua-novia": {
      title: "Maquillaje de Novia",
      duration: "2.5 — 3 horas",
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
    "mua-prueba": {
      title: "Prueba de Novia",
      duration: "90 minutos",
      description:
        "La sesión para decidir piel, ojos y labios con calma, antes del gran día.",
      features: [
        "Consulta de estilo y referencias",
        "Prueba de dos looks",
        "Fotos de referencia en estudio",
        "Ajustes para el día de la boda",
      ],
    },
    "mua-social": {
      title: "Maquillaje Social",
      duration: "75 minutos",
      description:
        "Para eventos, quinceañeras, graduaciones y noches que merecen un glow editorial.",
      features: [
        "Maquillaje social o de noche",
        "Pestañas según el look",
        "Asesoría de cejas",
        "Ideal para fotografía",
      ],
    },
    "mua-editorial": {
      title: "Beauty Editorial",
      duration: "2 horas",
      description:
        "Maquillaje de carácter para campañas, lookbooks y retrato de autor.",
      features: [
        "Dirección de arte en conjunto",
        "Hasta dos cambios de look",
        "Productos de grado profesional",
        "Coordinación con fotógrafa",
      ],
    },
    "foto-estudio": {
      title: "Sesión de Estudio",
      duration: "1.5 horas",
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
    "foto-exterior": {
      title: "Sesión Exterior",
      duration: "2 horas",
      description:
        "Luz natural, locaciones con carácter y un ritmo pausado para retratos con alma.",
      features: [
        "25 fotografías editadas",
        "Locación en San Antonio",
        "Golden hour o luz suave",
        "Asesoría de vestuario",
      ],
    },
    "foto-boda": {
      title: "Cobertura de Boda",
      duration: "8 horas",
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
    "mor-esencial": {
      title: "Experiencia MOR Esencial",
      duration: "Medio día",
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
    "mor-premium": {
      title: "Experiencia MOR Premium",
      duration: "Día completo de preparación",
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
    "mor-elite": {
      title: "Experiencia MOR Élite",
      duration: "Boda + preboda",
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
    "hair-novia": {
      title: "Peinado de Novia",
      duration: "90 minutos",
      description:
        "Recogido o ondas de larga duración, pensado para ceremonias, viento y fotografías de todo el día.",
      features: [
        "Consulta de estilo y referencias",
        "Prueba previa opcional",
        "Fijación de larga duración",
        "Horquillas y accesorios de novia",
        "Retoque para el after",
      ],
    },
    "hair-social": {
      title: "Peinado Social",
      duration: "60 minutos",
      description:
        "Recogido, semirecogido u ondas para eventos, quinceañeras y noches que piden un look de revista.",
      features: [
        "Peinado según el evento",
        "Fijación que aguanta baile y fotos",
        "Acabado alineado al maquillaje",
        "Ideal junto al maquillaje social",
      ],
    },
    "hair-prueba": {
      title: "Prueba de Peinado",
      duration: "60 minutos",
      description:
        "La cita para decidir volumen, recogido y accesorios con calma, antes del gran día.",
      features: [
        "Hasta dos opciones de peinado",
        "Prueba de accesorios y velo",
        "Fotos de referencia",
        "Ajustes para el día del evento",
      ],
    },
  } as Record<
    string,
    { title: string; duration: string; description: string; features: string[] }
  >,
  portfolio: {
    eyebrow: "Galería",
    title: "Portafolio",
    description:
      "Una selección de novias, beauty y retrato. Cada imagen se fotografió pensando en piel, gesto y luz — no en tendencias que caducan.",
    close: "Cerrar",
    expand: "Ver más grande",
    filters: {
      all: "Todos",
      brides: "Novias",
      makeup: "Maquillaje",
      photography: "Fotografía",
      hair: "Peinados",
    },
  },
  testimonials: {
    eyebrow: "Prueba social",
    title: "Lo que cuentan nuestras clientas",
    items: {
      t1: {
        role: "Novia · San Antonio, 2025",
        quote:
          "Elisabeth me maquilló como si me conociera de siempre. En las fotos se ve mi piel, no una máscara, y duró hasta el último baile.",
      },
      t2: {
        role: "Boda · Hill Country, Texas",
        quote:
          "Entendió el ritmo del día. Las fotos se sienten cine, no poses rígidas. Reservamos Experiencia MOR sin pensarlo.",
      },
      t3: {
        role: "Sesión editorial · San Antonio",
        quote:
          "Dirección clara, luz preciosa y un maquillaje que se ve de revista. Salí del estudio sintiendo que por fin me vi como me imagino.",
      },
    } as Record<string, { role: string; quote: string }>,
  },
  faq: {
    eyebrow: "Dudas frecuentes",
    title: "Preguntas frecuentes",
    description:
      "Políticas claras para que reserves con calma. Si tu caso es particular, escríbenos: preferimos conversar que imponer una letra chica.",
    items: [
      {
        q: "¿Cómo se reserva una fecha?",
        a: "Se confirma con un depósito del 50% del paquete elegido. El resto se liquida el día del servicio o 7 días antes en coberturas de boda. El depósito no es reembolsable, pero puede reagendarse con 15 días de anticipación.",
      },
      {
        q: "¿La prueba de maquillaje está incluida?",
        a: "En paquetes de novia y Experiencia MOR Premium/Élite sí. En maquillaje social es opcional y se agenda en una cita previa de 60 a 90 minutos para definir piel, ojos y peinado.",
      },
      {
        q: "¿Cuánto tardan las fotografías editadas?",
        a: "Sesiones de estudio y exteriores: 10 a 15 días hábiles. Cobertura de boda: galería preview en 7 días y entrega final en 4 a 6 semanas. Todas las imágenes se entregan en galería privada en alta resolución.",
      },
      {
        q: "¿Hay cargo por traslado?",
        a: "Dentro de San Antonio y el área metropolitana cercana no hay cargo extra. Locaciones a más de 40 minutos (Hill Country, Austin u otras ciudades) se cotizan según distancia y horarios.",
      },
      {
        q: "¿Atienden solo novias?",
        a: "Las novias son el corazón del estudio, pero Elisabeth también trabaja quinceañeras, maternidad, retrato editorial, eventos sociales y sesiones de belleza para marcas.",
      },
      {
        q: "¿Puedo moverme o cancelar?",
        a: "Reagendar es posible con 15 días de aviso, sujeto a disponibilidad. Cancelaciones con menos de 7 días pierden el depósito. En caso de fuerza mayor evaluamos cada situación con empatía.",
      },
    ],
  },
  booking: {
    eyebrow: "Agenda",
    title: "Reserva tu fecha",
    description:
      "Cuéntanos la fecha y el servicio. Te respondemos con disponibilidad y una propuesta clara. El depósito del 50% confirma el apartado.",
    name: "Nombre",
    phone: "Teléfono",
    email: "Correo",
    eventDate: "Fecha del evento",
    service: "Servicio",
    message: "Mensaje",
    placeholder: "Locación, número de personas, referencias de look…",
    submit: "Solicitar disponibilidad",
    sending: "Enviando…",
    error: "No se pudo enviar.",
    success: "Recibimos tu solicitud. También puedes continuar por WhatsApp.",
    services: [
      "Experiencia MOR (Foto + Maquillaje)",
      "Maquillaje de novia",
      "Prueba de maquillaje",
      "Maquillaje social",
      "Peinado de novia",
      "Peinado social",
      "Sesión fotográfica",
      "Cobertura de boda",
      "Otro",
    ],
  },
  info: {
    questions: "¿Tienes preguntas?",
    located: "Estamos en",
    hoursLabel: "Horario",
    hours: "Mar — Sáb · 10:00 a.m. – 7:00 p.m.",
  },
  instagram: "Síguenos",
  footer: {
    blurb:
      "Estudio de fotografía y maquillaje en San Antonio, Texas, dirigido por Elisabeth Morao. Belleza que se siente natural y se ve de revista.",
    join: "Únete a la lista",
    dates: "Fechas y lanzamientos",
    emailPlaceholder: "Tu correo",
    book: "Reservar cita",
    rights: "Todos los derechos reservados.",
    admin: "Acceso Administrativo",
    links: {
      home: "Inicio",
      about: "Elisabeth",
      packages: "Paquetes",
      portfolio: "Portafolio",
      faq: "FAQ",
      book: "Reservar",
    },
  },
  whatsapp: {
    label: "Escribir por WhatsApp",
    default:
      "Hola MOR Studio, me gustaría agendar una cita con Elisabeth y conocer disponibilidad.",
    package: (title: string, price: string) =>
      `Hola MOR Studio, quiero solicitar disponibilidad para el paquete "${title}" (${price}). ¿Me ayudan con fechas?`,
    booking: (name: string, service: string, date: string, message: string) =>
      `Hola MOR Studio, soy ${name}. Me interesa ${service || "una cita"} para el ${date || "próximo disponible"}. ${message}`.trim(),
  },
  language: {
    label: "Idioma",
    es: "ES",
    en: "EN",
  },
  notFound: {
    title: "Esta página no existe",
    back: "Volver al inicio",
  },
  meta: {
    description:
      "MOR Studio en San Antonio, Texas. Fotografía y maquillaje de Elisabeth Morao para novias, bodas, eventos y retrato editorial.",
  },
};

const en: typeof es = {
  announcement:
    "50% off Makeup + Photo bridal packages for 2026 — Book today!",
  closeAnnouncement: "Dismiss announcement",
  nav: {
    home: "Home",
    about: "About Elisabeth",
    packages: "Services & Packages",
    portfolio: "Portfolio",
    faq: "FAQ",
    book: "Book Now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    eyebrow: "Photography and makeup",
    headline: "The art of capturing and revealing your beauty",
    primaryCta: "View bridal & wedding packages",
    secondaryCta: "Explore the portfolio",
    prev: "Previous",
    next: "Next",
    goToSlide: "Go to slide",
  },
  categories: {
    eyebrow: "Explore",
    title: "By category",
    description:
      "Three worlds, one aesthetic: true skin, considered light, and an unhurried studio rhythm.",
    exploreMore: "Explore more",
    items: {
      photography: {
        title: "Professional Photography",
        subtitle: "Portrait, editorial, maternity & studio",
      },
      makeup: {
        title: "Social & Editorial Makeup",
        subtitle: "Events, quinceañeras & evening",
      },
      brides: {
        title: "Brides & Weddings",
        subtitle: "Full MUA + photo experience",
      },
    },
  },
  about: {
    eyebrow: "The artist",
    title: "Elisabeth Morao",
    role: "Founder · Makeup artist & photographer",
    p1: "Elisabeth Morao is the artist and owner of MOR Studio. She brings makeup and photography into a single point of view: skin prepared for the camera, light directed for the skin — no rush, no looks that disappear under flash.",
    p2: "From San Antonio, Texas, she works with brides, families, and brands who want warm luxury: less filter, more presence. Every session feels intimate, editorial, and made for you.",
    cta: "Book with Elisabeth",
    photoAlt1: "Elisabeth Morao, artist and owner of MOR Studio",
    photoAlt2: "Studio portrait of Elisabeth Morao",
  },
  beforeAfter: {
    eyebrow: "The detail that changes everything",
    title: "Before & after",
    description:
      "Drag the line to see the shift from bare skin to studio makeup. Respected skin, defined features, light ready for the camera.",
    natural: "Bare skin",
    glam: "Studio makeup",
    slider: "Compare before and after",
  },
  packages: {
    eyebrow: "Services",
    title: "Packages & pricing",
    description:
      "Starting prices in USD. Each date is quoted by location, timing, and party size. A 50% deposit holds your day.",
    comboNote:
      "Photo + makeup together is our best value: one team, one aesthetic.",
    featured: "Featured",
    from: "Starting at · USD",
    cta: "Request availability",
    tabs: {
      makeup: "Makeup",
      hair: "Hair",
      photography: "Photography",
      bridal_combo: "MOR Experience",
    },
  },
  packageItems: {
    "mua-novia": {
      title: "Bridal Makeup",
      duration: "2.5 — 3 hours",
      description:
        "Luminous skin, tear-proof eyes, and a finish that looks flawless in person and on camera.",
      features: [
        "Optional trial",
        "Long-wear makeup",
        "Lashes included",
        "Touch-up kit for the day",
        "Getting-ready support",
      ],
    },
    "mua-prueba": {
      title: "Bridal Trial",
      duration: "90 minutes",
      description:
        "The session to decide skin, eyes, and lips with ease, before the big day.",
      features: [
        "Style consultation and references",
        "Two look options",
        "Reference photos in studio",
        "Adjustments for wedding day",
      ],
    },
    "mua-social": {
      title: "Social Makeup",
      duration: "75 minutes",
      description:
        "For events, quinceañeras, graduations, and nights that deserve an editorial glow.",
      features: [
        "Day or evening makeup",
        "Lashes to match the look",
        "Brow grooming",
        "Camera-ready finish",
      ],
    },
    "mua-editorial": {
      title: "Editorial Beauty",
      duration: "2 hours",
      description:
        "Character makeup for campaigns, lookbooks, and authored portrait work.",
      features: [
        "Shared art direction",
        "Up to two look changes",
        "Professional-grade products",
        "Coordinated with photography",
      ],
    },
    "foto-estudio": {
      title: "Studio Session",
      duration: "1.5 hours",
      description:
        "Directed studio portrait with controlled light — beauty, maternity, and personal branding.",
      features: [
        "20 edited photographs",
        "Pose direction",
        "2 outfit changes",
        "Private digital gallery",
        "Studio backdrop and lighting",
      ],
    },
    "foto-exterior": {
      title: "Outdoor Session",
      duration: "2 hours",
      description:
        "Natural light, locations with character, and an unhurried pace for portraits with soul.",
      features: [
        "25 edited photographs",
        "San Antonio location",
        "Golden hour or soft light",
        "Wardrobe guidance",
      ],
    },
    "foto-boda": {
      title: "Wedding Coverage",
      duration: "8 hours",
      description:
        "The full story of the day: getting ready, ceremony, portraits, and celebration — cinematic editing.",
      features: [
        "8 hours of coverage",
        "250+ edited images",
        "Preview within 7 days",
        "Second shooter optional",
        "High-resolution gallery",
      ],
    },
    "mor-esencial": {
      title: "MOR Essential Experience",
      duration: "Half day",
      description:
        "Professional makeup + beauty session. The starting point to look and feel like a bride.",
      features: [
        "Bridal or social makeup",
        "1.5 h studio session",
        "25 edited photos",
        "Pose direction",
        "Best value for pre-wedding sessions",
      ],
    },
    "mor-premium": {
      title: "MOR Premium Experience",
      duration: "Full prep day",
      description:
        "Our most requested package: trial, day-of makeup, and portraits that feel editorial.",
      features: [
        "Makeup trial included",
        "MUA on the event day",
        "2 h pre-wedding session",
        "40 edited photos",
        "Touch-up kit",
        "Priority 2026 dates",
      ],
    },
    "mor-elite": {
      title: "MOR Élite Experience",
      duration: "Wedding + pre-wedding",
      description:
        "A complete service for the big day: beauty, portraits, and coverage with one creative team.",
      features: [
        "Trial + bridal makeup",
        "6 h photo coverage",
        "Documented getting ready",
        "180 edited images",
        "MUA assistant",
        "Local San Antonio travel included",
      ],
    },
    "hair-novia": {
      title: "Bridal Hair",
      duration: "90 minutes",
      description:
        "An updo or long-wear waves, made for ceremonies, wind, and a full day of photographs.",
      features: [
        "Style consultation and references",
        "Optional trial",
        "Long-hold finish",
        "Bridal pins and accessories",
        "Touch-up for the after-party",
      ],
    },
    "hair-social": {
      title: "Event Hair",
      duration: "60 minutes",
      description:
        "Updo, half-up, or waves for events, quinceañeras, and nights that ask for a magazine finish.",
      features: [
        "Style for the occasion",
        "Hold that lasts through dancing and photos",
        "Finish aligned with makeup",
        "Pairs well with social makeup",
      ],
    },
    "hair-prueba": {
      title: "Hair Trial",
      duration: "60 minutes",
      description:
        "The appointment to decide volume, updo, and accessories with ease, before the big day.",
      features: [
        "Up to two hairstyle options",
        "Accessory and veil trial",
        "Reference photos",
        "Adjustments for the event day",
      ],
    },
  },
  portfolio: {
    eyebrow: "Gallery",
    title: "Portfolio",
    description:
      "A selection of brides, beauty, and portrait work. Every frame was made for skin, gesture, and light — not passing trends.",
    close: "Close",
    expand: "View larger",
    filters: {
      all: "All",
      brides: "Brides",
      makeup: "Makeup",
      photography: "Photography",
      hair: "Hair",
    },
  },
  testimonials: {
    eyebrow: "Kind words",
    title: "What our clients say",
    items: {
      t1: {
        role: "Bride · San Antonio, 2025",
        quote:
          "Elisabeth did my makeup as if she had always known me. In the photos you see my skin, not a mask, and it lasted through the last dance.",
      },
      t2: {
        role: "Wedding · Texas Hill Country",
        quote:
          "She understood the rhythm of the day. The photos feel like cinema, not stiff poses. We booked the MOR Experience without a second thought.",
      },
      t3: {
        role: "Editorial session · San Antonio",
        quote:
          "Clear direction, beautiful light, and makeup that looks like a magazine. I left the studio feeling I finally looked the way I imagine myself.",
      },
    },
  },
  faq: {
    eyebrow: "Good to know",
    title: "Frequently asked questions",
    description:
      "Clear policies so you can book with ease. If your date is unique, write to us — we would rather talk than hide behind fine print.",
    items: [
      {
        q: "How do I reserve a date?",
        a: "A 50% deposit on the chosen package holds your date. The balance is due on the service day, or 7 days prior for wedding coverage. Deposits are non-refundable but may be rescheduled with 15 days’ notice.",
      },
      {
        q: "Is a makeup trial included?",
        a: "Yes, on bridal packages and MOR Premium/Élite. For social makeup it is optional and booked as a 60–90 minute visit to define skin, eyes, and hair.",
      },
      {
        q: "How long until edited photos are ready?",
        a: "Studio and outdoor sessions: 10–15 business days. Wedding coverage: a preview gallery in 7 days and the final delivery in 4–6 weeks. All images are delivered in a private high-resolution gallery.",
      },
      {
        q: "Do you charge travel fees?",
        a: "No extra fee within San Antonio and the nearby metro area. Locations more than 40 minutes away (Hill Country, Austin, or other cities) are quoted by distance and schedule.",
      },
      {
        q: "Do you only work with brides?",
        a: "Brides are the heart of the studio, but Elisabeth also photographs and glamorizes quinceañeras, maternity, editorial portrait, social events, and brand beauty sessions.",
      },
      {
        q: "Can I reschedule or cancel?",
        a: "Rescheduling is possible with 15 days’ notice, subject to availability. Cancellations with fewer than 7 days forfeit the deposit. In cases of force majeure we review each situation with care.",
      },
    ],
  },
  booking: {
    eyebrow: "The calendar",
    title: "Book your date",
    description:
      "Tell us the date and the service. We will reply with availability and a clear proposal. A 50% deposit confirms the hold.",
    name: "Name",
    phone: "Phone",
    email: "Email",
    eventDate: "Event date",
    service: "Service",
    message: "Message",
    placeholder: "Location, party size, look references…",
    submit: "Request availability",
    sending: "Sending…",
    error: "We couldn’t send that.",
    success: "We received your request. You can also continue on WhatsApp.",
    services: [
      "MOR Experience (Photo + Makeup)",
      "Bridal makeup",
      "Makeup trial",
      "Social makeup",
      "Bridal hair",
      "Event hair",
      "Photo session",
      "Wedding coverage",
      "Other",
    ],
  },
  info: {
    questions: "Have questions?",
    located: "Located in",
    hoursLabel: "Hours",
    hours: "Tue — Sat · 10:00 AM – 7:00 PM",
  },
  instagram: "Follow us",
  footer: {
    blurb:
      "Photography and makeup studio in San Antonio, Texas, led by Elisabeth Morao. Beauty that feels natural and looks like an editorial.",
    join: "Join the list",
    dates: "Dates and launches",
    emailPlaceholder: "Your email",
    book: "Book an appointment",
    rights: "All rights reserved.",
    admin: "Admin access",
    links: {
      home: "Home",
      about: "Elisabeth",
      packages: "Packages",
      portfolio: "Portfolio",
      faq: "FAQ",
      book: "Book",
    },
  },
  whatsapp: {
    label: "Message on WhatsApp",
    default:
      "Hi MOR Studio, I would like to book an appointment with Elisabeth and check availability.",
    package: (title: string, price: string) =>
      `Hi MOR Studio, I would like to request availability for the "${title}" package (${price}). Can you help with dates?`,
    booking: (name: string, service: string, date: string, message: string) =>
      `Hi MOR Studio, this is ${name}. I’m interested in ${service || "an appointment"} for ${date || "the next available date"}. ${message}`.trim(),
  },
  language: {
    label: "Language",
    es: "ES",
    en: "EN",
  },
  notFound: {
    title: "This page does not exist",
    back: "Back to home",
  },
  meta: {
    description:
      "MOR Studio in San Antonio, Texas. Photography and makeup by Elisabeth Morao for brides, weddings, events, and editorial portrait.",
  },
};

export const dictionaries = { es, en };
export type Dictionary = typeof es;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
