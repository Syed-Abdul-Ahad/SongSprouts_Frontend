import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { artistAPI } from '../../../api/artist';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedAddons, setExpandedAddons] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    emailAddress: '',
    storeName: '',
    storeUrl: '',
    location: '',
    selectedGenres: [],
    bio: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    websiteUrl: '',
  });

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Jazz', 'Electronic', 
    'Folk', 'Indie', 'Christian', 'Acoustic', 'Soul', 'Blues', 
    'K-Pop', 'Lo-Fi', 'Alternative'
  ];

  const services = [
    {
      title: 'Custom Song',
      price: '$350',
      description: 'A fully produced original song written specifically for you or your project. Includes live writing, melody composition, and professional recording.',
      features: ['7-14 days delivery', '1 round of revisions'],
    },
    {
      title: 'Feature Verse',
      price: '$180',
      description: 'Add a professionally recorded and mastered vocal feature to your existing track. Includes ad-libs, or vocal ad-ons.',
      features: ['5-7 days delivery', 'Up to 3 provided vocals'],
    },
    {
      title: 'Full Production',
      price: '$650',
      description: 'Complete songwriting, vocal recording, mixing, and mastering for one production package. From concept to finished master, ready for release.',
      features: ['3-4 days delivery', 'Up to 3 provided vocals'],
    },
    {
      title: 'Demo Vocal',
      price: '$95',
      description: 'Professional demo recording to test out melodies or lyrics before hiring a more involved or expensive vocalist. Great for songwriters needing a quality reference.',
      features: ['1-2 days delivery', '24 hr production vocals'],
    },
  ];

  const addons = [
    {
      title: 'Background Harmonies',
      price: '+ $50',
      description: 'Add lush background harmonies to enrich your vocal track with layered depth.',
    },
    {
      title: 'Rush Delivery',
      price: '+ $75',
      description: '48-hour turnaround for urgent projects. Perfect for last-minute gifts or deadlines.',
    },
    {
      title: 'Extra Revisions',
      price: '+ $75',
      description: 'Two additional revision rounds for fine-tuning. Ensure your song is perfect.',
    },
    {
      title: 'Professional Mixing',
      price: '+ $125',
      description: 'Studio-quality mixing of your full track with vocals. Radio-ready sound.',
    },
  ];

  // Fetch artist profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        const profile = await artistAPI.getProfile(user._id);
        const profileData = profile?.data?.artist;
        
        // Pre-fill form with existing data
        setFormData({
          profilePictureUrl: profileData.profilePictureUrl || '',
          emailAddress: profileData.emailAddress || user.email || '',
          storeName: profileData.storeName || '',
          storeUrl: profileData.storeURL || '',
          location: profileData.location || '',
          selectedGenres: Array.isArray(profileData.musicalGenres) ? profileData.musicalGenres : [],
          bio: profileData.bio || '',
          instagram: profileData.socialLinks?.instagram || '',
          tiktok: profileData.socialLinks?.tiktok || '',
          youtube: profileData.socialLinks?.youtube || '',
          websiteUrl: profileData.socialLinks?.websiteUrl || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const toggleGenre = (genre) => {
    if (!isEditing) return;
    
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
  };

  const toggleAddon = (index) => {
    if (expandedAddons.includes(index)) {
      setExpandedAddons(expandedAddons.filter(i => i !== index));
    } else {
      setExpandedAddons([...expandedAddons, index]);
    }
  };

  const handleSave = async () => {
    if (!user?._id) {
      toast.error('User information not found');
      return;
    }

    setSubmitting(true);
    
    try {
      // Create FormData object
      const formDataToSend = new FormData();
      
      // Append profile picture if new one selected
      if (profilePicture) {
        formDataToSend.append('profilePicture', profilePicture);
      }
      
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
        websiteUrl: formData.websiteUrl || '',
      };
      formDataToSend.append('socialLinks', JSON.stringify(socialLinks));
      
      // Submit to API
      await artistAPI.updateProfile(user._id, formDataToSend);
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally refetch to reset changes
  };

  if (loading) {
    return (
      <div className="lg:ml-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:ml-20 min-h-screen bg-gray-50 p-4 md:p-8 pt-20 lg:pt-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Profile Management</h1>
            <p className="text-gray-600 mt-1">Update your artist profile information and settings</p>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  disabled={submitting}
                  className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={submitting}
                  className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center overflow-hidden">
              {(previewUrl || formData.profilePictureUrl) ? (
                <img 
                  src={previewUrl || formData.profilePictureUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-12 h-12 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
            {isEditing && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <button 
                  type="button"
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-gray-100 hover:bg-gray-50"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{user?.fullname || formData.storeName || 'Artist Name'}</h2>
            </div>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter your artist biography..."
                className="w-full text-gray-600 text-sm leading-relaxed px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            ) : (
              <p className="text-gray-600 text-sm leading-relaxed">
                {formData.bio || 'No biography added yet. Click Edit Profile to add your story.'}
              </p>
            )}
          </div>
        </div>

        {/* Store Information in Edit Mode */}
        {isEditing && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store URL</label>
                <input
                  type="text"
                  name="storeUrl"
                  value={formData.storeUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Musical Genres Section */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xl font-bold text-gray-900">Musical Genres</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {isEditing ? 'Select the genres you specialize in. You can choose multiple genres that represent your style.' : 'Your specialized genres'}
        </p>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              disabled={!isEditing}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                formData.selectedGenres.includes(genre)
                  ? 'bg-primary text-white'
                  : isEditing 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                    : 'bg-gray-100 text-gray-700 cursor-default'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Social Links Section */}
      {isEditing && (
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-xl font-bold text-gray-900">Social Links</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Connect your social profiles to help fans discover more of your work.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                placeholder="TikTok Username"
                className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                value={formData.websiteUrl}
                onChange={handleInputChange}
                placeholder="Website URL"
                className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Services & Offerings Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Services & Offerings</h3>
        
        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {services.map((service, index) => (
            <div key={index} className="bg-primary rounded-3xl p-6 text-white flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-xl font-bold">{service.title}</h4>
                <span className="text-2xl font-bold">{service.price}</span>
              </div>
              <p className="text-white/90 text-sm mb-4 flex-1">{service.description}</p>
              <div className="space-y-2 mb-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-white text-primary py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                SELECT SERVICE
              </button>
            </div>
          ))}
        </div>

        {/* Additional Services / Add-ons */}
        <div className="space-y-3">
          {addons.map((addon, index) => (
            <div key={index} className="bg-primary rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleAddon(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-white hover:bg-primary/90 transition-colors"
              >
                <div className="text-left">
                  <h4 className="font-bold text-lg">{addon.title}</h4>
                  {expandedAddons.includes(index) && (
                    <p className="text-white/80 text-sm mt-2">{addon.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg">{addon.price}</span>
                  <svg 
                    className={`w-6 h-6 transition-transform ${expandedAddons.includes(index) ? 'rotate-45' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
