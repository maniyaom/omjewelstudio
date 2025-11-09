export const dynamic = "force-dynamic";

import CategoryPage from "@/components/Category";
import { categoryInfo } from "@/data";
import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

interface EarringsPageProps {
  searchParams: { page?: string };
}

// SEO Metadata for Diamond Earrings Page
export const metadata: Metadata = {
  title: "Diamond Earrings | Lab Grown Diamond Earrings | Fancy Shape Earrings",
  description: "Stunning diamond earrings featuring certified lab grown diamonds. HPHT & CVD diamond earrings, fancy shape diamond earrings, round diamond earrings, fancy colour diamond earrings. Perfect for every occasion. Contact for custom designs.",
  keywords: [
    "diamond earrings",
    "lab grown diamond earrings",
    "HPHT diamond earrings",
    "CVD diamond earrings",
    "fancy shape diamond earrings",
    "round shape diamond earrings",
    "fancy colour diamond earrings",
    "certified diamond earrings",
    "polished diamond earrings",
    "diamond jewellery",
    "stud earrings",
    "drop earrings",
    "diamond studs",
    "custom diamond earrings"
  ],
  openGraph: {
    title: "Diamond Earrings | Lab Grown Diamond Earrings - Om Jewel Studio",
    description: "Premium diamond earrings with certified lab grown diamonds - HPHT, CVD, fancy shape & fancy colour. Elegant designs for every occasion.",
    url: "https://www.omjewelstudio.co.in/earrings",
    siteName: "Om Jewel Studio",
    images: [
      {
        url: "/og-earrings.jpg", // Add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Diamond Earrings Collection - Om Jewel Studio",
      }
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://www.omjewelstudio.co.in/earrings",
  },
};

export default function Earrings({ searchParams }: EarringsPageProps) {
  const info = categoryInfo["earrings"];

  // Structured Data for Diamond Earrings Collection
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Diamond Earrings Collection",
    "description": "Premium diamond earrings featuring certified lab grown diamonds - HPHT, CVD, fancy shape and fancy colour diamond earrings",
    "url": "https://www.omjewelstudio.co.in/earrings",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Om Jewel Studio",
      "url": "https://www.omjewelstudio.co.in"
    },
    "about": {
      "@type": "Product",
      "name": "Diamond Earrings",
      "category": "Jewelry",
      "brand": {
        "@type": "Brand",
        "name": "Om Jewel Studio"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.omjewelstudio.co.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Diamond Earrings",
        "item": "https://www.omjewelstudio.co.in/earrings"
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Diamond Earrings Collection",
    "description": "Lab grown diamond earrings - HPHT, CVD, fancy shape and fancy colour diamond earrings for every occasion",
    "numberOfItems": "Contact for full catalog",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "Lab Grown Diamond Earrings",
          "category": "Diamond Earrings",
          "brand": "Om Jewel Studio"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "HPHT Diamond Earrings",
          "category": "Diamond Earrings",
          "brand": "Om Jewel Studio"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Product",
          "name": "CVD Diamond Earrings",
          "category": "Diamond Earrings",
          "brand": "Om Jewel Studio"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Product",
          "name": "Fancy Shape Diamond Earrings",
          "category": "Diamond Earrings",
          "brand": "Om Jewel Studio"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Product",
          "name": "Fancy Colour Diamond Earrings",
          "category": "Diamond Earrings",
          "brand": "Om Jewel Studio"
        }
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="collection-schema-earrings"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema)
        }}
      />
      <Script
        id="breadcrumb-schema-earrings"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <Script
        id="product-schema-earrings"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />

      <div className="bg-white">
        {/* Breadcrumb Navigation for SEO */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-gray-900" aria-current="page">
              Diamond Earrings
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section 
          className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden"
          aria-label="Diamond earrings collection hero banner"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent z-10" />
          <img
            src={info.hero}
            alt="Premium lab grown diamond earrings featuring HPHT and CVD diamonds in fancy shapes and fancy colours"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="relative z-20 text-center text-white px-4 sm:px-6 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold mb-3 sm:mb-4 tracking-wide">
              {info.title}
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl font-light mb-2">
              {info.subtitle}
            </p>
          </div>
        </section>

        {/* Description Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:pt-12 lg:pt-16">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
              {info.description}
            </p>
          </div>
        </section>

        {/* SEO-Rich Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-gray-50 rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Lab Grown Diamond Earrings - HPHT & CVD Certified
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Diamond Earring Varieties
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Lab Grown Diamond Earrings</strong> - Premium HPHT and CVD diamonds</li>
                  <li><strong>Diamond Stud Earrings</strong> - Classic and timeless designs</li>
                  <li><strong>Drop Earrings</strong> - Elegant statement pieces</li>
                  <li><strong>Fancy Shape Diamond Earrings</strong> - Princess, emerald, oval, pear cuts</li>
                  <li><strong>Round Diamond Earrings</strong> - Classic brilliant cut diamonds</li>
                  <li><strong>Fancy Colour Diamond Earrings</strong> - Yellow, pink, blue diamonds</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Why Choose Our Diamond Earrings
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Certified lab grown diamonds (HPHT & CVD)</li>
                  <li>Both certified and non-certified options available</li>
                  <li>Polished diamonds with expert craftsmanship</li>
                  <li>Wide selection of fancy shapes and fancy colours</li>
                  <li>Perfect for daily wear and special occasions</li>
                  <li>Expert consultation for custom designs</li>
                </ul>
                <div className="mt-6">
                  <Link 
                    href="/contact-us" 
                    className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                    aria-label="Contact us about diamond earrings"
                  >
                    Contact Us for Diamond Earrings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <CategoryPage category="earrings" searchParams={searchParams} />

        {/* Internal Linking Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore More Diamond Jewellery
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link 
              href="/diamond-rings"
              className="group p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                Diamond Rings
              </h4>
              <p className="text-gray-600 text-sm">
                Explore our collection of diamond rings and wedding rings with lab grown diamonds
              </p>
            </Link>
            <Link 
              href="/pendants"
              className="group p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                Diamond Pendants
              </h4>
              <p className="text-gray-600 text-sm">
                Discover elegant diamond pendants with fancy shape and fancy colour diamonds
              </p>
            </Link>
            <Link 
              href="/"
              className="group p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                All Collections
              </h4>
              <p className="text-gray-600 text-sm">
                Browse our complete range of certified diamond jewellery
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}