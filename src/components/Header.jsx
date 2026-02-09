import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

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
  console.log(user)

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchSubmit(e);
  };

  const handleClearSearch = () => {
    onSearchChange({ target: { value: '' } });
  };

  return (
    <header className="bg-gray-100 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Greeting Section */}
        <div className="shrink-0">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-primary">Hello, {user?.fullname || 'Guest'}!</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">Welcome to SongSprouts</p>
        </div>

        {/* Search and Actions Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar - Only show if showSearch is true */}
          {showSearch && (
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Search by artist name or bio..."
                className="w-80 px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                className="relative flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <img src="/Filter.png" alt="Filter" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Profile Avatar */}
          <button
            className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden hover:ring-2 hover:ring-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="User profile"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary text-white font-semibold">
                {user?.fullname?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
