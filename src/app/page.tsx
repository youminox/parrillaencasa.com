import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import ArticleCard from "@/components/ArticleCard";
import ReadingProgress from "@/components/ReadingProgress";
import SplitHeading from "@/components/SplitHeading";
import OpenChatButton from "@/components/OpenChatButton";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { JsonLd } from "@/components/Breadcrumbs";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import GrillAnatomySvg from "@/components/home/GrillAnatomySvg";
import BrandAndAccessoryOrbit, {
  type OrbitItem,
} from "@/components/home/BrandAndAccessoryOrbit";
import GrillMetricsCounters, {
  type MetricItem,
} from "@/components/home/GrillMetricsCounters";
import ContactVsOpenGrillSlider from "@/components/home/ContactVsOpenGrillSlider";
import MomentsCarousel, {
  type Moment,
} from "@/components/home/MomentsCarousel";
import GrillFinderBlock, {
  type GrillFinderOption,
} from "@/components/home/GrillFinderBlock";
import { getContextualAmazonProducts } from "@/lib/amazon";
import {
  SITE_URL,
  OG_DEFAULT,
  GRILL_DISCLAIMER,
  ambient,
  getAllContent,
  getArticlesIn,
  getByPath,
  getCategories,
  safeHref,
  type Article,
} from "@/lib/content";

export const metadata: Metadata = {
  title:
    "ParrillaEnCasa.com: Guía de Parrillas Eléctricas de Interior (George Foreman, Cuisinart, Hamilton Beach y Ninja) en Amazon EE. UU.",
  description:
    "Guía en español para elegir parrillas eléctricas de interior para casas y departamentos. Compara George Foreman, Cuisinart, Hamilton Beach y Ninja según precio, espacio, porciones y facilidad de limpieza, más pinzas, termómetros y placas de repuesto en Amazon EE. UU.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title:
      "ParrillaEnCasa.com: Parrillas Eléctricas Sin Humo para Casas y Departamentos",
    description:
      "Compara George Foreman, Cuisinart, Hamilton Beach y Ninja por precio, espacio ocupado, porciones simultáneas y limpieza fácil, junto a accesorios compatibles en Amazon.",
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "ParrillaEnCasa.com – Guía en Español de Parrillas Eléctricas de Interior en Amazon EE. UU.",
      },
    ],
  },
};

const FAQ = [
  {
    q: "¿Qué parrilla eléctrica de interior hace menos humo en un departamento sin campana extractora?",
    a: "Las campeonas sin humo son la Ninja Sizzle GR101 (con malla perforada antisalpicaduras y calentamiento uniforme a 500 °F), la Ninja Foodi Smart XL FG551 (con aire ciclónico y filtro superior) y la Hamilton Beach 25361 (con tapa ventana y zona fría inferior para la grasa). Además, usar aceite de aguacate en pulverizador en vez de mantequilla o spray comercial reduce el humo hasta en un 90 %.",
  },
  {
    q: "¿Qué marca elegir según mi presupuesto y espacio: George Foreman, Cuisinart, Hamilton Beach o Ninja?",
    a: "Si buscas precio bajo (< US$55) y guardado vertical en una cocina chica, George Foreman (GRS040B o GRP4842P) es imbatible. Si quieres versatilidad 5-en-1 (contacto + panini + plancha abierta a 180°), Cuisinart GR-4NP1 es la más vendida. Para sellado abierto económico, Hamilton Beach 25361; y si buscas máximo sellado a 500 °F sin humo para toda la familia, Ninja Sizzle GR101 o Foodi Smart XL FG551.",
  },
  {
    q: "¿Cuántas porciones reales caben a la vez sin que la carne hierva en su jugo?",
    a: "Una parrilla de 36 a 60 sq in (como George Foreman 2 o 4 porciones) cocina bien 2 pechugas o 3 hamburguesas cómodamente. Las de 72 a 118 sq in (Foreman GRP4842P o Hamilton Beach 25361) rinden 4 a 5 cortes reales. Para 6 a 8 porciones simultáneas necesitas al menos 140–240 sq in (Ninja Sizzle GR101, Cuisinart GR-4NP1 abierta a 180° o Ninja Foodi XL).",
  },
  {
    q: "¿Todas las placas se pueden meter al lavavajillas?",
    a: "No. Solo los modelos con placas desmontables (como George Foreman GRP4842P / Evolve, Cuisinart GR-4NP1 / GR-5B / GR-150P1, Hamilton Beach 25361 / 38546 y Ninja Sizzle GR101 / Foodi FG551) permiten sacar las placas para lavarlas en lavavajillas o en el fregadero. Los modelos económicos de placas fijas deben limpiarse sobre la base usando papel húmedo con vapor tibio, nunca sumergiendo el cuerpo eléctrico.",
  },
  {
    q: "¿Qué placas de repuesto, pinzas y termómetros son compatibles?",
    a: "Para Cuisinart GR-4N/GR-4NP1 existen placas reversibles oficiales GR-4NP1P y placas de waffles GR-WAFP; para Ninja Sizzle GR101 y Foodi FG551 se venden placas grill/plancha, rejillas cerámicas y mallas antisalpicaduras exactas por modelo. En cambio, las pinzas con punta de silicona (como OXO Good Grips 9\"/12\") y los termómetros digitales (ThermoPro TP19H o TempSpike inalámbrico) son 100 % universales y protegen el antiadherente contra rayones.",
  },
  {
    q: "¿Puedo usar una parrilla comprada en Amazon Estados Unidos (110V) en países con corriente de 220V?",
    a: "No de forma directa. Las parrillas vendidas en Amazon Estados Unidos funcionan a 110V–120V ~ 60 Hz y consumen entre 800 W y 1.800 W. Si estás en Perú, Chile, Argentina o España (220V–230V), debes utilizar un transformador reductor de 220V a 110V con capacidad igual o superior a los watts de la parrilla (ej. 2000 W–3000 W) o seleccionar el modelo en Amazon.es.",
  },
];

