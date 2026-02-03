import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { artistAPI } from '../api/artist';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import Header from '../components/Header';

const ArtistOnboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const totalSteps = 4;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Store Information
    emailAddress: '',
    storeName: '',
    storeUrl: '',
    location: '',
    
    // Musical Genres
    selectedGenres: [],
    
    // Artist Biography
    bio: '',
    
    // Social Links
    instagram: '',
    tiktok: '',
    youtube: '',
    website: '',
  });

  const [errors, setErrors] = useState({});

  // Fetch artist profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        const profile = await artistAPI.getProfile(user._id);
        const profileData = profile?.data?.artist
        
        // Pre-fill form with existing data
        setFormData({
          emailAddress: profileData.emailAddress || user.email || '',
          storeName: profileData.storeName || '',
          storeUrl: profileData.storeURL || '',
          location: profileData.location || '',
          selectedGenres: Array.isArray(profileData.musicalGenres) ? profileData.musicalGenres : [],
          bio: profileData.bio || '',
          instagram: profileData.socialLinks?.instagram || '',
          tiktok: profileData.socialLinks?.tiktok || '',
          youtube: profileData.socialLinks?.youtube || '',
          website: profileData.socialLinks?.website || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist yet, that's okay - just use empty form
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Jazz', 'Electronic',
    'Folk', 'Indie', 'Christian', 'Acoustic', 'Soul', 'Blues', 'Metal',
    'Classical', 'Reggae', 'K-Pop', 'Lo-Fi', 'Alternative'
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const toggleGenre = (genre) => {
    if (formData.selectedGenres.includes(genre)) {
      setFormData({
        ...formData,
        selectedGenres: formData.selectedGenres.filter(g => g !== genre)
      });
    } else {
      setFormData({
        ...formData,
        selectedGenres: [...formData.selectedGenres, genre]
      });
    }
    if (errors.selectedGenres) {
      setErrors({ ...errors, selectedGenres: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailAddress) {
      newErrors.emailAddress = 'Email address is required';
    }
    if (!formData.storeName) {
      newErrors.storeName = 'Store name is required';
    }
    if (formData.selectedGenres.length === 0) {
      newErrors.selectedGenres = 'Please select at least one genre';
    }
    if (!formData.bio || formData.bio.trim().length === 0) {
      newErrors.bio = 'Artist biography is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    if (!user?._id) {
      toast.error('User information not found');
      return;
    }

    setSubmitting(true);
    
    try {
      // Create FormData object
      const formDataToSend = new FormData();
      
      // Append simple fields
      formDataToSend.append('emailAddress', formData.emailAddress || '');
      formDataToSend.append('storeName', formData.storeName || '');
      formDataToSend.append('storeUrl', formData.storeUrl || '');
      formDataToSend.append('location', formData.location || '');
      formDataToSend.append('bio', formData.bio || '');
      
      // Stringify arrays
      formDataToSend.append('musicalGenres', JSON.stringify(formData.selectedGenres));
      
      // Stringify social links object
      const socialLinks = {
        instagram: formData.instagram || '',
        tiktok: formData.tiktok || '',
        youtube: formData.youtube || '',
        website: formData.website || '',
      };
      formDataToSend.append('socialLinks', JSON.stringify(socialLinks));
      
      // Submit to API
      await artistAPI.updateProfile(user._id, formDataToSend);
      
      toast.success('Profile updated successfully!');
      navigate('/pending-approval');
    } catch (error) {
      console.error('Error submitting onboarding:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateProgress = () => {
    let completed = 0;
    if (formData.emailAddress && formData.storeName) completed++;
    if (formData.selectedGenres.length > 0) completed++;
    if (formData.bio) completed++;
    if (formData.instagram || formData.tiktok || formData.youtube || formData.website) completed++;
    return (completed / totalSteps) * 100;
  };

  const progressPercentage = calculateProgress();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary">Hello, {user?.name || 'jack'}!</h1>
            <p className="text-gray-600 text-sm mt-1">Welcome to Song Sprouts</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div> */}
      <Header user={user} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className='flex mt-5 mb-10 gap-4 items-center'>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className='flex flex-col'>
                <div className="text-2xl font-bold text-gray-900">Complete Your Artist Profile</div>
                <div className='text-sm text-gray-600'>Set up your storefront to start accepting custom song requests from music lovers</div>
            </div>
        </div>
        {/* Progress Section */}
        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Onboarding Progress</h2>
            <span className="text-sm text-gray-600">Step 2 of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-gray-900">{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>

        {/* Store Information Section */}
        <div className="bg-gray-100 rounded-lg p-6 mb-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Store Information</h3>
              <p className="text-sm text-gray-600 mb-4">Set up your unique storefront name and URL. This will be your public profile on SongSprouts.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.emailAddress && (
                    <p className="text-red-600 text-xs mt-1">{errors.emailAddress}</p>
                  )}
                  <div className="flex items-start gap-2 mt-2">
                    <svg className="w-4 h-4 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-gray-600">Store name is required</p>
                  </div>
                  <div className="flex items-start gap-2 mt-1">
                    <svg className="w-4 h-4 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-gray-600">Choose a name that represents your musical style</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Store Name *</label>
                  <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.storeName && (
                    <p className="text-red-600 text-xs mt-1">{errors.storeName}</p>
                  )}
                  <div className="flex items-start gap-2 mt-2">
                    <svg className="w-4 h-4 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-gray-600">Choose a name that represents your musical style</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Store URL *</label>
                  <input
                    type="text"
                    name="storeUrl"
                    value={formData.storeUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="flex items-start gap-2 mt-2">
                    <svg className="w-4 h-4 text-gray-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-gray-600">Your unique store URL will be generated automatically</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Musical Genres Section */}
        <div className="bg-gray-100 rounded-lg p-6 mb-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Musical Genres</h3>
              <p className="text-sm text-gray-600 mb-4">Select the genres you specialize in. You can choose multiple genres that represent your style.</p>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Select Genres *</label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.selectedGenres.includes(genre)
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                {errors.selectedGenres && (
                  <p className="text-red-600 text-xs mt-2">{errors.selectedGenres}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Artist Biography Section */}
        <div className="bg-gray-100 rounded-lg p-6 mb-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Artist Biography</h3>
              <p className="text-sm text-gray-600 mb-4">Tell your story! Share what makes your music unique and why people should work with you.</p>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Your Bio *</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Share your musical journey......"
                  rows={6}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
                {errors.bio && (
                  <p className="text-red-600 text-xs mt-1">{errors.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Social Links</h3>
              <p className="text-sm text-gray-600 mb-4">Connect your social profiles to help fans discover more of your work.</p>
              
              <div className="flex flex-col md:grid md:grid-cols-4 gap-3">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="Instagram Username"
                    className="w-full pl-14 pr-4 py-3 bg-white border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="tiktok"
                    value={formData.tiktok}
                    onChange={handleInputChange}
                    placeholder="Tiktok Username"
                    className="w-full pl-14 pr-4 py-3 bg-white border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleInputChange}
                    placeholder="YouTube Channel"
                    className="w-full pl-14 pr-4 py-3 bg-white border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.5c-5.247 0-9.5-4.253-9.5-9.5S6.753 2.5 12 2.5s9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5z"/>
                      <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
                    </svg>
                  </div>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="Website URL"
                    className="w-full pl-14 pr-4 py-3 bg-white border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-gray-600 mt-4">
                <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p>Only usernames are stored. We'll never access your accounts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/dashboard')}
            className="px-8"
            disabled={submitting}
          >
            BACK
          </Button>
          
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="px-8"
            disabled={submitting}
          >
            {submitting ? 'SUBMITTING...' : 'COMPLETE ONBOARDING'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtistOnboarding;
