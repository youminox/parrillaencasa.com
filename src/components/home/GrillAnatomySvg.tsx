/** Diagrama técnico SVG animado (equivalente a FiberGel.tsx de prunex1.com): ilustra cómo funciona una parrilla eléctrica sin humo en interiores (Placa 500 °F, Zona Fría de Drenaje, Malla Antisalpicaduras, Placa Desmontable y Termómetro/Pinzas Silicona). */
export default function GrillAnatomySvg() {
  const strands = Array.from({ length: 8 }).map((_, i) => {
    const a = (i / 8) * Math.PI * 2 + 0.25;
    const x1 = 200 + Math.cos(a) * 38;
    const y1 = 210 + Math.sin(a) * 38;
    const x2 = 200 + Math.cos(a) * 128;
    const y2 = 210 + Math.sin(a) * 128;
    const mx = 200 + Math.cos(a + 0.4) * 84;
    const my = 210 + Math.sin(a + 0.4) * 84;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });

  return (
    <div className="gel-scene relative mx-auto aspect-square w-full max-w-[460px]">
      <svg
        viewBox="0 0 400 420"
        className="h-full w-full"
        role="img"
        aria-label="Diagrama técnico de anatomía de una parrilla eléctrica sin humo para departamento: resistencia térmica, zona fría de grasa, placas desmontables y accesorios"
      >
        <defs>
          <radialGradient id="ga-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ea580c" stopOpacity="0.38" />
            <stop offset="0.6" stopColor="#334155" stopOpacity="0.18" />
            <stop offset="1" stopColor="#09090b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ga-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fed7aa" />
            <stop offset="0.5" stopColor="#ea580c" />
            <stop offset="1" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="210" r="188" fill="url(#ga-halo)" />
        <circle
          cx="200"
          cy="210"
          r="148"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeDasharray="4 7"
        />
        <circle
          cx="200"
          cy="210"
          r="102"
          fill="none"
          stroke="rgba(249,115,22,0.45)"
          strokeDasharray="6 5"
        />

        {strands.map((d, i) => (
          <path
            key={i}
            d={d}
            className="fiber-strand"
            fill="none"
            stroke={i % 2 === 0 ? "#f97316" : "#4ade80"}
            strokeOpacity="0.82"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}

        {/* Núcleo central: Placa Sear + Sin Humo */}
        <circle
          cx="200"
          cy="210"
          r="54"
          fill="#18181b"
          stroke="url(#ga-core)"
          strokeWidth="4"
        />
        <text
          x="200"
          y="204"
          textAnchor="middle"
          fontFamily="Outfit, sans-serif"
          fontWeight="800"
          fontSize="13"
          fill="#fed7aa"
        >
          SISTEMA
        </text>
        <text
          x="200"
          y="222"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="10.5"
          fill="#4ade80"
        >
          SIN HUMO 500°F
        </text>

        {/* Etiquetas técnicas */}
        <g fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="700">
          <g transform="translate(10 34)">
            <rect
              width="184"
              height="28"
              rx="14"
              fill="rgba(234,88,12,0.22)"
              stroke="rgba(251,146,60,0.65)"
            />
            <text x="92" y="18" textAnchor="middle" fill="#fed7aa">
              🔥 Placa Sellado 450°F–500°F
            </text>
          </g>
          <g transform="translate(204 48)">
            <rect
              width="186"
              height="28"
              rx="14"
              fill="rgba(22,163,74,0.22)"
              stroke="rgba(74,222,128,0.65)"
            />
            <text x="93" y="18" textAnchor="middle" fill="#bbf7d0">
              💧 Zona Fría: Grasa No Humea
            </text>
          </g>
          <g transform="translate(14 336)">
            <rect
              width="180"
              height="28"
              rx="14"
              fill="rgba(51,65,85,0.45)"
              stroke="rgba(148,163,184,0.65)"
            />
            <text x="90" y="18" textAnchor="middle" fill="#e2e8f0">
              🧼 Placas al Lavavajillas
            </text>
          </g>
          <g transform="translate(202 366)">
            <rect
              width="188"
              height="28"
              rx="14"
              fill="rgba(234,88,12,0.28)"
              stroke="rgba(253,186,116,0.65)"
            />
            <text x="94" y="18" textAnchor="middle" fill="#ffedd5">
              🌡️ Pinzas Silicona + Termómetro
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
