import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { ArtistCard } from './subcomponents';

const Home = () => {
  // Pagination state
  const [displayedArtists, setDisplayedArtists] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 10;

  // Sample artist data - replace with actual API call
  // In real implementation, this would be fetched from API
  const generateMockArtists = (count) => {
    const mockArtists = [];
    const names = ["Marcus Rivers", "Sarah Chen", "DJ Thunder", "Luna Star", "Alex Morgan", "Jamie Fox", "Taylor Swift", "Chris Brown"];
    const genresOptions = [
      ["R&B", "Soul", "Jazz"],
      ["Pop"],
      ["Hip-Hop", "Trap", "EDM", "House"],
      ["Country", "Folk"],
      ["Rock", "Alternative"],
      ["Electronic", "Dance"],
      ["Indie", "Folk", "Acoustic"]
    ];

    for (let i = 1; i <= count; i++) {
      mockArtists.push({
        id: i,
        name: `${names[i % names.length]} ${i}`,
        genres: genresOptions[i % genresOptions.length],
        startingPrice: 300 + (i * 50) % 500,
        imageUrl: "/My Image.png"
      });
    }
    return mockArtists;
  };

  // Simulate API call to fetch initial artists
  const fetchInitialArtists = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/artists?page=1&limit=10');
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = generateMockArtists(35); // Total 35 artists for demo
      const initialArtists = mockData.slice(0, ITEMS_PER_PAGE);
      
      setDisplayedArtists(initialArtists);
      setHasMore(mockData.length > ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching artists:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simulate API call to load more artists
  const loadMoreArtists = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/artists?page=${page + 1}&limit=10`);
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = generateMockArtists(35); // Total 35 artists for demo
      const startIndex = page * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newArtists = mockData.slice(startIndex, endIndex);
      
      setDisplayedArtists(prev => [...prev, ...newArtists]);
      setPage(prev => prev + 1);
      setHasMore(endIndex < mockData.length);
    } catch (error) {
      console.error('Error loading more artists:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Fetch initial artists on mount
  useEffect(() => {
    fetchInitialArtists();
  }, []);

  const handleArtistClick = (artist) => {
    console.log('Artist clicked:', artist);
    // TODO: Navigate to artist detail page or open modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-6 overflow-x-hidden">
        {/* Hero Section */}
        <div className="mb-6 text-gray-800">
          <h1 className="mb-1 text-3xl font-bold">Discover Artists</h1>
          <p className="text-lg text-[#222222]">
            Set up your storefront to start accepting custom song requests from music lovers.
          </p>
        </div>

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
    </div>
  );
};

export default Home;