import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Enhanced Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://www.omjewelstudio.co.in'),
  
  title: {
    default: "Om Jewel Studio | Certified Lab Grown Diamonds & Diamond Jewellery",
    template: "%s | Om Jewel Studio"
  },
  
  description: "Premium lab grown diamonds, HPHT & CVD certified diamonds, diamond rings, earrings, and pendants. Fancy shape diamonds, round diamonds, and fancy colour diamonds. Contact us for custom diamond jewellery.",
  
  keywords: [
    "fancy shape diamond",
    "round shape diamond", 
    "fancy colour diamond",
    "certified diamond",
    "non-certified diamond",
    "lab grown diamond",
    "HPHT diamond",
    "CVD diamond",
    "polished diamond",
    "diamond ring",
    "wedding ring",
    "diamond jewellery",
    "pendant",
    "diamond earrings",
    "Om Jewel Studio",
    "loose diamonds",
    "engagement rings"
  ],
  
  authors: [{ name: "Om Jewel Studio" }],
  
  creator: "Om Jewel Studio",
  
  publisher: "Om Jewel Studio",
  
  formatDetection: {
    email: true,
    telephone: true,
  },
  
  // Open Graph for Social Media
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.omjewelstudio.co.in",
    siteName: "Om Jewel Studio",
    title: "Om Jewel Studio | Certified Lab Grown Diamonds & Diamond Jewellery",
    description: "Premium lab grown diamonds - HPHT, CVD certified diamonds, diamond rings, earrings, pendants. Fancy shape & fancy colour diamonds available.",
    images: [
      {
        url: "/og-image.jpg", // Add this image to your public folder (1200x630px)
        width: 1200,
        height: 630,
        alt: "Om Jewel Studio - Lab Grown Diamonds",
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Om Jewel Studio | Certified Lab Grown Diamonds",
    description: "Premium lab grown diamonds, diamond rings, earrings, and pendants. HPHT & CVD certified diamonds.",
    images: ["/og-image.jpg"],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification (Add when you set up Google Search Console)
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  
  // Alternate languages (if you add Hindi/other languages later)
  alternates: {
    canonical: "https://www.omjewelstudio.co.in",
  },
  
  // Category
  category: "Jewellery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to important domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon variations */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#ffffff" />
        
        {/* JSON-LD Structured Data for Organization */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JewelryStore",
              "name": "Om Jewel Studio",
              "url": "https://www.omjewelstudio.co.in",
              "logo": "https://www.omjewelstudio.co.in/logo.png",
              "description": "Premium lab grown diamonds, HPHT & CVD certified diamonds, diamond rings, earrings, and pendants.",
              "priceRange": "Contact for pricing",
              "telephone": "Contact us for inquiries",
              "email": "Contact through website",
              "currenciesAccepted": "INR",
              "paymentAccepted": "Contact for payment options",
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Diamond Products",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Lab Grown Diamonds"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Diamond Rings"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Diamond Earrings"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Diamond Pendants"
                    }
                  }
                ]
              },
              "sameAs": [
                // Add your social media links here when available
                // "https://www.facebook.com/omjewelstudio",
                // "https://www.instagram.com/omjewelstudio",
              ]
            })
          }}
        />
        
        {/* Breadcrumb Schema (will be enhanced on individual pages) */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Om Jewel Studio",
              "url": "https://www.omjewelstudio.co.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.omjewelstudio.co.in/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}