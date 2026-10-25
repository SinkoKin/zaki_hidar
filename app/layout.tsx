import type { Metadata, Viewport } from "next";
import { Archivo, Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";
import "./home.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

const description =
  "Only Zeko, known as Zakaria, is a calisthenics athlete and personal trainer from Marrakech. Explore his training, handstands, planche work and coaching enquiries.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Only Zeko / Calisthenics Athlete & Coach, Marrakech",
    template: "%s / Only Zeko",
  },
  description,
  applicationName: "Only Zeko",
  authors: [{ name: "Only Zeko", url: site.brand.instagram }],
  creator: "Only Zeko",
  publisher: "Only Zeko",
  category: "Sports",
  keywords: [
    "Only Zeko",
    "Zakaria",
    "calisthenics Marrakech",
    "personal trainer Marrakech",
    "calisthenics athlete",
    "handstand coach",
    "planche training",
    "bodyweight training",
    "JAMS Marrakech",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "/",
    siteName: "Only Zeko",
    title: "Only Zeko / Calisthenics Athlete & Coach",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Only Zeko / Calisthenics Athlete & Coach",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Only Zeko",
  alternateName: "Zakaria",
  jobTitle: "Calisthenics athlete and personal trainer",
  description,
  url: site.url,
  sameAs: [site.brand.instagram, site.brand.jams],
  homeLocation: {
    "@type": "Place",
    name: "Marrakech, Morocco",
  },
  affiliation: {
    "@type": "SportsOrganization",
    name: "J.A.M.S. Marrakech",
    alternateName: "Jeunes Athlètes Marrakchis Du Street",
    url: site.brand.jams,
  },
  knowsAbout: [
    "Calisthenics",
    "Handstand",
    "One-arm handstand",
    "Planche",
    "Bodyweight training",
    "Balance",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
