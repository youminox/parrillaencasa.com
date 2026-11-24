import { useId } from "react";

/** Logotipo de ParrillaEnCasa.com: Rejilla de Parrilla Eléctrica + Flama Térmica + Sello Sin Humo */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#09090B" />
          <stop offset="0.55" stopColor="#18181B" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
        <linearGradient id={`${id}ember`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDBA74" />
          <stop offset="0.55" stopColor="#F97316" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}bg)`} />
      <path
        d="M22 25 C22 18, 28 16, 26 11 C31 13, 33 18, 30 22 C33 20, 35 16, 34 13 C39 16, 42 21, 38 26"
        fill="none"
        stroke={`url(#${id}ember)`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="13" y="29" width="38" height="10" rx="4" fill={`url(#${id}ember)`} />
      <line x1="18" y1="29" x2="18" y2="39" stroke="#18181B" strokeWidth="2.2" />
      <line x1="25" y1="29" x2="25" y2="39" stroke="#18181B" strokeWidth="2.2" />
      <line x1="32" y1="29" x2="32" y2="39" stroke="#18181B" strokeWidth="2.2" />
      <line x1="39" y1="29" x2="39" y2="39" stroke="#18181B" strokeWidth="2.2" />
      <line x1="46" y1="29" x2="46" y2="39" stroke="#18181B" strokeWidth="2.2" />
      <rect x="16" y="42" width="32" height="5" rx="2" fill="#E2E8F0" />
      <rect x="20" y="50" width="24" height="4" rx="2" fill="#16A34A" />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
      <LogoMark />
      <span>
        ParrillaEn<span className={dark ? "text-fxlime" : "text-fxblue"}>Casa</span>
        <span
          className={`ml-1.5 hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:inline ${
            dark ? "text-white/60" : "text-[var(--muted)]"
          }`}
        >
          .com
        </span>
      </span>
    </span>
  );
}
