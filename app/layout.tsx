import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nshd-portfolio.vercel.app"),
  title: {
    default: "N S H D — Creative Intelligence",
    template: "%s — N S H D"
  },
  description:
    "Portfolio of N S H D — poster designer, creative editor, vibe coder, AI explorer and pharmaceutical science student in Kerala, India.",
  keywords: [
    "N S H D",
    "NSHD",
    "Poster Designer",
    "Graphic Designer",
    "Creative Editor",
    "AI Specialist",
    "Prompt Engineer",
    "Vibe Coder",
    "Creative Developer",
    "Pharmacy Student",
    "Kerala Designer",
    "AI Creative Portfolio"
  ],
  openGraph: {
    title: "N S H D — Creative Intelligence",
    description: "Design × AI × Code × Science.",
    type: "website",
    locale: "en_IN",
    siteName: "N S H D"
  },
  twitter: {
    card: "summary_large_image",
    title: "N S H D — Creative Intelligence",
    description: "Design × AI × Code × Science."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "N S H D",
    url: "https://github.com/whitesr09",
    jobTitle: "Multidisciplinary Creative",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Kerala",
      addressCountry: "IN"
    },
    sameAs: [
      "https://github.com/whitesr09",
      "https://www.instagram.com/__nshd.__",
      "https://t.me/nshd_0"
    ]
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
