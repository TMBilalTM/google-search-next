import Link from 'next/link';
import Parser from 'html-react-parser';
import PaginationButtons from './PaginationButtons';

export default function WebSearchResults({ results }) {
  return (
    <div className='w-full mx-auto px-3 sm:pb-24 pb-40 sm:pl-[5%] md:pl-[14%] lg:pl-52'>
      <p className='text-gray-600 text-sm mb-5 mt-3'>
        About {results.searchInformation?.formattedTotalResults} results (
        {results.searchInformation?.formattedSearchTime} seconds)
      </p>
      {results.items?.map((result) => (
        <div className='mb-8 max-w-xl' key={result.link}>
          <div className='flex items-start mb-4'>
            {result.pagemap?.cse_image?.[0]?.src && (
              <img
                src={result.pagemap.cse_image[0].src}
                alt={result.title}
                className='w-32 h-32 object-cover mr-4'
              />
            )}
            <div className='flex flex-col'>
              <Link href={result.link} className='text-gray-500 text-sm mb-1'>
                {result.formattedUrl}
              </Link>
              <Link
                href={result.link}
                className='group-hover:underline decoration-blue-800 text-xl truncate font-medium text-blue-800'
              >
                {result.title}
              </Link>
            </div>
          </div>
          <p className='text-gray-600'>{Parser(result.htmlSnippet)}</p>
        </div>
      ))}
      <PaginationButtons />
    </div>
  );
}
