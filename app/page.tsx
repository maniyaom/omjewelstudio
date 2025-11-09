export const dynamic = "force-dynamic";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";

// SEO Metadata for Homepage
export const metadata: Metadata = {
  title: "Premium Lab Grown Diamonds & Diamond Jewellery",
  description: "Om Jewel Studio offers certified lab grown diamonds, HPHT & CVD diamonds, fancy shape diamonds, round diamonds, fancy colour diamonds. Explore diamond rings, wedding rings, earrings, and pendants. Contact us for custom diamond jewellery.",
  keywords: [
    "lab grown diamond",
    "certified diamond",
    "HPHT diamond",
    "CVD diamond",
    "fancy shape diamond",
    "round shape diamond",
    "fancy colour diamond",
    "polished diamond",
    "diamond ring",
    "wedding ring",
    "diamond jewellery",
    "diamond earrings",
    "diamond pendant",
    "non-certified diamond"
  ],
  openGraph: {
    title: "Om Jewel Studio | Premium Lab Grown Diamonds",
    description: "Certified lab grown diamonds - HPHT, CVD, fancy shape & fancy colour diamonds. Diamond rings, earrings, and pendants.",
    url: "https://www.omjewelstudio.co.in",
    siteName: "Om Jewel Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Om Jewel Studio Diamond Collection",
      }
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://www.omjewelstudio.co.in",
  },
};

export default async function Home() {
  const categories = [
    {
      id: "diamond-rings",
      name: "Diamond Rings",
      image: "/home/diamond-ring.jpg",
      route: "/diamond-rings",
      description: "Symbol of eternal love",
    },
    {
      id: "pendants",
      name: "Pendants",
      image: "/home/pendant.jpg",
      route: "/pendants",
      description: "Elegance close to heart",
    },
    {
      id: "earrings",
      name: "Earrings",
      image: "/home/earring.jpg",
      route: "/earrings",
      description: "Frame your beauty",
    },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const featuredProducts = await fetch(
    `${baseUrl}/api/products/get-all-products?featured=true`,
    {
      next: { revalidate: 300 },
    }
  );
  const data = await featuredProducts.json();

  // Schema.org structured data for homepage
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Om Jewel Studio",
    "url": "https://www.omjewelstudio.co.in",
    "logo": "https://www.omjewelstudio.co.in/logo.png",
    "description": "Premium lab grown diamonds, certified HPHT & CVD diamonds, diamond jewellery including rings, earrings, and pendants.",
    "specialty": [
      "Lab Grown Diamonds",
      "HPHT Diamonds",
      "CVD Diamonds",
      "Fancy Shape Diamonds",
      "Round Diamonds",
      "Fancy Colour Diamonds",
      "Certified Diamonds",
      "Diamond Rings",
      "Wedding Rings",
      "Diamond Earrings",
      "Diamond Pendants"
    ]
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
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="organization-schema-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <Script
        id="breadcrumb-schema-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      <div className="bg-white">
        {/* Hero Section with SEO-optimized content */}
        <section 
          className="relative h-[60vh] sm:h-[70vh] lg:h-[85vh] flex items-center justify-center overflow-hidden"
          aria-label="Hero banner showcasing Om Jewel Studio diamond collection"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1175"
            alt="Premium lab grown diamonds and diamond jewellery collection by Om Jewel Studio"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="relative z-20 text-center text-white px-4 sm:px-6">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold mb-4 sm:mb-6 tracking-wide">
              Premium Lab Grown Diamonds & Jewellery
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto font-light">
              Certified HPHT & CVD Diamonds | Fancy Shape & Fancy Colour Diamonds | Custom Diamond Rings, Earrings & Pendants
            </p>
            <Link
              href="/diamond-rings"
              className="inline-block bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all hover:scale-105"
              aria-label="Explore our diamond rings collection"
            >
              Explore Collection
            </Link>
          </div>
        </section>

        {/* Collections Section with semantic HTML */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-white">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">
              Diamond Jewellery Collections
            </h2>
            <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto">
              Explore our premium collection of diamond rings, earrings, and pendants featuring lab grown diamonds, fancy shape diamonds, and fancy colour diamonds
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {categories.map((category) => (
              <article
                key={category.id}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Link 
                  href={category.route}
                  aria-label={`View ${category.name} collection - ${category.description}`}
                >
                  <img
                    src={category.image}
                    alt={`${category.name} collection featuring certified lab grown diamonds - ${category.description}`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white text-left">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold mb-1 sm:mb-2">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-200 opacity-90">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section 
          className="max-w-7xl mx-auto px-6 py-16"
          aria-labelledby="featured-heading"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 id="featured-heading" className="text-3xl font-bold text-gray-900 mb-2">
                Featured Lab Grown Diamonds
              </h2>
              <p className="text-gray-600">
                Our most popular certified diamonds - HPHT, CVD, fancy shape and fancy colour diamonds
              </p>
            </div>
          </div>

          {data.products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {data.products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Contact us to explore our diamond collection
              </p>
            </div>
          )}
        </section>

        {/* SEO Content Section - Hidden visually but readable by search engines */}
        <section className="max-w-7xl mx-auto px-6 py-12 bg-gray-50">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About Om Jewel Studio - Premium Lab Grown Diamonds
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold mb-3">Lab Grown Diamonds</h3>
                <p className="mb-4">
                  We specialize in premium lab grown diamonds including HPHT diamonds (High Pressure High Temperature) and CVD diamonds (Chemical Vapor Deposition). Our certified diamonds offer exceptional quality and value.
                </p>
                <h3 className="text-xl font-semibold mb-3">Diamond Varieties</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Fancy shape diamonds - princess, emerald, oval, pear, and more</li>
                  <li>Round shape diamonds - classic brilliant cut</li>
                  <li>Fancy colour diamonds - yellow, pink, blue, and rare colors</li>
                  <li>Certified diamonds with authenticity certificates</li>
                  <li>Non-certified diamonds for budget-conscious buyers</li>
                  <li>Polished diamonds ready for setting</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Our Jewellery Collection</h3>
                <p className="mb-4">
                  Browse our exquisite collection of diamond jewellery including diamond rings, wedding rings, engagement rings, diamond earrings, and diamond pendants. Each piece features carefully selected lab grown diamonds.
                </p>
                <h3 className="text-xl font-semibold mb-3">Why Choose Us</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Premium quality lab grown diamonds</li>
                  <li>HPHT and CVD certified diamonds</li>
                  <li>Wide selection of fancy shape and fancy colour diamonds</li>
                  <li>Custom diamond jewellery design services</li>
                  <li>Expert guidance for selecting the perfect diamond</li>
                  <li>Competitive pricing on all diamond products</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section 
          className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-6"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="contact-heading" className="text-4xl font-bold mb-4">
              Looking for Certified Lab Grown Diamonds?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact us to discuss your requirements for fancy shape diamonds, fancy colour diamonds, diamond rings, or custom diamond jewellery
            </p>
            <Link
              href="/contact-us"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              aria-label="Contact Om Jewel Studio for diamond inquiries"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}