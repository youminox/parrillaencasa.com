import fs from "node:fs";
import path from "node:path";
import categories from "@/data/categories.json";
import keywordMap from "@/data/keyword_map.json";

export const SITE_URL = "https://parrillaencasa.com";
export const SITE_NAME = "ParrillaEnCasa.com";
export const LEGAL_OWNER = "CARLOS LINGAN BORJA";
export const LEGAL_LOCATION = "Lima, Perú";
export const LEGAL_EMAIL = "info@charlielingan.com";
export const LEGAL_LINE =
  "Titular del sitio web: CARLOS LINGAN BORJA, domiciliado en Lima, Perú · Correo electrónico: info@charlielingan.com";
export const GRILL_DISCLAIMER =
  "las marcas comerciales citadas (Amazon, George Foreman, George Tough, Cuisinart, Griddler, SearBlast, Hamilton Beach, Ninja, Ninja Sizzle, Foodi Smart XL, OXO, ThermoPro, MEATER, entre otras) pertenecen a sus legítimos titulares; este portal realiza comparativas independientes de parrillas eléctricas de interior, placas de repuesto, pinzas y termómetros en español, y participa en el Programa de Afiliados de Amazon";
export const PUBLISHED = "2026-11-24";
export const VERIFIED_LABEL = "24/11/2026";
export const CHAT_ENDPOINT =
  "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/parrillaencasa-chat";

export type Block =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | {
      type: "callout";
      variant: "etiqueta" | "fabricante" | "aviso" | "tip";
      title?: string;
      text: string;
    }
  | { type: "steps"; items: { name: string; text: string }[] }
  | { type: "cta"; text: string };

export type Article = {
  slug: string;
  pillar: string;
  path: string;
  isPillar: boolean;
  isTransactional?: boolean;
  primaryKeyword: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  quickAnswer: string;
  readingMinutes: number;
  image: { prompt: string; alt: string };
  blocks: Block[];
  faqs: { q: string; a: string }[];
  sources?: { label: string; url: string }[];
  related: string[];
  datePublished: string;
  dateModified: string;
  imageUrl: string | null;
};

export type Category = (typeof categories)[number];

const DIR = path.join(process.cwd(), "src/content/articles");
const PUBLIC = path.join(process.cwd(), "public");
let cache: Article[] | null = null;

function isValidArticle(a: Partial<Article>): a is Article {
  return Boolean(
    a && a.slug && a.pillar && a.path && a.title && Array.isArray(a.blocks)
  );
}

const PILLAR_SCENE_POOLS: Record<string, string[]> = {
  "resenas-parrillas-electricas": [
    "cat-resenas-parrillas-electricas",
    "scene-resenas-2",
    "scene-resenas-3",
    "home-hero-parrillas",
    "home-smokeless-depa",
  ],
  "comparativas-parrillas-electricas": [
    "cat-comparativas-parrillas-electricas",
    "scene-comparativas-2",
    "scene-comparativas-3",
    "og-default",
  ],
  "parrillas-por-espacio-porciones-y-precio": [
    "cat-parrillas-por-espacio-porciones-y-precio",
    "scene-espacio-2",
    "scene-espacio-3",
    "home-encimera-compacta",
    "home-reunion-familiar",
  ],
  "placas-de-repuesto-y-compatibilidad": [
    "cat-placas-de-repuesto-y-compatibilidad",
    "scene-placas-2",
    "scene-placas-3",
    "home-placas-lavavajillas",
  ],
  "pinzas-termometros-y-accesorios-parrilla": [
    "cat-pinzas-termometros-y-accesorios-parrilla",
    "scene-accesorios-2",
    "scene-accesorios-3",
    "home-termometro-carne",
  ],
  "control-de-humo-ventilacion-y-departamentos": [
    "cat-control-de-humo-ventilacion-y-departamentos",
    "scene-humo-2",
    "scene-humo-3",
    "home-smokeless-depa",
  ],
  "espacio-medidas-consumo-y-voltaje": [
    "cat-espacio-medidas-consumo-y-voltaje",
    "scene-medidas-2",
    "scene-medidas-3",
    "home-encimera-compacta",
    "home-voltaje-cocina",
  ],
  "porciones-superficie-y-tiempos-de-coccion": [
    "cat-porciones-superficie-y-tiempos-de-coccion",
    "scene-porciones-2",
    "scene-porciones-3",
    "home-reunion-familiar",
  ],
  "cortes-carnes-aves-pescados-y-verduras": [
    "cat-cortes-carnes-aves-pescados-y-verduras",
    "scene-cortes-2",
    "scene-cortes-3",
    "home-panini-180",
  ],
  "limpieza-antiadherentes-y-cuidado-de-placas": [
    "cat-limpieza-antiadherentes-y-cuidado-de-placas",
    "scene-limpieza-2",
    "scene-limpieza-3",
    "home-placas-lavavajillas",
  ],
  "uso-seguro-de-pinzas-termometros-y-accesorios": [
    "cat-uso-seguro-de-pinzas-termometros-y-accesorios",
    "scene-uso-accesorios-2",
    "scene-uso-accesorios-3",
    "home-termometro-carne",
  ],
  "mantenimiento-solucion-de-fallas-y-compra-en-amazon": [
    "cat-mantenimiento-solucion-de-fallas-y-compra-en-amazon",
    "scene-mantenimiento-2",
    "scene-mantenimiento-3",
    "home-voltaje-cocina",
  ],
};

