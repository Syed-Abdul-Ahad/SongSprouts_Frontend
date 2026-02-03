import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-gray-100 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Greeting Section */}
        <div className="shrink-0">
          <h1 className="text-3xl font-bold text-gray-800">
            Hello, <span className="text-primary">{user?.name || 'Guest'}!</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">Welcome to Music</p>
        </div>

        {/* Search and Actions Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-80 px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
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
          </form>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span>Filter</span>
            </button>

            {/* Filter Menu Dropdown */}
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                  All
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                  Genre
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                  Artist
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                  Recent
                </button>
              </div>
            )}
          </div>

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
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
