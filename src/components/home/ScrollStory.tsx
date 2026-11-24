"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    t: "Mide el espacio de tu encimera, alacena y altura bajo gabinete (18\")",
    d: "Si tu cocina es angosta, prioriza una parrilla compacta de contacto con guardado vertical (George Foreman GRS040B o GRP4842P). Para modelos abiertos a 180° (Cuisinart GR-4NP1) o con tapa alta (Ninja Foodi FG551), verifica la profundidad libre y el vapor bajo gabinetes.",
  },
  {
    n: "02",
    t: "Elige por porciones reales y estilo: Contacto rápido vs Abierta sin humo a 500 °F",
    d: "Las de contacto sellan ambos lados a la vez en 5–7 minutos (ideales para 2 a 5 porciones y paninis). Las abiertas o Smart XL (Ninja Sizzle GR101, Hamilton Beach 25361) alcanzan 450–500 °F sin aplastar cortes gruesos y cubren 6 a 8 porciones.",
  },
  {
    n: "03",
    t: "Exige placas desmontables aptas para lavavajillas y control activo de humo",
    d: "Lavar placas fijas bajo el chorro arruina los cables. Las placas extraíbles (GRP4842P, Cuisinart GR-4NP1, Hamilton Beach 25361, Ninja GR101/FG551) más una bandeja fría o malla antisalpicaduras limpian en 60 segundos y evitan activar alarmas.",
  },
  {
    n: "04",
    t: "Completa con pinzas de silicona, termómetro digital y placas de repuesto compatibles",
    d: "Nunca uses metal sobre placas antiadherentes: combina pinzas con punta de silicona (600 °F), un termómetro instantáneo o inalámbrico para no secar pechugas ni cortes, y ten localizadas las placas o bandejas compatibles en Amazon EE. UU.",
  },
];

