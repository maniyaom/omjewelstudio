// components/Pagination.tsx
'use client';

import { useRouter, usePathname } from "next/navigation";
import { CategoryType } from "../types";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category: CategoryType;
}

export default function Pagination({ currentPage, totalPages, category }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    
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

  const handlePageChange = (pageNum: number) => {
    router.push(`${pathname}?page=${pageNum}`);
  };

  return (
    <nav 
      className="flex justify-center items-center gap-2 mt-12"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      {currentPage > 1 ? (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors text-sm font-medium"
          aria-label={`Go to page ${currentPage - 1}`}
        >
          Previous
        </button>
      ) : (
        <button
          disabled
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed text-sm font-medium"
          aria-disabled="true"
        >
          Previous
        </button>
      )}
      
      {/* Page Numbers - Desktop */}
      <div className="hidden sm:flex gap-2">
        {/* First page + ellipsis */}
        {currentPage > 3 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              aria-label="Go to page 1"
            >
              1
            </button>
            {currentPage > 4 && (
              <span className="px-2 py-2 text-gray-400" aria-hidden="true">
                ...
              </span>
            )}
          </>
        )}
        
        {/* Page numbers */}
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-3 py-2 rounded-lg transition-colors text-sm ${
              pageNum === currentPage
                ? "bg-gray-900 text-white font-medium"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            aria-label={`Go to page ${pageNum}`}
            aria-current={pageNum === currentPage ? "page" : undefined}
          >
            {pageNum}
          </button>
        ))}
        
        {/* Last page + ellipsis */}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <span className="px-2 py-2 text-gray-400" aria-hidden="true">
                ...
              </span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              aria-label={`Go to page ${totalPages}`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
      
      {/* Mobile: Just show current page */}
      <span className="sm:hidden px-4 py-2 text-gray-700 text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      
      {/* Next Button */}
      {currentPage < totalPages ? (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors text-sm font-medium"
          aria-label={`Go to page ${currentPage + 1}`}
        >
          Next
        </button>
      ) : (
        <button
          disabled
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed text-sm font-medium"
          aria-disabled="true"
        >
          Next
        </button>
      )}
    </nav>
  );
}