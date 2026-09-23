'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorState({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h1>
      <p className="text-gray-600 mb-6">
        We ran into a problem loading this page. You can try again, or go back to the meetings list.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="px-4 py-2 border border-gray-300 rounded text-gray-900 hover:bg-gray-100 transition-colors"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}