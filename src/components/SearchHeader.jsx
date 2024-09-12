import Image from 'next/image';
import Link from 'next/link';
import SearchBox from './SearchBox';
import { RiSettings3Line } from 'react-icons/ri';
import { TbGridDots } from 'react-icons/tb';
import SearchHeaderOptions from './SearchHeaderOptions';

export default function SearchHeader() {
  return (
    <header className='sticky top-0 bg-white z-50'>
      {/* Desktop version */}
      <div className='hidden md:flex w-full p-6 items-center justify-between'>
        {/* Google logo */}
        <Link href='/'>
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png'
            alt='Google Logo'
            width={120}
            height={40}
            priority
            style={{ width: 'auto' }}
          />
        </Link>

        {/* Search Box for Desktop */}
        <div className='flex-1 mx-4'>
          <SearchBox />
        </div>

        {/* Right side icons: Settings, Grid, Profile */}
        <div className='flex items-center space-x-4'>
        <RiSettings3Line className='bg-transparent hover:bg-gray-200 p-2 text-4xl rounded-full cursor-pointer' />
          <TbGridDots className='bg-transparent hover:bg-gray-200 p-2 text-4xl rounded-full cursor-pointer' />
          <button className='bg-blue-500 text-white px-6 py-2 font-medium rounded-md hover:brightness-105 hover:shadow-md transition-shadow'>
            BilalTM
          </button>
        </div>
      </div>

      {/* Mobile version */}
      <div className='flex md:hidden w-full p-2 items-center justify-between'>
        {/* Google logo */}
        <Link href='/'>
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png'
            alt='Google Logo'
            width={92}
            height={30}
            priority
            style={{ width: 'auto' }}
          />
        </Link>

        {/* Right side icons: Settings, Grid, Profile */}
        <div className='flex items-center space-x-4'>
        <RiSettings3Line className='bg-transparent hover:bg-gray-200 p-2 text-4xl rounded-full cursor-pointer' />
          <TbGridDots className='bg-transparent hover:bg-gray-200 p-2 text-4xl rounded-full cursor-pointer' />

          {/* Profile picture - placeholder for now */}
          <Image
            src='https://avatars.githubusercontent.com/u/112407129?s=48&v=4'
            alt='Profile'
            width={32}
            height={32}
            className='rounded-full cursor-pointer'
          />
        </div>
      </div>

      {/* Search Box for Mobile */}
      <div className='md:hidden w-full p-2'>
        <SearchBox />
      </div>

      {/* Search options below the header (works for both) */}
      <SearchHeaderOptions />
    </header>
  );
}
