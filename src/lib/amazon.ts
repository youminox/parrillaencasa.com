export const AMAZON_TAG_US = "parrillaencasa-20";
export const AMAZON_TAG_ES = "parrillaencasa-21";

export type AmazonStoreRegion = "US" | "ES";

export type AmazonCategoryType =
  | "contact-grill"
  | "griddler-180"
  | "smokeless-open"
  | "smart-xl"
  | "replacement-plate"
  | "tongs-thermometer";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  categoryType: AmazonCategoryType;
  specs?: {
    priceRange: string;
    footprintSpace: string;
    servingsCapacity: string;
    cleaningEase: string;
  };
  asinUS?: string;
  asinES?: string;
  queryUS: string;
  queryES: string;
  ctaLabel: string;
}

export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    if (product.asinES) {
      return `https://www.amazon.es/dp/${product.asinES}?tag=${AMAZON_TAG_ES}`;
    }
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }

  if (product.asinUS) {
    return `https://www.amazon.com/dp/${product.asinUS}?tag=${AMAZON_TAG_US}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "US";
  }
  try {
    const saved = window.localStorage.getItem("pec_amazon_region");
    if (saved === "US" || saved === "ES") return saved;
  } catch {
    // ignore
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();
    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      tz.startsWith("Europe/") ||
      lang === "es-es"
    ) {
      return "ES";
    }
    return "US";
  } catch {
    return "US";
  }
}

export const CATALOG: Record<string, AmazonProductRecommendation> = {
  // === GEORGE FOREMAN ===
  GF_GRP4842P: {
    id: "george-foreman-grp4842p",
    badge: "💵 Mejor Calidad-Precio Compacta (5 Porciones · Placas Desmontables)",
    title:
      "George Foreman 5-Serving Removable Plate Electric Indoor Grill & Panini Press (GRP4842P)",
    subtitle:
      "La parrilla eléctrica de contacto más práctica para departamentos: placas antiadherentes George Tough extraíbles que pasan directo del mesón al lavavajillas.",
    features: [
      "Superficie inclinada de 72 sq in (4–5 hamburguesas o pechugas a la vez) que drena hasta 42 % de grasa a su bandeja frontal",
      "Placas desmontables sin PFOA aptas para lavavajillas con botón de liberación en frío",
      "Bisagra flotante que se ajusta al grosor de cortes gruesos o paninis y guardado vertical compacto",
    ],
    categoryType: "contact-grill",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "31.5 × 26.5 × 14.5 cm (se guarda en vertical)",
      servingsCapacity: "4 a 5 porciones simultáneas (72 sq in)",
      cleaningEase: "Placas desmontables 100 % aptas lavavajillas",
    },
    queryUS:
      "George Foreman 5-Serving Removable Plate Electric Indoor Grill GRP4842P",
    queryES: "George Foreman parrilla electrica 5 porciones placas extraibles",
    ctaLabel: "Consultar Precio de George Foreman GRP4842P en Amazon",
  },

  GF_GRS040B: {
    id: "george-foreman-grs040b",
    badge: "🏢 #1 Ultracompacta para Estudios y 1–2 Personas",
    title:
      "George Foreman 2-Serving Classic Plate Electric Indoor Grill & Panini Press (GRS040B / GRS040R)",
    subtitle:
      "Pensada para cocinas diminutas, estudios y almuerzos individuales rápidos: cabe dentro de cualquier cajón estándar y precalienta en apenas 3 minutos.",
    features: [
      "Tamaño ultracompacto con enrollacables integrado en la base para guardarla parada",
      "Cocción simultánea superior e inferior de 2 pechugas, 2 hamburguesas o 1 sándwich grande",
      "Recubrimiento George Tough clásico que se limpia en 60 segundos con papel húmedo tibio",
    ],
    categoryType: "contact-grill",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "22.3 × 18.0 × 9.8 cm (ultracompacta)",
      servingsCapacity: "1 a 2 porciones simultáneas (36 sq in)",
      cleaningEase: "Placas fijas · limpieza rápida en 1 minuto con paño",
    },
    queryUS: "George Foreman 2-Serving Classic Plate Electric Grill GRS040B",
    queryES: "George Foreman parrilla compacta 2 porciones",
    ctaLabel: "Ver Oferta George Foreman 2 Porciones en Amazon",
  },

  GF_GRP1060B: {
    id: "george-foreman-grp1060b",
    badge: "🥪 Económica 4 Porciones para Parejas y Estudiantes",
    title:
      "George Foreman 4-Serving Classic Plate Grill & Panini Press (GRP1060B / GRS060B)",
    subtitle:
      "El punto medio entre el modelo individual y el familiar: suficiente área para cenar dos personas con guarnición de verduras sin ocupar media cocina.",
    features: [
      "60 sq in reales de placa inclinada para 4 filetes medianos o 4 hamburguesas estándar",
      "Luz indicadora de precalentamiento óptimo y carcasa compacta liviana (< 2.3 kg)",
      "Incluye bandeja recolectora de grasa apta para lavavajillas",
    ],
    categoryType: "contact-grill",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "27.4 × 24.1 × 11.4 cm (cabe bajo gabinetes de 18\")",
      servingsCapacity: "3 a 4 porciones simultáneas (60 sq in)",
      cleaningEase: "Placas fijas antiadherentes + bandeja lavavajillas",
    },
    queryUS: "George Foreman 4-Serving Classic Plate Grill GRP1060B",
    queryES: "George Foreman parrilla electrica 4 porciones",
    ctaLabel: "Ver Precio George Foreman 4 Porciones en Amazon",
  },

  GF_GRP4800R_EVOLVE: {
    id: "george-foreman-evolve-grp4800r",
    badge: "🧇 Sistema Modular Cerámico con Placas Intercambiables",
    title:
      "George Foreman Evolve 5-Serving Ceramic Grill & Panini System (GRP4800R)",
    subtitle:
      "Eleva la línea George Foreman con placas cerámicas desmontables sin PTFE/PFOA, temporizador digital y compatibilidad para placas de waffles.",
    features: [
      "Placas cerámicas de fácil desprendimiento aptas para lavavajillas con asas frías al tacto",
      "Ángulo de inclinación ajustable (inclinada para drenar grasa o plana para paninis y tortillas)",
      "Pantalla digital con control exacto de temperatura hasta 500 °F (Sear) y timer",
    ],
    categoryType: "contact-grill",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "34.3 × 28.0 × 15.2 cm",
      servingsCapacity: "5 porciones simultáneas (72+ sq in)",
      cleaningEase: "Placas cerámicas desmontables aptas lavavajillas",
    },
    queryUS: "George Foreman Evolve Grill GRP4800R Ceramic Plates",
    queryES: "George Foreman Evolve parrilla ceramica placas intercambiables",
    ctaLabel: "Ver George Foreman Evolve en Amazon",
  },

  GF_GR390FP_SMOKELESS: {
    id: "george-foreman-gr390fp-smokeless",
    badge: "💨 Parrilla Abierta Sin Humo Económica George Foreman",
    title:
      "George Foreman Smokeless Digital Open Grill (GR390FP — hasta 85 % Menos Humo)",
    subtitle:
      "Canaliza el exceso de grasa a una bandeja enfriada inferior antes de que se queme contra la resistencia, reduciendo drásticamente el humo en departamentos.",
    features: [
      "Rejilla y bandeja de goteo 100 % desmontables y aptas para lavavajillas",
      "Control digital táctil preciso con superficie amplia abierta para 5 a 6 porciones",
      "Ideal si prefieres ver los cortes mientras se asan sin aplastar ingredientes delicados",
    ],
    categoryType: "smokeless-open",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "42.0 × 30.5 × 12.7 cm",
      servingsCapacity: "5 a 6 porciones simultáneas (90+ sq in)",
      cleaningEase: "Rejilla abierta y bandeja aptas para lavavajillas",
    },
    queryUS: "George Foreman Smokeless Digital Grill GR390FP",
    queryES: "George Foreman parrilla sin humo electrica interior",
    ctaLabel: "Ver George Foreman Smokeless en Amazon",
  },

  GF_GGR240S_XL: {
    id: "george-foreman-ggr240s",
    badge: "🎉 Gigante Familiar 15 Porciones (Interior / Balcón Techado)",
    title:
      "George Foreman 15-Serving Indoor/Outdoor Electric Grill with Stand (GGR240S / GGR50B)",
    subtitle:
      "Diseñada para reuniones grandes en casa o departamento con balcón: 240 sq in circulares que se desmontan del pedestal para usar directo en la mesa.",
    features: [
      "Enorme superficie circular de 240 sq in para asar hasta 15 porciones en reuniones",
      "Sonda térmica regulable en 5 niveles hasta 1600 W sin carbón ni cilindros de gas",
      "Recubrimiento antiadherente George Tough con bandeja central de grasa extraíble",
    ],
    categoryType: "smart-xl",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "52 × 46 cm sobre mesa (pedestal desmontable)",
      servingsCapacity: "10 a 15 porciones simultáneas (240 sq in)",
      cleaningEase: "Rejilla circular desmontable + bandeja extraíble",
    },
    queryUS: "George Foreman 15-Serving Indoor Outdoor Electric Grill GGR240S",
    queryES: "George Foreman barbacoa electrica pie interior exterior",
    ctaLabel: "Ver Parrilla Familiar 15 Porciones en Amazon",
  },

  // === CUISINART ===
  CUISINART_GR4NP1: {
    id: "cuisinart-gr4np1-griddler",
    badge: "🏆 #1 Versátil 5-en-1 en Amazon EE. UU. (Abre a 180° + Reversibles)",
    title:
      "Cuisinart 5-in-1 Griddler Stainless Steel Electric Indoor Grill, Griddle & Panini Press (GR-4NP1)",
    subtitle:
      "La favorita de departamentos multifunción: funciona cerrada como prensa de contacto o abierta plana a 180° duplicando el área para carne y plancha a la vez.",
    features: [
      "5 funciones reales: parrilla de contacto, prensa panini, parrilla abierta, plancha plana y mitad grill/mitad plancha",
      "Placas reversibles antiadherentes libres de BPA aptas para lavavajillas con canal de drenaje integrado",
      "Al abrirse plana alcanza 200 sq in reales (6 a 8 porciones simultáneas)",
    ],
    categoryType: "griddler-180",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "34.3 × 29.2 × 18.0 cm (cerrada; requiere 60 cm abierta)",
      servingsCapacity: "4 porciones cerrada / 6–8 porciones abierta 180°",
      cleaningEase: "Placas reversibles + bandeja de goteo 100 % lavavajillas",
    },
    queryUS: "Cuisinart GR-4NP1 5-in-1 Griddler Electric Indoor Grill",
    queryES: "Cuisinart Griddler GR-4N parrilla electrica 5 en 1",
    ctaLabel: "Consultar Precio de Cuisinart GR-4NP1 en Amazon",
  },

  CUISINART_GR5B: {
    id: "cuisinart-gr5b-five",
    badge: "🎛️ Control Digital Preciso 5-en-1 Compacta (Griddler Five)",
    title:
      "Cuisinart Griddler Five Digital Stainless Steel Contact Grill & Griddle (GR-5B)",
    subtitle:
      "Actualiza la clásica GR-4NP1 con pantalla LCD digital, perilla selectora de temperatura exacta y botón Sear dedicado para sellar cortes.",
    features: [
      "Pantalla LCD intuitiva con rango de 175 °F a 450 °F y función Sear de 2 minutos a máxima potencia",
      "Usa el mismo ecosistema de placas reversibles y placas de waffles GR-WAFP de Cuisinart",
      "Carcasa de acero inoxidable cepillado fácil de limpiar por fuera",
    ],
    categoryType: "griddler-180",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "34.0 × 30.0 × 18.0 cm",
      servingsCapacity: "4 porciones cerrada / 6–8 porciones abierta 180°",
      cleaningEase: "Placas reversibles desmontables aptas lavavajillas",
    },
    queryUS: "Cuisinart GR-5B Griddler Five Digital Grill",
    queryES: "Cuisinart Griddler Five GR-5 parrilla digital",
    ctaLabel: "Ver Cuisinart Griddler Five Digital en Amazon",
  },

  CUISINART_GR6S_SMOKELESS: {
    id: "cuisinart-gr6s-smokeless",
    badge: "💨 Parrilla de Contacto Sin Humo Cuisinart (Smokeless Contact)",
    title:
      "Cuisinart Smokeless Contact Griddler & Griddle Plate System (GR-6S)",
    subtitle:
      "Combina el formato versátil de apertura plana de Cuisinart con tecnología activa de reducción de humo y perfiles específicos por alimento.",
    features: [
      "Controles LCD dedicados con ajustes específicos para carne, ave, pescado y cerdo que minimizan el humo",
      "Placas antiadherentes reversibles grill y plancha aptas para lavavajillas",
      "Bandeja recolectora trasera oculta para una encimera limpia",
    ],
    categoryType: "griddler-180",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "36.5 × 33.5 × 17.5 cm",
      servingsCapacity: "4 a 8 porciones según modo cerrado/180°",
      cleaningEase: "Placas extraíbles lavavajillas + drenaje oculto",
    },
    queryUS: "Cuisinart GR-6S Smokeless Contact Griddler",
    queryES: "Cuisinart Smokeless Contact Griddler parrilla sin humo",
    ctaLabel: "Ver Cuisinart Smokeless GR-6S en Amazon",
  },

  CUISINART_GR150P1_DELUXE: {
    id: "cuisinart-gr150p1-deluxe",
    badge: "🥩 Mejor Sellado Dual 500 °F (Griddler Deluxe · Hasta 8 Porciones)",
    title:
      "Cuisinart Griddler Deluxe Brushed Stainless Contact Grill & 180° Griddle (GR-150P1)",
    subtitle:
      "La bestia de 1800 W para amantes de los cortes gruesos: permite fijar temperaturas distintas en la placa superior e inferior con golpe SearBlast a 500 °F.",
    features: [
      "Control independiente de temperatura para placa superior e inferior (ideal para sellar carne arriba y dorar vegetales abajo)",
      "Botón SearBlast a 500 °F (260 °C) durante 2 minutos para marcar ribeye, entraña o bife ancho",
      "240 sq in abiertas a 180° (6 a 8 porciones reales en una sola tanda)",
    ],
    categoryType: "griddler-180",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "37.2 × 36.8 × 20.5 cm (ocupa encimera mediana-grande)",
      servingsCapacity: "6 porciones cerrada / 8+ porciones abierta 180°",
      cleaningEase: "Placas reversibles pesadas aptas para lavavajillas",
    },
    queryUS: "Cuisinart GR-150P1 Griddler Deluxe Electric Grill",
    queryES: "Cuisinart GR-150 Griddler Deluxe parrilla contacto",
    ctaLabel: "Consultar Precio de Cuisinart Deluxe GR-150P1 en Amazon",
  },

  CUISINART_GR300_ELITE: {
    id: "cuisinart-gr300wsp1-elite",
    badge: "✨ Edición Elite XL con Sonda Integrada y Sear 500 °F",
    title:
      "Cuisinart Elite Griddler XL with Sear Function & Digital Timer (GR-300WSP1)",
    subtitle:
      "Acabado premium con placas de mayor masa térmica para evitar caídas de temperatura al colocar varios cortes fríos al mismo tiempo.",
    features: [
      "Superficie extragrande de 240 sq in abierta y temporizador integrado hasta 60 minutos",
      "Control dual independiente de placas superior e inferior con función Sear a 500 °F",
      "Placas desmontables reversibles y bandeja trasera 100 % lavavajillas",
    ],
    categoryType: "griddler-180",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "37.8 × 36.6 × 20.6 cm",
      servingsCapacity: "6 a 8 porciones simultáneas",
      cleaningEase: "Placas reversibles + recolector lavavajillas",
    },
    queryUS: "Cuisinart GR-300WSP1 Griddler Elite",
    queryES: "Cuisinart Elite Griddler parrilla electrica acero",
    ctaLabel: "Ver Cuisinart Griddler Elite en Amazon",
  },

  // === HAMILTON BEACH ===
  HB_25361_SEARING: {
    id: "hamilton-beach-25361",
    badge: "💨 #1 Sellado Sin Humo Económica con Tapa Ventana",
    title:
      "Hamilton Beach Electric Indoor Searing Grill with Viewing Window & Hood (25361 / 25360)",
    subtitle:
      "El campeón absoluto de relación precio-rendimiento si buscas sabor a parrilla tradicional en departamento sin llenar la sala de humo.",
    features: [
      "Alcanza 450 °F (232 °C) para sellar jugos en bistecs y hamburguesas sin aplastar el alimento bajo peso",
      "Tapa con ventana de cristal desmontable para vigilar el dorado sin soltar humo ni calor",
      "118 sq in reales (hasta 6 porciones); tapa, rejilla antiadherente y bandeja XL van directo al lavavajillas",
    ],
    categoryType: "smokeless-open",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "42.5 × 31.5 × 17.3 cm (requiere 18\" libres arriba al abrir)",
      servingsCapacity: "4 a 6 porciones simultáneas (118 sq in)",
      cleaningEase: "Tapa, rejilla y bandeja XL aptas para lavavajillas",
    },
    queryUS: "Hamilton Beach Electric Indoor Searing Grill 25361",
    queryES: "Hamilton Beach 25361 parrilla electrica interior ventana",
    ctaLabel: "Consultar Precio Hamilton Beach 25361 en Amazon",
  },

  HB_38546_3IN1: {
    id: "hamilton-beach-38546-3in1",
    badge: "🍳 Doble Zona Parrilla + Plancha Sin Humo (180 sq in)",
    title:
      "Hamilton Beach 3-in-1 Electric Smokeless Indoor Grill & Griddle (38546)",
    subtitle:
      "Dos placas con termostato independiente lado a lado: asa pollo o carne en la rejilla izquierda mientras salteas verduras o tocino en la plancha derecha.",
    features: [
      "180 sq in totales divididos en dos zonas independientes con perillas separadas",
      "Bandeja inferior extraíble de ancho completo que recoge grasa y reduce humos",
      "Placas intercambiables y reversibles aptas para lavavajillas",
    ],
    categoryType: "smokeless-open",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "52.0 × 31.0 × 10.5 cm (perfil bajo para guardar)",
      servingsCapacity: "6 a 8 porciones simultáneas (180 sq in)",
      cleaningEase: "Placas extraíbles y bandeja aptas para lavavajillas",
    },
    queryUS: "Hamilton Beach 3-in-1 Indoor Grill Griddle 38546",
    queryES: "Hamilton Beach 3 en 1 parrilla y plancha doble zona",
    ctaLabel: "Ver Hamilton Beach 3-en-1 en Amazon",
  },

  HB_25460A_PANINI: {
    id: "hamilton-beach-25460a",
    badge: "🥖 Prensa Compacta de Contacto Económica",
    title:
      "Hamilton Beach Electric Panini Press Grill & Gourmet Sandwich Maker (25460A / 25462Z)",
    subtitle:
      "Alternativa compacta y plana para encimeras estrechas con bisagra estilo café que se adapta a paninis artesanales, pechugas finas y vegetales.",
    features: [
      "Ocupa muy poco espacio y cuenta con seguro de cierre vertical para guardar en alacenas angostas",
      "Bisagra flotante superior para prensar uniformemente desde 1 hasta 8 cm de grosor",
      "Luces indicadoras de encendido y listo + recubrimiento antiadherente rápido de limpiar",
    ],
    categoryType: "contact-grill",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "31.5 × 26.2 × 11.4 cm (almacenamiento vertical)",
      servingsCapacity: "2 a 3 porciones simultáneas (65 sq in)",
      cleaningEase: "Placas fijas de limpieza rápida con paño húmedo",
    },
    queryUS: "Hamilton Beach Panini Press Grill 25460A",
    queryES: "Hamilton Beach prensa panini parrilla electrica compacta",
    ctaLabel: "Ver Hamilton Beach 25460A en Amazon",
  },

  // === NINJA ===
  NINJA_SIZZLE_GR101: {
    id: "ninja-sizzle-gr101",
    badge: "🔥 #1 Sin Humo Abierta a 500 °F (Grill + Plancha Intercambiables)",
    title:
      "Ninja Sizzle Smokeless Indoor Grill & Flat-Top Griddle (GR101 — hasta 500 °F)",
    subtitle:
      "Revolucionó Amazon EE. UU. para departamentos: alcanza 500 °F reales de borde a borde con malla antisalpicaduras desmontable que atrapa grasa y evita humo.",
    features: [
      "Incluye placa Grill acanalada + placa Flat-Top lisa intercambiables de 14\" (6 hamburguesas o pechugas a la vez)",
      "Tapa perforada de malla lavable en lavavajillas que reduce drásticamente salpicaduras y humo en cocina",
      "Calentamiento homogéneo sin puntos fríos y placa antiadherente muy fácil de lavar",
    ],
    categoryType: "smokeless-open",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "37.6 × 36.1 × 15.2 cm (muy compacta para su capacidad)",
      servingsCapacity: "4 a 6 porciones familiares (14\" / ~140 sq in)",
      cleaningEase: "Placa antiadherente y malla tapa aptas lavavajillas",
    },
    queryUS: "Ninja GR101 Sizzle Smokeless Indoor Grill and Griddle",
    queryES: "Ninja Sizzle GR101 parrilla electrica sin humo interior",
    ctaLabel: "Consultar Precio de Ninja Sizzle GR101 en Amazon",
  },

  NINJA_FOODI_FG551: {
    id: "ninja-foodi-fg551-xl",
    badge: "💎 #1 Gama Alta Familiar con Termómetro Inteligente (6-en-1 Smart XL)",
    title:
      "Ninja Foodi Smart XL 6-in-1 Indoor Grill with Smart Cook System Thermometer (FG551)",
    subtitle:
      "La parrilla de interior más completa del mercado: tecnología ciclónica prácticamente libre de humo + sonda termómetro Foodi integrada que apaga la cocción en tu punto exacto.",
    features: [
      "Sonda digital integrada con 4 ajustes de proteína y 9 niveles de cocción (de jugoso Rare a Well Done sin adivinar)",
      "Aire ciclónico de 500 °F alrededor de una rejilla grill de alta densidad para 6 bistecs o 24 hot dogs",
      "Rejilla cerámica sin PTFE/PFOA, cesta freidora y olla interior 100 % aptas para lavavajillas",
    ],
    categoryType: "smart-xl",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "40.0 × 42.0 × 28.0 cm (ojo: 47 cm con tapa abierta)",
      servingsCapacity: "6 porciones familiares grandes (XL)",
      cleaningEase: "Rejilla cerámica y filtro antisalpicaduras al lavavajillas",
    },
    queryUS: "Ninja FG551 Foodi Smart XL 6-in-1 Indoor Grill",
    queryES: "Ninja Foodi Smart XL FG551 parrilla sin humo",
    ctaLabel: "Consultar Precio de Ninja Foodi Smart XL en Amazon",
  },

  NINJA_IG651_PRO_XL: {
    id: "ninja-foodi-ig651-pro",
    badge: "⚡ Pro XL 7-en-1: Asa con Tapa Abierta o Cerrada + Sonda",
    title:
      "Ninja Foodi Smart XL Pro 7-in-1 Indoor Grill & Griddle Combo (IG651)",
    subtitle:
      "Suma al poder ciclónico una placa eléctrica calefactora independiente de 500 °F para asar con la tapa abierta o hacer plancha y desayunos sin límite.",
    features: [
      "Rejilla grill alimentada directamente a 500 °F + plancha BBQ plana de 12\" incluida",
      "Sistema Smart Cook integrado con termómetro de carne dual",
      "Piezas cerámicas desmontables sin PFOA aptas para lavavajillas",
    ],
    categoryType: "smart-xl",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "40.0 × 44.0 × 28.5 cm (encimera mediana-amplia)",
      servingsCapacity: "6 a 8 porciones familiares",
      cleaningEase: "Rejilla, plancha y malla lavables en lavavajillas",
    },
    queryUS: "Ninja IG651 Foodi Smart XL Pro 7-in-1 Indoor Grill",
    queryES: "Ninja Foodi Smart XL Pro IG651 parrilla plancha",
    ctaLabel: "Ver Ninja Foodi Pro XL IG651 en Amazon",
  },

  NINJA_DG551_AG301: {
    id: "ninja-ag301-dg551",
    badge: "🏢 Ninja Compacta / Smart XL 4-en-1 para Cocinas Medianas",
    title:
      "Ninja Foodi 5-in-1 (AG301) / Smart XL 4-in-1 (DG551) Cyclonic Indoor Grill",
    subtitle:
      "Versiones más ligeras y económicas dentro del ecosistema Ninja sin humo que mantienen la rejilla cerámica a 500 °F y la facilidad de lavado.",
    features: [
      "AG301 es ideal si buscas menor altura en encimera (4 porciones); DG551 da capacidad XL con sonda inteligente",
      "Filtro de humo integrado en tapa abatible fácil de desenganchar y lavar",
      "Incluye funciones de asar a la parrilla, freír con aire, rostizar y hornear",
    ],
    categoryType: "smart-xl",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "36.0 × 40.0 × 25.0 cm",
      servingsCapacity: "4 porciones (AG301) a 6 porciones (DG551)",
      cleaningEase: "Piezas cerámicas desmontables 100 % lavavajillas",
    },
    queryUS: "Ninja Foodi AG301 DG551 Indoor Grill",
    queryES: "Ninja Foodi AG301 parrilla interior sin humo",
    ctaLabel: "Ver Ninja AG301 / DG551 en Amazon",
  },

  // === PLACAS DE REPUESTO Y COMPATIBILIDAD ===
  PLATES_CUISINART_GR4N: {
    id: "cuisinart-gr4np1p-replacement-plates",
    badge: "🧩 Placas de Repuesto Oficiales Compatibles Cuisinart Griddler",
    title:
      "Cuisinart Replacement Grill/Griddle Plates (GR-4NP1P) & Waffle Plates (GR-WAFP)",
    subtitle:
      "Devuelve el antiadherente como nuevo a tu Cuisinart GR-4N, GR-4NP1, GR-5B o GR-6, o añade el set de placas profundas para waffles.",
    features: [
      "Compatibilidad verificada 100 % con Cuisinart GR-4, GR-4N, GR-4NP1 y GR-5B (encastre por clip lateral)",
      "Set GR-4NP1P incluye 2 placas reversibles (lado grill acanalado + lado plancha liso)",
      "Libres de BPA y aptas para lavavajillas (también disponible set de waffles GR-WAFP)",
    ],
    categoryType: "replacement-plate",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "29.2 × 22.9 cm por placa (almacenamiento plano)",
      servingsCapacity: "Compatible con 4 a 8 porciones (GR-4NP1 / GR-5B)",
      cleaningEase: "Recubrimiento antiadherente nuevo · aptas lavavajillas",
    },
    queryUS:
      "Cuisinart GR-4NP1P Replacement Grill Griddle Plates GR-WAFP Waffle Plates",
    queryES: "Cuisinart placas repuesto GR-4NP1 GR-WAFP gofres",
    ctaLabel: "Ver Placas Compatibles Cuisinart en Amazon",
  },

  PLATES_CUISINART_GR150: {
    id: "cuisinart-gr150-replacement-plates",
    badge: "🧩 Placas de Repuesto Compatibles Cuisinart Deluxe / Elite",
    title:
      "Placas de Repuesto Compatibles Cuisinart Griddler Deluxe (GR-150P1) y Elite (GR-300WSP1)",
    subtitle:
      "Repuestos de aluminio fundido de alta retención térmica con cara acanalada y plancha lisa para mantener el sellado SearBlast de 500 °F.",
    features: [
      "Ajuste exacto en modelos Cuisinart de formato ancho GR-150, GR-150P1 y GR-300WSP1",
      "Permite tener un juego extra listo mientras el otro está en el lavavajillas",
      "Canal posterior compatible con la bandeja recolectora integrada",
    ],
    categoryType: "replacement-plate",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "Formato ancho exclusivo serie Deluxe / Elite",
      servingsCapacity: "Compatible 6 a 8 porciones",
      cleaningEase: "Desmontables 100 % aptas lavavajillas",
    },
    queryUS: "Cuisinart GR-150P1 GR-300WSP1 Replacement Grill Plates",
    queryES: "Cuisinart GR-150 placas repuesto grill plancha",
    ctaLabel: "Buscar Placas Cuisinart GR-150 / GR-300 en Amazon",
  },

  PLATES_NINJA_SIZZLE_FOODI: {
    id: "ninja-replacement-plates-mesh",
    badge: "🧩 Repuestos Compatibles Ninja Sizzle (GR101) y Foodi Smart XL (FG551)",
    title:
      "Placas Grill/Plancha, Rejilla Cerámica, Malla Antisalpicaduras y Sonda Smart Probe Compatibles Ninja",
    subtitle:
      "Renueva tu Ninja Sizzle GR101 (placa grill, flat-top o malla de tapa) o tu Ninja Foodi XL FG551/AG301 (rejilla cerámica, cesta y sonda de temperatura).",
    features: [
      "Malla antisalpicaduras compatible Ninja FG551/IG651 y tapa perforada GR101 para mantener 0 humo",
      "Rejillas cerámicas libres de PTFE/PFOA con ajuste exacto sin holguras",
      "Sondas termómetro Smart Cook compatibles cuando el cable original falla",
    ],
    categoryType: "replacement-plate",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "Verificar código exacto (GR101 vs FG551 vs AG301)",
      servingsCapacity: "Estándar 4 a 6 porciones según modelo Ninja",
      cleaningEase: "Piezas cerámicas y mallas aptas para lavavajillas",
    },
    queryUS:
      "Ninja Sizzle GR101 Replacement Grill Griddle Plate Ninja FG551 Splatter Shield Replacement",
    queryES: "Ninja Foodi grill rejilla repuesto filtro antisalpicaduras sonda",
    ctaLabel: "Ver Placas y Repuestos Ninja en Amazon",
  },

  PLATES_GF_DRIP_TRAY_MAT: {
    id: "george-foreman-drip-tray-replacement",
    badge: "🧩 Bandejas Recolectoras de Grasa y Placas Compatibles George Foreman",
    title:
      "Bandejas Recolectoras de Grasa, Placas Evolve/GRP4842P y Tapete Protector Ignífugo",
    subtitle:
      "Reemplaza bandejas de grasa partidas o desgastadas (compatibles con 14.5\", 11.4\" y 9\") y protege tu encimera de cuarzo o melamina contra el calor.",
    features: [
      "Bandejas antigoteo de repuesto para series GRP4842P, GRP1060B, GRS040B y Evolve",
      "Incluye tapete de silicona resistente al calor para aislar mesas de madera o melamina",
      "Apta para rejilla superior del lavavajillas",
    ],
    categoryType: "replacement-plate",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "Medidas universales (medir ancho de salida frontal)",
      servingsCapacity: "Compatible 2, 4, 5 y 15 porciones George Foreman",
      cleaningEase: "Plástico resistente al calor apto para lavavajillas",
    },
    queryUS:
      "George Foreman Replacement Drip Tray GRP4842P Silicone Heat Resistant Grill Mat",
    queryES: "bandeja recogegrasa repuesto George Foreman tapete silicona calor",
    ctaLabel: "Ver Bandejas y Repuestos George Foreman en Amazon",
  },

  // === PINZAS, TERMÓMETROS Y ACCESORIOS ===
  OXO_SILICONE_TONGS: {
    id: "oxo-silicone-tongs",
    badge: "🥢 Pinzas #1 Anti-Rayones para Placas Antiadherentes",
    title:
      "OXO Good Grips 9\" & 12\" Silicone-Tipped Locking Tongs (Resistentes hasta 600 °F)",
    subtitle:
      "El accesorio #1 obligatorio para que el antiadherente de tu George Foreman, Cuisinart, Hamilton Beach o Ninja dure años sin un solo rayón.",
    features: [
      "Puntas de silicona blanda resistentes hasta 600 °F (315 °C) que nunca rayan cerámica ni teflón",
      "Brazo de acero inoxidable cepillado con seguro de cierre para guardar en cualquier cajón",
      "Tamaño 9\" ideal para parrillas compactas de contacto y 12\" para Ninja XL a 500 °F",
    ],
    categoryType: "tongs-thermometer",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "23 cm (9\") o 30 cm (12\") cerradas en cajón",
      servingsCapacity: "Apta para toda carne, pollo, pescado y paninis",
      cleaningEase: "Cuerpo sellado 100 % apto para lavavajillas",
    },
    queryUS: "OXO Good Grips Silicone Tipped Tongs 9 inch 12 inch",
    queryES: "OXO Good Grips pinzas cocina silicona antiadherente",
    ctaLabel: "Consultar Precio de Pinzas de Silicona OXO en Amazon",
  },

  THERMOPRO_TP19H: {
    id: "thermopro-tp19h-thermometer",
    badge: "🌡️ Termómetro Digital Instantáneo #1 en Amazon (2–3 Segundos)",
    title:
      "ThermoPro TP19H Waterproof Digital Instant-Read Meat Thermometer (Backlit + Imán)",
    subtitle:
      "Deja de cortar el bistec o la pechuga para ver si ya está listo: clava su punta ultrafina lateralmente y obtén la temperatura real en 2–3 segundos.",
    features: [
      "Lectura instantánea de ±0.9 °F en pantalla giratoria 180° retroiluminada (para diestros y zurdos)",
      "Imán trasero para pegarlo a la campana o refrigeradora, más resistencia al agua IP65",
      "Garantiza pollo jugoso (165 °F / 74 °C) y ribeye Medium Rare (130–135 °F / 54–57 °C)",
    ],
    categoryType: "tongs-thermometer",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "Plegable tamaño bolsillo (16 cm cerrada)",
      servingsCapacity: "Esencial en parrillas sin sonda integrada",
      cleaningEase: "Cuerpo impermeable IP65 · se lava bajo el chorro",
    },
    queryUS: "ThermoPro TP19H Digital Meat Thermometer Instant Read",
    queryES: "ThermoPro TP19H termometro cocina digital lectura instantanea",
    ctaLabel: "Ver Termómetro ThermoPro TP19H en Amazon",
  },

  THERMOPRO_TEMPSPIKE_WIRELESS: {
    id: "thermopro-tempspike-meater",
    badge: "📱 Termómetro Inalámbrico Bluetooth para Tapa Cerrada",
    title:
      "ThermoPro TempSpike / MEATER Plus Smart Wireless Meat Thermometer (100 % Sin Cables)",
    subtitle:
      "Al no tener cable, puedes cerrar perfectamente la tapa de cualquier Cuisinart, George Foreman o Hamilton Beach mientras vigilas la cocción en tu celular.",
    features: [
      "Doble sensor interno (temperatura del centro de la carne + temperatura ambiente de la parrilla)",
      "Cero cables que estorben o muerdan las bisagras flotantes de parrillas de contacto",
      "Alertas automáticas en iOS/Android con cálculo de tiempo de reposo",
    ],
    categoryType: "tongs-thermometer",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "Estuche cargador compacto de bambú/plástico",
      servingsCapacity: "Ideal para cortes gruesos y pechugas enteras",
      cleaningEase: "Sonda de acero inoxidable impermeable apta lavavajillas",
    },
    queryUS:
      "ThermoPro TempSpike Wireless Meat Thermometer MEATER Plus Bluetooth",
    queryES: "ThermoPro TempSpike MEATER Plus termometro inalambrico carne",
    ctaLabel: "Ver Termómetro Inalámbrico en Amazon",
  },

  OIL_SPRAYER_SCRAPER_SET: {
    id: "oil-sprayer-nylon-scraper-kit",
    badge: "🧴 Pulverizador de Aceite Puro + Raspador Ranurado Sin Rayones",
    title:
      "Pulverizador de Vidrio para Aceite de Aguacate + Set de Raspadores Ranurados y Espátula de Silicona",
    subtitle:
      "Evita para siempre los aerosoles con lecitina que arruinan el antiadherente y limpia las ranuras acanaladas en segundos sin rayar.",
    features: [
      "El pulverizador recargable aplica niebla fina de aceite de aguacate (punto de humo 270 °C) sin residuos gomosos",
      "Raspador de nylon térmico con dientes curvos diseñado para encajar en las estrías del grill",
      "Incluye espátula ranurada y brocha de silicona sin BPA para salsas",
    ],
    categoryType: "tongs-thermometer",
    specs: {
      priceRange: "Consultar precio y ofertas hoy en Amazon",
      footprintSpace: "Cabe en cualquier cajón o puerta de alacena",
      servingsCapacity: "Compatible con las 4 marcas principales",
      cleaningEase: "Apto para lavavajillas; duplica la vida útil de placas",
    },
    queryUS:
      "Glass Olive Oil Sprayer Mister Bottle Nylon Grill Scraper Silicone Spatula Set",
    queryES:
      "pulverizador aceite cristal cocina raspador silicona plancha grill",
    ctaLabel: "Ver Kit Pulverizador y Raspador en Amazon",
  },
};

export function getContextualAmazonProducts(
  slug: string,
  pillar: string,
  title: string
): {
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
} {
  const text = `${slug} ${pillar} ${title}`.toLowerCase();

  // 1. Comparativas directas VS
  if (pillar === "comparativas-parrillas-electricas" || text.includes("-vs-")) {
    if (text.includes("ninja") && text.includes("cuisinart")) {
      return {
        sectionTitle:
          "Comparativa Directa en Amazon: Ninja Sizzle/XL vs Cuisinart Griddler",
        sectionSubtitle:
          "Compara el sellado abierto sin humo a 500 °F de Ninja frente a la versatilidad 5-en-1 de Cuisinart, más las pinzas de silicona compatibles:",
        products: [
          CATALOG.NINJA_SIZZLE_GR101,
          CATALOG.CUISINART_GR4NP1,
          CATALOG.OXO_SILICONE_TONGS,
        ],
        vsCompetitor: CATALOG.CUISINART_GR4NP1,
      };
    }
    if (text.includes("ninja") && text.includes("hamilton")) {
      return {
        sectionTitle:
          "Duelo Sin Humo en Amazon: Ninja Sizzle GR101 vs Hamilton Beach 25361",
        sectionSubtitle:
          "Compara precio, porciones, facilidad de lavado en lavavajillas y termómetro digital recomendado:",
        products: [
          CATALOG.NINJA_SIZZLE_GR101,
          CATALOG.HB_25361_SEARING,
          CATALOG.THERMOPRO_TP19H,
        ],
        vsCompetitor: CATALOG.HB_25361_SEARING,
      };
    }
    if (text.includes("george-foreman") && text.includes("hamilton")) {
      return {
        sectionTitle:
          "Comparativa Económica en Amazon: George Foreman GRP4842P vs Hamilton Beach 25361",
        sectionSubtitle:
          "Parrilla compacta de contacto con placas extraíbles frente a parrilla abierta con tapa ventana:",
        products: [
          CATALOG.GF_GRP4842P,
          CATALOG.HB_25361_SEARING,
          CATALOG.OXO_SILICONE_TONGS,
        ],
        vsCompetitor: CATALOG.HB_25361_SEARING,
      };
    }
    if (text.includes("george-foreman") && text.includes("cuisinart")) {
      return {
        sectionTitle:
          "Duelo Clásico de Contacto: Cuisinart GR-4NP1 vs George Foreman GRP4842P",
        sectionSubtitle:
          "Compara espacio ocupado, apertura 180°, placas desmontables y precio actual en Amazon EE. UU.:",
        products: [
          CATALOG.CUISINART_GR4NP1,
          CATALOG.GF_GRP4842P,
          CATALOG.PLATES_CUISINART_GR4N,
        ],
        vsCompetitor: CATALOG.GF_GRP4842P,
      };
    }
    if (text.includes("fg551") || text.includes("ig651") || text.includes("foodi")) {
      return {
        sectionTitle:
          "Comparativa Gama Alta Ninja en Amazon: Foodi Smart XL vs Sizzle GR101",
        sectionSubtitle:
          "Evalúa capacidad familiar, altura bajo gabinetes, sonda inteligente y placas compatibles:",
        products: [
          CATALOG.NINJA_FOODI_FG551,
          CATALOG.NINJA_SIZZLE_GR101,
          CATALOG.PLATES_NINJA_SIZZLE_FOODI,
        ],
        vsCompetitor: CATALOG.NINJA_SIZZLE_GR101,
      };
    }
    return {
      sectionTitle:
        "Modelos Líderes Comparados por Precio, Espacio, Porciones y Limpieza",
      sectionSubtitle:
        "Consulta precios verificados en Amazon Estados Unidos y utensilios compatibles para cuidar las placas:",
      products: [
        CATALOG.CUISINART_GR4NP1,
        CATALOG.NINJA_SIZZLE_GR101,
        CATALOG.OXO_SILICONE_TONGS,
      ],
      vsCompetitor: CATALOG.NINJA_SIZZLE_GR101,
    };
  }

  // 2. Placas de repuesto y compatibilidad
  if (
    pillar === "placas-de-repuesto-y-compatibilidad" ||
    text.includes("placa-de-repuesto") ||
    text.includes("placas-de-repuesto") ||
    text.includes("waffle") ||
    text.includes("repuesto")
  ) {
    if (text.includes("ninja")) {
      return {
        sectionTitle:
          "Placas, Rejillas Cerámicas y Mallas Compatibles Ninja en Amazon EE. UU.",
        sectionSubtitle:
          "Repuestos exactos para Ninja Sizzle GR101 y Foodi Smart XL FG551/IG651 más pinzas anti-rayones:",
        products: [
          CATALOG.PLATES_NINJA_SIZZLE_FOODI,
          CATALOG.NINJA_SIZZLE_GR101,
          CATALOG.OXO_SILICONE_TONGS,
        ],
      };
    }
    if (text.includes("george-foreman") || text.includes("bandeja")) {
      return {
        sectionTitle:
          "Bandejas, Tapetes y Placas Compatibles George Foreman en Amazon EE. UU.",
        sectionSubtitle:
          "Mantén tu parrilla George Foreman funcionando al 100 % sin goteras ni rayones en el recubrimiento:",
        products: [
          CATALOG.PLATES_GF_DRIP_TRAY_MAT,
          CATALOG.GF_GRP4842P,
          CATALOG.OIL_SPRAYER_SCRAPER_SET,
        ],
      };
    }
    return {
      sectionTitle:
        "Placas de Repuesto, Waffles y Accesorios Compatibles en Amazon EE. UU.",
      sectionSubtitle:
        "Repuestos oficiales para Cuisinart Griddler (GR-4NP1P / GR-WAFP / GR-150P1) y Ninja Sizzle/Foodi:",
      products: [
        CATALOG.PLATES_CUISINART_GR4N,
        CATALOG.PLATES_NINJA_SIZZLE_FOODI,
        CATALOG.OXO_SILICONE_TONGS,
      ],
    };
  }

  // 3. Pinzas, termómetros y cuidado de antiadherentes
  if (
    pillar === "pinzas-termometros-y-accesorios-parrilla" ||
    pillar === "uso-seguro-de-pinzas-termometros-y-accesorios" ||
    text.includes("pinza") ||
    text.includes("termometro") ||
    text.includes("sonda") ||
    text.includes("pulverizador")
  ) {
    const first =
      text.includes("inalambrico") || text.includes("meater") || text.includes("tempspike")
        ? CATALOG.THERMOPRO_TEMPSPIKE_WIRELESS
        : text.includes("termometro") || text.includes("temperatura")
        ? CATALOG.THERMOPRO_TP19H
        : CATALOG.OXO_SILICONE_TONGS;
    return {
      sectionTitle:
        "Pinzas de Silicona, Termómetros Digitales y Utensilios Anti-Rayones en Amazon",
      sectionSubtitle:
        "Protege el recubrimiento antiadherente de tus placas y logra el término exacto sin secar tus cortes:",
      products: [
        first,
        first === CATALOG.OXO_SILICONE_TONGS
          ? CATALOG.THERMOPRO_TP19H
          : CATALOG.OXO_SILICONE_TONGS,
        CATALOG.OIL_SPRAYER_SCRAPER_SET,
      ],
    };
  }

  // 4. Limpieza de placas y antiadherentes
  if (
    pillar === "limpieza-antiadherentes-y-cuidado-de-placas" ||
    text.includes("limpiar") ||
    text.includes("lavavajillas") ||
    text.includes("antiadherente")
  ) {
    return {
      sectionTitle:
        "Parrillas Fáciles de Limpiar (Placas al Lavavajillas) + Kit de Cuidado en Amazon",
      sectionSubtitle:
        "Modelos con placas desmontables lavables en segundos junto al raspador de nylon y pinzas de silicona que evitan rayones:",
      products: [
        CATALOG.GF_GRP4842P,
        CATALOG.OIL_SPRAYER_SCRAPER_SET,
        CATALOG.OXO_SILICONE_TONGS,
      ],
    };
  }

  // 5. Control de humo en departamentos
  if (
    pillar === "control-de-humo-ventilacion-y-departamentos" ||
    text.includes("humo") ||
    text.includes("alarma") ||
    text.includes("smokeless")
  ) {
    return {
      sectionTitle:
        "Las Mejores Parrillas Sin Humo para Departamento en Amazon EE. UU.",
      sectionSubtitle:
        "Diseñadas con malla antisalpicaduras, aire ciclónico o zona fría para asar en interiores sin activar detectores:",
      products: [
        CATALOG.NINJA_SIZZLE_GR101,
        CATALOG.HB_25361_SEARING,
        CATALOG.OIL_SPRAYER_SCRAPER_SET,
      ],
    };
  }

  // 6. Espacio reducido / estudios / 1-2 personas / económicas
  if (
    text.includes("pequena") ||
    text.includes("compacta") ||
    text.includes("estudio") ||
    text.includes("2-porciones") ||
    text.includes("1-o-2") ||
    text.includes("economica") ||
    text.includes("35-dolares") ||
    text.includes("grs040") ||
    text.includes("25460")
  ) {
    const first =
      text.includes("grs040") || text.includes("2-porciones") || text.includes("estudio")
        ? CATALOG.GF_GRS040B
        : text.includes("25460")
        ? CATALOG.HB_25460A_PANINI
        : CATALOG.GF_GRP4842P;
    return {
      sectionTitle:
        "Parrillas Compactas Económicas que Caben en Cualquier Cocina de Departamento",
      sectionSubtitle:
        "Ocupan el mínimo espacio sobre el mesón y se guardan en vertical, más accesorios esenciales:",
      products: [
        first,
        CATALOG.PLATES_GF_DRIP_TRAY_MAT,
        CATALOG.OXO_SILICONE_TONGS,
      ],
    };
  }

  // 7. Modelos específicos por marca
  if (text.includes("ninja")) {
    const main =
      text.includes("fg551") || text.includes("foodi") || text.includes("smart-xl")
        ? CATALOG.NINJA_FOODI_FG551
        : text.includes("ig651")
        ? CATALOG.NINJA_IG651_PRO_XL
        : text.includes("ag301") || text.includes("dg551")
        ? CATALOG.NINJA_DG551_AG301
        : CATALOG.NINJA_SIZZLE_GR101;
    return {
      sectionTitle:
        "Parrilla Ninja Sin Humo + Placas y Termómetro Compatibles en Amazon EE. UU.",
      sectionSubtitle:
        "Sellado profesional hasta 500 °F en interiores con limpieza simplificada en lavavajillas:",
      products: [
        main,
        CATALOG.PLATES_NINJA_SIZZLE_FOODI,
        CATALOG.OXO_SILICONE_TONGS,
      ],
    };
  }

  if (text.includes("cuisinart") || text.includes("griddler")) {
    const main =
      text.includes("150") || text.includes("deluxe")
        ? CATALOG.CUISINART_GR150P1_DELUXE
        : text.includes("300") || text.includes("elite")
        ? CATALOG.CUISINART_GR300_ELITE
        : text.includes("gr-5") || text.includes("gr5b")
        ? CATALOG.CUISINART_GR5B
        : text.includes("gr-6") || text.includes("gr6s")
        ? CATALOG.CUISINART_GR6S_SMOKELESS
        : CATALOG.CUISINART_GR4NP1;
    return {
      sectionTitle:
        "Selección Cuisinart Griddler 180° + Placas de Repuesto y Termómetro en Amazon",
      sectionSubtitle:
        "Versatilidad de contacto, panini y plancha abierta con placas reversibles aptas lavavajillas:",
      products: [
        main,
        CATALOG.PLATES_CUISINART_GR4N,
        CATALOG.THERMOPRO_TP19H,
      ],
    };
  }

  if (text.includes("hamilton-beach") || text.includes("hamilton")) {
    const main = text.includes("38546")
      ? CATALOG.HB_38546_3IN1
      : text.includes("25460")
      ? CATALOG.HB_25460A_PANINI
      : CATALOG.HB_25361_SEARING;
    return {
      sectionTitle:
        "Parrilla Hamilton Beach Sin Humo + Accesorios Compatibles en Amazon EE. UU.",
      sectionSubtitle:
        "Gran equilibrio entre precio accesible, buen tamaño para familias y limpieza completa en lavavajillas:",
      products: [main, CATALOG.OXO_SILICONE_TONGS, CATALOG.THERMOPRO_TP19H],
    };
  }

  if (text.includes("george-foreman") || text.includes("foreman")) {
    const main = text.includes("evolve") || text.includes("grp4800")
      ? CATALOG.GF_GRP4800R_EVOLVE
      : text.includes("240") || text.includes("15-porciones")
      ? CATALOG.GF_GGR240S_XL
      : text.includes("390")
      ? CATALOG.GF_GR390FP_SMOKELESS
      : text.includes("1060")
      ? CATALOG.GF_GRP1060B
      : CATALOG.GF_GRP4842P;
    return {
      sectionTitle:
        "Parrilla George Foreman + Bandeja Compatible y Pinzas de Silicona en Amazon",
      sectionSubtitle:
        "Cocción rápida de contacto que drena grasa ocupando el mínimo espacio en cocina:",
      products: [
        main,
        CATALOG.PLATES_GF_DRIP_TRAY_MAT,
        CATALOG.OXO_SILICONE_TONGS,
      ],
    };
  }

  // 8. Cortes gruesos, porciones familiares, carnes y punto exacto
  if (
    pillar === "cortes-carnes-aves-pescados-y-verduras" ||
    pillar === "porciones-superficie-y-tiempos-de-coccion"
  ) {
    return {
      sectionTitle:
        "Equipo Ideal para Sellar Cortes, Pollo y Salmón en Casa sin Pasarte de Punto",
      sectionSubtitle:
        "Combina una parrilla abierta/180° de alta temperatura con termómetro instantáneo y pinzas de silicona:",
      products: [
        CATALOG.NINJA_SIZZLE_GR101,
        CATALOG.THERMOPRO_TP19H,
        CATALOG.OXO_SILICONE_TONGS,
      ],
    };
  }

  // Default general: Top 3 Venta Cruzada (Cuisinart 5-en-1 + Placas/Ninja + Pinzas/Termómetro)
  return {
    sectionTitle:
      "Parrillas Eléctricas y Accesorios Compatibles Más Recomendados en Amazon EE. UU.",
    sectionSubtitle:
      "La combinación más equilibrada por precio, espacio en departamento, porciones reales y limpieza fácil:",
    products: [
      CATALOG.CUISINART_GR4NP1,
      CATALOG.PLATES_CUISINART_GR4N,
      CATALOG.OXO_SILICONE_TONGS,
    ],
  };
}
