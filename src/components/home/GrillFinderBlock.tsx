"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CATALOG,
  buildAmazonUrl,
  detectUserAmazonRegion,
  type AmazonStoreRegion,
  type AmazonProductRecommendation,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";
import OpenChatButton from "@/components/OpenChatButton";

export type GrillFinderOption = {
  key: string;
  priceFilter: "< US$55" | "US$55–US$120" | "US$120–US$230+";
  spaceFilter: "Ultracompacto" | "Mediano" | "Familiar XL";
  portionsFilter: "1–2" | "3–5" | "6–8+";
  label: string;
  priceSpec: string;
  spaceSpec: string;
  portionsSpec: string;
  cleaningSpec: string;
  img: string;
  alt: string;
  idealFor: string;
  reviewHref: string;
  grillKey: keyof typeof CATALOG;
  plateKey: keyof typeof CATALOG;
  accessoryKey: keyof typeof CATALOG;
};

const PRICE_TABS: GrillFinderOption["priceFilter"][] = [
  "< US$55",
  "US$55–US$120",
  "US$120–US$230+",
];
const SPACE_TABS: GrillFinderOption["spaceFilter"][] = [
  "Ultracompacto",
  "Mediano",
  "Familiar XL",
];
const PORTION_TABS: GrillFinderOption["portionsFilter"][] = [
  "1–2",
  "3–5",
  "6–8+",
];

