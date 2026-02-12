import React, { useState, useEffect } from 'react';

const FilterModal = ({ isOpen, onClose, onApply, currentFilters }) => {
  const [filters, setFilters] = useState({
    genres: currentFilters.genres || [],
    location: currentFilters.location || '',
  });

  // Genre options based on API
  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Jazz', 
    'Electronic', 'Folk', 'Indie', 'Christian', 'Acoustic', 
    'Soul', 'Blues', 'K-Pop', 'Lo-Fi', 'Alternative', 'Classical', 'Other'
  ];

  useEffect(() => {
    if (isOpen) {
      setFilters({
        genres: currentFilters.genres || [],
        location: currentFilters.location || '',
      });
    }
  }, [isOpen, currentFilters]);

  const handleGenreToggle = (genre) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      genres: [],
      location: '',
    };
    setFilters(clearedFilters);
    onApply(clearedFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Compact Modal Popup */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            {/* Genre Filter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">Genre</h3>
                {filters.genres.length > 0 && (
                  <span className="text-sm text-primary font-medium">
                    {filters.genres.length} selected
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {genres.map((genre) => (
                  <label
                    key={genre}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.genres.includes(genre)}
                      onChange={() => handleGenreToggle(genre)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Location</h3>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location (e.g., Los Angeles)"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Footer with Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
            <button
              onClick={handleClear}
              className="flex-1 py-2.5 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-2.5 px-4 bg-primary rounded-lg font-semibold text-white hover:bg-primary/90 transition-colors shadow-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
