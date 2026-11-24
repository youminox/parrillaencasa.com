import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SITE = "https://parrillaencasa.com";
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];
const AMAZON_TAG_US = "parrillaencasa-20";
const AMAZON_TAG_ES = "parrillaencasa-21";

export interface ArticleRow {
  slug: string;
  title: string;
  category: string;
  category_name: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  search_text: string | null;
}

export interface ArticleCard {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface AmazonProductCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: string;
  urlUS: string;
  urlES: string;
}

const AMAZON_PRODUCTS: Record<string, AmazonProductCard> = {
  "george-foreman-grp4842p": {
    id: "george-foreman-grp4842p",
    badge: "💵 Mejor Calidad-Precio Compacta (5 Porciones · Placas Desmontables)",
    title:
      "George Foreman 5-Serving Removable Plate Electric Indoor Grill & Panini Press (GRP4842P)",
    subtitle:
      "72 sq in (4–5 porciones), placas antiadherentes George Tough desmontables aptas para lavavajillas, diseño inclinado que drena la grasa y ahorro máximo de espacio en encimeras.",
    rating: "4.6",
    reviewsCount: "28.400+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("George Foreman 5-Serving Removable Plate Electric Grill GRP4842P")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("George Foreman parrilla electrica placas extraibles")}&tag=${AMAZON_TAG_ES}`,
  },
  "george-foreman-grs040b": {
    id: "george-foreman-grs040b",
    badge: "🏢 #1 Ultracompacta para Estudios y 1–2 Personas (< US$30)",
    title:
      "George Foreman 2-Serving Classic Plate Electric Indoor Grill & Panini Press (GRS040B / GRS040R)",
    subtitle:
      "Ocupa apenas 22 × 18 cm (guardado vertical en cualquier alacena), ideal para 2 pechugas o 2 hamburguesas rápidas en departamentos pequeños.",
    rating: "4.6",
    reviewsCount: "41.200+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("George Foreman 2-Serving Classic Plate Electric Grill GRS040B")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("George Foreman parrilla compacta 2 porciones")}&tag=${AMAZON_TAG_ES}`,
  },
  "cuisinart-gr4np1-griddler": {
    id: "cuisinart-gr4np1-griddler",
    badge: "🏆 #1 Versátil 5-en-1 en Amazon EE. UU. (Abre a 180° + Placas Reversibles)",
    title:
      "Cuisinart 5-in-1 Griddler Stainless Steel Electric Indoor Grill, Griddle & Panini Press (GR-4NP1)",
    subtitle:
      "Se abre plana a 180° (hasta 200 sq in / 6–8 porciones en modo abierto), placas reversibles grill/plancha sin BPA aptas para lavavajillas y control dual de temperatura.",
    rating: "4.7",
    reviewsCount: "26.900+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Cuisinart GR-4NP1 5-in-1 Griddler Electric Indoor Grill")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Cuisinart Griddler parrilla electrica 5 en 1")}&tag=${AMAZON_TAG_ES}`,
  },
  "cuisinart-gr150p1-deluxe": {
    id: "cuisinart-gr150p1-deluxe",
    badge: "🥩 Mejor Sellado Dual 500 °F (Griddler Deluxe · 6–8 Porciones)",
    title:
      "Cuisinart Griddler Deluxe Brushed Stainless Contact Grill & 180° Griddle (GR-150P1)",
    subtitle:
      "Control independiente para placa superior e inferior, función SearBlast de 500 °F (260 °C) para sellar ribeye o lomo fino y 240 sq in abierta.",
    rating: "4.7",
    reviewsCount: "9.800+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Cuisinart GR-150P1 Griddler Deluxe Electric Grill")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Cuisinart GR-150 Griddler Deluxe parrilla contacto")}&tag=${AMAZON_TAG_ES}`,
  },
  "hamilton-beach-25361": {
    id: "hamilton-beach-25361",
    badge: "💨 Mejor Sellado Sin Humo Económica con Tapa Ventana (< US$85)",
    title:
      "Hamilton Beach Electric Indoor Searing Grill with Viewing Window & Hood (25361 / 25360)",
    subtitle:
      "Alcanza 450 °F (232 °C) para marcar cortes con mínimo humo, 118 sq in (hasta 6 porciones) y tanto la tapa como la rejilla y bandeja de goteo van al lavavajillas.",
    rating: "4.6",
    reviewsCount: "23.500+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Hamilton Beach Electric Indoor Searing Grill 25361")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Hamilton Beach parrilla electrica interior tapa cristal")}&tag=${AMAZON_TAG_ES}`,
  },
  "hamilton-beach-38546-3in1": {
    id: "hamilton-beach-38546-3in1",
    badge: "🍳 Mejor Parrilla + Plancha 3-en-1 Reversible de Gran Superficie",
    title:
      "Hamilton Beach 3-in-1 Electric Smokeless Indoor Grill & Griddle (38546 — 180 sq in)",
    subtitle:
      "Dos placas reversibles independientes con control de temperatura dual y bandeja inferior de grasa apta para lavavajillas (6–8 porciones).",
    rating: "4.5",
    reviewsCount: "4.900+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Hamilton Beach 3-in-1 Indoor Grill Griddle 38546")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("parrilla y plancha electrica doble zona sin humo")}&tag=${AMAZON_TAG_ES}`,
  },
  "ninja-sizzle-gr101": {
    id: "ninja-sizzle-gr101",
    badge: "🔥 #1 Sin Humo Abierta a 500 °F (Grill + Plancha Plana Intercambiables)",
    title:
      "Ninja Sizzle Smokeless Indoor Grill & Flat-Top Griddle (GR101 — hasta 500 °F)",
    subtitle:
      "Calentamiento uniforme de borde a borde hasta 500 °F, malla perforada antisalpicaduras desmontable y placa antiadherente intercambiable para 4–6 hamburguesas o cortes.",
    rating: "4.7",
    reviewsCount: "7.600+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Ninja GR101 Sizzle Smokeless Indoor Grill and Griddle")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Ninja Sizzle GR101 parrilla electrica sin humo")}&tag=${AMAZON_TAG_ES}`,
  },
  "ninja-foodi-fg551-xl": {
    id: "ninja-foodi-fg551-xl",
    badge: "💎 #1 Gama Alta Familiar con Termómetro Inteligente (6-en-1 Smart XL)",
    title:
      "Ninja Foodi Smart XL 6-in-1 Indoor Grill with Smart Cook System Thermometer (FG551 / IG651)",
    subtitle:
      "Cocina prácticamente sin humo a 500 °F con aire ciclónico + sonda termómetro integrada para clavar el término exacto de 6 bistecs o 24 hot dogs, con rejilla cerámica apta lavavajillas.",
    rating: "4.8",
    reviewsCount: "19.800+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Ninja FG551 Foodi Smart XL 6-in-1 Indoor Grill")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Ninja Foodi Smart XL parrilla electrica sin humo")}&tag=${AMAZON_TAG_ES}`,
  },
  "replacement-plates-cuisinart-ninja": {
    id: "replacement-plates-cuisinart-ninja",
    badge: "🧩 Placas de Repuesto, Waffles y Bandejas Compatibles Oficiales",
    title:
      "Placas de Repuesto Compatibles (Cuisinart GR-4NP1P / Waffles GR-WAFP · Ninja Sizzle GR101 · Ninja Foodi FG551 · Bandejas George Foreman)",
    subtitle:
      "Renueva tu parrilla en minutos con placas reversibles grill/plancha, placas para waffles, mallas antisalpicaduras y bandejas recolectoras compatibles en Amazon EE. UU.",
    rating: "4.7",
    reviewsCount: "8.900+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Cuisinart GR-4NP1 replacement grill plates Ninja Sizzle GR101 replacement plate")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("placas repuesto parrilla electrica Cuisinart Ninja George Foreman")}&tag=${AMAZON_TAG_ES}`,
  },
  "oxo-silicone-tongs": {
    id: "oxo-silicone-tongs",
    badge: "🥢 Pinzas de Silicona Anti-Rayones (Imprescindibles para Placas Antiadherentes)",
    title:
      "OXO Good Grips 9\" & 12\" Silicone-Tipped Locking Tongs (Resistentes hasta 600 °F / 315 °C)",
    subtitle:
      "Puntas de silicona blanda que protegen el recubrimiento cerámico y PTFE de George Foreman, Cuisinart, Hamilton Beach y Ninja sin perforar los jugos de la carne.",
    rating: "4.8",
    reviewsCount: "34.500+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("OXO Good Grips Silicone Tipped Tongs 9 inch 12 inch")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("OXO Good Grips pinzas cocina silicona antiadherente")}&tag=${AMAZON_TAG_ES}`,
  },
  "thermopro-tp19h-thermometer": {
    id: "thermopro-tp19h-thermometer",
    badge: "🌡️ Termómetro Digital Instantáneo #1 (Punto Exacto en 2–3 Segundos)",
    title:
      "ThermoPro TP19H Waterproof Digital Instant-Read Meat Thermometer (o Inalámbrico TempSpike)",
    subtitle:
      "Lectura ultrarrápida para saber exactamente cuándo retirar ribeye, pechuga de pollo, cerdo o salmón sin abrir la tapa de más ni secar tus cortes.",
    rating: "4.8",
    reviewsCount: "62.100+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("ThermoPro TP19H Digital Meat Thermometer Instant Read")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("ThermoPro termometro cocina digital lectura instantanea carne")}&tag=${AMAZON_TAG_ES}`,
  },
};

