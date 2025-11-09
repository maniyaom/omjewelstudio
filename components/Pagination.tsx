// components/Pagination.tsx
import Link from "next/link";
import { CategoryType } from "../types";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category: CategoryType;
}

export default function Pagination({ currentPage, totalPages, category }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show 5 page numbers at a time
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={`?page=${currentPage - 1}`}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          Previous
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed text-sm font-medium"
        >
          Previous
        </button>
      )}
      
      {/* Page Numbers - Desktop */}
      <div className="hidden sm:flex gap-2">
        {/* First page + ellipsis */}
        {currentPage > 3 && (
          <>
            <Link
              href={`?page=1`}
              className="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              1
            </Link>
            {currentPage > 4 && <span className="px-2 py-2 text-gray-400">...</span>}
          </>
        )}
        
        {/* Page numbers */}
        {getPageNumbers().map((pageNum) => (
          <Link
            key={pageNum}
            href={`?page=${pageNum}`}
            className={`px-3 py-2 rounded-lg transition-colors text-sm ${
              pageNum === currentPage
                ? "bg-gray-900 text-white font-medium"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {pageNum}
          </Link>
        ))}
        
        {/* Last page + ellipsis */}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="px-2 py-2 text-gray-400">...</span>}
            <Link
              href={`?page=${totalPages}`}
              className="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              {totalPages}
            </Link>
          </>
        )}
      </div>
      
      {/* Mobile: Just show current page */}
      <span className="sm:hidden px-4 py-2 text-gray-700 text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      
      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={`?page=${currentPage + 1}`}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          Next
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed text-sm font-medium"
        >
          Next
        </button>
      )}
    </div>
  );
}