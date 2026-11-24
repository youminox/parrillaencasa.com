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
  title: "Aviso Legal y Condiciones de Uso | ParrillaEnCasa.com",
  description: `Información legal oficial de ParrillaEnCasa.com, propiedad de ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function AvisoLegalPage() {
  return (
    <SimplePage
      title="Aviso Legal y Condiciones de Uso"
      crumb="Aviso legal"
      href="/aviso-legal/"
      intro="Identificación oficial del titular de ParrillaEnCasa.com, condiciones generales de uso, propiedad intelectual y recomendaciones de seguridad térmica y eléctrica en el hogar."
    >
      <h2>1. Datos identificativos del titular</h2>
      <p>
        En cumplimiento del deber de transparencia informativa aplicable a los
        servicios de la sociedad de la información y comercio electrónico, se
        informa que el portal web <strong>https://parrillaencasa.com</strong>{" "}
        (en adelante, <strong>ParrillaEnCasa.com</strong>) es propiedad y está
        operado por:
      </p>
      <ul>
        <li>
          <strong>Titular responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio legal:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial de contacto:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>2. Objeto y naturaleza informativa del sitio web</h2>
      <p>
        ParrillaEnCasa.com es una guía editorial independiente en español
        dedicada a ayudar a usuarios de casas y departamentos a elegir parrillas
        eléctricas de interior disponibles en Amazon Estados Unidos y Amazon
        España (modelos de George Foreman, Cuisinart, Hamilton Beach y Ninja),
        comparándolos según precio, espacio ocupado, porciones simultáneas y
        facilidad de limpieza, así como recomendando pinzas, termómetros y
        placas de repuesto compatibles.
      </p>

      <h2>3. Propiedad intelectual y marcas registradas</h2>
      <p>
        Los textos, tablas comparativas, diseño e infografías de este sitio
        están protegidos por derechos de autor a favor de {LEGAL_OWNER}. Todas
        las marcas comerciales mencionadas con fines estrictamente informativos
        y de compatibilidad (Amazon, George Foreman, Cuisinart, Hamilton Beach,
        Ninja, OXO, ThermoPro, MEATER y sus respectivas denominaciones de
        modelos o repuestos) pertenecen a sus legítimos titulares.
      </p>

      <h2>4. Enlaces de afiliación a Amazon</h2>
      <p>
        ParrillaEnCasa.com participa en el Programa de Afiliados de Amazon.com
        Associates (ID de seguimiento: <strong>{AMAZON_TAG_US}</strong>) y en el
        Programa de Afiliados de Amazon EU (ID de seguimiento:{" "}
        <strong>{AMAZON_TAG_ES}</strong>). Al hacer clic en enlaces hacia Amazon
        y completar compras adscritas que cumplan los requisitos aplicables, el
        titular recibe una comisión publicitaria sin incremento alguno en el
        precio para el usuario.
      </p>

      <h2>5. Seguridad eléctrica y uso doméstico</h2>
      <p>
        Los electrodomésticos térmicos de interior consumen entre 800 W y
        1.800 W. Antes de enchufar cualquier parrilla eléctrica adquirida en
        Amazon Estados Unidos (generalmente diseñada para 110V–120V ~ 60 Hz),
        el usuario debe leer el manual del fabricante, verificar el voltaje local
        (usando un transformador reductor de potencia adecuada si la red es de
        220V), conectar directamente a un tomacorriente de pared sin extensiones
        delgadas y utilizar siempre utensilios con puntas de silicona o nylon
        térmico para cuidar los recubrimientos antiadherentes.
      </p>
    </SimplePage>
  );
}
