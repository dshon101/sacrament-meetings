'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between mt-6">
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Next
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}