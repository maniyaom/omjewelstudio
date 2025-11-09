import { Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

// SEO Metadata for Contact Page
export const metadata: Metadata = {
  title: "Contact Us | Om Jewel Studio | Lab Grown Diamond Inquiries",
  description: "Contact Om Jewel Studio for inquiries about lab grown diamonds, HPHT & CVD diamonds, diamond rings, earrings, pendants. Call +91 9998448075 or email for custom diamond jewellery consultations.",
  keywords: [
    "contact om jewel studio",
    "diamond jewellery inquiry",
    "lab grown diamond contact",
    "HPHT diamond inquiry",
    "CVD diamond contact",
    "diamond ring inquiry",
    "custom diamond jewellery",
    "diamond consultation",
    "certified diamond inquiry",
    "fancy shape diamond contact"
  ],
  openGraph: {
    title: "Contact Om Jewel Studio | Lab Grown Diamond Inquiries",
    description: "Get in touch for lab grown diamonds, HPHT & CVD diamonds, diamond rings, earrings, and pendants. Expert consultation available.",
    url: "https://www.omjewelstudio.co.in/contact-us",
    siteName: "Om Jewel Studio",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Om Jewel Studio",
      }
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://www.omjewelstudio.co.in/contact-us",
  },
};

export default function ContactUs() {
  // Structured Data for Contact Page
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Om Jewel Studio",
    "description": "Contact us for inquiries about lab grown diamonds, HPHT & CVD diamonds, diamond rings, earrings, and pendants",
    "url": "https://www.omjewelstudio.co.in/contact-us",
    "mainEntity": {
      "@type": "Organization",
      "name": "Om Jewel Studio",
      "url": "https://www.omjewelstudio.co.in",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9998448075",
        "contactType": "Customer Service",
        "email": "yogeshmaniya503@gmail.com",
        "availableLanguage": ["English", "Hindi"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "10:00",
          "closes": "19:00"
        },
        "areaServed": {
          "@type": "Country",
          "name": "India"
        }
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
        "name": "Contact Us",
        "item": "https://www.omjewelstudio.co.in/contact-us"
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema)
        }}
      />
      <Script
        id="breadcrumb-schema-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Breadcrumb Navigation for SEO */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 py-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-gray-900" aria-current="page">
              Contact Us
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Contact Om Jewel Studio
            </h1>
            <p className="text-xl text-gray-600">
              Inquire about lab grown diamonds, HPHT & CVD diamonds, diamond rings, earrings, and pendants
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Have questions about our lab grown diamonds, fancy shape diamonds, fancy colour diamonds, or custom diamond jewellery? We'd love to hear from you. Contact us for expert consultation on HPHT diamonds, CVD diamonds, certified diamonds, diamond rings, earrings, and pendants.
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                <div 
                  className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg border border-gray-100"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div className="bg-gray-900 p-3 rounded-full">
                    <Phone size={24} className="text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a 
                      href="tel:+919998448075"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      itemProp="telephone"
                      aria-label="Call us at +91 9998448075"
                    >
                      +91 9998448075
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      Mon-Sat, 10am-7pm IST
                    </p>
                    <meta itemProp="contactType" content="Customer Service" />
                  </div>
                </div>

                {/* Email */}
                <div 
                  className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg border border-gray-100"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div className="bg-gray-900 p-3 rounded-full">
                    <Mail size={24} className="text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a 
                      href="mailto:yogeshmaniya503@gmail.com"
                      className="text-gray-600 hover:text-gray-900 transition-colors break-all"
                      itemProp="email"
                      aria-label="Email us at yogeshmaniya503@gmail.com"
                    >
                      yogeshmaniya503@gmail.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      We'll respond within 24 hours
                    </p>
                    <meta itemProp="contactType" content="Customer Service" />
                  </div>
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What We Offer
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Lab Grown Diamonds (HPHT & CVD)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Certified and Non-Certified Diamonds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Fancy Shape & Fancy Colour Diamonds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Diamond Rings & Wedding Rings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Diamond Earrings & Pendants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Custom Diamond Jewellery Design</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What types of diamonds do you offer?
              </h3>
              <p className="text-gray-600 text-sm">
                We specialize in lab grown diamonds including HPHT diamonds, CVD diamonds, fancy shape diamonds (princess, emerald, oval, pear), round diamonds, and fancy colour diamonds (yellow, pink, blue). Both certified and non-certified options available.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I get pricing information?
              </h3>
              <p className="text-gray-600 text-sm">
                Contact us via phone (+91 9998448075) or email (yogeshmaniya503@gmail.com) with your requirements. We'll provide detailed pricing and diamond specifications.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer custom diamond jewellery?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes! We create custom diamond rings, earrings, and pendants. Share your design ideas and we'll help bring them to life with our certified lab grown diamonds.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are your diamonds certified?
              </h3>
              <p className="text-gray-600 text-sm">
                We offer both certified and non-certified lab grown diamonds. Our certified diamonds come with authentication from recognized gemological laboratories.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Diamond?
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Browse our collections of diamond rings, earrings, and pendants
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/diamond-rings"
                className="inline-block bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                View Diamond Rings
              </Link>
              <Link
                href="/earrings"
                className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                View Earrings
              </Link>
              <Link
                href="/pendants"
                className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                View Pendants
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}