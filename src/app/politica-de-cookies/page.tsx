import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Cookies | ParrillaEnCasa.com",
  description: `Información sobre almacenamiento local y cookies en ParrillaEnCasa.com (${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function CookiesPage() {
  return (
    <SimplePage
      title="Política de Cookies"
      crumb="Política de cookies"
      href="/politica-de-cookies/"
      intro="Detalle transparente sobre las cookies técnicas, almacenamiento local y cookies de atribución de Amazon en ParrillaEnCasa.com."
    >
      <h2>1. Titularidad del sitio</h2>
      <p>
        El sitio web <strong>ParrillaEnCasa.com</strong> pertenece a{" "}
        <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong>, con correo electrónico de contacto{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2>2. Almacenamiento técnico propio</h2>
      <p>
        ParrillaEnCasa.com emplea claves ligeras en el almacenamiento local de
        tu navegador (<code>localStorage</code> y <code>sessionStorage</code>)
        únicamente para recordar tu tienda Amazon preferida (
        <code>pec_amazon_region</code>: EE. UU. o España) y conservar el
        historial reciente de tu conversación con el Asesor de Parrillas IA (
        <code>pec_chat_session</code> y <code>pec_chat_messages</code>).
      </p>

      <h2>3. Cookies de terceros (Amazon y Google)</h2>
      <ul>
        <li>
          <strong>Amazon Associates:</strong> cuando haces clic voluntariamente
          en un enlace de afiliado hacia <code>amazon.com</code> o{" "}
          <code>amazon.es</code>, Amazon instala sus propias cookies en su
          dominio para atribuir las compras adscritas durante la ventana del
          programa.
        </li>
        <li>
          <strong>Google AdSense:</strong> el sitio puede mostrar espacios
          publicitarios gestionados por Google, que utiliza cookies para medir
          impresiones y mostrar anuncios acordes a sus políticas de privacidad.
        </li>
      </ul>

      <h2>4. Cómo desactivar o eliminar cookies</h2>
      <p>
        Puedes borrar los datos de sitio y bloquear cookies en cualquier momento
        desde los ajustes de privacidad de tu navegador. Para cualquier consulta
        escríbenos a <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
