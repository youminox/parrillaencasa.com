import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Privacidad | ParrillaEnCasa.com",
  description: `Política de privacidad y protección de datos personales de ParrillaEnCasa.com, propiedad de ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function PrivacidadPage() {
  return (
    <SimplePage
      title="Política de Privacidad"
      crumb="Política de privacidad"
      href="/politica-de-privacidad/"
      intro="Cómo tratamos y protegemos las consultas técnicas y el uso del Asesor IA en ParrillaEnCasa.com."
    >
      <h2>1. Responsable del tratamiento de datos</h2>
      <ul>
        <li>
          <strong>Titular responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico para ejercicio de derechos:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>2. Qué datos recopilamos y con qué finalidad</h2>
      <p>
        En ParrillaEnCasa.com no solicitamos registros obligatorios, tarjetas de
        pago ni cuentas de usuario. Únicamente procesamos los siguientes datos
        mínimos indispensables:
      </p>
      <ul>
        <li>
          <strong>Consultas en el Asesor de Parrillas IA:</strong> los mensajes
          enviados voluntariamente al chat en línea, junto con un identificador
          anónimo de sesión y la URL de origen, se procesan para responder tus
          dudas sobre parrillas eléctricas, espacio, humo, limpieza y repuestos,
          y mejorar nuestras comparativas. Te recomendamos no introducir datos
          personales sensibles en el chat.
        </li>
        <li>
          <strong>Comunicaciones por correo electrónico:</strong> si nos
          escribes a <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>,
          usaremos tu dirección exclusivamente para responder tu solicitud.
        </li>
        <li>
          <strong>Métricas técnicas y atribución de afiliados:</strong> registro
          agregado de clics salientes hacia guías del portal y productos de
          Amazon para medir la utilidad editorial.
        </li>
      </ul>

      <h2>3. Normativa aplicable y derechos del usuario</h2>
      <p>
        Esta política cumple con la Ley N.º 29733 (Ley de Protección de Datos
        Personales del Perú), así como con los principios internacionales del
        RGPD y leyes estatales de privacidad en Estados Unidos (CCPA/CPRA).
        Puedes solicitar acceso, rectificación, cancelación u oposición sobre
        cualquier dato asociado a tu correo escribiendo en cualquier momento a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
