'use client';

import { BsFillMicFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { MdClose } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchBox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchTerm = searchParams.get('searchTerm');
  const [term, setTerm] = useState(searchTerm || '');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchToDelete, setSearchToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;

    const updatedSearches = [term, ...recentSearches.filter(t => t !== term)].slice(0, 10);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

    router.push(`/search/web?searchTerm=${term}`);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };

  const handleDropdownClick = (search) => {
    setTerm(search);
    setShowDropdown(false);
    router.push(`/search/web?searchTerm=${search}`);
  };

  const confirmDeleteSearch = (search) => {
    setSearchToDelete(search);
    setShowConfirmation(true);
  };

  const handleDeleteSearch = () => {
    const updatedSearches = recentSearches.filter(search => search !== searchToDelete);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setSearchToDelete(null);
  };

  useEffect(() => {
    if (term.trim().length == 0 && recentSearches.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [term, recentSearches.length]);

  return (
    <div className='relative'>
      <form
        onSubmit={handleSubmit}
        className='flex border border-gray-200 rounded-full shadow-lg px-6 py-3 ml-10 mr-5 flex-grow max-w-3xl items-center'
      >
        <input
          type='text'
          className='w-full focus:outline-none'
          value={term}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <RxCross2
          className='text-2xl text-gray-500 cursor-pointer sm:mr-2'
          onClick={() => setTerm('')}
        />
        <BsFillMicFill className='hidden sm:inline-flex text-4xl text-blue-500 border-l-2 border-gray-300 mr-3 pl-4' />
        <AiOutlineSearch
          className='text-2xl hidden sm:inline-flex text-blue-500 cursor-pointer'
          onClick={handleSubmit}
        />
      </form>
      
      {showDropdown && recentSearches.length > 0 && (
        <ul className='absolute bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-full max-h-64 overflow-y-auto'>
          {recentSearches.map((search, index) => (
            <li
              key={index}
              className='flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleDropdownClick(search)}
            >
              <span>{search}</span>
              <MdClose
                className='text-gray-500 hover:text-red-500'
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDeleteSearch(search);
                }}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Confirmation modal */}
      {showConfirmation && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <p>Are you sure you want to delete this search?</p>
            <div className='mt-4 flex justify-end space-x-3'>
              <button
                onClick={handleDeleteSearch}
                className='bg-red-500 text-white px-4 py-2 rounded-lg'
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className='bg-gray-300 px-4 py-2 rounded-lg'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
