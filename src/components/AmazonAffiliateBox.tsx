"use client";

import { useEffect, useState } from "react";
import {
  AmazonProductRecommendation,
  AmazonStoreRegion,
  AMAZON_TAG_ES,
  AMAZON_TAG_US,
  buildAmazonUrl,
  detectUserAmazonRegion,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";

interface AmazonAffiliateBoxProps {
  variant: "verdict" | "vs" | "inline" | "showcase" | "sidebar";
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
  source?: string;
}

function CategoryIcon({
  type,
}: {
  type: AmazonProductRecommendation["categoryType"];
}) {
  if (type === "contact-grill") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-900 border border-orange-300/70 text-2xl">
        🥪
      </div>
    );
  }
  if (type === "griddler-180") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-900 border border-amber-300/70 text-2xl">
        🥩
      </div>
    );
  }
  if (type === "smokeless-open") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-900 border border-emerald-300/70 text-2xl">
        💨
      </div>
    );
  }
  if (type === "smart-xl") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-orange-400 border border-zinc-700 text-2xl">
        🔥
      </div>
    );
  }
  if (type === "replacement-plate") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-amber-300 border border-slate-700 text-2xl">
        🧩
      </div>
    );
  }
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#18181b] text-[#fdba74] border border-[#ea580c]/50 shadow-2xs text-2xl">
      🌡️
    </div>
  );
}

