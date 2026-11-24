import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  SITE_NAME,
  SITE_URL,
  OG_DEFAULT,
  organizationLd,
  personLd,
} from "@/lib/content";
import ParrillaEnCasaChatWidget from "@/components/ParrillaEnCasaChatWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { JsonLd } from "@/components/Breadcrumbs";

const outfit = localFont({
  src: "../fonts/Outfit-Variable-latin.woff2",
  variable: "--font-outfit",
  weight: "500 800",
  display: "swap",
});
const inter = localFont({
  src: "../fonts/Inter-Variable-latin.woff2",
  variable: "--font-inter",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "ParrillaEnCasa.com: Guía de Parrillas Eléctricas de Interior (George Foreman, Cuisinart, Hamilton Beach y Ninja) en Amazon EE. UU.",
    template: "%s",
  },
  description:
    "Guía en español para elegir parrillas eléctricas de interior para casas y departamentos. Compara George Foreman, Cuisinart, Hamilton Beach y Ninja según precio, espacio, porciones simultáneas y facilidad de limpieza, más pinzas, termómetros y placas de repuesto compatibles en Amazon EE. UU.",
  applicationName: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "es_US",
    siteName: SITE_NAME,
    url: `${SITE_URL}/`,
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "ParrillaEnCasa.com – Guía en Español de Parrillas Eléctricas de Interior en Amazon Estados Unidos",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: [
      "google07464c8c60a81e7a",
      "172C7_Myoxhj0Y7awkbiE22513T05NSfBYUdmPFvxgY",
    ],
  },
  other: {
    "google-adsense-account": "ca-pub-1070738569472471",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#18181B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1070738569472471"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased selection:bg-[#F97316] selection:text-[#09090B]">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: `${SITE_URL}/`,
                name: SITE_NAME,
                inLanguage: "es",
                publisher: { "@id": `${SITE_URL}/#org` },
              },
              organizationLd,
              personLd,
            ],
          }}
        />
        {children}
        <ParrillaEnCasaChatWidget />
        <SmoothScroll />
      </body>
    </html>
  );
}