export default function GrillFinderBlock({
  options,
}: {
  options: GrillFinderOption[];
}) {
  const [price, setPrice] =
    useState<GrillFinderOption["priceFilter"]>("US$55–US$120");
  const [space, setSpace] =
    useState<GrillFinderOption["spaceFilter"]>("Mediano");
  const [portions, setPortions] =
    useState<GrillFinderOption["portionsFilter"]>("3–5");
  const [sqInches, setSqInches] = useState(118);
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  // Encuentra la opción con mayor coincidencia entre Precio + Espacio + Porciones
  const scored = options.map((o) => {
    let score = 0;
    if (o.priceFilter === price) score += 3;
    if (o.spaceFilter === space) score += 2;
    if (o.portionsFilter === portions) score += 2;
    return { o, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const p = scored[0]?.o || options[0];

  const grillProd: AmazonProductRecommendation =
    CATALOG[p.grillKey] || CATALOG.CUISINART_GR4NP1;
  const plateProd: AmazonProductRecommendation =
    CATALOG[p.plateKey] || CATALOG.PLATES_CUISINART_GR4N;
  const accProd: AmazonProductRecommendation =
    CATALOG[p.accessoryKey] || CATALOG.OXO_SILICONE_TONGS;

  const grillUrl = buildAmazonUrl(grillProd, region);
  const plateUrl = buildAmazonUrl(plateProd, region);
  const accUrl = buildAmazonUrl(accProd, region);
  const storeName = region === "US" ? "Amazon.com" : "Amazon.es";

  const burgersPerBatch = Math.max(1, Math.floor(sqInches / 18));
  const chickenBreasts = Math.max(1, Math.floor(sqInches / 21));
  const approxWatts = sqInches <= 60 ? 800 : sqInches <= 125 ? 1400 : 1760;

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1.08fr_1fr]">
      <div className="card card-static spot relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fxblue/10 blur-3xl" />
        <div className="relative space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-fxbluedeep mb-1.5">
                1. Precio en Amazon
              </p>
              <div className="flex flex-wrap gap-1">
                {PRICE_TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPrice(t)}
                    className={`rounded-full px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                      price === t
                        ? "bg-fxink text-orange-300 shadow"
                        : "bg-fxsky text-[var(--muted)] hover:text-fxink"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-fxbluedeep mb-1.5">
                2. Espacio en Cocina
              </p>
              <div className="flex flex-wrap gap-1">
                {SPACE_TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSpace(t)}
                    className={`rounded-full px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                      space === t
                        ? "bg-fxink text-orange-300 shadow"
                        : "bg-fxsky text-[var(--muted)] hover:text-fxink"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-fxbluedeep mb-1.5">
                3. Porciones a la Vez
              </p>
              <div className="flex flex-wrap gap-1">
                {PORTION_TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPortions(t)}
                    className={`rounded-full px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                      portions === t
                        ? "bg-fxink text-orange-300 shadow"
                        : "bg-fxsky text-[var(--muted)] hover:text-fxink"
                    }`}
                  >
                    {t} porc.
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid items-center gap-5 sm:grid-cols-[1fr_1.25fr] pt-3 border-t border-[var(--line)]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-sm">
              <Image
                key={p.img}
                src={p.img}
                alt={p.alt}
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-extrabold text-orange-950">
                {grillProd.badge}
              </span>
              <p className="mt-1.5 font-display text-lg sm:text-xl font-extrabold tracking-tight text-fxink leading-snug">
                {grillProd.title.split("(")[0].trim()}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                <strong className="text-fxink">Ideal para ti:</strong>{" "}
                {p.idealFor}
              </p>
              <div className="mt-2.5 rounded-xl bg-fxsky p-2.5 text-xs space-y-1">
                <p className="font-bold text-fxbluedeep">
                  💵 Precio: {p.priceSpec} · 📐 Espacio: {p.spaceSpec}
                </p>
                <p className="font-semibold text-fxink">
                  🥩 Porciones: {p.portionsSpec}
                </p>
                <p className="font-semibold text-emerald-800">
                  🧼 Limpieza: {p.cleaningSpec}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <a
              href={grillUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`finder-grill-${p.key}`, {
                  article_slug: grillProd.id,
                  article_title: grillProd.title,
                  category: "amazon",
                  target_url: grillUrl,
                })
              }
              className="btn btn-buy shine flex-1 text-xs sm:text-sm"
              data-magnetic
            >
              🔥 Ver Parrilla en {storeName} ↗
            </a>
            <Link href={p.reviewHref} className="btn btn-ghost text-xs sm:text-sm">
              Leer reseña →
            </Link>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 pt-2">
            <a
              href={plateUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`finder-plate-${p.key}`, {
                  article_slug: plateProd.id,
                  article_title: plateProd.title,
                  category: "amazon",
                  target_url: plateUrl,
                })
              }
              className="flex items-center justify-between gap-2 rounded-xl border border-stone-200 bg-[#faf8f5] px-3 py-2 text-xs font-bold text-zinc-900 hover:border-orange-500 transition"
            >
              <span className="truncate">🧩 Placa/Repuesto Compatible</span>
              <span className="text-fxbluedeep shrink-0">Amazon ↗</span>
            </a>
            <a
              href={accUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`finder-acc-${p.key}`, {
                  article_slug: accProd.id,
                  article_title: accProd.title,
                  category: "amazon",
                  target_url: accUrl,
                })
              }
              className="flex items-center justify-between gap-2 rounded-xl border border-stone-200 bg-[#faf8f5] px-3 py-2 text-xs font-bold text-zinc-900 hover:border-orange-500 transition"
            >
              <span className="truncate">🌡️ Pinzas / Termómetro Ideal</span>
              <span className="text-fxbluedeep shrink-0">Amazon ↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#27272a] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fxlime/15 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-fxlime">
          Calculadora de Superficie Útil (sq in) y Porciones Reales
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          ¿Cuántas carnes caben de verdad a la vez?
        </h3>
        <p className="mt-2 text-sm text-white/75">
          Desliza el área útil de cocción en pulgadas cuadradas (
          <code>sq in</code>) para calcular cuántas hamburguesas o pechugas se
          asan sin amontonarse y el consumo eléctrico aproximado.
        </p>
        <label
          htmlFor="sqin-slider"
          className="mt-6 flex items-center justify-between text-sm font-semibold"
        >
          <span>Área de la placa o rejilla</span>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-display text-lg text-fxlime">
            {sqInches} sq in
          </span>
        </label>
        <input
          id="sqin-slider"
          type="range"
          min={36}
          max={240}
          step={12}
          value={sqInches}
          onChange={(e) => setSqInches(Number(e.target.value))}
          className="mt-3 w-full accent-[#F97316]"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-white/50">
          <span>36 sq in (2 porc.)</span>
          <span>72 sq in (Compacta)</span>
          <span>140 sq in (Ninja Sizzle)</span>
          <span>240 sq in (180° XL)</span>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            ["Hamburguesas / Tanda", `${burgersPerBatch} unid.`],
            ["Pechugas de Pollo", `${chickenBreasts} filetes`],
            ["Consumo (110V–120V)", `~${approxWatts} W`],
          ].map(([l, val], i) => (
            <div
              key={l}
              className={`glass flex flex-col-reverse p-3 ${
                i === 0 ? "border-fxlime/50 bg-fxlime/10" : ""
              }`}
            >
              <dt className="mt-1 text-[0.7rem] leading-tight text-white/65">
                {l}
              </dt>
              <dd
                className={`font-display font-extrabold ${
                  i === 0
                    ? "text-sm text-fxlime sm:text-base"
                    : "text-xs sm:text-base"
                }`}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-white/65">
          <span>
            Consejo: deja <strong>1.5 cm</strong> libres entre cortes para que
            la humedad escape sin hervir la carne ni generar humo extra.
          </span>
          <OpenChatButton
            label="Confirmar medidas para mi cocina en el Chat IA"
            prompt={`Busco una parrilla eléctrica de unos ${sqInches} sq in (${burgersPerBatch} porciones), presupuesto ${price} y espacio ${space}. ¿Cuál modelo de George Foreman, Cuisinart, Hamilton Beach o Ninja me recomiendas en Amazon?`}
            className="text-fxlime font-bold hover:underline !bg-transparent !p-0"
          />
        </div>
      </div>
    </div>
  );
}
