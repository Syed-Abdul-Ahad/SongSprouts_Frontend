import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { ProfileHeader, ServicesOfferings } from './subcomponents';

const ArtistProfile = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch artist data by ID
  useEffect(() => {
    fetchArtistData();
  }, [artistId]);

  const fetchArtistData = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/artists/${artistId}`);
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock artist data
      const mockArtist = {
        id: artistId,
        name: "Ava Sterling",
        imageUrl: "/My Image.png",
        genres: ["Pop", "R&B"],
        bio: "Award-winning vocalist specializing in pop and R&B with a soulful touch. I bring emotion and professionalism to every project, from catchy hooks to powerful ballads. My vocals have been featured on tracks with over 50M+ streams.",
        location: "Los Angeles, CA",
        projectsCompleted: "240+",
        memberSince: "2020",
        services: [
          {
            id: 1,
            title: "Custom Song",
            price: 350,
            description: "A fully produced original song written and recorded specifically for your project. Includes lyric writing, melody composition, and professional recording.",
            deliveryTime: "3-5 days delivery",
            features: ["WAV + MP3 stems"],
            color: "bg-primary"
          },
          {
            id: 2,
            title: "Feature Verse",
            price: 180,
            description: "Add a professionally recorded vocal feature to your existing track. Perfect for hooks, choruses, or verses that need that special touch.",
            deliveryTime: "3-5 days delivery",
            features: ["DRY + processed vocals"],
            color: "bg-primary"
          },
          {
            id: 3,
            title: "Full Production",
            price: 650,
            description: "Complete songwriting, vocal performance, and professional production package. From concept to finished master, ready for release.",
            deliveryTime: "3-5 days delivery",
            features: ["DRY + processed vocals"],
            color: "bg-primary"
          },
          {
            id: 4,
            title: "Demo Vocal",
            price: 95,
            description: "Professional demo recording to test out melodies or lyrics before full production. Great for songwriters needing a quality reference track.",
            deliveryTime: "3-5 days delivery",
            features: ["DRY + processed vocals"],
            color: "bg-primary"
          }
        ]
      };

      setArtist(mockArtist);
    } catch (error) {
      console.error('Error fetching artist:', error);
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
          onClick={() => window.history.back()}
          className="flex items-center rounded-full bg-primary px-4 py-4 text-white font-semibold shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
        >
          <img src="/BackIcon.png" alt="" width={18} height={20}/>
        </button>
          <span className='font-bold text-xl'>Back</span >  
        </div>

        {/* Profile Header Section */}
        <ProfileHeader artist={artist} />

        {/* Services & Offerings Section */}
        <ServicesOfferings services={artist.services} />
      </main>
    </div>
  );
};

export default ArtistProfile;