function calculateCostUsd(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  if (model.includes("mini")) {
    return Number(
      (promptTokens * 0.00000015 + completionTokens * 0.0000006).toFixed(6)
    );
  }
  return Number(
    (promptTokens * 0.0000025 + completionTokens * 0.00001).toFixed(6)
  );
}

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "como",
  "cual",
  "cuales",
  "que",
  "quien",
  "donde",
  "cuando",
  "por",
  "para",
  "con",
  "sin",
  "una",
  "uno",
  "los",
  "las",
  "del",
  "al",
  "hola",
  "quiero",
  "puedo",
  "recomienda",
  "mejor",
  "mejores",
  "sobre",
  "mas",
  "muy",
  "tiene",
  "tengo",
  "parrilla",
  "parrillas",
  "electrica",
  "electricas",
  "interior",
  "casa",
  "departamento",
  "depa",
]);

function extractTokens(text: string): string[] {
  return norm(text)
    .split(" ")
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
}

let catalogCache: {
  at: number;
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
} | null = null;

async function loadCatalog(): Promise<{
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
}> {
  if (
    catalogCache &&
    Date.now() - catalogCache.at < 10 * 60 * 1000 &&
    catalogCache.rows.length > 0
  ) {
    return catalogCache;
  }
  const [batch1, batch2] = await Promise.all([
    supabase
      .from("parrillaencasa_articles")
      .select(
        "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
      )
      .eq("active", true)
      .range(0, 999),
    supabase
      .from("parrillaencasa_articles")
      .select(
        "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
      )
      .eq("active", true)
      .range(1000, 1999),
  ]);

  const rows: ArticleRow[] = [];
  const bySlug = new Map<string, ArticleRow>();
  for (const data of [batch1.data, batch2.data]) {
    if (Array.isArray(data)) {
      for (const r of data as ArticleRow[]) {
        if (!bySlug.has(r.slug)) {
          bySlug.set(r.slug, r);
          rows.push(r);
        }
      }
    }
  }
  catalogCache = { at: Date.now(), rows, bySlug };
  return catalogCache;
}