export default function AmazonAffiliateBox({
  variant,
  sectionTitle,
  sectionSubtitle,
  products,
  vsCompetitor,
  source = "article",
}: AmazonAffiliateBoxProps) {
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const changeRegion = (next: AmazonStoreRegion) => {
    setRegion(next);
    try {
      window.localStorage.setItem("pec_amazon_region", next);
    } catch {
      // ignore
    }
  };

  const primaryProduct = products[0];
  const storeName =
    region === "US" ? "Amazon.com (EE. UU.)" : "Amazon.es (España)";
  const shortStore = region === "US" ? "Amazon.com" : "Amazon.es";
  const activeTag = region === "US" ? AMAZON_TAG_US : AMAZON_TAG_ES;

  const onAmazonClick = (prod: AmazonProductRecommendation, pos: string) => {
    const url = buildAmazonUrl(prod, region);
    trackClick(`${source}-${variant}-${pos}`, {
      article_slug: prod.id,
      article_title: prod.title,
      category: "amazon",
      target_url: url,
    });
  };

  const RegionSwitch = () => (
    <div className="inline-flex items-center gap-1 rounded-full bg-white border border-[var(--line)] px-2.5 py-1 text-[11px] font-bold text-zinc-600">
      <span>Tienda:</span>
      <button
        type="button"
        onClick={() => changeRegion("US")}
        className={`px-2 py-0.5 rounded-full transition cursor-pointer ${
          region === "US"
            ? "bg-[#ea580c] text-white font-extrabold"
            : "hover:text-zinc-900"
        }`}
      >
        🇺🇸 Amazon.com
      </button>
      <button
        type="button"
        onClick={() => changeRegion("ES")}
        className={`px-2 py-0.5 rounded-full transition cursor-pointer ${
          region === "ES"
            ? "bg-[#ea580c] text-white font-extrabold"
            : "hover:text-zinc-900"
        }`}
      >
        🇪🇸 Amazon.es
      </button>
    </div>
  );

  // 1. VERDICT VARIANT
  if (variant === "verdict") {
    const url = buildAmazonUrl(primaryProduct, region);
    return (
      <section
        aria-label="Recomendación destacada de parrilla eléctrica en Amazon"
        className="my-8 rounded-3xl border-2 border-[#ea580c]/45 bg-gradient-to-br from-[#faf8f5] via-white to-[#ffedd5]/75 p-5 sm:p-7 shadow-[0_20px_50px_-28px_rgba(234,88,12,0.32)]"
      >
          <RegionSwitch />
        </div>

        <div className="mt-5 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-start gap-3.5">
              <CategoryIcon type={primaryProduct.categoryType} />
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-zinc-900 leading-snug">
                  {primaryProduct.title}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-700 leading-relaxed">
                  {primaryProduct.subtitle}
                </p>
              </div>
            </div>

            {primaryProduct.specs && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 rounded-2xl bg-white/95 border border-[var(--line)] p-3.5 text-xs">
                <div>
                  <span className="font-extrabold text-[#c2410c] uppercase block">
                    🛒 Disponibilidad en Amazon
                  </span>
                  <span className="text-zinc-800 font-semibold">
                    {primaryProduct.specs.priceRange}
                  </span>
                </div>
                <div>
                  <span className="font-extrabold text-[#334155] uppercase block">
                    📐 Espacio que Ocupa
                  </span>
                  <span className="text-zinc-800 font-semibold">
                    {primaryProduct.specs.footprintSpace}
                  </span>
                </div>
                <div>
                  <span className="font-extrabold text-[#ea580c] uppercase block">
                    🥩 Porciones Simultáneas
                  </span>
                  <span className="text-zinc-800 font-semibold">
                    {primaryProduct.specs.servingsCapacity}
                  </span>
                </div>
                <div>
                  <span className="font-extrabold text-[#16a34a] uppercase block">
                    🧼 Facilidad de Limpieza
                  </span>
                  <span className="text-zinc-800 font-semibold">
                    {primaryProduct.specs.cleaningEase}
                  </span>
                </div>
              </div>
            )}

            <ul className="mt-4 space-y-1.5 text-xs sm:text-sm text-zinc-700">
              {primaryProduct.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-0.5 font-extrabold text-emerald-700">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-stretch md:w-64 gap-2.5 rounded-2xl bg-[#18181b] p-4 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-300 text-center">
              Oferta Verificada · {storeName}
            </span>
            <a
              href={url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() => onAmazonClick(primaryProduct, "verdict-cta")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fdba74] via-[#fb923c] to-[#ea580c] px-4 py-3.5 text-center font-display text-sm font-extrabold text-zinc-950 shadow-lg hover:brightness-105 transition"
            >
              <span>{primaryProduct.ctaLabel}</span>
              <span aria-hidden>→</span>
            </a>
            <p className="text-[11px] text-center text-white/70 leading-snug">
              Consulta precio actualizado y compatibilidad en {shortStore} (ID:{" "}
              {activeTag})
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 2. VS VARIANT (Side-by-side comparison)
  if (variant === "vs") {
    const rival = vsCompetitor || products[1];
    const contenders = [primaryProduct, rival];
    return (
      <section
        aria-label="Comparativa directa de parrillas eléctricas en Amazon"
        className="my-8 rounded-3xl border-2 border-zinc-900/15 bg-gradient-to-b from-[#09090b] to-[#18181b] p-5 sm:p-7 text-white shadow-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400">
              ⚖️ Duelo Directo Cara a Cara en Amazon
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold mt-0.5">
              {sectionTitle}
            </h3>
          </div>
          <RegionSwitch />
        </div>

                  <h4 className="mt-2.5 font-display text-lg font-extrabold leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed">
                    {item.subtitle}
                  </p>
                  {item.specs && (
                    <div className="mt-3 space-y-1 rounded-xl bg-[#faf8f5] p-3 text-xs border border-stone-200">
                      <p>
                        <strong>🛒 Disponibilidad:</strong> {item.specs.priceRange}
                      </p>
                      <p>
                        <strong>📐 Espacio:</strong> {item.specs.footprintSpace}
                      </p>
                      <p>
                        <strong>🥩 Porciones:</strong>{" "}
                        {item.specs.servingsCapacity}
                      </p>
                      <p>
                        <strong>🧼 Limpieza:</strong> {item.specs.cleaningEase}
                      </p>
                    </div>
                  )}
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  onClick={() => onAmazonClick(item, `vs-${idx + 1}`)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f97316] to-[#c2410c] px-4 py-3 font-display text-xs sm:text-sm font-extrabold text-white shadow hover:brightness-110 transition"
                >
                  <span>Ver precio hoy en {shortStore}</span>
                  <span aria-hidden>→</span>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // 3. INLINE VARIANT (Mid-article high CTR card on 100% of pages)
  if (variant === "inline") {
    const url = buildAmazonUrl(primaryProduct, region);
    return (
      <aside
        aria-label="Producto recomendado en Amazon relacionado con esta guía"
        className="my-8 rounded-3xl border border-orange-300/80 bg-gradient-to-r from-[#fff7ed] via-white to-[#faf8f5] p-5 sm:p-6 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#18181b] px-3 py-0.5 text-[11px] font-extrabold text-orange-300">
            {primaryProduct.badge}
          </span>
          <RegionSwitch />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <CategoryIcon type={primaryProduct.categoryType} />
            <div>
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-zinc-900 leading-snug">
                {primaryProduct.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-600">
                {primaryProduct.subtitle}
              </p>
              {primaryProduct.specs && (
                <p className="mt-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200/80 rounded-lg px-2.5 py-1.5">
                  🥩 <strong>Capacidad:</strong>{" "}
                  {primaryProduct.specs.servingsCapacity} · 🧼{" "}
                  {primaryProduct.specs.cleaningEase}
                </p>
              )}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // 4. SIDEBAR VARIANT (Desktop sticky widget)
  if (variant === "sidebar") {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-1 pb-2.5 border-b border-[var(--line)]">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#c2410c]">
            🔥 Top Amazon EE. UU.
          </span>
          <div className="inline-flex gap-1 text-[10px] font-bold">
            <button
              type="button"
              onClick={() => changeRegion("US")}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                region === "US"
                  ? "bg-orange-500 text-white"
                  : "bg-stone-100 text-zinc-600"
              }`}
            >
              🇺🇸 US
            </button>
            <button
              type="button"
              onClick={() => changeRegion("ES")}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                region === "ES"
                  ? "bg-orange-500 text-white"
                  : "bg-stone-100 text-zinc-600"
              }`}
            >
              🇪🇸 ES
            </button>
          </div>
        </div>
        <div className="mt-3 space-y-3">
          {products.slice(0, 2).map((item, i) => {
            const url = buildAmazonUrl(item, region);
            return (
              <div
                key={item.id + i}
                className="rounded-xl bg-[#faf8f5] p-3 border border-stone-200/90"
              >
                <span className="block text-[10px] font-extrabold text-emerald-800">
                  {i === 0 ? "1. Parrilla Recomendada" : "2. Placa / Accesorio"}
                </span>
                <p className="mt-0.5 font-display text-xs font-extrabold text-zinc-900 line-clamp-2">
                  {item.title}
                </p>
                {item.specs && (
                  <p className="mt-1 text-[11px] text-zinc-600">
                    {item.specs.priceRange}
                  </p>
                )}
                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  onClick={() => onAmazonClick(item, `sidebar-${i + 1}`)}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#18181b] px-3 py-2 text-[11px] font-extrabold text-orange-300 hover:bg-zinc-800 transition"
                >
                  Ver precio en {shortStore} →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 5. SHOWCASE VARIANT (3-card cross-sell showcase: Grill + Compatible Replacement Plate + Silicone Tongs/Thermometer)
  return (
    <section
      aria-label="Vitrina de parrillas eléctricas, placas de repuesto, pinzas y termómetros en Amazon"
      className="my-12 rounded-3xl bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#27272a] p-6 sm:p-8 text-white shadow-2xl"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-orange-500/20 border border-orange-400/35 px-3 py-1 text-xs font-extrabold text-orange-300">
            🔥 Selección Completa en {storeName}
          </span>
          <h2 className="mt-2.5 font-display text-2xl sm:text-3xl font-extrabold text-white">
            {sectionTitle}
          </h2>
          <p className="mt-1.5 text-sm text-zinc-300">{sectionSubtitle}</p>
        </div>
        <RegionSwitch />
      </div>

                <h3 className="mt-3 font-display text-lg font-extrabold leading-snug text-zinc-900">
                  {prod.title}
                </h3>
                <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed">
                  {prod.subtitle}
                </p>

                {prod.specs && (
                  <div className="mt-3 rounded-xl bg-[#faf8f5] border border-stone-200 p-2.5 text-[11px] space-y-1">
                    <p>
                      <strong className="text-orange-800">Disponibilidad:</strong>{" "}
                      {prod.specs.priceRange}
                    </p>
                    <p>
                      <strong className="text-slate-800">Espacio:</strong>{" "}
                      {prod.specs.footprintSpace}
                    </p>
                    <p>
                      <strong className="text-emerald-800">Porciones:</strong>{" "}
                      {prod.specs.servingsCapacity}
                    </p>
                    <p>
                      <strong className="text-zinc-900">Limpieza:</strong>{" "}
                      {prod.specs.cleaningEase}
                    </p>
                  </div>
                )}

                <ul className="mt-3 space-y-1.5 text-xs text-zinc-700">
                  {prod.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-1.5">
                      <span className="font-extrabold text-emerald-600">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                onClick={() => onAmazonClick(prod, `showcase-${idx + 1}`)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fdba74] via-[#fb923c] to-[#ea580c] px-4 py-3 font-display text-xs sm:text-sm font-extrabold text-zinc-950 shadow hover:brightness-105 transition"
              >
                <span>Ver precio y stock en {shortStore}</span>
                <span aria-hidden>→</span>
              </a>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-[11px] text-zinc-400 text-center">
        En calidad de Afiliado de Amazon ({AMAZON_TAG_US} en Amazon.com y{" "}
        {AMAZON_TAG_ES} en Amazon.es), ParrillaEnCasa.com obtiene ingresos por
        las compras adscritas que cumplen los requisitos aplicables sin ningún
        costo adicional para ti.
      </p>
    </section>
  );
}