function resolveArticleImage(
  a: Article,
  pillarCountMap: Map<string, number>
): string {
  const imgArt = path.join(PUBLIC, "img/articulos", `${a.slug}.webp`);
  if (fs.existsSync(imgArt)) {
    return `/img/articulos/${a.slug}.webp`;
  }
  if (a.isPillar) {
    const imgCat = path.join(PUBLIC, "img/ambiente", `cat-${a.pillar}.webp`);
    if (fs.existsSync(imgCat)) return `/img/ambiente/cat-${a.pillar}.webp`;
  }
  const idx = pillarCountMap.get(a.pillar) || 0;
  pillarCountMap.set(a.pillar, idx + 1);
  const pool = PILLAR_SCENE_POOLS[a.pillar] || ["home-hero-parrillas"];
  const candidate = pool[idx % pool.length];
  const candidatePath = path.join(PUBLIC, "img/ambiente", `${candidate}.webp`);
  if (fs.existsSync(candidatePath)) {
    return `/img/ambiente/${candidate}.webp`;
  }
  const imgAmb = path.join(PUBLIC, "img/ambiente", `cat-${a.pillar}.webp`);
  return fs.existsSync(imgAmb)
    ? `/img/ambiente/cat-${a.pillar}.webp`
    : `/img/ambiente/home-hero-parrillas.webp`;
}

export function getAllContent(): Article[] {
  if (cache) return cache;
  const order = (keywordMap as { path: string }[]).map((k) => k.path);
  const files = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
    : [];
  const list: Article[] = [];
  const seen = new Set<string>();
  const pillarCountMap = new Map<string, number>();
  for (const f of files) {
    try {
      const a = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      if (!isValidArticle(a) || seen.has(a.path)) continue;
      seen.add(a.path);
      const imageUrl = resolveArticleImage(a, pillarCountMap);
      list.push({
        ...a,
        isPillar: Boolean(a.isPillar),
        isTransactional: Boolean(a.isTransactional),
        image:
          a.image && a.image.alt ? a.image : { prompt: "", alt: a.title },
        faqs: Array.isArray(a.faqs) ? a.faqs : [],
        related: Array.isArray(a.related) ? a.related : [],
        quickAnswer: a.quickAnswer || a.excerpt || "",
        excerpt: a.excerpt || a.metaDescription || "",
        seoTitle: a.seoTitle || a.title,
        metaDescription: a.metaDescription || a.excerpt || "",
        datePublished: a.datePublished || PUBLISHED,
        dateModified: a.dateModified || PUBLISHED,
        imageUrl,
      });
    } catch {
      // ignore invalid json during generation
    }
  }
  list.sort((x, y) => {
    const ix = order.indexOf(x.path);
    const iy = order.indexOf(y.path);
    if (ix === -1 && iy === -1) return x.path.localeCompare(y.path);
    if (ix === -1) return 1;
    if (iy === -1) return -1;
    return ix - iy;
  });
  cache = list;
  return list;
}

export const getCategories = (): Category[] => categories;
export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
export const getPillar = (slug: string) =>
  getAllContent().find((a) => a.isPillar && a.pillar === slug);
export const getArticle = (pillar: string, slug: string) =>
  getAllContent().find(
    (a) => !a.isPillar && a.pillar === pillar && a.slug === slug
  );
export const getArticlesIn = (pillar: string) =>
  getAllContent().filter((a) => !a.isPillar && a.pillar === pillar);
export const getByPath = (p: string) =>
  getAllContent().find((a) => a.path === p);

export function safeHref(p: string): string {
  if (getByPath(p)) return p;
  const pillar = p.split("/").filter(Boolean)[0];
  if (pillar && getCategory(pillar)) return `/${pillar}/`;
  return "/";
}

export function ambient(
  name: string,
  fallback = "/img/ambiente/home-hero-parrillas.webp"
): string {
  const rel = `/img/ambiente/${name}.webp`;
  return fs.existsSync(path.join(PUBLIC, rel)) ? rel : fallback;
}

export const hasAmbient = (name: string) =>
  fs.existsSync(path.join(PUBLIC, `/img/ambiente/${name}.webp`));

export const OG_DEFAULT = () =>
  ambient("og-default", "/img/ambiente/home-hero-parrillas.webp");

export function absolute(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function trimTitle(t: string) {
  return t.replace(/\s*\|\s*ParrillaEnCasa(?:\.com)?\s*$/i, "");
}

export const organizationLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.svg`,
  founder: { "@id": `${SITE_URL}/#carlos` },
  email: LEGAL_EMAIL,
  description:
    "Guía especializada en español para elegir parrillas eléctricas de interior para casas y departamentos en Amazon Estados Unidos. Compara George Foreman, Cuisinart, Hamilton Beach y Ninja según precio, espacio, porciones simultáneas y facilidad de limpieza, junto a pinzas, termómetros y placas de repuesto compatibles.",
};

export const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#carlos`,
  name: LEGAL_OWNER,
  email: LEGAL_EMAIL,
  jobTitle: "Fundador & Editor Jefe de ParrillaEnCasa.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  url: `${SITE_URL}/sobre-nosotros/`,
};
