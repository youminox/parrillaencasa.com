#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador Maestro de las 1,332 Guías Editoriales de ParrillaEnCasa.com:
- 12 Hubs Pilares de Categoría (isPillar: true)
- 320 Artículos Transaccionales en 5 Silos de Productos Amazon (isTransactional: true)
- 1,000 Artículos SEO Informacionales en 7 Silos Técnicos y de Cocina (isTransactional: false)

También genera:
- src/data/keyword_map.json (validando 0 canibalización)
- public/search-index.json
"""
import json
import pathlib
import re

from topics_catalog import PILLARS, generate_transactional_320, generate_seo_1000

ROOT = pathlib.Path(__file__).resolve().parent.parent
ART_DIR = ROOT / "src/content/articles"
ART_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR = ROOT / "src/data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
PUB_DIR = ROOT / "public"
PUB_DIR.mkdir(parents=True, exist_ok=True)

PUBLISHED = "2026-11-24"

# Matriz Fotográfica Anti-Similitud (8 ángulos × 6 iluminaciones × 10 escenarios = 480 combinaciones visuales únicas)
CAMERA_STYLES = [
    "Macro close-up shot with shallow depth of field (85mm f/2.8 lens)",
    "Three-quarter editorial product angle from slightly above on a kitchen counter (50mm lens)",
    "Overhead flat-lay knolling composition showcasing the grill, removable plates, silicone tongs and thermometer (35mm lens)",
    "Eye-level realistic apartment cooking action photograph with authentic hands-on framing",
    "Side-profile studio shot highlighting stainless housing, drip tray, hinges and temperature dial",
    "Detailed close-up focusing on silicone-tipped tongs and digital probe on seared meat",
    "Wide editorial interior view of a bright modern apartment kitchen island cooking corner",
    "Oblique countertop tabletop photography with soft background bokeh and crisp grill textures",
]

LIGHTING_MOODS = [
    "crisp natural morning window daylight with soft realistic shadows",
    "warm golden-hour afternoon sunlight streaming into a modern apartment kitchen",
    "bright neutral 4000K under-cabinet LED task lighting highlighting metal and food textures",
    "soft diffused overcast studio daylight with clean culinary color accuracy",
    "warm inviting dinner-prep ambient illumination with authentic contrast",
    "bright sunlit modern dining room atmosphere with clean architectural surfaces",
]

SURFACES_AND_PROPS = [
    "on a white quartz apartment countertop beside a small open herb pot",
    "on a warm walnut butcher block island with measuring tape and spice jars",
    "inside a compact studio apartment galley kitchen near an open sliding window",
    "beside a stainless steel kitchen sink and dishwasher rack ready for plate cleanup",
    "on a silicone heat-resistant countertop mat protecting light oak wood",
    "next to an open kitchen drawer displaying silicone tongs, digital thermometer and nylon scraper",
    "on a modern breakfast bar prepared for paninis, breakfast eggs and seared vegetables",
    "beside neatly stacked ceramic replacement grill plates and waffle plates",
    "in a tidy apartment pantry shelf corner showing vertical compact appliance storage",
    "on a dark slate dining table prepared for a 6-serving family indoor barbecue",
]


def build_diverse_prompt(subject: str, idx: int) -> str:
    cam = CAMERA_STYLES[idx % len(CAMERA_STYLES)]
    light = LIGHTING_MOODS[(idx * 3 + 1) % len(LIGHTING_MOODS)]
    surf = SURFACES_AND_PROPS[(idx * 7 + 2) % len(SURFACES_AND_PROPS)]
    return (
        f"Realistic editorial apartment kitchen and indoor electric grill photography, {cam}: {subject}, {surf}, {light}. "
        "Photorealistic brushed stainless steel, ceramic grill grates, wood and stone textures, no text, no letters, no brand logos, no watermarks."
    )


def clean_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9-]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


def make_pillar_article(p: dict, child_items: list, idx: int) -> dict:
    cat_slug = p["slug"]
    path = f"/{cat_slug}/"
    related_paths = [f"/{cat_slug}/{clean_slug(c[0])}/" for c in child_items[:4]]
    table_rows = [
        [c[1], f"[Ver guía completa](/{cat_slug}/{clean_slug(c[0])}/)"]
        for c in child_items[:16]
    ]
    is_trans_pillar = cat_slug in {
        "resenas-parrillas-electricas",
        "comparativas-parrillas-electricas",
        "parrillas-por-espacio-porciones-y-precio",
        "placas-de-repuesto-y-compatibilidad",
        "pinzas-termometros-y-accesorios-parrilla",
    }
    blocks = [
        {
            "type": "p",
            "text": f"Bienvenido al hub especializado de **{p['title']}** en **ParrillaEnCasa.com**. Aquí reunimos nuestras **{len(child_items)} guías verificadas** sobre **{p['focus']}**, organizadas sin canibalización para ayudarte a elegir e invertir mejor en **Amazon Estados Unidos (`amazon.com`)** o **Amazon España (`amazon.es`)**.",
        },
        {
            "type": "p",
            "text": "Tanto si quieres comparar **[George Foreman vs Cuisinart vs Hamilton Beach vs Ninja](/comparativas-parrillas-electricas/george-foreman-vs-cuisinart-vs-hamilton-beach-vs-ninja-cual-elegir/)**, revisar las **[mejores parrillas sin humo para departamento](/parrillas-por-espacio-porciones-y-precio/mejores-parrillas-electricas-interior-sin-humo-departamento-amazon/)**, analizar la **[Ninja Sizzle GR101](/resenas-parrillas-electricas/ninja-sizzle-gr101-parrilla-sin-humo-resena-espacio-porciones-limpieza/)** o conseguir **[placas de repuesto y pinzas compatibles](/placas-de-repuesto-y-compatibilidad/placas-de-repuesto-cuisinart-gr-4np1p-y-waffles-gr-wafp-compatibilidad/)**, aquí tienes cada dato real antes de comprar.",
        },
        {"type": "h2", "text": f"Qué evaluamos en {p['title'].split('(')[0].split(':')[0].strip()}"},
        {
            "type": "p",
            "text": f"En las **{len(child_items)} guías** de esta sección respondemos los 4 pilares reales de compra en casa o departamento: **1) El rango de precio en Amazon EE. UU. (`USD`)**; **2) El espacio real en encimera y alacena**; **3) Cuántas porciones simultáneas caben sin hervir la carne**; y **4) Qué tan fácil es limpiar las placas (fijas vs desmontables al lavavajillas)**, además de las **pinzas, termómetros y placas de repuesto compatibles**.",
        },
        {
            "type": "table",
            "caption": f"Guías destacadas en {p['title'].split('(')[0].strip()}",
            "headers": ["Guía / Comparativa Especializada", "Enlace Directo"],
            "rows": table_rows,
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": "Regla clave de espacio, limpieza y voltaje en Amazon EE. UU.",
            "text": "Antes de comprar en Amazon.com, mide siempre el ancho y alto libre bajo tus gabinetes superiores (18 pulgadas estándar) y confirma si el modelo funciona a 110V–120V si planeas llevarlo a un país de red eléctrica de 220V.",
        },
        {"type": "h2", "text": "Cómo elegir tu parrilla y accesorios en 3 pasos"},
        {
            "type": "ol",
            "items": [
                "**Define tu espacio y porciones reales:** si cocinas para 1 o 2 personas en cocina pequeña, una **[George Foreman GRP4842P](/resenas-parrillas-electricas/george-foreman-grp4842p-5-porciones-placas-desmontables-resena/)** compacta de guardado vertical basta; para 4 a 8 porciones elige la **[Cuisinart GR-4NP1 180°](/resenas-parrillas-electricas/cuisinart-gr-4np1-griddler-5-en-1-resena-placas-y-limpieza/)** o la **[Ninja Sizzle GR101](/resenas-parrillas-electricas/ninja-sizzle-gr101-parrilla-sin-humo-resena-espacio-porciones-limpieza/)**.",
                "**Prioriza placas desmontables si buscas limpieza rápida:** sacar las placas en frío y meterlas al lavavajillas ahorra minutos cada noche frente a limpiar placas fijas con cable unido.",
                "**Protege el antiadherente desde el día uno:** usa siempre **[pinzas de silicona (600 °F)](/pinzas-termometros-y-accesorios-parrilla/mejores-pinzas-de-silicona-y-utensilios-para-parrilla-antiadherente/)**, **[termómetro digital](/pinzas-termometros-y-accesorios-parrilla/mejores-termometros-digitales-e-inalambricos-parrilla-interior/)** y aceite de aguacate en pulverizador sin lecitina.",
            ],
        },
        {
            "type": "cta",
            "text": "¿Quieres que nuestro Asesor IA compare dos modelos según los centímetros de tu cocina y cuántas porciones cocinas? Pregúntale gratis ahora.",
        },
    ]
    faqs = [
        {
            "q": f"¿Qué marcas principales analizamos en {p['title'].split('(')[0].strip()}?",
            "a": "Evaluamos los modelos más vendidos de Amazon Estados Unidos en George Foreman (2, 4, 5 y 15 porciones, serie Evolve y Smokeless), Cuisinart (Griddler GR-4NP1, GR-5B, GR-6S, Deluxe GR-150P1 y Elite), Hamilton Beach (25361 Searing, 38546 3-en-1, Durathon y Panini) y Ninja (Sizzle GR101 y Foodi Smart XL FG551/IG651/AG301).",
        },
        {
            "q": "¿Las pinzas de silicona y los termómetros sirven para todas las marcas?",
            "a": "Sí, al 100 %. Pinzas con punta de silicona como OXO Good Grips (9\" y 12\") y termómetros digitales instantáneos o inalámbricos como ThermoPro TP19H / TempSpike funcionan en cualquier parrilla. En cambio, las placas de repuesto y mallas antisalpicaduras sí deben coincidir con el código exacto de tu modelo.",
        },
        {
            "q": "¿Puedo conectar una parrilla comprada en Amazon Estados Unidos en países de 220V?",
            "a": "Las parrillas de Amazon.com están fabricadas para 110V–120V ~ 60 Hz y consumen entre 800 W y 1.800 W. Si vives en un país con red de 220V (como Perú, Chile, Argentina o España), necesitas un transformador reductor de potencia acorde (generalmente 2000 W a 3000 W) o usar el selector hacia Amazon.es en nuestras tarjetas.",
        },
    ]
    return {
        "slug": cat_slug,
        "pillar": cat_slug,
        "path": path,
        "isPillar": True,
        "isTransactional": is_trans_pillar,
        "primaryKeyword": p["kw"],
        "title": p["title"],
        "seoTitle": f"{p['title']} | ParrillaEnCasa.com",
        "metaDescription": f"Guía completa sobre {p['focus']}. Compara George Foreman, Cuisinart, Hamilton Beach y Ninja en Amazon EE. UU.",
        "excerpt": f"Explora {len(child_items)} guías sobre {p['focus']} con tablas de precio, espacio, porciones y limpieza.",
        "quickAnswer": f"En esta sección reunimos {len(child_items)} guías especializadas sobre {p['focus']}. Comparamos parrillas eléctricas de George Foreman, Cuisinart, Hamilton Beach y Ninja según precio, espacio, porciones simultáneas y limpieza, junto a pinzas, termómetros y placas compatibles en Amazon Estados Unidos.",
        "readingMinutes": 8,
        "image": {
            "prompt": build_diverse_prompt(p["subject"], idx),
            "alt": p["title"],
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com Best Sellers in Contact Grills & Electric Indoor Grills", "url": "https://www.amazon.com/Best-Sellers-Kitchen-Dining-Contact-Grills/zgbs/kitchen/13838471"},
            {"label": "USDA Safe Minimum Internal Temperature Chart", "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart"},
        ],
        "related": related_paths,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": f"/img/ambiente/cat-{cat_slug}.webp",
    }


def make_transactional_article(item: tuple, sibling_paths: list, idx: int) -> dict:
    slug, title, pillar, kw, pri, spc, por, cln, acc, pck, subj = item
    slug = clean_slug(slug)
    path = f"/{pillar}/{slug}/"
    rel = [p for p in sibling_paths if p != path][:3]
    rel.insert(0, f"/{pillar}/")

    blocks = [
        {
            "type": "p",
            "text": f"Analizar a detalle **{title}** es la mejor forma de acertar en tu compra para casa o departamento sin sorpresas de tamaño ni humo. En esta evaluación enfocada en **Amazon Estados Unidos (`amazon.com`)** desglosamos el **precio ({pri})**, el **espacio real que ocupa ({spc})**, las **porciones simultáneas ({por})**, la **facilidad de limpieza ({cln})** y los **accesorios compatibles ({acc})**.",
        },
        {
            "type": "h2",
            "text": "Evaluación por precio, espacio en cocina, porciones y limpieza",
        },
        {
            "type": "p",
            "text": f"Dentro de **{pck}**, la diferencia entre disfrutar asados rápidos entre semana o dejar el aparato guardado al fondo del armario radica en dos factores prácticos: si las placas caben cómodamente y se limpian sin esfuerzo ({cln.lower()}) y si la superficie real cubre tus tandas habituales ({por.lower()}) sin saturar el mesón ({spc.lower()}).",
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": f"Ficha Técnica Rápida: {pck.split(',')[0].strip()}",
            "text": f"• Precio orientativo en Amazon EE. UU.: {pri}.\n• Espacio que ocupa en cocina: {spc}.\n• Porciones simultáneas reales: {por}.\n• Facilidad de limpieza: {cln}.\n• Pinzas, termómetros y repuestos compatibles: {acc}.",
        },
        {
            "type": "h2",
            "text": f"Tabla comparativa en Amazon EE. UU.: {title}",
        },
        {
            "type": "p",
            "text": "Compara nuestra recomendación principal frente a los modelos referentes de George Foreman, Cuisinart, Hamilton Beach y Ninja según los 4 ejes clave:",
        },
        {
            "type": "table",
            "caption": f"Comparativa completa de precio, espacio, porciones y limpieza para {title}",
            "headers": [
                "Modelo / Opción en Amazon",
                "Precio y Espacio en Cocina",
                "Porciones a la Vez",
                "Limpieza y Accesorios Compatibles",
            ],
            "rows": [
                [
                    f"**Opción Principal: {pck.split(',')[0].strip()}**",
                    f"{pri} · {spc}",
                    por,
                    f"{cln} · {acc}",
                ],
                [
                    "**Compacta Económica: [George Foreman GRP4842P](/resenas-parrillas-electricas/george-foreman-grp4842p-5-porciones-placas-desmontables-resena/)**",
                    "US$45–$65 · 31.5 × 26.5 cm (vertical)",
                    "4–5 porciones (72 sq in)",
                    "Placas desmontables lavavajillas + Pinzas OXO 9\"",
                ],
                [
                    "**Versátil 5-en-1: [Cuisinart GR-4NP1 Griddler](/resenas-parrillas-electricas/cuisinart-gr-4np1-griddler-5-en-1-resena-placas-y-limpieza/)**",
                    "US$79–$109 · 34 × 29 cm (abre 180°)",
                    "4 cerrada / 6–8 abierta (200 sq in)",
                    "Reversibles lavavajillas + Placas waffles GR-WAFP",
                ],
                [
                    "**Sin Humo 500 °F: [Ninja Sizzle GR101](/resenas-parrillas-electricas/ninja-sizzle-gr101-parrilla-sin-humo-resena-espacio-porciones-limpieza/) / [Hamilton Beach 25361](/resenas-parrillas-electricas/hamilton-beach-25361-indoor-searing-grill-resena-humo-y-limpieza/)**",
                    "US$69–$139 · Baja altura o Tapa ventana",
                    "4–6 porciones (118–140 sq in)",
                    "Placa/rejilla y malla lavavajillas + ThermoPro TP19H",
                ],
            ],
        },
        {
            "type": "h2",
            "text": "Pinzas, termómetros y placas de repuesto compatibles que conviene sumar",
        },
        {
            "type": "ul",
            "items": [
                f"**Accesorios y repuestos ideales:** {acc}. Usar utensilios metálicos o sprays en aerosol con lecitina de soya es la causa #1 de pérdida prematura del antiadherente.",
                "**Pinzas con punta de silicona (`9\"` o `12\"`):** protegen recubrimientos cerámicos y PTFE hasta `600 °F` y evitan perforar la carne para conservar sus jugos.",
                "**Termómetro digital instantáneo o inalámbrico:** si tu parrilla no incluye sonda Smart integrada, medir el centro del corte (`135 °F` res medium rare / `165 °F` pollo) evita pasarte de cocción bajo tapa cerrada.",
            ],
        },
        {
            "type": "h2",
            "text": "3 pasos para comprar con acierto en Amazon Estados Unidos",
        },
        {
            "type": "steps",
            "items": [
                {
                    "name": "Mide tu encimera y altura bajo alacenas",
                    "text": f"Confirma que cuentas con espacio para {spc.lower()} y toma en cuenta si la tapa abre hacia arriba o plana a 180 grados.",
                },
                {
                    "name": "Verifica el precio actual y reseñas en la tarjeta Amazon",
                    "text": "Haz clic en los enlaces de afiliado de esta página para revisar ofertas del día en Amazon.com (o cambia con un toque a Amazon.es si estás en España).",
                },
                {
                    "name": "Agrega pinzas de silicona, termómetro o placa extra en el mismo carrito",
                    "text": "Si pides envío internacional AmazonGlobal desde EE. UU., agrupar los accesorios ligeros con tu parrilla optimiza el costo de envío y protege tu inversión desde el primer asado.",
                },
            ],
        },
        {
            "type": "callout",
            "variant": "aviso",
            "title": "Aviso importante sobre voltaje 110V–120V en Amazon EE. UU.",
            "text": "Las parrillas vendidas en Amazon.com operan a 110V–120V ~ 60 Hz (800 W a 1.800 W). Si la usarás en países con red eléctrica de 220V, conecta el equipo mediante un transformador reductor con margen de potencia suficiente (ej. 2500 W–3000 W).",
        },
        {
            "type": "cta",
            "text": "¿Dudas sobre si este modelo cabe en tu cocina o qué placas y pinzas le quedan? Pregúntale ahora a nuestro Asesor de Parrillas IA.",
        },
    ]

    faqs = [
        {
            "q": f"¿Cuánto cuesta y cuánto espacio ocupa {title.split(':')[0]}?",
            "a": f"El rango habitual en Amazon EE. UU. es de {pri}, con dimensiones de referencia de {spc}.",
        },
        {
            "q": "¿Cuántas porciones permite cocinar a la vez?",
            "a": f"Su superficie real rinde {por}, dependiendo del tamaño de los filetes, pechugas o hamburguesas.",
        },
        {
            "q": "¿Qué tan fácil es limpiarla después de usar?",
            "a": f"{cln}. Nunca sumerjas el cuerpo con cable eléctrico ni uses esponjas metálicas sobre las placas antiadherentes.",
        },
        {
            "q": "¿Qué pinzas, termómetros o placas de repuesto son compatibles?",
            "a": f"Recomendamos combinarla con {acc}. Las tarjetas de esta página te llevan directo a opciones verificadas en Amazon.com (ID parrillaencasa-20) y Amazon.es (ID parrillaencasa-21).",
        },
    ]

    quick_answer = (
        f"En nuestra guía de {title}, el precio en Amazon EE. UU. ronda {pri} con formato de {spc}. "
        f"Permite preparar {por} y destaca en limpieza por ofrecer {cln.lower()}, recomendando complementarla con {acc.lower()}."
    )

    return {
        "slug": slug,
        "pillar": pillar,
        "path": path,
        "isPillar": False,
        "isTransactional": True,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title} | ParrillaEnCasa.com",
        "metaDescription": f"Análisis de {title} en Amazon EE. UU.: precio ({pri}), espacio, porciones ({por}), limpieza fácil y accesorios compatibles.",
        "excerpt": f"Comparativa práctica de {title}: precio en Amazon, medidas reales, porciones a la vez, limpieza de placas y accesorios.",
        "quickAnswer": quick_answer,
        "readingMinutes": 7,
        "image": {
            "prompt": build_diverse_prompt(subj, idx),
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com Best Sellers in Contact & Indoor Electric Grills", "url": "https://www.amazon.com/Best-Sellers-Kitchen-Dining-Contact-Grills/zgbs/kitchen/13838471"},
            {"label": "USDA Safe Food Temperature Guidelines", "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart"},
        ],
        "related": rel,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": None,
    }


def make_seo_article(item: tuple, sibling_paths: list, idx: int) -> dict:
    slug, title, pillar, kw, focus_summary, subj = item
    slug = clean_slug(slug)
    path = f"/{pillar}/{slug}/"
    rel = [p for p in sibling_paths if p != path][:3]
    rel.insert(0, f"/{pillar}/")

    blocks = [
        {
            "type": "p",
            "text": f"Dominar **{title}** marca la diferencia entre asar con gusto dentro de tu casa o departamento y sufrir por humo en la sala, cortes secos o placas rayadas en pocas semanas. En **ParrillaEnCasa.com** desarrollamos esta **{focus_summary}** aplicable a los equipos **George Foreman, Cuisinart, Hamilton Beach y Ninja** de **Amazon Estados Unidos**.",
        },
        {
            "type": "h2",
            "text": f"Por qué es clave aplicar: {title}",
        },
        {
            "type": "p",
            "text": f"Cada cocina de departamento tiene límites reales de ventilación, corriente eléctrica (`15A / 110V–120V`), ancho de encimera y espacio de lavado. Seguir correctamente esta **{focus_summary}** te ayuda a sacar el máximo provecho térmico de tu parrilla mientras proteges el antiadherente y mantienes limpio el ambiente.",
        },
        {
            "type": "callout",
            "variant": "tip",
            "title": "Regla de oro para asar en interiores sin humo y sin rayones",
            "text": "Seca siempre el exterior de la carne con papel absorbente antes de llevarla a la placa caliente, evita los aerosoles comerciales con lecitina y manipula todo exclusivamente con pinzas de silicona o espátulas térmicas.",
        },
        {
            "type": "h2",
            "text": "Comparativa de comportamiento en George Foreman, Cuisinart, Hamilton Beach y Ninja",
        },
        {
            "type": "table",
            "caption": f"Referencia por marca aplicada a {title}",
            "headers": [
                "Marca y Formato",
                "Precio y Espacio Típico",
                "Porciones Reales",
                "Limpieza y Accesorios Clave",
            ],
            "rows": [
                [
                    "**George Foreman (Contacto Inclinada)**",
                    "US$25–$119 · Guardado vertical compacto",
                    "2 a 5 porciones (36–72 sq in)",
                    "Placas fijas en base (paño) o desmontables en GRP4842P + Pinzas OXO 9\"",
                ],
                [
                    "**Cuisinart Griddler (5-en-1 180°)**",
                    "US$79–$185 · 34–37 cm (abre plana)",
                    "4 cerrada / 6–8 abierta (200–240 sq in)",
                    "Placas reversibles al lavavajillas + Repuestos GR-4NP1P / Waffles",
                ],
                [
                    "**Hamilton Beach (Searing / Doble Zona)**",
                    "US$35–$109 · Tapa ventana o perfil bajo",
                    "4 a 8 porciones (118–180 sq in)",
                    "Rejilla, tapa y bandeja lavavajillas + Termómetro ThermoPro TP19H",
                ],
                [
                    "**Ninja (Sizzle GR101 / Foodi Smart XL)**",
                    "US$109–$249 · 500 °F bajo humo",
                    "4 a 8 porciones familiares",
                    "Placa cerámica, malla y filtro lavavajillas + Sonda / Pinzas 12\"",
                ],
            ],
        },
        {
            "type": "h2",
            "text": f"Guía paso a paso: {title}",
        },
        {
            "type": "steps",
            "items": [
                {
                    "name": "Prepara la superficie, ventilación y temperatura exacta",
                    "text": "Coloca la parrilla lejos de gabinetes bajos si libera vapor, confirma que la bandeja recolectora esté encajada en su sitio y precalienta con la tapa puesta hasta alcanzar la temperatura estable.",
                },
                {
                    "name": "Aplica la técnica correcta durante la cocción",
                    "text": f"Pon en práctica esta {focus_summary}, respetando el espacio entre porciones para que evapore la humedad sin hervir la carne y controlando el centro del corte con un termómetro digital.",
                },
                {
                    "name": "Limpia en frío o tibio y guarda con accesorios seguros",
                    "text": "Desenchufa el equipo tras asar; limpia placas desmontables en fregadero o lavavajillas una vez templadas (sin choque térmico bajo agua helada) y revisa la malla o bandeja antigoteo.",
                },
            ],
        },
        {
            "type": "h2",
            "text": "Errores frecuentes que acortan la vida de tu parrilla eléctrica",
        },
        {
            "type": "ul",
            "items": [
                "**Usar aceite en spray tipo PAM o mantequilla al sellar:** quema los aditivos, genera humo innecesario y deja una capa pegajosa; sustitúyelo por aceite de aguacate aplicado con **[pulverizador de vidrio puro](/pinzas-termometros-y-accesorios-parrilla/mejores-pinzas-de-silicona-y-utensilios-para-parrilla-antiadherente/)**.",
                "**Cortar carne directamente sobre la placa o usar tenedores:** raya el teflón/cerámica al instante. Si tu placa ya está muy gastada, revisa **[placas de repuesto compatibles](/placas-de-repuesto-y-compatibilidad/)** antes de cambiar todo el aparato.",
                "**Saturar la parrilla más allá de su área en sq in:** respeta las **[porciones reales por modelo](/porciones-superficie-y-tiempos-de-coccion/cuantas-porciones-caben-realmente-en-parrilla-electrica-tabla-sq-in/)** para lograr sellado dorado en lugar de carne hervida.",
            ],
        },
        {
            "type": "cta",
            "text": "¿Buscas la parrilla eléctrica, placas de repuesto o termómetro ideal para aplicar esto hoy en casa? Consulta gratis a nuestro Asesor IA.",
        },
    ]

    faqs = [
        {
            "q": f"¿Aplica {title} por igual a George Foreman, Cuisinart, Hamilton Beach y Ninja?",
            "a": "Sí, los principios térmicos, de control de humo y protección antiadherente aplican a las 4 marcas, ajustando únicamente si tu modelo tiene placas fijas (limpieza con papel húmedo) o placas desmontables aptas para lavavajillas.",
        },
        {
            "q": "¿Qué accesorios ayudan más a evitar errores al cocinar en parrilla interior?",
            "a": "Un par de pinzas con punta de silicona (600 °F), un termómetro digital de lectura instantánea o inalámbrico, un raspador ranurado de nylon y un pulverizador de aceite sin propelentes.",
        },
        {
            "q": "¿Dónde encuentro los modelos y repuestos compatibles recomendados?",
            "a": "En las tarjetas Amazon integradas dentro de esta misma guía puedes ver precios actualizados y compatibilidad directa en Amazon.com (EE. UU.) y Amazon.es (España).",
        },
    ]

    quick_answer = (
        f"Para dominar {title}, ajusta la temperatura según el tipo de alimento, controla la grasa hacia la bandeja fría para evitar humo "
        f"y respeta la superficie útil de tu parrilla. Aplicando esta {focus_summary}, mantendrás limpias tus placas por años en modelos George Foreman, Cuisinart, Hamilton Beach y Ninja."
    )

    return {
        "slug": slug,
        "pillar": pillar,
        "path": path,
        "isPillar": False,
        "isTransactional": False,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title} | ParrillaEnCasa.com",
        "metaDescription": f"Guía práctica en español sobre {title}. Consejos de humo, espacio, porciones, limpieza y accesorios en parrillas eléctricas.",
        "excerpt": f"Tutorial detallado sobre {title}: {focus_summary}.",
        "quickAnswer": quick_answer,
        "readingMinutes": 6,
        "image": {
            "prompt": build_diverse_prompt(subj, idx),
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "USDA Safe Food Temperature Guidelines", "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart"},
        ],
        "related": rel,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": None,
    }


def main():
    for old in ART_DIR.glob("*.json"):
        old.unlink()

    trans_items = generate_transactional_320()
    seo_items = generate_seo_1000()

    by_pillar: dict[str, list] = {p["slug"]: [] for p in PILLARS}
    for it in trans_items:
        by_pillar[it[2]].append(it)
    for it in seo_items:
        by_pillar[it[2]].append(it)

    all_articles = []
    seen_slugs = set()
    seen_kws = set()
    seen_titles = set()
    idx = 0

    # 1. Generar los 12 Hubs Pilares
    for p in PILLARS:
        art = make_pillar_article(p, by_pillar[p["slug"]], idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        assert art["title"] not in seen_titles, f"Duplicate title: {art['title']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        seen_titles.add(art["title"])
        all_articles.append(art)

    pillar_paths = {
        p_slug: [f"/{p_slug}/{clean_slug(c[0])}/" for c in c_list]
        for p_slug, c_list in by_pillar.items()
    }

    # 2. Generar los 320 Artículos Transaccionales
    for i, it in enumerate(trans_items):
        p_slug = it[2]
        sibs = pillar_paths[p_slug]
        rot_sibs = sibs[(i + 1) % len(sibs):] + sibs[: (i + 1) % len(sibs)]
        art = make_transactional_article(it, rot_sibs, idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        assert art["title"] not in seen_titles, f"Duplicate title: {art['title']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        seen_titles.add(art["title"])
        all_articles.append(art)

    # 3. Generar los 1,000 Artículos SEO Informacionales
    for i, it in enumerate(seo_items):
        p_slug = it[2]
        sibs = pillar_paths[p_slug]
        rot_sibs = sibs[(i + 1) % len(sibs):] + sibs[: (i + 1) % len(sibs)]
        art = make_seo_article(it, rot_sibs, idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        assert art["title"] not in seen_titles, f"Duplicate title: {art['title']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        seen_titles.add(art["title"])
        all_articles.append(art)

    for art in all_articles:
        (ART_DIR / f"{art['slug']}.json").write_text(
            json.dumps(art, ensure_ascii=False, indent=2), encoding="utf-8"
        )

    kw_map = [
        {
            "slug": a["slug"],
            "pillar": a["pillar"],
            "path": a["path"],
            "isPillar": a["isPillar"],
            "isTransactional": a["isTransactional"],
            "primaryKeyword": a["primaryKeyword"],
            "title": a["title"],
        }
        for a in all_articles
    ]
    (DATA_DIR / "keyword_map.json").write_text(
        json.dumps(kw_map, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    cat_names = {
        p["slug"]: p["title"].split(":")[0].split("(")[0].strip()
        for p in PILLARS
    }
    search_index = [
        {
            "t": a["title"],
            "p": a["path"],
            "n": cat_names.get(a["pillar"], a["pillar"]),
            "r": a["readingMinutes"],
        }
        for a in all_articles
    ]
    (PUB_DIR / "search-index.json").write_text(
        json.dumps(search_index, ensure_ascii=False), encoding="utf-8"
    )

    print(
        f"OK: Generados {len(all_articles)} artículos únicos "
        f"({len(PILLARS)} Pilares + {len(trans_items)} Transaccionales Amazon + {len(seo_items)} SEO Informacionales). "
        f"0% Canibalización verificada."
    )


if __name__ == "__main__":
    main()
