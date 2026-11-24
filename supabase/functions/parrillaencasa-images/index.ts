import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// parrillaencasa-images — genera imágenes fotorrealistas y diversas para parrillaencasa.com
// con la API de imágenes de OpenAI (ChatGPT Image API) en calidad media (quality: "medium") y formato WebP.

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-parrillaencasa-token",
};

const STYLE =
  "Realistic editorial indoor electric grill and modern home kitchen photography in real apartments and houses, authentic brushed stainless steel housings, matte ceramic and nonstick ribbed grill grates, genuine sizzling steaks, chicken breasts, salmon or vegetables, silicone-tipped tongs, digital meat thermometer probes, quartz and oak countertops, crisp natural daylight. Absolutely no text, no letters, no numbers, no brand logos, no watermarks, no deformed hands or utensils.";

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) throw new Error("OPENAI_API_KEY not set");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const token = req.headers.get("x-parrillaencasa-token") || "";
    if (token !== "parrillaencasa-img-2026") {
      return json({ ok: false, error: "unauthorized" }, 401);
    }

    const { slug, prompt, size } = await req.json();
    if (!slug || !prompt || !/^[a-z0-9-]+$/.test(slug)) {
      throw new Error("slug (a-z0-9-) and prompt are required");
    }
    const fullPrompt = `${prompt}. ${STYLE}`;
    const imgSize = size === "square" ? "1024x1024" : "1536x1024";

    let bytes: Uint8Array | null = null;
    let modelUsed = "";
    const errors: string[] = [];
    for (const model of ["gpt-image-1", "gpt-image-1-mini"]) {
      const r = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          prompt: fullPrompt,
          size: imgSize,
          quality: "medium",
          output_format: "webp",
          output_compression: 82,
          n: 1,
        }),
      });
      const j = await r.json();
      const b64 = j?.data?.[0]?.b64_json;
      if (b64) {
        bytes = b64ToBytes(b64);
        modelUsed = model;
        break;
      }
      errors.push(`${model}: ${j?.error?.message || r.status}`);
    }
    if (!bytes) throw new Error(errors.join(" | "));

    const objectPath = `parrillaencasa/${slug}.webp`;
    const { error: upErr } = await supabase.storage
      .from("content-images")
      .upload(objectPath, bytes, {
        contentType: "image/webp",
        upsert: true,
      });
    if (upErr) throw new Error(`upload: ${upErr.message}`);
    const { data } = supabase.storage
      .from("content-images")
      .getPublicUrl(objectPath);

    await supabase.from("token_usage").insert({
      source: "parrillaencasa.com",
      content_type: "ai_image",
      model: modelUsed,
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
      images_generated: 1,
      estimated_cost_usd: modelUsed === "gpt-image-1" ? 0.063 : 0.015,
      slug,
    });

    return json({ ok: true, url: data.publicUrl, model: modelUsed });
  } catch (e) {
    return json({ ok: false, error: String((e as Error).message || e) }, 500);
  }
});
