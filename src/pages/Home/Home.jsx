import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { ArtistCard, FilterModal } from './subcomponents';
import { artistAPI } from '../../api/artist';
import { showToast } from '../../utils/toast';

const Home = () => {
  const navigate = useNavigate();
  
  // Pagination state
  const [displayedArtists, setDisplayedArtists] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genres: [],
    location: '',
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // Helper function to get minimum price from service offerings
  const getMinimumPrice = (serviceOfferings) => {
    if (!serviceOfferings || serviceOfferings.length === 0) return 0;
    return Math.min(...serviceOfferings.map(service => service.price));
  };

  // Helper function to transform API artist data to component format
  const transformArtistData = (apiArtist) => {
    return {
      id: apiArtist._id,
      userId: apiArtist.user?._id, // Store userId for profile fetching
      name: apiArtist.storeName || apiArtist.user?.fullname || 'Unknown Artist',
      genres: apiArtist.musicalGenres || [],
      startingPrice: getMinimumPrice(apiArtist.serviceOfferings),
      imageUrl: apiArtist.profilePictureUrl || '/Avatar.webp',
      bio: apiArtist.bio,
      location: apiArtist.location,
      storeURL: apiArtist.storeURL,
    };
  };

  // Update active filter count
  useEffect(() => {
    let count = 0;
    if (filters.genres && filters.genres.length > 0) count++;
    if (filters.location) count++;
    setActiveFilterCount(count);
  }, [filters]);

  // Fetch artists with current filters and search
  const fetchArtists = async (pageNum = 1, appendResults = false) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const queryFilters = {
        ...filters,
        search: searchQuery,
      };

      const response = await artistAPI.getAllArtists(pageNum, ITEMS_PER_PAGE, queryFilters);
      
      if (response.status === 'success' && response.data?.artists) {
        const transformedArtists = response.data.artists.map(transformArtistData);
        
        if (appendResults) {
          setDisplayedArtists(prev => [...prev, ...transformedArtists]);
        } else {
          setDisplayedArtists(transformedArtists);
        }
        
        setTotalPages(response.pagination.totalPages);
        setHasMore(response.pagination.hasNextPage);
        setPage(pageNum);
      }
    } catch (error) {
      console.error('Error fetching artists:', error);
      showToast.error('Failed to load artists. Please try again later.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Fetch initial artists from API
  const fetchInitialArtists = async () => {
    fetchArtists(1, false);
  };

  // Load more artists from API
  const loadMoreArtists = async () => {
    if (loadingMore || !hasMore) return;
    fetchArtists(page + 1, true);
  };

  // Handle search
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    fetchArtists(1, false);
  };

  // Handle filter apply
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    // Fetch will be triggered by useEffect
  };

  // Fetch initial artists on mount
  useEffect(() => {
    fetchInitialArtists();
  }, []);

  // Re-fetch when filters change
  useEffect(() => {
    if (page === 1) {
      fetchArtists(1, false);
    }
  }, [filters]);

  const handleArtistClick = (artist) => {
    console.log('Artist clicked:', artist);
    // Navigate to artist profile page using userId
    navigate(`/artist/${artist.userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearch}
        showFilter={true}
        onFilterClick={() => setIsFilterModalOpen(true)}
        activeFilterCount={activeFilterCount}
      />
      
      <main className="mx-auto max-w-7xl px-4 py-6 overflow-x-hidden">
        {/* Hero Section */}
        <div className="mb-6 text-gray-800">
          <h1 className="mb-1 text-3xl font-bold">Discover Artists</h1>
          <p className="text-lg text-[#222222]">
            Set up your storefront to start accepting custom song requests from music lovers.
          </p>
        </div>

        {/* Active Filters Display */}
        {(filters.genres?.length > 0 || filters.location || searchQuery) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Search: {searchQuery}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    fetchArtists(1, false);
                  }}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {filters.genres?.map((genre) => (
              <span 
                key={genre}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                Genre: {genre}
                <button
                  onClick={() => handleApplyFilters({ 
                    ...filters, 
                    genres: filters.genres.filter(g => g !== genre) 
                  })}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            {filters.location && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Location: {filters.location}
                <button
                  onClick={() => handleApplyFilters({ ...filters, location: '' })}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}

        {/* Artists Grid */}
        <section>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 ">
                {displayedArtists.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    name={artist.name}
                    genres={artist.genres}
                    startingPrice={artist.startingPrice}
                    imageUrl={artist.imageUrl}
                    onCardClick={handleArtistClick}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={loadMoreArtists}
                    disabled={loadingMore}
                    className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Load More Artists</span>
                        <svg 
                          className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* No More Artists Message */}
              {!hasMore && displayedArtists.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <p className="text-gray-500 font-medium">
                    You've reached the end! No more artists to load.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && displayedArtists.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">No artists found. Check back soon!</p>
            </div>
          )}
        </section>
      </main>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  );
};

export default Home;