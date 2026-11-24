"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface SearchItem {
  t: string;
  p: string;
  n: string;
  r: number;
}

const QUICK_SUGGESTIONS = [
  "Ninja Sizzle GR101",
  "Cuisinart GR-4NP1",
  "George Foreman",
  "Hamilton Beach 25361",
  "Sin humo departamento",
  "Placas de repuesto",
  "Pinzas de silicona",
  "Termómetro carne",
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data: SearchItem[]) => {
        if (mounted && Array.isArray(data)) {
          setIndex(data);
          setIsLoaded(true);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const results =
    query.trim().length >= 2
      ? index
          .filter((item) => {
            const q = normalize(query.trim());
            const terms = q.split(/\s+/);
            const target = normalize(`${item.t} ${item.n} ${item.p}`);
            return terms.every((term) => target.includes(term));
          })
          .slice(0, 8)
      : [];

  return (
    <div ref={containerRef} className="relative max-w-xl text-left">
      <div className="relative flex items-center rounded-2xl bg-white p-1.5 shadow-2xl ring-2 ring-[#F97316]/55 focus-within:ring-[#EA580C]">
        <div className="pl-3 pr-2 text-[#EA580C]">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.4}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          type="search"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Busca entre 1,332 guías: 'Ninja GR101', 'Cuisinart', 'sin humo', 'placas'..."
          className="w-full bg-transparent py-2 px-2 text-sm sm:text-base font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
          aria-label="Buscar guías de parrillas eléctricas de interior, placas, pinzas y termómetros"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mr-1.5 rounded-lg p-1 text-xs font-bold text-zinc-400 hover:bg-stone-100 hover:text-zinc-700 cursor-pointer"
          >
            ✕
          </button>
        )}
        <span className="hidden sm:inline-flex shrink-0 items-center rounded-xl bg-[#18181b] px-3.5 py-2 text-xs font-extrabold text-orange-300">
          Buscar
        </span>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-white/60 font-semibold mr-1">Búsquedas top:</span>
        {QUICK_SUGGESTIONS.map((sug) => (
          <button
            key={sug}
            type="button"
            onClick={() => {
              setQuery(sug);
              setIsOpen(true);
            }}
            className="rounded-full bg-white/10 hover:bg-[#F97316] hover:text-zinc-950 px-2.5 py-0.5 text-[11px] font-bold text-white/85 transition cursor-pointer"
          >
            {sug}
          </button>
        ))}
      </div>

      {isOpen && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-[60px] z-50 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl">
          <div className="border-b border-stone-100 bg-stone-50 px-4 py-2 flex items-center justify-between text-xs text-zinc-500">
            <span className="font-bold">
              {results.length > 0
                ? `${results.length} guías encontradas para "${query}"`
                : isLoaded
                ? `Sin resultados directos para "${query}"`
                : "Cargando índice de 1,332 guías..."}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-zinc-700 font-bold cursor-pointer"
            >
              Cerrar
            </button>
          </div>
          {results.length > 0 && (
            <ul className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
              {results.map((item) => (
                <li key={item.p}>
                  <Link
                    href={item.p}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-orange-50/80 transition"
                  >
                    <div className="min-w-0">
                      <span className="inline-block rounded-md bg-orange-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-orange-950 mb-0.5">
                        {item.n}
                      </span>
                      <p className="text-sm font-bold text-zinc-900 line-clamp-1">
                        {item.t}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-[#c2410c] self-center">
                      {item.r} min →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