function toArticleCard(r: ArticleRow): ArticleCard {
  const img = r.featured_image || "/img/ambiente/home-hero-parrillas.webp";
  const url =
    r.slug === r.category
      ? `${SITE}/${r.category}/`
      : `${SITE}/${r.category}/${r.slug}/`;
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    categoryName: r.category_name,
    url,
    image: img.startsWith("http") ? img : `${SITE}${img}`,
    readTime: r.read_time || "7 min",
    excerpt: (r.excerpt || "").slice(0, 145),
  };
}

function searchArticles(
  rows: ArticleRow[],
  userMessage: string,
  historyText: string,
  limit = 14
): ArticleRow[] {
  const primaryTokens = extractTokens(userMessage);
  const contextTokens = extractTokens(historyText).filter(
    (t) => !primaryTokens.includes(t)
  );
  const fullPhrase = norm(userMessage);

  const starterSlugs = [
    "mejores-parrillas-electricas-interior-sin-humo-departamento-amazon",
    "george-foreman-vs-cuisinart-vs-hamilton-beach-vs-ninja-cual-elegir",
    "ninja-sizzle-gr101-parrilla-sin-humo-resena-espacio-porciones-limpieza",
    "cuisinart-gr-4np1-griddler-5-en-1-resena-placas-y-limpieza",
    "george-foreman-grp4842p-5-porciones-placas-desmontables-resena",
    "hamilton-beach-25361-indoor-searing-grill-resena-humo-y-limpieza",
  ];

  if (primaryTokens.length === 0 && contextTokens.length === 0) {
    const picked: ArticleRow[] = [];
    for (const s of starterSlugs) {
      const f = rows.find((r) => r.slug === s);
      if (f) picked.push(f);
    }
    return picked.length > 0 ? picked : rows.slice(0, 8);
  }

  const scored: Array<{ r: ArticleRow; score: number }> = [];
  for (const r of rows) {
    const titleNorm = norm(r.title);
    const catNorm = norm(`${r.category_name} ${r.category}`);
    const bodyNorm =
      r.search_text || `${titleNorm} ${catNorm} ${norm(r.excerpt || "")}`;

    let score = 0;
    if (fullPhrase.length >= 5 && titleNorm.includes(fullPhrase)) score += 45;

    let matchedPrimary = 0;
    for (const tok of primaryTokens) {
      if (titleNorm.includes(tok)) {
        score += 16;
        matchedPrimary++;
      } else if (catNorm.includes(tok)) {
        score += 9;
        matchedPrimary++;
      } else if (bodyNorm.includes(tok)) {
        score += 5;
        matchedPrimary++;
      }
    }
    if (matchedPrimary >= 2) score += matchedPrimary * 8;
    if (starterSlugs.includes(r.slug)) score += 5;

    for (const cTok of contextTokens.slice(-5)) {
      if (titleNorm.includes(cTok)) score += 3;
    }

    if (score > 0) scored.push({ r, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const mode = body.mode || (req.method === "GET" ? "config" : "chat");

    // 0. Seed / Sync articles endpoint
    if (mode === "seed_articles") {
      const syncKey = req.headers.get("x-sync-key") || "";
      if (syncKey !== "parrillaencasa-sync-2026") {
        return json({ error: "No autorizado" }, 401);
      }
      const rows = Array.isArray(body.articles) ? body.articles : [];
      if (rows.length === 0) return json({ error: "Sin artículos" }, 400);
      const { error } = await supabase
        .from("parrillaencasa_articles")
        .upsert(rows, { onConflict: "slug" });
      if (error) return json({ error: error.message }, 500);
      catalogCache = null;
      return json({ success: true, count: rows.length });
    }

    // 1. Load live config (Default: gpt-4o-mini)
    const { data: configRow } = await supabase
      .from("parrillaencasa_chat_config")
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    const config = configRow || {
      is_enabled: true,
      ai_model: "gpt-4o-mini",
      temperature: 0.35,
      max_messages_per_session: 30,
      daily_budget_usd: 5.0,
      welcome_message:
        "¡Hola! 🔥🥩 Soy tu Asesor de Parrillas Eléctricas de Interior IA de ParrillaEnCasa.com (modelo mini rápido). Cuéntame tu presupuesto, el espacio de tu cocina o cuántas porciones cocinas a la vez, y te ayudaré a elegir entre George Foreman, Cuisinart, Hamilton Beach o Ninja (y qué placas de repuesto, pinzas o termómetro comprar en Amazon Estados Unidos).",
      custom_instructions: "",
    };

    const activeModel = ALLOWED_MODELS.includes(config.ai_model)
      ? config.ai_model
      : "gpt-4o-mini";

    if (mode === "config" || req.method === "GET") {
      return json({
        is_enabled: config.is_enabled,
        welcome_message: config.welcome_message,
        ai_model: activeModel,
        max_messages_per_session: config.max_messages_per_session,
      });
    }

    // 2. Track click on an article or Amazon product
    if (mode === "track_click") {
      const {
        session_id,
        visitor_id,
        article_slug,
        article_title,
        category,
        target_url,
        page_url,
      } = body;
      if (target_url) {
        await supabase.from("parrillaencasa_chat_clicks").insert({
          session_id: session_id || null,
          visitor_id: String(visitor_id || "anon").slice(0, 80),
          article_slug: article_slug ? String(article_slug).slice(0, 180) : null,
          article_title: article_title
            ? String(article_title).slice(0, 240)
            : null,
          category: category ? String(category).slice(0, 80) : null,
          target_url: String(target_url).slice(0, 500),
          page_url: page_url ? String(page_url).slice(0, 500) : null,
        });

        if (session_id) {
          const { data: sess } = await supabase
            .from("parrillaencasa_chat_sessions")
            .select("clicks_count, clicked_urls")
            .eq("id", session_id)
            .maybeSingle();
          if (sess) {
            const urls = Array.isArray(sess.clicked_urls)
              ? sess.clicked_urls
              : [];
            if (!urls.includes(target_url)) urls.push(target_url);
            await supabase
              .from("parrillaencasa_chat_sessions")
              .update({
                clicks_count: (sess.clicks_count || 0) + 1,
                clicked_urls: urls,
              })
              .eq("id", session_id);
          }
        }
      }
      return json({ success: true });
    }

    // 3. Chat Completion
    if (!config.is_enabled) {
      return json({
        reply: `En este momento el Asesor de Parrillas IA está en mantenimiento breve. Puedes explorar nuestras comparativas de George Foreman, Cuisinart, Hamilton Beach y Ninja en [ParrillaEnCasa.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: [
          "Mejores parrillas eléctricas sin humo",
          "George Foreman vs Cuisinart vs Ninja",
        ],
        disabled: true,
      });
    }

    const userMessage = String(body.message || "").trim().slice(0, 1000);
    if (!userMessage) return json({ error: "Mensaje vacío" }, 400);

    const visitorId = String(
      body.visitor_id || "pec-" + crypto.randomUUID().slice(0, 8)
    ).slice(0, 80);
    const region = body.region === "ES" ? "ES" : "US";
    const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 500);
    const userAgent = String(
      body.user_agent || req.headers.get("user-agent") || ""
    ).slice(0, 300);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    let sessionId: string | null = body.session_id || null;

    let existingSession: any = null;
    if (sessionId) {
      const { data: s } = await supabase
        .from("parrillaencasa_chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      existingSession = s;
    }

    if (!existingSession) {
      const { data: created, error: createErr } = await supabase
        .from("parrillaencasa_chat_sessions")
        .insert({
          visitor_id: visitorId,
          page_url: pageUrl,
          user_agent: userAgent,
          first_user_message: userMessage.slice(0, 250),
          last_user_message: userMessage.slice(0, 250),
          messages_count: 1,
          model_used: activeModel,
        })
        .select("*")
        .single();

      if (!createErr && created) {
        existingSession = created;
        sessionId = created.id;
      }
    }

    if (sessionId) {
      await supabase.from("parrillaencasa_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage,
      });
    }

    const catalog = await loadCatalog();
    const recentHistoryText = history
      .slice(-3)
      .map((h: any) => h?.content || "")
      .join(" ");
    const candidateRows = searchArticles(
      catalog.rows,
      userMessage,
      recentHistoryText,
      14
    );

    const candidatesPrompt =
      candidateRows.length > 0
        ? candidateRows
            .map((r) => {
              const u =
                r.slug === r.category
                  ? `${SITE}/${r.category}/`
                  : `${SITE}/${r.category}/${r.slug}/`;
              return `- SLUG: "${r.slug}" | TÍTULO: "${r.title}" | CATEGORÍA: ${r.category_name} | URL: ${u} | RESUMEN: ${(r.excerpt || "").slice(0, 140)}`;
            })
            .join("\n")
        : "No se encontraron artículos exactos con esos términos.";

    const amazonCatalogPrompt = Object.values(AMAZON_PRODUCTS)
      .map(
        (p) =>
          `- PRODUCT_ID: "${p.id}" | ${p.badge} | NOMBRE: "${p.title}" | DETALLE: ${p.subtitle} | URL_${region}: ${region === "ES" ? p.urlES : p.urlUS}`
      )
      .join("\n");

    const extraInstructions = config.custom_instructions
      ? `\nINSTRUCCIONES ADICIONALES DEL ADMINISTRADOR:\n${config.custom_instructions}\n`
      : "";

    const systemPrompt = `Eres el Asesor Oficial de Parrillas Eléctricas de Interior IA de ParrillaEnCasa.com (${SITE}), la guía líder en español con más de 1,300 artículos especializados para elegir parrillas eléctricas de interior para casas y departamentos en Amazon Estados Unidos (fundado por Carlos Lingan Borja, info@charlielingan.com).

Tu doble misión es:
1. RESPONDER TODAS LAS DUDAS DEL USUARIO comparando con precisión las marcas principales (George Foreman, Cuisinart, Hamilton Beach y Ninja) según los 4 ejes clave:
   - PRECIO (USD): < US$35–$55 George Foreman GRS040B / GRP4842P; US$75–$90 Hamilton Beach 25361 / Cuisinart GR-4NP1; US$110–$230 Ninja Sizzle GR101, Cuisinart GR-150P1 Deluxe y Ninja Foodi Smart XL FG551.
   - ESPACIO EN ENCIMERA Y ALACENA: las de contacto compactas (GRS040B, GRP4842P) se guardan en vertical y ocupan muy poco espacio; las 5-en-1 tipo Cuisinart GR-4NP1 ocupan ~34×29 cm cerradas y se abren a 180°; las abiertas/Smart XL (Ninja GR101, FG551) requieren más profundidad y altura libre bajo alacenas (18").
   - PORCIONES SIMULTÁNEAS: 2 porciones (GRS040B), 4–5 porciones (GRP4842P, Hamilton Beach 25361), 6–8 porciones (Cuisinart GR-4NP1 abierta 180°, Ninja Sizzle GR101, Ninja Foodi FG551).
   - FACILIDAD DE LIMPIEZA Y HUMO: diferencia siempre placas fijas (limpieza con papel húmedo) frente a placas desmontables aptas para lavavajillas (GRP4842P, Cuisinart GR-4NP1/GR-150P1, Hamilton Beach 25361, Ninja Sizzle GR101, Ninja FG551). Recuerda también avisar sobre el voltaje 110V–120V si se importa desde Amazon EE. UU. a países de 220V.
   - ACCESORIOS Y REPUESTOS COMPATIBLES: recomienda siempre usar pinzas con punta de silicona (como OXO Good Grips 9"/12") para no rayar el antiadherente, termómetro digital (ThermoPro TP19H / TempSpike) para punto exacto sin secar la carne, y placas de repuesto compatibles (Cuisinart GR-4NP1P / GR-WAFP, Ninja GR101/FG551, bandejas George Foreman).
   - Enlaza entre 1 y 3 guías de nuestro listado inferior usando Markdown exacto: [Título](${SITE}/categoria/slug/) e incluye sus slugs en "recommended_slugs".
2. AYUDAR ACTIVAMENTE A QUE COMPREN EN AMAZON (${storeName}):
   - Recomienda siempre 1 o 2 productos exactos de nuestro CATÁLOGO AMAZON OFICIAL (por ejemplo, la parrilla ideal + sus placas de repuesto o pinzas/termómetro compatible).
   - Incluye en tu texto un enlace Markdown directo al producto en ${storeName} usando su URL_${region} exacta y añade entre 1 y 2 IDs en "recommended_product_ids".${extraInstructions}

CATÁLOGO AMAZON OFICIAL (${storeName}):
${amazonCatalogPrompt}

ARTÍCULOS ENCONTRADOS EN PARRILLAENCASA.COM:
${candidatesPrompt}

Responde ÚNICAMENTE con un objeto JSON válido con estas 4 llaves exactas:
{
  "reply": "Tu respuesta experta y clara en español comparando precio, espacio, porciones, facilidad de limpieza y accesorios compatibles, con enlaces Markdown a nuestras guías y al producto en ${storeName}",
  "recommended_slugs": ["slug-1", "slug-2"],
  "recommended_product_ids": ["cuisinart-gr4np1-griddler", "oxo-silicone-tongs"],
  "suggested_options": ["Opción 1", "Opción 2", "Opción 3"]
}`;

    const chatMessages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (
        h &&
        (h.role === "user" || h.role === "assistant") &&
        typeof h.content === "string"
      ) {
        chatMessages.push({ role: h.role, content: h.content.slice(0, 1200) });
      }
    }
    chatMessages.push({ role: "user", content: userMessage });

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages: chatMessages,
          temperature: Number(config.temperature) || 0.35,
          max_tokens: 900,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!openaiRes.ok) {
      throw new Error("OpenAI status " + openaiRes.status);
    }

    const openaiData = await openaiRes.json();
    const rawContent = openaiData.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = {
        reply: rawContent,
        recommended_slugs: candidateRows.slice(0, 2).map((r) => r.slug),
        recommended_product_ids: ["cuisinart-gr4np1-griddler"],
        suggested_options: [
          "¿Qué parrilla hace menos humo en departamento?",
          "George Foreman vs Cuisinart vs Ninja",
          "Pinzas de silicona y placas de repuesto compatibles",
        ],
      };
    }

    const slugs: string[] = Array.isArray(parsed.recommended_slugs)
      ? parsed.recommended_slugs.slice(0, 3)
      : [];
    const recommendedArticles: ArticleCard[] = slugs
      .map((s) => catalog.bySlug.get(s))
      .filter((r): r is ArticleRow => Boolean(r))
      .map(toArticleCard);

    const productIds: string[] = Array.isArray(parsed.recommended_product_ids)
      ? parsed.recommended_product_ids.slice(0, 2)
      : ["cuisinart-gr4np1-griddler"];
    const recommendedProducts: AmazonProductCard[] = productIds
      .map((id) => AMAZON_PRODUCTS[id])
      .filter((p): p is AmazonProductCard => Boolean(p));

    const suggestedOptions: string[] = Array.isArray(parsed.suggested_options)
      ? parsed.suggested_options
          .slice(0, 3)
          .map((s: unknown) => String(s).slice(0, 72))
      : [];

    const replyText: string =
      parsed.reply ||
      `Te recomiendo revisar nuestra guía comparativa de [Mejores Parrillas Eléctricas de Interior Sin Humo en Amazon](${SITE}/parrillas-por-espacio-porciones-y-precio/mejores-parrillas-electricas-interior-sin-humo-departamento-amazon/).`;

    const promptTokens = openaiData.usage?.prompt_tokens || 0;
    const completionTokens = openaiData.usage?.completion_tokens || 0;
    const totalTokens =
      openaiData.usage?.total_tokens || promptTokens + completionTokens;
    const costUsd = calculateCostUsd(
      activeModel,
      promptTokens,
      completionTokens
    );

    if (sessionId && existingSession) {
      await supabase.from("parrillaencasa_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: replyText,
        recommended_articles: recommendedArticles,
        suggested_options: suggestedOptions,
        model: activeModel,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd: costUsd,
      });

      const prevRecs: string[] = Array.isArray(
        existingSession.recommended_articles
      )
        ? existingSession.recommended_articles
        : [];
      for (const ra of recommendedArticles) {
        if (!prevRecs.includes(ra.title)) prevRecs.push(ra.title);
      }
      for (const rp of recommendedProducts) {
        const label = `[Amazon] ${rp.title}`;
        if (!prevRecs.includes(label)) prevRecs.push(label);
      }

      await supabase
        .from("parrillaencasa_chat_sessions")
        .update({
          last_user_message: userMessage.slice(0, 250),
          messages_count: (existingSession.messages_count || 1) + 2,
          recommended_articles: prevRecs.slice(0, 30),
          prompt_tokens: (existingSession.prompt_tokens || 0) + promptTokens,
          completion_tokens:
            (existingSession.completion_tokens || 0) + completionTokens,
          total_tokens: (existingSession.total_tokens || 0) + totalTokens,
          estimated_cost_usd: Number(
            (Number(existingSession.estimated_cost_usd || 0) + costUsd).toFixed(
              6
            )
          ),
          model_used: activeModel,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }

    await supabase.from("token_usage").insert({
      source: "parrillaencasa.com",
      content_type: "ai_chat",
      model: activeModel,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      images_generated: 0,
      estimated_cost_usd: costUsd,
      slug: sessionId || visitorId,
    });

    return json({
      session_id: sessionId,
      reply: replyText,
      recommended_articles: recommendedArticles,
      recommended_products: recommendedProducts,
      suggested_options: suggestedOptions,
      model: activeModel,
    });
  } catch (err: any) {
    return json(
      {
        error: err.message || "Error interno",
        reply: `Puedes explorar nuestras más de 1,300 guías de parrillas George Foreman, Cuisinart, Hamilton Beach y Ninja en [ParrillaEnCasa.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Intentar de nuevo"],
      },
      500
    );
  }
});
