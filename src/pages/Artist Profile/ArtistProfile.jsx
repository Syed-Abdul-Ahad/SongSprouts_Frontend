import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
// import ProgressBar from '../../components/ProgressBar';
import { ProfileHeader, ServicesOfferings } from './subcomponents';
import { artistAPI } from '../../api/artist';
import { showToast } from '../../utils/toast';
import { useOrder } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const ArtistProfile = () => {
  const { artistId } = useParams(); // This is actually userId now
  const { orderData } = useOrder();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch artist data by ID
  useEffect(() => {
    fetchArtistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistId]);

  // Transform API service offerings to component format
  const transformServices = (serviceOfferings) => {
    if (!serviceOfferings || serviceOfferings.length === 0) return [];
    
    return serviceOfferings.map((service, index) => ({
      id: service._id,
      title: service.name,
      price: service.price,
      description: service.description,
      deliveryTime: `${service.deliveryTime.minimum}-${service.deliveryTime.maximum} days delivery`,
      features: [service.deliveryType],
      customFields: service.customFields || {},
      color: "bg-primary"
    }));
  };

  const fetchArtistData = async () => {
    setLoading(true);
    try {
      // Use getProfile with userId (artistId param is actually userId)
      const response = await artistAPI.getProfile(artistId);
      
      if (response.status === 'success' && response.data?.artist) {
        const apiArtist = response.data.artist;
        
        // Transform API data to component format
        const transformedArtist = {
          id: apiArtist._id,
          name: apiArtist.storeName || apiArtist.user?.fullname || 'Unknown Artist',
          imageUrl: apiArtist.profilePictureUrl || '/My Image.png',
          genres: apiArtist.musicalGenres || [],
          bio: apiArtist.bio || 'No bio available',
          location: apiArtist.location || 'Location not specified',
          projectsCompleted: apiArtist.projectComplete || 0,
          memberSince: new Date(apiArtist.createdAt).getFullYear().toString(),
          services: transformServices(apiArtist.serviceOfferings),
          socialLinks: apiArtist.socialLinks || {},
          addOns: apiArtist.addOns || []
        };

        setArtist(transformedArtist);
      }
    } catch (error) {
      console.error('Error fetching artist:', error);
      showToast.error('Failed to load artist profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-24">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-24">
          <p className="mb-4 text-xl text-gray-600">Artist not found</p>
          <button 
            onClick={() => window.history.back()}
            className="rounded-full bg-primary px-6 py-2 text-white font-semibold hover:bg-primary/90"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        {/* Back Button */}
        <div className='flex items-center gap-x-3'>
            <button 
          onClick={() => navigate('/home')}
          className="flex items-center rounded-full bg-primary px-4 py-4 text-white font-semibold shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
        >
          <img src="/BackIcon.png" alt="" width={18} height={20}/>
        </button>
          <span className='font-bold text-xl'>Back</span >  
        </div>

        {/* Progress Bar - Show if artist is selected in order flow
        {orderData.artist && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <ProgressBar />
          </div>
        )} */}

        {/* Profile Header Section */}
        <ProfileHeader artist={artist} />

        {/* Services & Offerings Section */}
        <ServicesOfferings services={artist.services} />
      </main>
    </div>
  );
};

export default ArtistProfile;
