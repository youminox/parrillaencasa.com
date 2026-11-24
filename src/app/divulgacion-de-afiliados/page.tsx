import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";
import { AMAZON_TAG_US, AMAZON_TAG_ES } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Divulgación de Afiliados de Amazon | ParrillaEnCasa.com",
  description: `Declaración transparente de participación de ParrillaEnCasa.com (${LEGAL_OWNER}, ${LEGAL_LOCATION}) en Amazon Associates (${AMAZON_TAG_US} / ${AMAZON_TAG_ES}).`,
  alternates: { canonical: `${SITE_URL}/divulgacion-de-afiliados/` },
};

export default function DivulgacionAfiliadosPage() {
  return (
    <SimplePage
      title="Divulgación de Afiliados de Amazon"
      crumb="Divulgación de afiliados"
      href="/divulgacion-de-afiliados/"
      intro="Transparencia total sobre cómo financiamos nuestras más de 1,300 guías gratuitas en español sin costo adicional para el lector."
    >
      <h2>1. Participación oficial en Amazon Associates</h2>
      <p>
        <strong>ParrillaEnCasa.com</strong>, sitio web titularidad de{" "}
        <strong>{LEGAL_OWNER}</strong> (domiciliado en {LEGAL_LOCATION} · email:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>), participa en el
        Programa de Afiliados de <strong>Amazon.com Services LLC</strong>{" "}
        (Amazon Estados Unidos, ID de seguimiento:{" "}
        <code>{AMAZON_TAG_US}</code>) y en el Programa de Afiliados de{" "}
        <strong>Amazon EU</strong> (Amazon España, ID de seguimiento:{" "}
        <code>{AMAZON_TAG_ES}</code>).
      </p>
      <p>
        <em>
          &ldquo;En calidad de Afiliado de Amazon, ParrillaEnCasa.com obtiene
          ingresos por las compras adscritas que cumplen los requisitos
          aplicables.&rdquo;
        </em>
      </p>

      <h2>2. ¿Sube el precio de tu parrilla o accesorio al usar nuestros enlaces?</h2>
      <p>
        <strong>No, nunca pagas ni un centavo adicional.</strong> El precio en
        Amazon.com o Amazon.es es exactamente idéntico al que verías buscando por
        tu cuenta. La pequeña comisión que nos asigna Amazon proviene de su
        margen comercial y financia la actualización constante de nuestras
        comparativas y el Asesor de Parrillas IA.
      </p>

      <h2>3. Independencia en nuestras evaluaciones</h2>
      <p>
        Ningún fabricante (George Foreman, Cuisinart, Hamilton Beach, Ninja ni
        marcas de utensilios) patrocina ni condiciona nuestros análisis. Señalamos
        tanto las ventajas como las limitaciones reales de espacio, humo,
        limpieza de placas fijas frente a desmontables o compatibilidad de
        voltaje en cada modelo.
      </p>
    </SimplePage>
  );
}
