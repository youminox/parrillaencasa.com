import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre Nosotros | ParrillaEnCasa.com",
  description: `Conoce ParrillaEnCasa.com, propiedad de ${LEGAL_OWNER} (${LEGAL_LOCATION}), la guía en español de parrillas eléctricas de interior para casas y departamentos.`,
  alternates: { canonical: `${SITE_URL}/sobre-nosotros/` },
};

export default function SobreNosotrosPage() {
  return (
    <SimplePage
      title="Sobre ParrillaEnCasa.com"
      crumb="Sobre nosotros"
      href="/sobre-nosotros/"
      intro="Nacimos para ayudarte a elegir en español la parrilla eléctrica de interior perfecta para tu casa o departamento sin humo, sin compras equivocadas y con los accesorios exactos."
    >
      <h2>¿Por qué creamos ParrillaEnCasa.com?</h2>
      <p>
        Vivir en un departamento o en una casa sin patio ya no significa
        renunciar a un buen bife sellado, pollo jugoso o verduras asadas. Sin
        embargo, al buscar en Amazon Estados Unidos resulta difícil saber cuánto
        espacio real ocupa una parrilla al abrirla, si las placas se desmontan
        para lavarlas fácil, cuántas porciones caben en realidad o si va a
        activar la alarma de humo de la sala.
      </p>
      <p>
        En <strong>ParrillaEnCasa.com</strong> reunimos más de{" "}
        <strong>1,300 guías en español</strong> comparando las marcas líderes —
        <strong>George Foreman, Cuisinart, Hamilton Beach y Ninja</strong>— por
        precio, espacio, porciones simultáneas, control de humo, facilidad de
        limpieza y compatibilidad exacta de{" "}
        <strong>pinzas, termómetros y placas de repuesto</strong>.
      </p>

      <h2>Titular y responsable del portal</h2>
      <p>
        Este sitio web es propiedad y está dirigido por{" "}
        <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong>.
      </p>
      <ul>
        <li>
          <strong>Titular y Fundador:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio legal:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>
    </SimplePage>
  );
}
