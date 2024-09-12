'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function PaginationButtons() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm');
  const startIndex = +searchParams.get('start') || 1;

  return (
    <div className='flex items-center justify-between px-4 py-2 sm:px-10 sm:py-4'>
      {startIndex > 1 && (
        <Link
          href={`${pathname}?searchTerm=${searchTerm}&start=${Math.max(startIndex - 10, 1)}`}
          className='flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors'
        >
          <BsChevronLeft className='h-5 w-5' />
          <span>Previous</span>
        </Link>
      )}
      {startIndex <= 90 && (
        <Link
          href={`${pathname}?searchTerm=${searchTerm}&start=${startIndex + 10}`}
          className='flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors'
        >
          <span>Next</span>
          <BsChevronRight className='h-5 w-5' />
        </Link>
      )}
    </div>
  );
}
