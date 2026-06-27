import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import AtomCursor from "@/components/AtomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AtomPreloader from "@/components/AtomPreloader";

// Retaining original Geist variable setups for clean styling typography
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Comprehensive ontological metadata parameters
export const metadata: Metadata = {
  title: "Vaisheshika Darśana — Immersive Atomic Realism Matrix",
  description:
    "An interactive, spatial web exploration of ancient Indian atomism, naturalism, and the seven categories of ontological reality.",
  keywords: [
    "Vaisheshika",
    "Indian Philosophy",
    "Atomism",
    "Kanada",
    "Paramanu",
    "SaaS UI",
    "Three.js",
    "Next.js",
  ],
  authors: [{ name: "Creative Dev Team" }],
  openGraph: {
    title: "Vaisheshika Darśana — Immersive Atomic Realism Matrix",
    description:
      "Explore the 9 Dravyas and 7 Padārthas through an interactive 3D particle workspace.",
    type: "website",
    url: "https://vaisheshika-web.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inject structured JSON-LD schema data to improve indexing accuracy for structural philosophy terms
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    name: "Vaisheshika Digital Portal",
    description:
      "An interactive ontological matrix exploring Kanada's system of physical atomism.",
    applicationCategory: "Educational Application",
    operatingSystem: "All",
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100 selection:bg-amber-500 selection:text-black font-sans">
        <AtomPreloader />
        <Navbar />
        <AtomCursor />
        <div className="flex-1">{children}</div>
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}
