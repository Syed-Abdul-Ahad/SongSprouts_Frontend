import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../../context/OrderContext';

const ArtistCard = ({ 
  artist,
  imageUrl,
  name,
  genres = [],
  startingPrice,
  onCardClick
}) => {
  const navigate = useNavigate();
  const { selectArtist } = useOrder();

  // Ensure genres is always an array
  const genreList = Array.isArray(genres) ? genres : [genres];
  
  // Limit displayed genres to first 3 for better UI
  const displayedGenres = genreList.slice(0, 2);
  const hasMoreGenres = genreList.length > 2;

  const handleClick = () => {
    // Update order context with selected artist
    selectArtist(artist);
    
    // Navigate to artist profile
    navigate(`/artist/${artist.userId || artist.id}`);
    
    // Call optional callback
    onCardClick?.(artist);
  };

  return (
    <div 
      className="group relative w-full max-w-70 cursor-pointer transition-transform duration-300 hover:scale-105 mx-auto"
      onClick={handleClick}
    >
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-3xl bg-card shadow-xl text-black">
        
        {/* Artist Image */}
        <div className="relative h-50 w-full overflow-hidden">
          <img 
            src={imageUrl || '/placeholder-artist.jpg'} 
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
        </div>

        {/* Content Section */}
        <div className="relative px-3 pb-4 pt-4">
          {/* Artist Name */}
          <h3 className="mb-2 text-xl font-extrabold">
            {name}
          </h3>

          {/* Genre Pills Container */}
          <div className="mb-3 flex flex-wrap gap-1 w-full">
            {displayedGenres.map((genre, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:bg-primary/80"
              >
                {genre}
              </span>
            ))}
            
            {/* Show "+X more" if there are additional genres */}
            {hasMoreGenres && (
              <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                +{genreList.length - 2} more
              </span>
            )}
          </div>

          {/* Pricing Section */}
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wide ">
              Starting at
            </span>
            <span className="text-3xl font-extrabold ">
              ${startingPrice}
            </span>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-300 group-hover:border-outline" />
      </div>
    </div>
  );
};

export default ArtistCard;
