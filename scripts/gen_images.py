#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera imágenes fotorrealistas y visualmente diversas para parrillaencasa.com vía la Edge Function parrillaencasa-images
(Supabase charlielingan -> OpenAI ChatGPT Image API con quality="medium") y las comprime en WebP
ligeros (<= 68 KB, garantizado estrictamente < 100 KB para Google SEO) en public/img/,
incluyendo verificación perceptual dHash anti-similitud.

Uso:
  python3 scripts/gen_images.py home        # genera 65 escenas diversas (9 Home + 12 Silos + 24 Variantes + 20 Artículos Top)
  python3 scripts/gen_images.py articles    # genera imágenes individuales por artículo
  python3 scripts/gen_images.py one <slug> "<prompt>"
"""
import concurrent.futures as cf
import io
import json
import pathlib
import sys
import urllib.request
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/parrillaencasa-images"
TOKEN = "parrillaencasa-img-2026"
RAW = ROOT / "scripts/.cache/raw"
RAW.mkdir(parents=True, exist_ok=True)

# 45 escenas fotográficas ultra diversas (9 Home + 12 Silos + 24 Variantes anti-similitud)
HOME_PROMPTS = {
    # 9 Escenas Home / Estructura Principal
    "home-hero-parrillas": "Three-quarter editorial hero photograph on a warm white quartz kitchen island in a modern apartment featuring a compact black-and-steel open smokeless electric grill searing ribeye and cherry tomatoes beside silicone-tipped tongs and a digital meat thermometer under soft morning window light",
    "og-default": "Clean sunlit apartment dining counter displaying three distinct indoor electric grills—a slim contact grill, a brushed stainless 5-in-1 180-degree griddler, and a wide smokeless open grill—with detached ceramic grill plates and nylon spatula nearby",
    "home-smokeless-depa": "Wide architectural apartment kitchen shot showing a glass-lid indoor searing electric grill operating cleanly without heavy smoke beside an open sliding balcony glass door and leafy urban skyline",
    "home-encimera-compacta": "Side-angle realistic kitchen scene inside a compact studio apartment where a slim two-serving contact electric grill fits comfortably beneath wooden upper cabinets next to an espresso mug",
    "home-placas-lavavajillas": "Editorial action shot of hands sliding two spotless detachable ribbed ceramic nonstick grill plates into the lower rack of a modern stainless steel apartment dishwasher next to a microfiber towel",
    "home-termometro-carne": "Shallow depth-of-field macro photograph of a thin instant-read stainless digital thermometer probe entering the side of a thick seared beef steak resting on a ribbed indoor electric grill grate while silicone-tipped tongs steady the cut",
    "home-panini-180": "Top-three-quarter tabletop shot of a stainless 5-in-1 electric griddler opened flat 180 degrees simultaneously cooking toasted artisan paninis on the left ribbed zone and bell peppers on the right flat griddle zone",
    "home-reunion-familiar": "Lively warm evening indoor dinner setup on a solid oak apartment table featuring a large electric smokeless family grill sizzling chicken skewers, zucchini coins and four juicy burgers simultaneously",
    "home-voltaje-cocina": "Sharp clean technical kitchen scene showing a kitchen wall GFCI safety outlet, a neat detachable temperature probe power cord resting beside a matte gray electric grill, and a small copper voltage adapter on a marble mat",

    # 12 Categorías Pilares (cat-<slug>)
    "cat-resenas-parrillas-electricas": "Editorial kitchen studio lineup showing compact indoor contact grills, adjustable-hinge griddlers and hood-style indoor electric grills on slate countertop with a ruler mat and silicone tongs",
    "cat-comparativas-parrillas-electricas": "Balanced split-table comparison of a sloped classic contact grill on the left walnut surface and a flat 500-degree open smokeless indoor electric grill on the right white marble surface",
    "cat-parrillas-por-espacio-porciones-y-precio": "Stepped three-tier kitchen counter arrangement moving from a mini two-burger dorm contact grill to a four-serving stainless panini griddler and a wide six-serving family indoor electric grill",
    "cat-placas-de-repuesto-y-compatibilidad": "Neat organized knolling on warm oak wood of interchangeable removable cast-aluminum grill plates: ribbed searing grates, smooth teppanyaki griddle plate, deep Belgian waffle plates and a stainless grease drip tray",
    "cat-pinzas-termometros-y-accesorios-parrilla": "Editorial flat-lay on butcher block displaying heavy-duty stainless tongs with scalloped red silicone tips, an instant-read folding probe thermometer, a wireless Bluetooth meat probe, a grooved nylon plate scraper and a glass avocado-oil sprayer bottle",
    "cat-control-de-humo-ventilacion-y-departamentos": "Bright breezy apartment kitchen corner with a quiet countertop indoor electric grill cooking salmon fillet under warm window airflow, visible clear water layer inside the removable cool-zone base drip pan",
    "cat-espacio-medidas-consumo-y-voltaje": "Overhead tape-measure photograph measuring width and depth footprint of a stainless indoor electric grill on a narrow apartment galley counter beside a toaster and coffee dripper",
    "cat-porciones-superficie-y-tiempos-de-coccion": "High-angle overhead shot showing six perfectly spaced burger patties, grilled pineapple rings and asparagus spears arranged cleanly without crowding on a hot rectangular indoor electric grill plate",
    "cat-cortes-carnes-aves-pescados-y-verduras": "Appetizing close-up culinary spread cooking across a dark ceramic nonstick ribbed grill surface: two herb-marinated chicken breasts, a salmon fillet with sear marks and blistered cherry tomatoes",
    "cat-limpieza-antiadherentes-y-cuidado-de-placas": "Sunlight hitting a pristine home kitchen sink counter while a hand presses the quick-release button on a cool indoor grill and wipes a spotless ceramic nonstick grill plate with a damp folded paper towel",
    "cat-uso-seguro-de-pinzas-termometros-y-accesorios": "Close-up action shot of silicone-coated kitchen tongs turning delicate white fish fillets gently on a dark PTFE grill plate while a magnetic folding digital thermometer sits ready beside a glass spritzer",
    "cat-mantenimiento-solucion-de-fallas-y-compra-en-amazon": "Clean home kitchen inspection table showing an unplugged indoor electric grill with detached heating probe connector, gleaming concealed heating coil base and aligned front grease catcher cup",

    # 24 Variantes Visuales Anti-Similitud (2 por cada uno de los 12 silos)
    "scene-resenas-2": "Low-angle dramatic counter portrait of a glossy obsidian indoor searing grill with glass viewing window steaming lightly over two NY strip steaks in golden evening lamp light",
    "scene-resenas-3": "Bright morning breakfast kitchen shot featuring a sleek silver folding contact grill pressing two golden sourdough ham-and-cheese melts with a wooden cutting board nearby",
    "scene-comparativas-2": "Overhead top-down comparison showing the vertical cabinet storage footprint of a compact upright grill versus a wide rectangular hooded indoor grill resting on birch planks",
    "scene-comparativas-3": "Close-up surface contrast showing diagonal sear lines from cast ceramic grill grates on the left and evenly golden smashed burgers from a smooth flat griddle plate on the right",
    "scene-espacio-2": "Tiny minimalist studio kitchenette counter displaying a compact red-accented mini contact grill tucked neatly between a ceramic knife block and a small herb pot",
    "scene-espacio-3": "Spacious family granite island hosting a large twin-zone electric grill entertaining dinner prep with four bowls of sliced bell peppers, zucchini and marinated beef skewers",
    "scene-placas-2": "Hands clicking a deep square grid Belgian waffle plate firmly into the lower latch rails of a brushed stainless multi-purpose indoor griddler",
    "scene-placas-3": "Clean dishwasher upper cutlery basket holding a fine perforated stainless steel splatter shield screen beside two shiny aluminum grease drip trays",
    "scene-accesorios-2": "Detailed kitchen countertop triad showing locking 9-inch compact silicone tongs and 12-inch long grilling tongs resting neatly beside an oil-mister bottle on a linen towel",
    "scene-accesorios-3": "Modern kitchen digital probe thermometer dock synced beside a thick pork chop cooking cleanly on a closed smart indoor electric grill",
    "scene-humo-2": "Sunny open-window loft kitchen showing paper towels blotting raw marbled steaks dry on a bamboo cutting board before searing on a preheated smokeless indoor grill",
    "scene-humo-3": "Evening apartment dining patio window with a low-profile floor fan subtly directing kitchen steam out an open balcony door while grilling chicken skewers cleanly",
    "scene-medidas-2": "Vertical kitchen pantry cabinet shelf opened to demonstrate a compact contact grill latched shut and stored upright next to cutting boards and baking sheets",
    "scene-medidas-3": "Clean wall-plug safety close-up inside a contemporary kitchen tiled backsplash showing an indoor electric grill plugged directly into a dedicated 15-amp GCFI kitchen receptacle",
    "scene-porciones-2": "Mid-action cooking shot of a stainless contact grill with floating hinge pressed evenly over four thick boneless chicken thighs of varying heights",
    "scene-porciones-3": "Wooden serving platter beside an open indoor grill holding rested sliced skirt steak and corn ribs timed perfectly with a small digital kitchen timer",
    "scene-cortes-2": "Colorful indoor vegetarian feast grilling sliced portobello mushrooms, red onion rings, halloumi cheese squares and yellow squash on an olive-oiled ceramic grill plate",
    "scene-cortes-3": "Crisp golden turkey club paninis pressed side-by-side in a stainless hinged griddler next to a porcelain plate with fresh arugula",
    "scene-limpieza-2": "Soaking damp white paper towels steaming softly between closed warm nonstick grill plates to loosen charred glaze effortlessly without scratching",
    "scene-limpieza-3": "Gentle nylon dish brush and mild liquid soap suds washing a cooled removable dark nonstick drip pan inside a modern matte black kitchen sink",
    "scene-uso-accesorios-2": "Small tall glass filled with crushed ice and water testing the freezing-point calibration accuracy of a shiny stainless digital meat thermometer needle",
    "scene-uso-accesorios-3": "Dark matte heat-resistant silicone counter mat protecting a natural wooden butcher block beneath a hot indoor electric grill and probe rest",
    "scene-mantenimiento-2": "Fine soft brush gently sweeping dried crumb particles away from the floating rear hinge channel and thermistor sensor pin of an unplugged electric grill",
    "scene-mantenimiento-3": "Freshly opened brown corrugated cardboard shipping box on an apartment floor revealing neatly foam-packed indoor grill accessories and protective bubble pouches",
}

# 20 Artículos Insignia para generar imágenes únicas dedicadas en public/img/articulos/
TOP_ARTICLE_SLUGS = [
    "ninja-sizzle-gr101-parrilla-sin-humo-resena-espacio-porciones-limpieza",
    "cuisinart-gr-4np1-griddler-5-en-1-resena-placas-y-limpieza",
    "george-foreman-grp4842p-5-porciones-placas-desmontables-resena",
    "hamilton-beach-25361-indoor-searing-grill-resena-humo-y-limpieza",
    "ninja-foodi-smart-xl-fg551-parrilla-sin-humo-resena",
    "george-foreman-vs-cuisinart-vs-hamilton-beach-vs-ninja-cual-elegir",
    "parrilla-de-contacto-vs-parrilla-abierta-sin-humo-cual-conviene",
    "mejores-parrillas-electricas-interior-sin-humo-departamento-amazon",
    "mejores-parrillas-electricas-pequenas-para-departamentos-estudio",
    "placas-de-repuesto-cuisinart-gr-4np1p-y-waffles-gr-wafp-compatibilidad",
    "placas-mallas-y-rejillas-repuesto-ninja-sizzle-gr101-y-foodi-fg551",
    "mejores-pinzas-de-silicona-y-utensilios-para-parrilla-antiadherente",
    "mejores-termometros-digitales-e-inalambricos-parrilla-interior",
    "como-evitar-que-suene-el-detector-de-humo-con-parrilla-electrica",
    "como-usar-parrilla-electrica-110v-amazon-usa-en-paises-220v",
    "cuantas-porciones-caben-realmente-en-parrilla-electrica-tabla-sq-in",
    "como-hacer-ribeye-y-bife-ancho-jugoso-en-parrilla-electrica",
    "como-limpiar-placas-de-parrilla-electrica-sin-danar-antiadherente",
    "como-usar-termometro-digital-en-cortes-delgados-de-parrilla-electrica",
    "solucion-parrilla-electrica-calienta-solo-de-un-lado-o-se-apaga",
]


def compute_dhash(im: Image.Image, hash_size: int = 8) -> int:
    small = im.convert("L").resize((hash_size + 1, hash_size), Image.LANCZOS)
    pixels = list(small.getdata())
    bits = 0
    for row in range(hash_size):
        offset = row * (hash_size + 1)
        for col in range(hash_size):
            bits = (bits << 1) | (1 if pixels[offset + col] > pixels[offset + col + 1] else 0)
    return bits


def call(slug: str, prompt: str) -> bytes:
    data = json.dumps({"slug": slug, "prompt": prompt}).encode()
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={
            "Content-Type": "application/json",
            "x-parrillaencasa-token": TOKEN,
        },
    )
    with urllib.request.urlopen(req, timeout=240) as r:
        res = json.loads(r.read())
    if not res.get("ok"):
        raise RuntimeError(res.get("error"))
    with urllib.request.urlopen(res["url"] + "?v=1", timeout=120) as r:
        return r.read()


def save_variants(slug: str, raw_bytes: bytes, outdir: pathlib.Path) -> tuple[dict, int]:
    outdir.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    w, h = im.size
    target = 16 / 9
    if w / h > target:
        nw = int(h * target)
        im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target)
        im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))

    dhash = compute_dhash(im)
    # Tope duro: <= 68 KB para 1200x675 (garantizado estrictamente < 100 KB para Google SEO)
    sizes = {"": 1200, "-800": 800, "-400": 400}
    limits = {"": 68_000, "-800": 42_000, "-400": 18_000}
    out = {}
    for suf, width in sizes.items():
        cur_w = width
        q = 78
        while True:
            r = im.resize((cur_w, round(cur_w * 9 / 16)), Image.LANCZOS)
            buf = io.BytesIO()
            r.save(buf, "WEBP", quality=q, method=6)
            if buf.tell() <= limits[suf]:
                break
            if q > 22:
                q -= 5
            elif cur_w > 480:
                cur_w = int(cur_w * 0.88)
            else:
                break
        p = outdir / f"{slug}{suf}.webp"
        p.write_bytes(buf.getvalue())
        out[suf] = buf.tell()
    return out, dhash


def job(slug: str, prompt: str, outdir: pathlib.Path):
    final = outdir / f"{slug}.webp"
    if final.exists() and final.stat().st_size <= 68_000:
        im = Image.open(final)
        return slug, f"skip ({final.stat().st_size // 1024}KB)", compute_dhash(im)
    rawp = RAW / f"{slug}.webp"
    if rawp.exists():
        b = rawp.read_bytes()
    else:
        last = None
        for _ in range(3):
            try:
                b = call(slug, prompt)
                break
            except Exception as e:
                last = e
        else:
            return slug, f"ERROR {last}", 0
        rawp.write_bytes(b)
    sizes, dhash = save_variants(slug, b, outdir)
    return slug, f"ok {sizes[''] // 1024}KB", dhash


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "home"
    tasks = []
    if mode == "home":
        for s, p in HOME_PROMPTS.items():
            tasks.append((s, p, ROOT / "public/img/ambiente"))
        art_dir = ROOT / "src/content/articles"
        for slug in TOP_ARTICLE_SLUGS:
            f = art_dir / f"{slug}.json"
            if f.exists():
                a = json.loads(f.read_text(encoding="utf-8"))
                tasks.append(
                    (a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos")
                )
    elif mode == "articles":
        for f in sorted((ROOT / "src/content/articles").glob("*.json")):
            a = json.loads(f.read_text(encoding="utf-8"))
            tasks.append(
                (a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos")
            )
    elif mode == "one":
        tasks.append((sys.argv[2], sys.argv[3], ROOT / "public/img/ambiente"))

    hashes = []
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for slug, status, dh in ex.map(lambda t: job(*t), tasks):
            if dh:
                hashes.append((slug, dh))
            print(slug, status, flush=True)

    # Reporte de diversidad visual dHash
    near_dups = 0
    for i in range(len(hashes)):
        for j in range(i + 1, len(hashes)):
            dist = bin(hashes[i][1] ^ hashes[j][1]).count("1")
            if dist <= 4:
                near_dups += 1
    print(f"Auditoría visual dHash completada sobre {len(hashes)} imágenes (duplicados cercanos: {near_dups}).")


if __name__ == "__main__":
    main()
