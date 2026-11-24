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
        className="relative aspect-[4/5] cursor-ew-resize select-none sm:aspect-[16/9]"
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
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
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

          {heavy < 0.5 ? (
            <g>
              <rect
                x="195"
                y="145"
                width="410"
                height="195"
                rx="18"
                fill="#ffffff"
                stroke="#ea580c"
                strokeWidth="4"
              />
              <text
                x="400"
                y="196"
                textAnchor="middle"
                fontFamily="Outfit, sans-serif"
                fontWeight="800"
                fontSize="16.5"
                fill="#c2410c"
              >
                🥪 George Foreman GRP4842P / Cuisinart GR-4NP1 (Cerrada)
              </text>
              <text
                x="400"
                y="230"
                textAnchor="middle"
                fontSize="13.5"
                fontWeight="700"
                fill="#18181b"
              >
                ✓ Cocina pechugas y hamburguesas por ambos lados en 5–6 min
              </text>
              <text
                x="400"
                y="258"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="#52525b"
              >
                ✓ Ocupa poco espacio (22–34 cm) y se guarda parada en alacena
              </text>
              <text
                x="400"
                y="286"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#16a34a"
              >
                ✓ Precio desde US$25–$85 · Placas desmontables al lavavajillas
              </text>
            </g>
          ) : (
            <g opacity={fullHeavy}>
              <rect
                x="185"
                y="140"
                width="430"
                height="205"
                rx="18"
                fill="#18181b"
                stroke="#f97316"
                strokeWidth="4"
              />
              <text
                x="400"
                y="194"
                textAnchor="middle"
                fontFamily="Outfit, sans-serif"
                fontWeight="800"
                fontSize="16.5"
                fill="#fdba74"
              >
                🔥 Ninja Sizzle GR101 / Foodi Smart XL FG551 / Cuisinart 180°
              </text>
              <text
                x="400"
                y="228"
                textAnchor="middle"
                fontSize="13.5"
                fontWeight="700"
                fill="#ffffff"
              >
                ✓ Sellado steakhouse real a 500 °F sin aplastar cortes gruesos
              </text>
              <text
                x="400"
                y="256"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="#d4d4d8"
              >
                ✓ 6 a 8 porciones simultáneas en 140–240 sq in (hogar / visitas)
              </text>
              <text
                x="400"
                y="284"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#4ade80"
              >
                ✓ Malla antisalpicaduras / aire ciclónico sin humo + Sonda termómetro
              </text>
            </g>
          )}

          <rect
            x="110"
            y="354"
            width="580"
            height="34"
            rx="10"
            fill="#09090b"
            stroke="#f97316"
            strokeWidth="2"
          />
          <text
            x="400"
            y="375"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="12"
            fill="#ffedd5"
          >
            {heavy > 0.5
              ? "Ideal para ribeye de 3 cm, salmón, pollo para toda la semana o reuniones en casa"
              : "Ideal para departamentos chicos, cenas rápidas de 1 a 4 personas y paninis crujientes"}
          </text>
        </svg>

        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/30 bg-zinc-950/65 px-4 py-2 text-white backdrop-blur-md sm:left-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/75">
            {phase}
          </p>
          <p className="font-display text-xl sm:text-2xl font-extrabold tabular-nums text-orange-300">
            {grillReading}
          </p>
        </div>
        {!touched && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-fxink shadow-lg sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm">
            ← Arrastra: Contacto Compacta (2–5 Porc.) vs Abierta / XL (6–8 Porc. 500 °F) →
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-[#09090b] px-5 py-4 text-white sm:px-7">
        <span className="text-xs font-bold whitespace-nowrap text-orange-200">
          🥪 Compacta (2–5 Porc.)
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
        <span className="text-xs font-bold whitespace-nowrap text-fxlime">
          🔥 Abierta / XL (6–8 Porc.)
        </span>
      </div>
    </div>
  );
}
