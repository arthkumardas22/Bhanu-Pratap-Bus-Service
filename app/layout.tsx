import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SITE_URL = "https://bhanu-pratap-bus-service.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0c0a08",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bhanu Pratap Bus Service | भानु प्रताप बस सर्विस | 90s Bollywood Night Drive Radio",
    template: "%s | Bhanu Pratap Bus Service",
  },
  description:
    "Experience Bhanu Pratap Bus Service (भानु प्रताप बस सर्विस) — an ambient late-night Indian highway journey radio featuring nostalgic 90s and 2000s Bollywood romantic hits by Kumar Sanu, Alka Yagnik, Udit Narayan, authentic truck horns, and cabin aesthetics.",
  applicationName: "Bhanu Pratap Bus Service",
  authors: [{ name: "Arth Kumar Das", url: "https://www.instagram.com/arth_kumar_das" }],
  generator: "Next.js",
  keywords: [
    // Brand & Identity
    "Bhanu Pratap Bus Service",
    "bhanu pratap bus service",
    "bhanu pratap bus",
    "bhanu pratap",
    "भानु प्रताप बस सर्विस",
    "भानु प्रताप बस",
    "bhanu pratap songs",
    "bhanu pratap radio",
    "bhanu pratap bus website",
    "bhanu pratap live",
    // 90s & 2000s Bollywood Music
    "90s Bollywood songs",
    "90s Hindi songs radio",
    "90s Bollywood romantic hits",
    "golden era Bollywood songs",
    "vintage Hindi songs online",
    "retro Bollywood music player",
    "Kumar Sanu romantic songs",
    "Alka Yagnik hits",
    "Udit Narayan 90s songs",
    "Mohammad Aziz hits",
    "Anuradha Paudwal songs",
    // Atmosphere & Vibe
    "night drive Bollywood songs",
    "late night Hindi road trip songs",
    "Indian highway night drive radio",
    "cassette nostalgia Hindi",
    "Bollywood lofi ambient player",
    "highway bus cabin radio",
    "All India Tourist Permit bus",
    "Indian truck horn soundboard",
    "real truck horn sound online",
    "spinning vinyl Bollywood player",
    "Hindi bus journey songs",
    "long drive Hindi songs playlist",
    "old memories Hindi songs",
    "sad romantic Hindi songs 90s",
    "2 AM Hindi solitude melodies",
    "Arth Kumar Das",
  ],
  creator: "Arth Kumar Das",
  publisher: "Bhanu Pratap Bus Service",
  category: "Music & Entertainment",
  classification: "Web Music Player / Online Radio",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Bhanu Pratap Bus Service",
    title: "Bhanu Pratap Bus Service | भानु प्रताप बस सर्विस | 90s Bollywood Night Drive Radio",
    description:
      "A nostalgic late-night Indian highway journey set inside the cabin of Bhanu Pratap Bus Service. Curated 90s Bollywood romantic hits, authentic truck horns, and ambient aesthetic controls.",
    images: [
      {
        url: "/bhanu-pratap-manthan-white.png",
        width: 1200,
        height: 630,
        alt: "Bhanu Pratap Bus Service - भानु प्रताप बस सर्विस",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhanu Pratap Bus Service | 90s Bollywood Night Drive Radio",
    description:
      "A quiet late-night journey through Bhanu Pratap Bus Service with nostalgic 90s Bollywood melodies and real highway truck horns.",
    images: ["/bhanu-pratap-manthan-white.png"],
    creator: "@arth_kumar_das",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/bhanu-pratap-manthan-white.png",
    apple: "/bhanu-pratap-manthan-white.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Bhanu Pratap Bus Service",
      alternateName: [
        "भानु प्रताप बस सर्विस",
        "Bhanu Pratap Bus",
        "Bhanu Pratap Radio",
        "Bhanu Pratap Night Drive",
      ],
      description:
        "An aesthetic late-night Indian highway journey radio streaming vintage 90s and 2000s Bollywood romantic hits with authentic truck horns and ambient cabin atmosphere.",
      inLanguage: ["en-IN", "hi-IN"],
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      name: "Bhanu Pratap Bus Service",
      url: SITE_URL,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All",
      browserRequirements: "Requires HTML5 audio/video and JavaScript.",
      genre: ["Bollywood", "90s Music", "Indian Classical", "Nostalgic Hindi", "Ambient"],
      author: {
        "@type": "Person",
        name: "Arth Kumar Das",
        url: "https://www.instagram.com/arth_kumar_das",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Bhanu Pratap Bus Service",
      url: SITE_URL,
      logo: `${SITE_URL}/bhanu-pratap-manthan-white.png`,
      sameAs: [
        "https://www.instagram.com/arth_kumar_das",
        "https://open.spotify.com/playlist/3UscpYFv3y4jxQWDpJA20d",
      ],
    },
    {
      "@type": "MusicPlaylist",
      "@id": `${SITE_URL}/#playlist`,
      name: "Bhanu Pratap Bus Service - 90s Highway Classics",
      description: "Curated collection of 90s & 2000s Bollywood nostalgic road trip hits by Kumar Sanu, Alka Yagnik, and Udit Narayan.",
      numTracks: 30,
      genre: "Bollywood 90s",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* High-priority LCP preloads */}
        <link rel="preload" as="image" href="/bhanu-pratap-manthan-white.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/bg/scene-poster.jpg" fetchPriority="high" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Kalam:wght@400;700&family=Rozha+One&family=Yatra+One&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
