import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';
import { FormSection, FormInput, FormSelect, FormTextarea } from './subcomponents';
import { showToast } from '../../utils/toast';
import FormHeader from '../../components/FormHeader';

const CreativeBreif = () => {
  const navigate = useNavigate();
  const { orderData, completeCreativeBrief, updateCreativeBrief, ORDER_STEPS } = useOrder();
  
  // Form state
  const [formData, setFormData] = useState({
    recipient: orderData.creativeBrief?.recipient || '',
    occasion: orderData.creativeBrief?.occasion || '',
    story: orderData.creativeBrief?.story || '',
  });

  // Occasion options
  const occasionOptions = [
    'Birthday',
    'Anniversary',
    'Wedding',
    'Graduation',
    'Valentine\'s Day',
    'Mother\'s Day',
    'Father\'s Day',
    'Proposal',
    'Apology',
    'Thank You',
    'Motivation',
    'Just Because',
    'Other',
  ];

  // Check if user can access this page
  useEffect(() => {
    if (!orderData.artist || !orderData.service) {
      showToast.error('Please select an artist and service first');
      navigate('/home');
    }
  }, [orderData, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Update context in real-time
    updateCreativeBrief({ [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.recipient.trim()) {
      showToast.error('Please enter the recipient name');
      return;
    }
    
    if (!formData.occasion) {
      showToast.error('Please select an occasion');
      return;
    }
    
    if (!formData.story.trim()) {
      showToast.error('Please share your story');
      return;
    }

    // Complete this step and move to next
    completeCreativeBrief(formData);
    showToast.success('Creative brief saved!');
    
    // Navigate to add-ons page (TODO: create this page)
    navigate('/add-ons');
  };

  // Handle back button
  const handleBack = () => {
    if (orderData.artist?.userId || orderData.artist?.id) {
      navigate(`/artist/${orderData.artist.userId || orderData.artist.id}`);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Back Button */}
        <div className="flex items-center gap-x-3">
          <button 
            onClick={handleBack}
            className="flex items-center rounded-full bg-primary px-4 py-4 text-white font-semibold shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
          >
            <img src="/BackIcon.png" alt="" width={18} height={20}/>
          </button>
          <span className="font-bold text-xl">Back</span>
        </div>


        <div className='relative w-full bg-form-bg rounded-3xl p-8 shadow-lg border border-outline'>
        {/* Progress Bar */}
        <div className="mb-10 mx-16">
          <ProgressBar />
        </div>

        <FormHeader
          title="Creative Brief"
          description="Share details about your project to help the artist create a personalized song. The more you share, the more meaningful the final result will be."
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Song Recipient Section */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

          <FormSection
            title="Song Recipient"
            subtitle="Who is this song for? This helps personalize the lyrics."
          >
            <FormInput
              label="Who is it for?"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              placeholder="e.g., Sarah Johnson, My Mom, Our Wedding Guests"
              required
            />
            <p className="mt-2 text-xs text-gray-500">
              Enter the name of the person (or group) this song is dedicated to.
            </p>
          </FormSection>

          {/* Occasion & Purpose Section */}
          <FormSection
            title="Occasion & Purpose"
            subtitle="What's the reason for this song? This guides the overall theme."
          >
            <FormSelect
              label="Occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              options={occasionOptions}
              placeholder="Select an Occasion"
              required
            />
            <p className="mt-2 text-xs text-gray-500">
              Select the main purpose or event for this song.
            </p>
          </FormSection>
          </div>

          {/* Story & Message Section */}
          <FormSection
            title="Story & Message"
            subtitle="Share the background, emotions, or specific message you want included."
          >
            <FormTextarea
              label="Story or Message"
              name="story"
              value={formData.story}
              onChange={handleChange}
              placeholder="Tell us your story..."
              maxLength={1000}
              rows={6}
              required
            />
            <p className="mt-2 text-xs text-gray-500">
              Describe your relationship, special memories, or what you want the song to express.
            </p>
          </FormSection>

          {/* Order Summary */}
          {orderData.artist && orderData.service && (
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Artist:</span>
                  <span className="font-semibold text-gray-900">{orderData.artist.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Service:</span>
                  <span className="font-semibold text-gray-900">{orderData.service.title}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-primary/20">
                  <span className="text-gray-700 font-semibold">Current Total:</span>
                  <span className="text-2xl font-bold text-primary">${orderData.service.price}</span>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 rounded-full border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-primary/90 shadow-lg hover:shadow-xl"
            >
              Continue to Add-ons
            </button>
          </div>
        </form>
        </div>
        {/* Page Header */}
      </main>
    </div>
  );
};

export default CreativeBreif;