export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".step"), { opacity: 1 });
          gsap.set(q(".bar"), { scaleX: 1 });
          gsap.set(q(".phone-alert, .night, .sound-wave"), { opacity: 1 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2200",
            scrub: 0.7,
            pin: q(".pin")[0],
            anticipatePin: 1,
          },
        });
        tl.to(q(".step-0"), { opacity: 1, duration: 0.2 }, 0)
          .to(
            q(".step-0 .dot"),
            { backgroundColor: "#ea580c", color: "#fff", duration: 0.2 },
            0
          )
          .fromTo(
            q(".plate-slide"),
            { x: 24 },
            { x: 0, duration: 0.6 },
            0.1
          )
          .to(q(".step-0"), { opacity: 0.75, duration: 0.2 }, 1)
          .to(q(".step-1"), { opacity: 1, duration: 0.2 }, 1)
          .to(
            q(".step-1 .dot"),
            { backgroundColor: "#334155", color: "#fff", duration: 0.2 },
            1
          )
          .to(
            q(".temp-badge"),
            { scale: 1.06, svgOrigin: "200 130", duration: 0.5 },
            1.15
          )
          .to(q(".step-1"), { opacity: 0.75, duration: 0.2 }, 2)
          .to(q(".step-2"), { opacity: 1, duration: 0.2 }, 2)
          .to(
            q(".step-2 .dot"),
            { backgroundColor: "#16a34a", color: "#fff", duration: 0.2 },
            2
          )
          .fromTo(
            q(".drip-tray"),
            { y: 18 },
            { y: 0, duration: 0.7 },
            2.05
          )
          .to(q(".sound-wave"), { opacity: 1, scaleX: 1, duration: 0.5 }, 2.1)
          .to(q(".step-2"), { opacity: 0.75, duration: 0.2 }, 3.1)
          .to(q(".step-3"), { opacity: 1, duration: 0.2 }, 3.1)
          .to(
            q(".step-3 .dot"),
            { backgroundColor: "#18181b", color: "#fdba74", duration: 0.2 },
            3.1
          )
          .to(q(".night"), { opacity: 1, duration: 0.6 }, 3.1)
          .to(q(".phone-alert"), { opacity: 1, y: 0, duration: 0.5 }, 3.3)
          .to(q(".bar"), { scaleX: 1, duration: 3.8 }, 0);
      }, el);
    };

    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="ruta-parrilla"
      ref={root}
      className="relative bg-gradient-to-b from-white via-fxsky to-white"
    >
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-14">
        <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">Método Sin Errores en Departamento</span>
            <h2 className="section-title mt-3">
              Cuatro pasos.{" "}
              <span className="text-prune">
                De una cocina pequeña al sellado perfecto sin humo.
              </span>
            </h2>
            <div className="mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-fxblue via-drinklight to-drink" />
            </div>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`step step-${i} flex gap-4`}
                  style={{ opacity: 0.8 }}
                >
                  <span className="dot grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white font-display font-extrabold text-fxink shadow-md">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold sm:text-xl">
                      {s.t}
                    </p>
                    <p className="text-sm text-[var(--muted)] sm:text-base">
                      {s.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mx-auto w-full max-w-[270px] sm:max-w-[360px] lg:max-w-[420px]">
            <svg
              viewBox="0 0 400 440"
              className="relative w-full drop-shadow-[0_30px_50px_rgba(24,24,27,0.22)]"
              role="img"
              aria-label="Esquema interactivo de parrilla eléctrica sin humo, placa desmontable, bandeja de grasa y sonda termómetro"
            >
              <defs>
                <linearGradient id="ss-light" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#faf8f5" />
                  <stop offset="1" stopColor="#e7e5e4" />
                </linearGradient>
                <linearGradient id="ss-dark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#09090b" />
                  <stop offset="0.65" stopColor="#18181b" />
                  <stop offset="1" stopColor="#27272a" />
                </linearGradient>
                <clipPath id="ss-panel">
                  <rect x="0" y="0" width="400" height="440" rx="36" />
                </clipPath>
              </defs>
              <g clipPath="url(#ss-panel)">
                <rect width="400" height="440" fill="url(#ss-light)" />
                <rect
                  className="night"
                  width="400"
                  height="440"
                  fill="url(#ss-dark)"
                  opacity="0"
                />

                <g className="temp-badge">
                  <rect
                    x="34"
                    y="88"
                    width="332"
                    height="36"
                    rx="10"
                    fill="#18181b"
                    stroke="#f97316"
                    strokeWidth="2"
                  />
                  <text
                    x="200"
                    y="110"
                    textAnchor="middle"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="10.2"
                    fill="#fdba74"
                  >
                    SELLADO 450°F–500°F · CERO HUMO EN DEPA
                  </text>
                </g>

                {/* Tapa / Placa Superior */}
                <rect
                  x="78"
                  y="144"
                  width="224"
                  height="34"
                  rx="12"
                  fill="#334155"
                  stroke="#18181b"
                  strokeWidth="3"
                />
                <rect x="140" y="136" width="100" height="10" rx="4" fill="#ea580c" />

                {/* Placa Grill Desmontable */}
                <g className="plate-slide">
                  <rect
                    x="74"
                    y="194"
                    width="232"
                    height="24"
                    rx="6"
                    fill="#18181b"
                    stroke="#f97316"
                    strokeWidth="2.5"
                  />
                  <line x1="94" y1="194" x2="94" y2="218" stroke="#fdba74" strokeWidth="2.5" />
                  <line x1="124" y1="194" x2="124" y2="218" stroke="#fdba74" strokeWidth="2.5" />
                  <line x1="154" y1="194" x2="154" y2="218" stroke="#fdba74" strokeWidth="2.5" />
                  <line x1="184" y1="194" x2="184" y2="218" stroke="#fdba74" strokeWidth="2.5" />
                  <line x1="214" y1="194" x2="214" y2="218" stroke="#fdba74" strokeWidth="2.5" />
                  <line x1="244" y1="194" x2="244" y2="218" stroke="#fdba74" strokeWidth="2.5" />
                  <line x1="274" y1="194" x2="274" y2="218" stroke="#fdba74" strokeWidth="2.5" />
                  {/* Sonda / Termómetro lateral */}
                  <line x1="306" y1="206" x2="352" y2="206" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="356" cy="206" r="10" fill="#18181b" stroke="#16a34a" strokeWidth="2.5" />
                </g>

                {/* Base térmica */}
                <rect
                  x="68"
                  y="224"
                  width="244"
                  height="68"
                  rx="16"
                  fill="#18181b"
                  stroke="#334155"
                  strokeWidth="3"
                />
                <circle cx="272" cy="258" r="14" fill="#ea580c" />
                <text x="160" y="262" textAnchor="middle" fontSize="10" fontWeight="800" fill="#e7e5e4">
                  BASE COMPACTA 1200W–1800W
                </text>

                {/* Bandeja recolectora de grasa lavavajillas */}
                <g className="drip-tray">
                  <rect
                    x="70"
                    y="304"
                    width="240"
                    height="38"
                    rx="10"
                    fill="#18181b"
                    stroke="#16a34a"
                    strokeWidth="3"
                  />
                  <text
                    x="190"
                    y="327"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="800"
                    fill="#86efac"
                  >
                    BANDEJA FRÍA + LAVAVAJILLAS
                  </text>
                </g>

                <line
                  className="sound-wave"
                  x1="54"
                  y1="378"
                  x2="346"
                  y2="378"
                  stroke="#f97316"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  opacity="0.45"
                />

                <g
                  className="phone-alert"
                  opacity="0"
                  transform="translate(20 18)"
                >
                  <rect
                    width="360"
                    height="50"
                    rx="14"
                    fill="#ffffff"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                  />
                  <circle cx="24" cy="24" r="13" fill="#16a34a" />
                  <text
                    x="24"
                    y="28"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="800"
                    fill="#ffffff"
                  >
                    ✓
                  </text>
                  <text
                    x="46"
                    y="20"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="11.5"
                    fill="#18181b"
                  >
                    ¡Parrilla + Placas + Pinzas Compatibles!
                  </text>
                  <text
                    x="46"
                    y="35"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    fontSize="10"
                    fill="#c2410c"
                  >
                    Espacio Medido · Placas Lavavajillas · 0 Rayones
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