const CLAIMS = [
  "George Foreman Compactas",
  "Cuisinart Griddler 180°",
  "Hamilton Beach Searing",
  "Ninja Sizzle & Smart XL",
  "Asado Sin Humo en Depa",
  "Placas al Lavavajillas",
  "Pinzas Silicona 600 °F",
  "Termómetros y Repuestos",
];

const CLAIMS_2 = [
  "Precio en Amazon EE. UU.",
  "Espacio en Encimera",
  "2 a 8+ Porciones Reales",
  "Placas Desmontables",
  "Sellado 450°F–500°F",
  "Placas de Waffles y Plancha",
  "Voltaje 110V vs 220V",
  "Guía 100 % en Español",
];

const ICONS: Record<string, string> = {
  grill: "🔥",
  scale: "⚖️",
  tag: "💵",
  plate: "🧩",
  tongs: "🥢",
  smoke: "💨",
  ruler: "📐",
  timer: "⏱️",
  steak: "🥩",
  clean: "🧼",
  thermo: "🌡️",
  shield: "🛡️",
};

export default function Home() {
  const cats = getCategories();
  const all = getAllContent();
  const amzHome = getContextualAmazonProducts(
    "home",
    "resenas-parrillas-electricas",
    "Mejores Parrillas Eléctricas y Accesorios en Amazon EE. UU."
  );

  const orbit: OrbitItem[] = [
    {
      k: "george-foreman",
      name: "George Foreman",
      img: null,
      icon: "🥪",
      role: "El rey compacto desde < US$30 con drenaje inclinado",
      d: "Desde la ultracompacta GRS040B (2 porciones) hasta la superventas GRP4842P de 5 porciones con placas desmontables aptas para lavavajillas y guardado vertical.",
      href: safeHref(
        "/resenas-parrillas-electricas/george-foreman-grp4842p-5-porciones-placas-desmontables-resena/"
      ),
    },
    {
      k: "cuisinart",
      name: "Cuisinart Griddler",
      img: null,
      icon: "🥩",
      role: "Versatilidad 5-en-1: contacto, panini y plancha abierta a 180°",
      d: "La GR-4NP1 y la Deluxe GR-150P1 (500 °F) duplican su espacio al abrirse planas, con placas reversibles lavables y repuestos oficiales para waffles (GR-WAFP).",
      href: safeHref(
        "/resenas-parrillas-electricas/cuisinart-gr-4np1-griddler-5-en-1-resena-placas-y-limpieza/"
      ),
    },
    {
      k: "hamilton-beach",
      name: "Hamilton Beach",
      img: null,
      icon: "💨",
      role: "Sellado abierto a 450 °F sin humo por menos de US$85",
      d: "Modelos como la 25361 con tapa ventana y la 38546 doble zona 3-en-1 permiten ver tus cortes sin aplastarlos y lavar rejilla, tapa y bandeja en lavavajillas.",
      href: safeHref(
        "/resenas-parrillas-electricas/hamilton-beach-25361-indoor-searing-grill-resena-humo-y-limpieza/"
      ),
    },
    {
      k: "ninja",
      name: "Ninja Sizzle & XL",
      img: null,
      icon: "🔥",
      role: "Potencia 500 °F casi sin humo con sonda inteligente",
      d: "Desde la abierta Ninja Sizzle GR101 (grill + plancha intercambiable y malla antisalpicaduras) hasta la Foodi Smart XL FG551 6-en-1 con termómetro integrado.",
      href: safeHref(
        "/resenas-parrillas-electricas/ninja-sizzle-gr101-parrilla-sin-humo-resena-espacio-porciones-limpieza/"
      ),
    },
    {
      k: "placas",
      name: "Placas de Repuesto",
      img: null,
      icon: "🧩",
      role: "Renueva tu antiadherente o suma placas de waffles y flat-top",
      d: "Guías exactas por código para Cuisinart GR-4NP1P / GR-WAFP, Ninja GR101 / FG551 y bandejas recolectoras de grasa George Foreman.",
      href: safeHref(
        "/placas-de-repuesto-y-compatibilidad/placas-de-repuesto-cuisinart-gr-4np1p-y-waffles-gr-wafp-compatibilidad/"
      ),
    },
    {
      k: "termometros",
      name: "Termómetros Carne",
      img: null,
      icon: "🌡️",
      role: "Lectura en 2 segundos o inalámbrico para tapa cerrada",
      d: "Clava el punto exacto en ribeye (135 °F) o pechuga (165 °F) sin cortar ni secar tus carnes usando ThermoPro TP19H o sondas sin cables TempSpike.",
      href: safeHref(
        "/pinzas-termometros-y-accesorios-parrilla/mejores-termometros-digitales-e-inalambricos-parrilla-interior/"
      ),
    },
    {
      k: "pinzas",
      name: "Pinzas de Silicona",
      img: null,
      icon: "🥢",
      role: "Puntas suaves hasta 600 °F que evitan rayar el antiadherente",
      d: "Las pinzas metálicas destruyen las placas en semanas: descubre qué longitud (9\" vs 12\"), raspadores ranurados y pulverizadores de aceite necesitas.",
      href: safeHref(
        "/pinzas-termometros-y-accesorios-parrilla/mejores-pinzas-de-silicona-y-utensilios-para-parrilla-antiadherente/"
      ),
    },
    {
      k: "sin-humo",
      name: "Cero Humo en Depa",
      img: null,
      icon: "🏢",
      role: "Técnica real para departamentos sin activar detectores",
      d: "Aceites de alto punto de humo, bandejas frías, mallas lavables y posición óptima junto a ventanas para disfrutar asados dentro de casa.",
      href: safeHref(
        "/control-de-humo-ventilacion-y-departamentos/como-evitar-que-suene-el-detector-de-humo-con-parrilla-electrica/"
      ),
    },
  ];

  const metrics: MetricItem[] = [
    {
      v: 1332,
      dec: 0,
      u: "guías",
      l: "1,000 SEO + 320 Amazon",
      pct: 100,
      note: "Arquitectura 0% canibalización",
    },
    {
      v: 4,
      dec: 0,
      u: "marcas",
      l: "Foreman · Cuisinart · HB · Ninja",
      pct: 100,
      note: "Catálogo Amazon EE. UU.",
    },
    {
      v: 500,
      dec: 0,
      u: "°F",
      l: "Sellado Máximo (260 °C)",
      pct: 95,
      note: "Ninja Sizzle/XL y Cuisinart Deluxe",
    },
    {
      v: 240,
      dec: 0,
      u: "sq in",
      l: "Hasta 8–15 Porciones",
      pct: 90,
      note: "Desde 36 sq in compactas",
    },
    {
      v: 95,
      dec: 0,
      u: "%",
      l: "Reducción de Humo",
      pct: 95,
      note: "Con malla, zona fría y aceite aguacate",
    },
    {
      v: 60,
      dec: 0,
      u: "seg",
      l: "Limpieza en Placas Extraíbles",
      pct: 92,
      note: "Directo al lavavajillas o fregadero",
    },
  ];

  const moments: Moment[] = [
    {
      img: ambient("home-smokeless-depa"),
      t: "Sin humo en tu depa",
      d: "Por qué el aceite y la grasa quemada producen humo y cómo bloquearlo al 95 %.",
      href: safeHref(
        "/control-de-humo-ventilacion-y-departamentos/como-evitar-que-suene-el-detector-de-humo-con-parrilla-electrica/"
      ),
      alt: "Parrilla eléctrica sin humo cocinando carne sobre encimera de departamento junto a ventanal luminoso",
    },
    {
      img: ambient("home-encimera-compacta"),
      t: "Cocinas pequeñas",
      d: "Cuánto espacio ocupan en uso y cómo guardarlas en vertical en una alacena.",
      href: safeHref(
        "/parrillas-por-espacio-porciones-y-precio/mejores-parrillas-electricas-pequenas-para-departamentos-estudio/"
      ),
      alt: "Parrilla compacta de contacto sobre mesón pequeño de departamento moderno",
    },
    {
      img: ambient("home-placas-lavavajillas"),
      t: "Limpieza en 60 seg",
      d: "Placas fijas vs desmontables aptas para lavavajillas sin rayar el teflón.",
      href: safeHref(
        "/limpieza-antiadherentes-y-cuidado-de-placas/como-limpiar-placas-de-parrilla-electrica-sin-danar-antiadherente/"
      ),
      alt: "Placas antiadherentes desmontables limpiándose con facilidad junto a fregadero",
    },
    {
      img: ambient("home-termometro-carne"),
      t: "Punto exacto + Pinzas",
      d: "Usa pinzas de silicona (600 °F) y termómetro digital para no secar tus cortes.",
      href: safeHref(
        "/pinzas-termometros-y-accesorios-parrilla/mejores-termometros-digitales-e-inalambricos-parrilla-interior/"
      ),
      alt: "Termómetro digital midiendo corte sellado y pinzas con punta de silicona en parrilla interior",
    },
    {
      img: ambient("home-panini-180"),
      t: "Modo plancha 180°",
      d: "Cuisinart Griddler abierta plana: paninis, huevos, tocino y vegetales a la vez.",
      href: safeHref(
        "/resenas-parrillas-electricas/cuisinart-gr-4np1-griddler-5-en-1-resena-placas-y-limpieza/"
      ),
      alt: "Parrilla eléctrica abierta plana a 180 grados con lado grill y lado plancha en cocina",
    },
    {
      img: ambient("home-reunion-familiar"),
      t: "6 a 8+ porciones",
      d: "Modelos familiares Ninja XL y Hamilton Beach 180 sq in para reuniones en casa.",
      href: safeHref(
        "/porciones-superficie-y-tiempos-de-coccion/cuantas-porciones-caben-realmente-en-parrilla-electrica-tabla-sq-in/"
      ),
      alt: "Parrilla eléctrica familiar XL asando múltiples porciones de carne y vegetales",
    },
    {
      img: ambient("home-voltaje-cocina"),
      t: "110V Amazon EE. UU.",
      d: "Consumo en watts, enchufes GFCI y transformador necesario si vives en red 220V.",
      href: safeHref(
        "/espacio-medidas-consumo-y-voltaje/como-usar-parrilla-electrica-110v-amazon-usa-en-paises-220v/"
      ),
      alt: "Parrilla eléctrica conectada correctamente a tomacorriente de cocina seguro",
    },
  ];

  const POPULAR_PATHS = [
    "/parrillas-por-espacio-porciones-y-precio/mejores-parrillas-electricas-interior-sin-humo-departamento-amazon/",
    "/comparativas-parrillas-electricas/george-foreman-vs-cuisinart-vs-hamilton-beach-vs-ninja-cual-elegir/",
    "/resenas-parrillas-electricas/ninja-sizzle-gr101-parrilla-sin-humo-resena-espacio-porciones-limpieza/",
    "/resenas-parrillas-electricas/cuisinart-gr-4np1-griddler-5-en-1-resena-placas-y-limpieza/",
    "/placas-de-repuesto-y-compatibilidad/placas-de-repuesto-cuisinart-gr-4np1p-y-waffles-gr-wafp-compatibilidad/",
    "/pinzas-termometros-y-accesorios-parrilla/mejores-pinzas-de-silicona-y-utensilios-para-parrilla-antiadherente/",
  ];
  const popular: Article[] = POPULAR_PATHS.map((p) => getByPath(p)).filter(
    Boolean
  ) as Article[];
  for (const a of all) {
    if (popular.length >= 6) break;
    if (!a.isPillar && !popular.includes(a)) popular.push(a);
  }

  const finderOptions: GrillFinderOption[] = [
    {
      key: "estudio-economica",
      priceFilter: "< US$55",
      spaceFilter: "Ultracompacto",
      portionsFilter: "1–2",
      label: "George Foreman GRS040B (2 Porciones)",
      priceSpec: "US$22 – US$32",
      spaceSpec: "22 × 18 cm (vertical)",
      portionsSpec: "1–2 porciones (36 sq in)",
      cleaningSpec: "Placas fijas · paño tibio en 60 seg",
      img: ambient("home-encimera-compacta"),
      alt: "Parrilla compacta de 2 porciones en cocina de departamento estudio",
      idealFor:
        "Estudios, personas que viven solas o parejas con encimera diminuta y presupuesto bajo.",
      reviewHref: safeHref(
        "/resenas-parrillas-electricas/george-foreman-grs040b-2-porciones-compacta-resena/"
      ),
      grillKey: "GF_GRS040B",
      plateKey: "PLATES_GF_DRIP_TRAY_MAT",
      accessoryKey: "OXO_SILICONE_TONGS",
    },
    {
      key: "compacta-desmontable",
      priceFilter: "< US$55",
      spaceFilter: "Mediano",
      portionsFilter: "3–5",
      label: "George Foreman GRP4842P (5 Porciones)",
      priceSpec: "US$45 – US$65",
      spaceSpec: "31 × 26 cm (guardado vertical)",
      portionsSpec: "4–5 porciones (72 sq in)",
      cleaningSpec: "Placas desmontables aptas lavavajillas",
      img: ambient("home-placas-lavavajillas"),
      alt: "Parrilla de 5 porciones con placas antiadherentes desmontables",
      idealFor:
        "Quien busca placas lavables en lavavajillas y cocción rápida por menos de US$65.",
      reviewHref: safeHref(
        "/resenas-parrillas-electricas/george-foreman-grp4842p-5-porciones-placas-desmontables-resena/"
      ),
      grillKey: "GF_GRP4842P",
      plateKey: "PLATES_GF_DRIP_TRAY_MAT",
      accessoryKey: "OXO_SILICONE_TONGS",
    },
    {
      key: "versatil-5en1",
      priceFilter: "US$55–US$120",
      spaceFilter: "Mediano",
      portionsFilter: "3–5",
      label: "Cuisinart GR-4NP1 5-en-1 Griddler",
      priceSpec: "US$79 – US$109",
      spaceSpec: "34 × 29 cm (abre plana a 180°)",
      portionsSpec: "4 cerrada / 6–8 abierta (200 sq in)",
      cleaningSpec: "Placas reversibles 100 % lavavajillas",
      img: ambient("home-panini-180"),
      alt: "Cuisinart 5-en-1 Griddler abierta plana a 180 grados con placas grill y plancha",
      idealFor:
        "El todoterreno #1 de Amazon: hace paninis, carnes selladas, plancha y admite placas de waffles.",
      reviewHref: safeHref(
        "/resenas-parrillas-electricas/cuisinart-gr-4np1-griddler-5-en-1-resena-placas-y-limpieza/"
      ),
      grillKey: "CUISINART_GR4NP1",
      plateKey: "PLATES_CUISINART_GR4N",
      accessoryKey: "THERMOPRO_TP19H",
    },
    {
      key: "sin-humo-ventana",
      priceFilter: "US$55–US$120",
      spaceFilter: "Mediano",
      portionsFilter: "3–5",
      label: "Hamilton Beach 25361 Searing Grill",
      priceSpec: "US$69 – US$89",
      spaceSpec: "42 × 31 cm (altura tapa 17 cm)",
      portionsSpec: "4–6 porciones (118 sq in)",
      cleaningSpec: "Tapa, rejilla y bandeja al lavavajillas",
      img: ambient("home-smokeless-depa"),
      alt: "Hamilton Beach Indoor Searing Grill sellando cortes con mínimo humo",
      idealFor:
        "Asar cortes gruesos con tapa cerrada sin aplastarlos y con lavado integral en lavavajillas.",
      reviewHref: safeHref(
        "/resenas-parrillas-electricas/hamilton-beach-25361-indoor-searing-grill-resena-humo-y-limpieza/"
      ),
      grillKey: "HB_25361_SEARING",
      plateKey: "OIL_SPRAYER_SCRAPER_SET",
      accessoryKey: "THERMOPRO_TP19H",
    },
    {
      key: "ninja-sizzle-abierta",
      priceFilter: "US$120–US$230+",
      spaceFilter: "Mediano",
      portionsFilter: "6–8+",
      label: "Ninja Sizzle GR101 (500 °F Sin Humo)",
      priceSpec: "US$109 – US$139",
      spaceSpec: "37 × 36 cm (baja altura bajo gabinete)",
      portionsSpec: "4–6 porciones grandes (140 sq in)",
      cleaningSpec: "Placa y malla antisalpicaduras lavavajillas",
      img: ambient("home-hero-parrillas"),
      alt: "Ninja Sizzle GR101 asando hamburguesas y bistecs a 500 grados Fahrenheit sin humo",
      idealFor:
        "Departamentos que exigen sellado real a 500 °F con grill y plancha plana intercambiable casi sin humo.",
      reviewHref: safeHref(
        "/resenas-parrillas-electricas/ninja-sizzle-gr101-parrilla-sin-humo-resena-espacio-porciones-limpieza/"
      ),
      grillKey: "NINJA_SIZZLE_GR101",
      plateKey: "PLATES_NINJA_SIZZLE_FOODI",
      accessoryKey: "THERMOPRO_TP19H",
    },
    {
      key: "ninja-foodi-xl",
      priceFilter: "US$120–US$230+",
      spaceFilter: "Familiar XL",
      portionsFilter: "6–8+",
      label: "Ninja Foodi Smart XL FG551 (6-en-1)",
      priceSpec: "US$199 – US$249",
      spaceSpec: "40 × 42 × 28 cm (47 cm abierta)",
      portionsSpec: "6 bistecs / 24 hot dogs (XL)",
      cleaningSpec: "Rejilla cerámica y filtro al lavavajillas",
      img: ambient("home-reunion-familiar"),
      alt: "Ninja Foodi Smart XL 6-en-1 cocinando múltiples porciones familiares sin humo",
      idealFor:
        "Familias y reuniones que desean 0 humo ciclónico a 500 °F y sonda termómetro integrada.",
      reviewHref: safeHref(
        "/resenas-parrillas-electricas/ninja-foodi-smart-xl-fg551-parrilla-sin-humo-resena/"
      ),
      grillKey: "NINJA_FOODI_FG551",
      plateKey: "PLATES_NINJA_SIZZLE_FOODI",
      accessoryKey: "OXO_SILICONE_TONGS",
    },
  ];

  return (
    <>
      <ReadingProgress />
      <Header variant="dark" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/#webpage`,
              url: `${SITE_URL}/`,
              name: "ParrillaEnCasa.com — Guía de Parrillas Eléctricas de Interior en Amazon EE. UU.",
              inLanguage: "es",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              primaryImageOfPage: `${SITE_URL}${ambient("home-hero-parrillas")}`,
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />
      <main>
        {/* 1–2. Hero 3D Tilt + Partículas + Buscador sobre 1,332 Guías */}
        <Hero heroImage={ambient("home-hero-parrillas")} />

        {/* 3. Doble Cinta Marquee en Sentidos Opuestos */}
        <div className="relative border-b border-[var(--line)] bg-white py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track font-display text-lg font-bold text-fxink/85"
                aria-hidden={k === 1}
              >
                {CLAIMS.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-fxlime to-drink" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3" aria-hidden>
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track text-sm font-semibold uppercase tracking-[0.14em] text-prune/80"
              >
                {CLAIMS_2.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-fxblue" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Los 4 criterios clave + Mosaico Spotlight (.spot) */}
        <section id="criterios" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Compra Inteligente en Amazon EE. UU.
              </span>
              <SplitHeading
                text="Compara parrillas eléctricas,"
                accent={{
                  text: "sin humo y a tu medida",
                  className: "text-fxblue",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Elegir una parrilla de interior en{" "}
                <strong className="text-fxink">Amazon Estados Unidos</strong>{" "}
                sin medir el espacio bajo tus alacenas ni revisar si las placas se
                desmontan termina en electrodomésticos arrumbados o alarmas de
                humo sonando. Aquí analizamos{" "}
                <strong className="text-fxink">
                  George Foreman, Cuisinart, Hamilton Beach y Ninja
                </strong>{" "}
                sobre 4 criterios reales.
              </p>
              <div
                className="mt-6 rounded-2xl border border-orange-300/70 bg-orange-50/80 p-5"
                data-reveal
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange-800">
                  ⚠️ 3 claves que definen tu compra en casa o departamento
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] text-fxink">
                  <li>
                    • <strong>Placas desmontables vs fijas:</strong> si odias
                    fregar en la encimera, elige modelos aptos para lavavajillas
                    (GRP4842P, Cuisinart GR-4NP1, HB 25361, Ninja GR101/FG551).
                  </li>
                  <li>
                    • <strong>Accesorios que duplican su vida útil:</strong> usa
                    siempre pinzas con punta de silicona (nunca metal) y un
                    termómetro digital instantáneo para no secar tus carnes.
                  </li>
                  <li>
                    • <strong>Placas de repuesto disponibles:</strong> Cuisinart
                    y Ninja ofrecen reemplazos grill, plancha y waffles en Amazon
                    para estrenar superficie por pocos dólares.
                  </li>
                </ul>
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/placas-de-repuesto-y-compatibilidad/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  🧩 Ver Placas de Repuesto
                </Link>
                <Link
                  href="/pinzas-termometros-y-accesorios-parrilla/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  🌡️ Ver Pinzas y Termómetros
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-3xl shadow-[0_30px_60px_-35px_rgba(24,24,27,0.55)]"
                data-reveal
              >
                <Image
                  src={ambient("og-default")}
                  alt="Comparativa de parrillas eléctricas de interior, placas desmontables, pinzas de silicona y termómetro digital sobre encimera de cocina"
                  fill
                  sizes="(max-width:1024px) 100vw, 600px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-fxink">
                  George Foreman · Cuisinart · Hamilton Beach · Ninja
                </span>
              </div>
              {[
                [
                  "💵",
                  "Precio en Amazon USD",
                  "Desde <US$35 (Foreman 2 porc.) hasta Smart XL de US$200+.",
                ],
                [
                  "📐",
                  "Espacio en Cocina",
                  "Medidas reales cerrada, abierta a 180° y altura bajo gabinete.",
                ],
                [
                  "🥩",
                  "Porciones Simultáneas",
                  "Área real (36 a 240 sq in) para cocinar para 1 o para 8 personas.",
                ],
                [
                  "🧼",
                  "Limpieza y Repuestos",
                  "Placas lavavajillas, mallas anti-humo, pinzas y termómetros.",
                ],
              ].map(([e, t, d], i) => (
                <div
                  key={t}
                  className="card spot p-5"
                  data-reveal
                  data-reveal-delay={String(i)}
                >
                  <p className="text-2xl" aria-hidden>
                    {e}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">
                    {t}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ScrollStory Fijada con GSAP ScrollTrigger */}
        <ScrollStory />

        {/* 6. Ingeniería sin humo + Diagrama SVG Animado */}
        <section className="relative isolate overflow-hidden bg-[#09090b] py-24 text-white">
          <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-fxblue/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-drink/20 blur-3xl" />
          <div className="hero-grid opacity-50" />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Asado en interiores sin activar alarmas
              </span>
              <SplitHeading
                text="Cómo logra una parrilla"
                accent={{
                  text: "sellar sin llenar la sala de humo",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-white/75" data-reveal>
                El humo en interiores casi nunca viene de la carne: nace cuando
                la grasa derretida cae sobre una resistencia expuesta al rojo o
                cuando se quema aceite de bajo punto de humo. Las parrillas
                modernas resuelven esto con{" "}
                <strong className="text-orange-300">
                  resistencias blindadas bajo placa maciza
                </strong>
                ,{" "}
                <strong className="text-emerald-300">
                  bandejas frías o mallas antisalpicaduras desmontables
                </strong>{" "}
                y control térmico preciso.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3" data-reveal>
                {[
                  ["500 °F", "Sellado Maillard"],
                  ["Zona Fría", "Grasa sin quemarse"],
                  ["60 seg", "Placas al lavavajillas"],
                ].map(([e, t]) => (
                  <div key={t} className="glass p-4 text-center">
                    <p className="font-display text-lg font-extrabold text-orange-300">
                      {e}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-white/80">
                      {t}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href={safeHref(
                    "/control-de-humo-ventilacion-y-departamentos/como-evitar-que-suene-el-detector-de-humo-con-parrilla-electrica/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Cómo evitar alarmas de humo
                </Link>
                <Link
                  href={safeHref(
                    "/espacio-medidas-consumo-y-voltaje/como-usar-parrilla-electrica-110v-amazon-usa-en-paises-220v/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Regla 110V Amazon vs 220V
                </Link>
              </div>
            </div>
            <div data-reveal>
              <GrillAnatomySvg />
            </div>
          </div>
        </section>

        {/* 7. Órbita Interactiva de 8 Nodos */}
        <section className="wrap py-24">
          <BrandAndAccessoryOrbit
            items={orbit}
            center={ambient("home-termometro-carne")}
          />
        </section>

        {/* 8. Contadores Animados + Tabla Maestra de las 4 Marcas */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#27272a] py-24 text-white">
          <div className="hero-aurora opacity-35" />
          <div className="wrap relative grid items-start gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Datos comparativos reales
              </span>
              <SplitHeading
                text="Las 4 marcas líderes,"
                accent={{ text: "cifra por cifra", className: "text-gradient" }}
                className="section-title mt-3"
              />
              <p className="mt-4 max-w-xl text-white/75" data-reveal>
                Comparamos dimensiones en encimera, capacidad real de porciones,
                temperatura de sellado y tipo de limpieza de las placas en los
                modelos más vendidos de Amazon Estados Unidos.
              </p>
              <div className="mt-8">
                <GrillMetricsCounters data={metrics} />
              </div>
            </div>

            <div
              className="overflow-hidden rounded-3xl bg-white p-5 text-zinc-900 shadow-2xl"
              data-reveal
            >
              <p className="text-xs font-extrabold uppercase tracking-wider text-orange-800">
                Matriz Comparativa Estrella en Amazon EE. UU.
              </p>
              <h3 className="mt-1 font-display text-xl font-extrabold">
                Precio · Espacio · Porciones · Limpieza
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 bg-[#faf8f5] font-display font-bold">
                      <th className="p-2.5">Modelo Top</th>
                      <th className="p-2.5">Precio / Espacio</th>
                      <th className="p-2.5">Porc. / Limpieza</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr>
                      <td className="p-2.5 font-bold">George Foreman GRP4842P</td>
                      <td className="p-2.5">US$45–$65 · Compacta</td>
                      <td className="p-2.5">5 porc. · Placas lavavajillas</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Cuisinart GR-4NP1 5-en-1</td>
                      <td className="p-2.5">US$79–$109 · Mediana 180°</td>
                      <td className="p-2.5">4–8 porc. · Reversibles lavavaj.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Hamilton Beach 25361</td>
                      <td className="p-2.5">US$69–$89 · Mediana</td>
                      <td className="p-2.5">4–6 porc. · Tapa y rejilla lavavaj.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Ninja Sizzle GR101</td>
                      <td className="p-2.5">US$109–$139 · Baja altura</td>
                      <td className="p-2.5">4–6 porc. · Malla + placa lavavaj.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Ninja Foodi Smart XL FG551</td>
                      <td className="p-2.5">US$199–$249 · XL alta</td>
                      <td className="p-2.5">6+ porc. · Cerámica lavavaj. + Sonda</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Link
                href={safeHref(
                  "/comparativas-parrillas-electricas/george-foreman-vs-cuisinart-vs-hamilton-beach-vs-ninja-cual-elegir/"
                )}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 py-3 font-display text-xs font-extrabold text-orange-300 hover:bg-zinc-800 transition"
              >
                Ver comparativa completa de las 4 marcas →
              </Link>
            </div>
          </div>
        </section>

        {/* 9. Comparador Deslizante: Contacto (2-5 Porciones) ↔ Abierta / Smart XL (6-8 Porciones) */}
        <section className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Dos formatos distintos para tu cocina
              </span>
              <SplitHeading
                text="Parrilla de contacto vs abierta sin humo:"
                accent={{
                  text: "cuál conviene en tu hogar",
                  className: "text-fxblue",
                }}
                className="section-title mt-3"
              />
            </div>
            <p className="text-lg text-[var(--muted)]" data-reveal>
              Arrastra el control interactivo. La{" "}
              <strong className="text-fxink">parrilla de contacto</strong> gana
              en velocidad y guardado vertical en departamentos pequeños; la{" "}
              <strong className="text-fxink">abierta o Smart XL a 500 °F</strong>{" "}
              gana en sellado de cortes gruesos y tandas familiares sin humo.
            </p>
          </div>
          <div data-reveal>
            <ContactVsOpenGrillSlider />
          </div>
        </section>

        {/* 10. Carrusel 4:5 de Escenas Reales en Casa y Departamento */}
        <section className="overflow-hidden bg-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Uso real en casas y departamentos
              </span>
              <SplitHeading
                text="Guías clave de asado en interiores"
                accent={{
                  text: "sin errores ni humo",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <MomentsCarousel items={moments} />
          </div>
        </section>

        {/* 11. Recomendador Interactivo + Calculadora de Superficie Útil */}
        <section id="recomendador" className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Selector Interactivo Amazon EE. UU.
              </span>
              <SplitHeading
                text="Filtra por precio, espacio y porciones"
                accent={{
                  text: "y llévate el kit compatible",
                  className: "text-fxblue",
                }}
                className="section-title mt-3"
              />
            </div>
            <p className="text-[var(--muted)]" data-reveal>
              Combina tu rango de presupuesto, el espacio disponible en tu cocina
              y cuántas porciones cocinas a la vez para descubrir la parrilla,
              su placa compatible y pinzas o termómetro recomendados en Amazon.
            </p>
          </div>
          <div data-reveal>
            <GrillFinderBlock options={finderOptions} />
          </div>
        </section>

        {/* 12. Bento Grid Asimétrico de los 12 Silos + Vitrina Amazon + Lo Más Consultado */}
        <section className="bg-gradient-to-b from-white to-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                1,332 Guías Sin Canibalización
              </span>
              <SplitHeading
                text="Todo organizado en"
                accent={{
                  text: "12 silos especializados",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>

            <div className="grid auto-rows-[minmax(185px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
              {cats.map((c, i) => {
                const count = getArticlesIn(c.slug).length;
                const big = i === 0;
                const wide = i === 1 || i === 5 || i === 9;
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className={`card spot group flex flex-col p-6 ${
                      big
                        ? "spot-dark border-transparent bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#c2410c] text-white md:col-span-2 lg:row-span-2"
                        : ""
                    } ${wide ? "lg:col-span-2" : ""}`}
                    data-reveal
                    data-reveal-delay={String(i % 4)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${
                          big ? "bg-white/15" : "bg-fxsky"
                        }`}
                        aria-hidden
                      >
                        {ICONS[c.icon] || "🔥"}
                      </span>
                      {count > 0 && (
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            big ? "text-orange-300" : "text-fxbluedeep"
                          }`}
                        >
                          {count} guías
                        </span>
                      )}
                    </div>
                    <h3
                      className={`mt-4 font-display font-extrabold ${
                        big ? "text-3xl sm:text-4xl" : "text-xl"
                      }`}
                    >
                      {c.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm ${
                        big ? "text-white/80" : "text-[var(--muted)]"
                      }`}
                    >
                      {c.description}
                    </p>
                    {big && (
                      <ul className="mt-6 space-y-2 text-sm text-white/85">
                        {getArticlesIn(c.slug)
                          .slice(0, 5)
                          .map((a) => (
                            <li key={a.path} className="truncate">
                              → {a.title}
                            </li>
                          ))}
                      </ul>
                    )}
                    <span
                      className={`mt-auto pt-4 text-sm font-semibold ${
                        big ? "text-orange-300" : "text-fxbluedeep"
                      }`}
                    >
                      Explorar silo →
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Vitrina Amazon Showcase en la Home */}
            <AmazonAffiliateBox
              variant="showcase"
              sectionTitle={amzHome.sectionTitle}
              sectionSubtitle={amzHome.sectionSubtitle}
              products={amzHome.products}
              source="home-showcase"
            />

            {popular.length > 0 && (
              <div className="mt-16">
                <h3
                  className="font-display text-2xl font-extrabold sm:text-3xl"
                  data-reveal
                >
                  Las 6 guías y comparativas más consultadas
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {popular.slice(0, 6).map((a) => (
                    <div key={a.path} data-reveal>
                      <ArticleCard a={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 13. Realidad Técnica vs Promesas Comerciales */}
        <section className="wrap py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Metodología Editorial Independiente
              </span>
              <SplitHeading
                text="Datos reales de cocina,"
                accent={{
                  text: "sin exageraciones de caja",
                  className: "text-fxblue",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Muchas cajas prometen &ldquo;cero humo absoluto&rdquo; o
                &ldquo;8 porciones&rdquo; en placas diminutas donde apenas caben
                4 hamburguesas. En{" "}
                <strong className="text-fxink">ParrillaEnCasa.com</strong>{" "}
                verificamos dimensiones exactas, tipo de limpieza y compatibilidad
                real. En este sitio {GRILL_DISCLAIMER}.
              </p>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/politica-editorial/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Nuestra política editorial
                </Link>
                <Link
                  href="/divulgacion-de-afiliados/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Divulgación de afiliados Amazon
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card spot p-6" data-reveal>
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
                  ✓ Lo que verificamos en cada modelo
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Precio orientativo real en Amazon Estados Unidos</li>
                  <li>• Medidas cerrada, abierta a 180° y bajo gabinetes</li>
                  <li>• Porciones reales según área en sq in y cm²</li>
                  <li>• Placas desmontables aptas para lavavajillas y repuestos</li>
                </ul>
              </div>
              <div className="card spot p-6" data-reveal data-reveal-delay="1">
                <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-900">
                  ⚠️ Errores que te ayudamos a evitar
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Rayar las placas antiadherentes con pinzas metálicas</li>
                  <li>• Usar spray de aceite con lecitina que deja película gomosa</li>
                  <li>• Comprar placas de repuesto incompatibles por código</li>
                  <li>• Enchufar equipos 110V de Amazon EE. UU. directo a 220V</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 14. Preguntas Frecuentes (FAQ JSON-LD) */}
        <section className="wrap pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Preguntas frecuentes
              </span>
              <SplitHeading
                text="Resuelve tus dudas antes de comprar"
                className="section-title mt-3"
              />
              <p className="mt-4 text-[var(--muted)]" data-reveal>
                ¿No sabes si te conviene Ninja Sizzle, Cuisinart Griddler o
                George Foreman para el tamaño de tu cocina? Pregúntale gratis a
                nuestro Asesor IA en línea.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-reveal>
                <OpenChatButton
                  label="Preguntar al Asesor IA"
                  className="btn btn-buy shine"
                />
                <Link
                  href="/placas-de-repuesto-y-compatibilidad/"
                  className="btn btn-ghost"
                >
                  Placas compatibles
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="card card-static group p-5 open:shadow-lg"
                  data-reveal
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxbluedeep transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15. CTA Final Aurora */}
        <section className="wrap pb-6">
          <div className="relative isolate overflow-hidden rounded-[36px] bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#c2410c] px-6 py-14 text-white sm:px-14 sm:py-20">
            <div className="hero-grid opacity-60" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-fxlime/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div className="text-center lg:text-left">
                <SplitHeading
                  text="Asa en tu casa o departamento sin humo,"
                  accent={{
                    text: "al mejor precio en Amazon EE. UU.",
                    className: "text-[#fdba74]",
                  }}
                  className="text-3xl font-extrabold sm:text-5xl"
                />
                <p className="mt-4 text-lg text-white/85">
                  Explora nuestras 1,332 guías sobre George Foreman, Cuisinart,
                  Hamilton Beach y Ninja o habla ahora con nuestro Asesor IA
                  para elegir parrilla, pinzas, termómetro y placas compatibles.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/parrillas-por-espacio-porciones-y-precio/"
                    className="btn btn-lime shine text-base"
                    data-magnetic
                  >
                    Ver Mejores Parrillas en Amazon
                  </Link>
                  <OpenChatButton
                    label="Hablar con el Asesor IA"
                    className="btn btn-glass text-base"
                    magnetic
                  />
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[380px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border-2 border-white/20 shadow-2xl float-y">
                  <Image
                    src={ambient("home-placas-lavavajillas")}
                    alt="Placas antiadherentes desmontables, pinzas de silicona y termómetro digital listos para limpieza fácil"
                    fill
                    sizes="380px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ClientEffects stickySource="home-sticky" />
    </>
  );
}
