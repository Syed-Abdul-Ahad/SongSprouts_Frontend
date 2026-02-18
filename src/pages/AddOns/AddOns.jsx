import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { artistAPI } from '../../api/artist';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';
import { showToast } from '../../utils/toast';
import { AddOnCard } from './subcomponents';
import FormHeader from '../../components/FormHeader';

const AddOns = () => {
  const navigate = useNavigate();
  const { orderData, completeAddOns, updateAddOns } = useOrder();
  const [selectedAddOns, setSelectedAddOns] = useState(orderData.addOns || []);
  const [availableAddOns, setAvailableAddOns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch add-ons from API
  useEffect(() => {
    const fetchAddOns = async () => {
      if (!orderData.artist || !orderData.service || !orderData.creativeBrief?.story) {
        showToast.error('Please complete previous steps first');
        navigate('/home');
        return;
      }

      try {
        setLoading(true);
        const response = await artistAPI.getAddonByArtist();
        
        if (response.status === 'success' && response.data?.addOns) {
          // Transform API data to match component format
          const addons = response.data.addOns.map(addon => ({
            id: addon._id,
            _id: addon._id,
            name: addon.name,
            price: addon.price,
            description: addon.description,
            customFields: addon.customFields || {},
          }));
          setAvailableAddOns(addons);
        }
      } catch (error) {
        console.error('Error fetching add-ons:', error);
        showToast.error('Failed to load add-ons');
        // Fallback to empty array or orderData.artist?.addOns
        setAvailableAddOns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAddOns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAddOn = (addOn) => {
    const isSelected = selectedAddOns.some(item => (item.id || item._id) === (addOn.id || addOn._id));
    let newAddOns;
    
    if (isSelected) {
      newAddOns = selectedAddOns.filter(item => (item.id || item._id) !== (addOn.id || addOn._id));
    } else {
      newAddOns = [...selectedAddOns, addOn];
    }
    
    setSelectedAddOns(newAddOns);
    updateAddOns(newAddOns);
  };

  const handleContinue = () => {
    completeAddOns(selectedAddOns);
    showToast.success('Add-ons saved!');
    // TODO: Navigate to review & payment page
    navigate('/review-payment');
  };

  const handleSkip = () => {
    completeAddOns([]);
    navigate('/review-payment');
  };

  const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
  const grandTotal = (orderData.service?.price || 0) + addOnsTotal;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading add-ons...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Back Button */}
        <div className="flex items-center gap-x-3">
          <button 
            onClick={() => navigate('/creative-brief')}
            className="flex items-center rounded-full bg-primary px-4 py-4 text-white font-semibold shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
          >
            <img src="/BackIcon.png" alt="" width={18} height={20}/>
          </button>
          <span className="font-bold text-xl">Back</span>
        </div>

        <div className='relative w-full bg-form-bg rounded-3xl p-8 shadow-lg border border-outline'>
        {/* Progress Bar */}
        <div className="mb-10 md:mx-16">
          <ProgressBar />
        </div>

        {/* Page Header */}
        <FormHeader title="Enhance Your Order" description="Add optional extras to make your experience even better."/>

        {/* Add-ons Grid */}
        {availableAddOns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-3 md:mx-12 mb-10">
            {availableAddOns.map((addOn) => {
              const isSelected = selectedAddOns.some(item => (item.id || item._id) === (addOn.id || addOn._id));
              
              return (
                <AddOnCard
                  key={addOn._id || addOn.id}
                  addon={addOn}
                  isSelected={isSelected}
                  onToggle={toggleAddOn}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-600 font-medium mb-2">No add-ons available</p>
            <p className="text-gray-500 text-sm">
              This artist hasn't created any add-ons yet. You can continue to payment.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex max-sm:flex-col gap-4 sm:pt-4 md:mx-12">
          <button
            onClick={handleSkip}
            className="flex-1 rounded-full border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
          >
            Skip Add-ons
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-primary/90 shadow-lg hover:shadow-xl"
          >
            Continue to Review
          </button>
        </div>
        </div>
      </main>
    </div>
  );
};

export default AddOns;
