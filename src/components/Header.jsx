import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SlidersHorizontal } from 'lucide-react';

const Header = ({ 
  showSearch = false, 
  searchQuery = '',
  onSearchChange = () => {},
  onSearchSubmit = () => {},
  showFilter = false,
  onFilterClick = () => {},
  activeFilterCount = 0
}) => {
  const { user } = useAuth();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  console.log(user)

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchSubmit(e);
  };

  const handleClearSearch = () => {
    onSearchChange({ target: { value: '' } });
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowMobileSearch(false);
  };

  return (
    <header className="bg-gray-100 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Greeting Section */}
        <div className="shrink-0 min-w-0">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 truncate">
            <span className="text-primary">Hello, {user?.fullname || 'Guest'}!</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 hidden sm:block">Welcome to SongSprouts</p>
        </div>

        {/* Desktop Search and Actions Section */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {/* Search Bar - Only show if showSearch is true */}
          {showSearch && (
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Search by artist name or bio..."
                className="w-64 lg:w-80 px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              )}
            </form>
          )}

          {/* Filter Button - Only show if showFilter is true */}
          {showFilter && (
            <div className="relative">
              <button
                onClick={onFilterClick}
                className="relative flex items-center gap-2 px-3 lg:px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {/* <img src="/Filter.png" alt="Filter" className="w-4 h-4 max-md:bg-black" /> */}
                 <SlidersHorizontal width={18} height={18}/>
                <span className="text-sm lg:text-base">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 lg:w-6 lg:h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Profile Avatar */}
          <button
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gray-300 overflow-hidden hover:ring-2 hover:ring-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="User profile"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary text-white font-semibold text-sm">
                {user?.fullname?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          {showSearch && (
            <button
              onClick={toggleMobileSearch}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}

          {/* Mobile Filter Button */}
          {showFilter && (
            <button
              onClick={onFilterClick}
              className="relative p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Open filters"
            >
             
              {/* <img src="/Filter.png" alt="Filter" className="w-5 h-5 sm:w-6 sm:h-6" /> */}
              <SlidersHorizontal width={20} height={20} className='max-md:text-black'/>
              {activeFilterCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          )}

          {/* Mobile Profile Avatar */}
          <button
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-300 overflow-hidden hover:ring-2 hover:ring-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="User profile"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary text-white font-semibold text-xs sm:text-sm">
                {user?.fullname?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      {showSearch && showMobileSearch && (
        <div className="md:hidden mt-3 animate-slideDown">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search by artist name or bio..."
              className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              autoFocus
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            )}
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
