import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import OpenChatButton from "@/components/OpenChatButton";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto Oficial | ParrillaEnCasa.com",
  description: `Comunícate con ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION}, al email ${LEGAL_EMAIL} o consulta a nuestro Asesor de Parrillas IA.`,
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function ContactoPage() {
  return (
    <SimplePage
      title="Contacto"
      crumb="Contacto"
      href="/contacto/"
      intro="¿Tienes consultas sobre modelos de parrillas eléctricas, medidas en cocina, placas de repuesto o aspectos legales del sitio? Aquí nos encuentras."
    >
      <h2>1. Datos de contacto oficial</h2>
      <ul>
        <li>
          <strong>Titular responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>2. Recomendación instantánea 24/7 antes de comprar en Amazon</h2>
      <p>
        Si deseas saber ahora mismo qué modelo de George Foreman, Cuisinart,
        Hamilton Beach o Ninja encaja mejor con el espacio de tu departamento,
        tu presupuesto y el número de porciones que cocinas —junto a sus pinzas,
        termómetro y placas de repuesto compatibles—, habla con nuestro{" "}
        <strong>Asesor de Parrillas IA</strong>:
      </p>
      <div className="my-6">
        <OpenChatButton
          label="Abrir Asesor de Parrillas IA Ahora"
          className="btn btn-buy shine"
        />
      </div>
    </SimplePage>
  );
}
