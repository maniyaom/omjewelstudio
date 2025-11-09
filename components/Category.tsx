export const revalidate = 300; // 5 minutes cache for full page

import { CategoryType, Product } from "../types";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

interface CategoryPageProps {
  category: CategoryType;
  searchParams: { page?: string };
}

// Category display names for SEO
const categoryDisplayNames: Record<CategoryType, string> = {
  "diamond-rings": "Diamond Rings",
  "earrings": "Diamond Earrings",
  "pendants": "Diamond Pendants",
};

// SEO-friendly category descriptions
const categoryDescriptions: Record<CategoryType, string> = {
  "diamond-rings": "Browse our collection of premium diamond rings featuring certified lab grown diamonds - HPHT, CVD, fancy shape and fancy colour diamonds",
  "earrings": "Explore our stunning diamond earrings collection with lab grown diamonds in fancy shapes and fancy colours",
  "pendants": "Discover elegant diamond pendants featuring certified lab grown diamonds in various shapes and colours",
};

export default async function CategoryPage({
  category,
  searchParams,
}: CategoryPageProps) {
  const page = parseInt(searchParams.page || "1");
  const limit = 10;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/products/get-all-products?category=${category}&page=${page}&limit=${limit}`,
    {
      next: { revalidate: 300 }, // 5 minutes cache for API fetch
    }
  );

  const data = await response.json();
  const totalPages = Math.ceil(data.total / limit);
  
  const categoryName = categoryDisplayNames[category];
  const categoryDescription = categoryDescriptions[category];

  return (
    <div>
      <section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        aria-labelledby="collection-heading"
      >
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 
              id="collection-heading"
              className="text-xl sm:text-2xl font-serif font-semibold text-gray-900"
            >
              {categoryName} Collection
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {data.total} {data.total === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
          
          {/* SEO-friendly category description */}
          <p className="text-sm text-gray-600 max-w-3xl">
            {categoryDescription}
            {page > 1 && ` - Page ${page} of ${totalPages}`}
          </p>
        </div>

        {data.products?.length > 0 ? (
          <>
            {/* Product Grid with semantic HTML */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              role="list"
              aria-label={`${categoryName} products`}
            >
              {data.products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination with SEO-friendly structure */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  category={category}
                />
                
                {/* SEO Helper Text (hidden visually but readable by search engines) */}
                <div className="sr-only" aria-live="polite">
                  Viewing page {page} of {totalPages} in {categoryName} collection. 
                  Total {data.total} lab grown diamond products available.
                </div>
              </div>
            )}

            {/* Additional SEO Context for Paginated Pages */}
            {page > 1 && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  Showing {categoryName.toLowerCase()} {((page - 1) * limit) + 1} to {Math.min(page * limit, data.total)} of {data.total} total products
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <p className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                No Products Available
              </p>
              <p className="text-gray-600 mb-6">
                We're currently updating our {categoryName.toLowerCase()} collection. 
                Check back soon or contact us for custom orders.
              </p>
              <a 
                href="/contact-us"
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                aria-label="Contact us for custom diamond jewellery"
              >
                Contact Us for Custom Orders
              </a>
            </div>
          </div>
        )}

        {/* Additional SEO Content for Product Categories */}
        {data.products?.length > 0 && page === 1 && (
          <aside className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              About Our {categoryName}
            </h3>
            <div className="text-sm text-gray-700 space-y-2">
              {category === "diamond-rings" && (
                <>
                  <p>
                    Our diamond rings collection features premium lab grown diamonds including HPHT diamonds and CVD diamonds. 
                    Choose from fancy shape diamonds (princess, emerald, oval, pear), round shape diamonds, and fancy colour diamonds 
                    in yellow, pink, and blue. Both certified and non-certified diamonds available.
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Perfect for engagement rings, wedding rings, and special occasions. All polished diamonds are ready for custom settings.
                  </p>
                </>
              )}
              
              {category === "earrings" && (
                <>
                  <p>
                    Explore our diamond earrings featuring certified lab grown diamonds. Available in HPHT and CVD diamonds 
                    with fancy shape options and fancy colour diamonds. From classic stud earrings to elegant drop designs.
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Each pair features polished diamonds with expert craftsmanship. Perfect for daily wear or special occasions.
                  </p>
                </>
              )}
              
              {category === "pendants" && (
                <>
                  <p>
                    Discover our diamond pendant collection with certified lab grown diamonds. Choose from HPHT diamonds, 
                    CVD diamonds, fancy shape diamonds, and fancy colour diamonds. Solitaire pendants and designer pieces available.
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    All pendants feature premium polished diamonds. Contact us for custom pendant designs with your preferred diamond specifications.
                  </p>
                </>
              )}
            </div>
          </aside>
        )}
      </section>
    </div>
  );
}