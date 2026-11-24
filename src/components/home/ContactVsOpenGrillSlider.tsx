"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function ContactVsOpenGrillSlider() {
  const [v, setV] = useState(26);
  const [touched, setTouched] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const t = v / 100;
  const mid = clamp(1 - Math.abs(t - 0.5) * 2.4);
  const heavy = clamp((t - 0.45) / 0.45);
  const fullHeavy = clamp((t - 0.55) / 0.4);

  const phase =
    t < 0.35
      ? "Tipo A · Parrilla Compacta de Contacto (2–5 Porciones · Cocción Doble Cara)"
      : t < 0.68
      ? "Transición · Comparando Espacio en Encimera vs Sellado a 500 °F"
      : "Tipo B · Parrilla Abierta / Smart XL Sin Humo (6–8 Porciones · 500 °F)";

  const grillReading =
    t < 0.45 ? "6 min · Guardado Vertical" : "500 °F · Placas Lavavajillas";

  const fromPointer = useCallback((clientX: number) => {
    const el = scene.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.round(clamp((clientX - r.left) / r.width) * 100));
    setTouched(true);
  }, []);

  return (
    <div className="daynight bg-[#09090b] shadow-[0_40px_80px_-40px_rgba(24,24,27,0.75)]">
      <div
        ref={scene}
        className="relative flex min-h-[430px] sm:min-h-[460px] flex-col justify-between gap-4 overflow-hidden p-4 sm:p-7 cursor-ew-resize select-none"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") {
            if (
              (e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)
            )
              fromPointer(e.clientX);
          }
        }}
      >
        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="cg-light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffedd5" />
              <stop offset="1" stopColor="#faf8f5" />
            </linearGradient>
            <linearGradient id="cg-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ea580c" />
              <stop offset="0.55" stopColor="#c2410c" />
              <stop offset="1" stopColor="#fed7aa" />
            </linearGradient>
            <linearGradient id="cg-heavy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#09090b" />
              <stop offset="0.7" stopColor="#18181b" />
              <stop offset="1" stopColor="#27272a" />
            </linearGradient>
          </defs>
          <rect width="800" height="450" fill="url(#cg-light)" />
          <rect width="800" height="450" fill="url(#cg-mid)" opacity={mid} />
          <rect
            width="800"
            height="450"
            fill="url(#cg-heavy)"
            opacity={heavy}
          />
          <rect
            x="0"
            y="365"
            width="800"
            height="85"
            fill={heavy > 0.5 ? "#09090b" : "#e7e5e4"}
          />
        </svg>

        <div className="pointer-events-none relative z-10 max-w-full self-start rounded-2xl border border-white/30 bg-zinc-950/70 px-4 py-2 text-white backdrop-blur-md">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white/80 break-words">
            {phase}
          </p>
          <p className="font-display text-lg sm:text-2xl font-extrabold tabular-nums text-orange-300">
            {grillReading}
          </p>
        </div>

        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[580px]">
          {heavy < 0.5 ? (
            <div className="overflow-hidden rounded-3xl border-[3px] border-[#ea580c] bg-white px-5 py-5 sm:px-7 sm:py-6 shadow-2xl">
              <span className="inline-block rounded-full bg-orange-100 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-[#c2410c]">
                Formato Contacto · Guardado Vertical
              </span>
              <h3 className="mt-2 font-display text-base sm:text-xl font-extrabold leading-snug text-[#c2410c] break-words">
                🥪 George Foreman GRP4842P / Cuisinart GR-4NP1 (Cerrada)
              </h3>
              <ul className="mt-3.5 space-y-2 text-xs sm:text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-extrabold text-[#ea580c]">
                    ✓
                  </span>
                  <span className="font-bold text-zinc-900">
                    Cocina pechugas y hamburguesas por ambos lados en 5–6 min
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-extrabold text-zinc-600">
                    ✓
                  </span>
                  <span className="font-semibold text-zinc-600">
                    Ocupa poco espacio (22–34 cm) y se guarda parada en alacena
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-extrabold text-[#16a34a]">
                    ✓
                  </span>
                  <span className="font-bold text-[#16a34a]">
                    Precio desde US$25–$85 · Placas desmontables al lavavajillas
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <div
              style={{ opacity: Math.max(0.25, fullHeavy) }}
              className="overflow-hidden rounded-3xl border-[3px] border-[#f97316] bg-[#18181b] px-5 py-5 sm:px-7 sm:py-6 text-white shadow-2xl"
            >
              <span className="inline-block rounded-full bg-orange-500/20 border border-orange-400/40 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-orange-300">
                Formato Abierto / Smart XL · 500 °F Sin Humo
              </span>
              <h3 className="mt-2 font-display text-base sm:text-xl font-extrabold leading-snug text-[#fdba74] break-words">
                🔥 Ninja Sizzle GR101 / Foodi Smart XL FG551 / Cuisinart 180°
              </h3>
              <ul className="mt-3.5 space-y-2 text-xs sm:text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-extrabold text-orange-400">
                    ✓
                  </span>
                  <span className="font-bold text-white">
                    Sellado steakhouse real a 500 °F sin aplastar cortes gruesos
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-extrabold text-zinc-300">
                    ✓
                  </span>
                  <span className="font-semibold text-zinc-300">
                    6 a 8 porciones simultáneas en 140–240 sq in (hogar / visitas)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-extrabold text-[#4ade80]">
                    ✓
                  </span>
                  <span className="font-bold text-[#4ade80]">
                    Malla antisalpicaduras / aire ciclónico sin humo + Sonda termómetro
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[620px] flex-col items-center gap-2">
          <div className="w-full rounded-xl border-2 border-[#f97316] bg-[#09090b]/95 px-4 py-2 text-center font-display text-xs sm:text-sm font-bold leading-snug text-[#ffedd5]">
            {heavy > 0.5
              ? "Ideal para ribeye de 3 cm, salmón, pollo para toda la semana o reuniones en casa"
              : "Ideal para departamentos chicos, cenas rápidas de 1 a 4 personas y paninis crujientes"}
          </div>
          {!touched && (
            <div className="max-w-full animate-pulse rounded-full bg-white/95 px-3.5 py-1.5 text-center text-[11px] sm:text-xs font-semibold leading-snug text-fxink shadow-lg">
              ← Arrastra para comparar: Contacto Compacta vs Abierta / XL 500 °F →
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2.5 sm:gap-4 bg-[#09090b] px-4 py-3.5 text-white sm:px-7 sm:py-4">
        <span className="text-xs font-bold shrink-0 text-orange-200">
          🥪 Compacta<span className="hidden sm:inline"> (2–5 Porc.)</span>
        </span>
        <label className="sr-only" htmlFor="grill-range">
          Comparador entre parrilla de contacto y abierta sin humo
        </label>
        <input
          id="grill-range"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => {
            setV(Number(e.target.value));
            setTouched(true);
          }}
          aria-valuetext={`${phase}, ${grillReading}`}
        />
        <span className="text-xs font-bold shrink-0 text-fxlime">
          🔥 Abierta XL<span className="hidden sm:inline"> (6–8 Porc.)</span>
        </span>
      </div>
    </div>
  );
}
