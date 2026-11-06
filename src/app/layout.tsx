import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biztra Business Advisory | Professional Advisory & Consulting in Nepal",
  description:
    "Biztra Business Advisory helps businesses across Nepal build stronger financial systems, maintain compliance, optimize operations, and achieve sustainable growth through professional, practical, and globally aligned advisory solutions.",
  keywords: [
    "Biztra Business Advisory",
    "business advisory Nepal",
    "consulting Kathmandu",
    "statutory audit Nepal",
    "accounting advisory",
    "taxation compliance Nepal",
    "financial modeling",
    "Chartered Accountant Nepal",
    "corporate consulting Nepal",
  ],
  authors: [{ name: "Biztra Business Advisory" }],
  creator: "Biztra Business Advisory",
  metadataBase: new URL("https://biztra.com.np"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/biztra-mark.svg", type: "image/svg+xml" },
    ],
    shortcut: "/biztra-mark.svg",
    apple: "/biztra-mark.svg",
  },
  openGraph: {
    title: "Biztra Business Advisory | Professional Advisory & Consulting in Nepal",
    description:
      "Transforming businesses through smarter advisory & financial practices. Statutory audit, accounting, taxation, financial modeling and strategic consulting across Nepal.",
    url: "https://biztra.com.np",
    siteName: "Biztra Business Advisory",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biztra Business Advisory",
    description:
      "Professional advisory. Practical solutions. Sustainable growth. Kathmandu, Nepal.",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`
            /* Make all content visible if JS is disabled */
            [style*="opacity: 0"],
            [style*="opacity:0"] {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
