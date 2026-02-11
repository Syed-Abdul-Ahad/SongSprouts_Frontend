import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';
import { showToast } from '../../utils/toast';
import FormHeader from '../../components/FormHeader';

const ReviewAndPay = () => {
  const navigate = useNavigate();
  const { orderData, submitOrder, accessReviewPay } = useOrder();
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  
  // Check if user can access this page
  useEffect(() => {
    if (hasChecked) return;
    
    if (!orderData.artist || !orderData.service || !orderData.creativeBrief?.story) {
      showToast.error('Please complete all previous steps first');
      navigate('/home');
    } else {
      // Mark this step as accessed
      accessReviewPay();
    }
    setHasChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate totals
  const servicePrice = orderData.service?.price || 0;
  const addOnsTotal = orderData.addOns?.reduce((sum, addon) => sum + addon.price, 0) || 0;
  const grandTotal = servicePrice + addOnsTotal;

  // Handle payment submission
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // TODO: Integrate with actual payment gateway
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = await submitOrder();
      
      if (result.success) {
        showToast.success('Order placed successfully!');
        // TODO: Navigate to order confirmation page
        navigate('/dashboard');
      } else {
        showToast.error(result.message || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      showToast.error('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
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

        <div className='relative w-full bg-white rounded-3xl p-8 md:p-12 shadow-sm'>
          {/* Progress Bar */}
          <div className="mb-10">
            <ProgressBar />
          </div>

          {/* Page Header */}
          <FormHeader
            title="Your Custom Song Order"
            description={`You're commissioning a custom song from artist ${orderData.artist?.fullname || 'Ava Sterling'}. Review your selections below before proceeding to checkout.`}
          />

          {/* Order Summary Box */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              {/* Service Item */}
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">{orderData.service?.title || 'Custom Song'}</span>
                <span className="text-gray-900 font-semibold">${servicePrice}</span>
              </div>

              {/* Add-ons Items */}
              {orderData.addOns && orderData.addOns.length > 0 && orderData.addOns.map((addon, index) => (
                <div key={addon._id || addon.id || index} className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">{addon.name}</span>
                  <span className="text-gray-900 font-semibold">+ ${addon.price}</span>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between items-center pt-6">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">${grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Current Total Display */}
          <div className="text-right mb-8">
            <p className="text-sm text-gray-600 mb-1">Current Total</p>
            <p className="text-5xl font-bold text-gray-900">${grandTotal}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleBack}
              disabled={isProcessing}
              className={`
                flex-1 rounded-full border-2 border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 text-lg
                transition-all duration-300 
                ${isProcessing 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:border-gray-400 hover:bg-gray-50'
                }
              `}
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`
                flex-1 rounded-full px-8 py-4 font-bold text-white text-lg
                transition-all duration-300 shadow-lg
                ${isProcessing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90 hover:shadow-xl'
                }
              `}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Proceed to Checkout'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewAndPay;