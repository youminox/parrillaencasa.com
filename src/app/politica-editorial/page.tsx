import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Política Editorial y Metodología | ParrillaEnCasa.com",
  description: `Cómo evaluamos parrillas eléctricas de interior, placas de repuesto, pinzas y termómetros en ParrillaEnCasa.com (${LEGAL_OWNER}, ${LEGAL_LOCATION}).`,
  alternates: { canonical: `${SITE_URL}/politica-editorial/` },
};

export default function PoliticaEditorialPage() {
  return (
    <SimplePage
      title="Política Editorial y Metodología de Evaluación"
      crumb="Política editorial"
      href="/politica-editorial/"
      intro="Los 4 criterios reales que analizamos en cada parrilla eléctrica de interior y sus accesorios compatibles."
    >
      <h2>1. Dirección editorial responsable</h2>
      <p>
        Todo el contenido editorial de <strong>ParrillaEnCasa.com</strong> es
        propiedad y está supervisado por <strong>{LEGAL_OWNER}</strong>,
        domiciliado en <strong>{LEGAL_LOCATION}</strong>, con correo oficial{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2>2. Nuestros 4 ejes de comparación en cada modelo</h2>
      <ul>
        <li>
          <strong>1. Precio transparente en Amazon Estados Unidos:</strong>{" "}
          diferenciamos rangos económicos (&lt; US$45), gama media versátil
          (US$65–US$120) y equipos Smart XL con control digital y sonda integrada
          (US$140–US$250+).
        </li>
        <li>
          <strong>2. Espacio real en encimera y guardado:</strong> documentamos
          medidas en pulgadas y centímetros tanto en uso como al abrir la tapa o
          desplegar placas a 180°, y si cabe bajo gabinetes de 18&quot; o se
          guarda en vertical.
        </li>
        <li>
          <strong>3. Porciones simultáneas reales:</strong> contrastamos el
          marketing de la caja frente al área útil real en pulgadas cuadradas
          (36, 60, 72, 118, 180 y 240 sq in) para saber cuántas hamburguesas o
          pechugas caben a la vez sin cocerse al vapor.
        </li>
        <li>
          <strong>4. Facilidad de limpieza y repuestos compatibles:</strong>{" "}
          distinguimos placas fijas de placas desmontables aptas para
          lavavajillas, evaluamos control de humo en departamentos y listamos
          placas de repuesto, pinzas de silicona y termómetros compatibles.
        </li>
      </ul>

      <h2>3. Actualizaciones y contacto</h2>
      <p>
        Si detectas una nueva versión de un modelo o quieres sugerir una
        comparativa específica, escríbenos a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
