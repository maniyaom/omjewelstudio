"use client";
import { Phone, Mail, Tag } from "lucide-react";
import { Product, categories } from "../types";
import { useEffect, useRef, useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);

          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {
                // Autoplay failed, which is expected in some browsers
              });
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:+919998448075`;
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `mailto:yogeshmaniya503@gmail.com`;
  };

  // Generate SEO-friendly alt text based on product details
  const getAltText = () => {
    const categoryName = categories[product.category] || "diamond";
    return `${product.name} - ${categoryName} featuring lab grown diamonds at Om Jewel Studio`;
  };

  // Generate descriptive aria-label for the product card
  const getAriaLabel = () => {
    const categoryName = categories[product.category] || "diamond jewellery";
    return `${product.name} - ${categoryName}${
      product.isFeatured ? " - Popular item" : ""
    }. Contact us via phone or email for pricing and details.`;
  };

  return (
    <article
      ref={cardRef}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      aria-label={getAriaLabel()}
      itemScope
      itemType="https://schema.org/Thing"
    >
      {/* Hidden meta tags for SEO */}
      <meta itemProp="name" content={product.name} />
      <meta itemProp="category" content={categories[product.category]} />

      <div className="relative overflow-hidden aspect-square">
        {product.isFeatured && (
          <div
            className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 text-xs font-semibold rounded-full z-10"
            aria-label="Popular product"
          >
            POPULAR
          </div>
        )}

        {product.videoURL ? (
          <video
            ref={videoRef}
            src={product.videoURL}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loop
            muted
            playsInline
            aria-label={`Video showcase of ${product.name}`}
            itemProp="video"
          />
        ) : (
          <img
            src={product.imageURL}
            alt={getAltText()}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            itemProp="image"
          />
        )}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Tag size={14} className="text-gray-500" aria-hidden="true" />
          <span
            className="text-xs font-medium text-gray-600 uppercase tracking-wide"
            itemProp="category"
          >
            {categories[product.category]}
          </span>
        </div>

        <h3
          className="text-lg font-semibold text-gray-900 mb-2"
          itemProp="name"
        >
          {product.name}
        </h3>

        {/* Offer schema for contact-based pricing */}
        <div>
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={handleCall}
              className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200"
              aria-label={`Call us to inquire about ${product.name}`}
              type="button"
            >
              <Phone size={18} aria-hidden="true" />
              <span>Call for Price</span>
            </button>

            <button
              onClick={handleEmail}
              className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200"
              aria-label={`Email us to inquire about ${product.name}`}
              type="button"
            >
              <Mail size={18} aria-hidden="true" />
              <span>Email for Details</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
