import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderContext = createContext(null);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};

// Order flow steps
export const ORDER_STEPS = {
  SELECT_ARTIST: 1,
  CHOOSE_SERVICE: 2,
  CREATIVE_BRIEF: 3,
  ADD_ONS: 4,
  REVIEW_PAY: 5,
};

export const STEP_NAMES = {
  1: 'Select Artist',
  2: 'Choose Service',
  3: 'Creative Brief',
  4: 'Add-ons',
  5: 'Review & Pay',
};

export const OrderProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // Load order data from localStorage on mount
  const [orderData, setOrderData] = useState(() => {
    const savedOrder = localStorage.getItem('songOrderData');
    return savedOrder ? JSON.parse(savedOrder) : {
      currentStep: ORDER_STEPS.SELECT_ARTIST,
      completedSteps: [],
      artist: null,
      service: null,
      creativeBrief: {
        recipient: '',
        occasion: '',
        story: '',
      },
      addOns: [],
      totalPrice: 0,
    };
  });

  // Persist order data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('songOrderData', JSON.stringify(orderData));
  }, [orderData]);

  // Update artist selection (Step 1)
  const selectArtist = (artist) => {
    setOrderData(prev => ({
      ...prev,
      artist,
      currentStep: ORDER_STEPS.CHOOSE_SERVICE,
      completedSteps: [...new Set([...prev.completedSteps, ORDER_STEPS.SELECT_ARTIST])],
    }));
  };

  // Update service selection (Step 2)
  const selectService = (service) => {
    setOrderData(prev => ({
      ...prev,
      service,
      currentStep: ORDER_STEPS.CREATIVE_BRIEF,
      completedSteps: [...new Set([...prev.completedSteps, ORDER_STEPS.CHOOSE_SERVICE])],
      totalPrice: service.price,
    }));
  };

  // Update creative brief (Step 3)
  const updateCreativeBrief = (briefData) => {
    setOrderData(prev => ({
      ...prev,
      creativeBrief: { ...prev.creativeBrief, ...briefData },
    }));
  };

  // Complete creative brief step
  const completeCreativeBrief = (briefData) => {
    setOrderData(prev => ({
      ...prev,
      creativeBrief: { ...prev.creativeBrief, ...briefData },
      currentStep: ORDER_STEPS.ADD_ONS,
      completedSteps: [...new Set([...prev.completedSteps, ORDER_STEPS.CREATIVE_BRIEF])],
    }));
  };

  // Update add-ons (Step 4)
  const updateAddOns = (addOns) => {
    const addOnsTotal = addOns.reduce((sum, addon) => sum + addon.price, 0);
    const servicePrice = orderData.service?.price || 0;
    
    setOrderData(prev => ({
      ...prev,
      addOns,
      totalPrice: servicePrice + addOnsTotal,
    }));
  };

  // Complete add-ons step
  const completeAddOns = (addOns) => {
    const addOnsTotal = addOns.reduce((sum, addon) => sum + addon.price, 0);
    const servicePrice = orderData.service?.price || 0;
    
    setOrderData(prev => ({
      ...prev,
      addOns,
      currentStep: ORDER_STEPS.REVIEW_PAY,
      completedSteps: [...new Set([...prev.completedSteps, ORDER_STEPS.ADD_ONS])],
      totalPrice: servicePrice + addOnsTotal,
    }));
  };

  // Navigate to specific step (with validation)
  const goToStep = (step) => {
    // Check if previous steps are completed
    const previousSteps = Array.from({ length: step - 1 }, (_, i) => i + 1);
    const allPreviousCompleted = previousSteps.every(s => 
      orderData.completedSteps.includes(s)
    );

    if (allPreviousCompleted || step <= orderData.currentStep) {
      setOrderData(prev => ({
        ...prev,
        currentStep: step,
      }));
      
      // Navigate to appropriate page
      switch(step) {
        case ORDER_STEPS.SELECT_ARTIST:
          navigate('/home');
          break;
        case ORDER_STEPS.CHOOSE_SERVICE:
          if (orderData.artist) {
            navigate(`/artist/${orderData.artist.userId || orderData.artist.id}`);
          }
          break;
        case ORDER_STEPS.CREATIVE_BRIEF:
          navigate('/creative-brief');
          break;
        case ORDER_STEPS.ADD_ONS:
          navigate('/add-ons');
          break;
        case ORDER_STEPS.REVIEW_PAY:
          navigate('/review-payment');
          break;
        default:
          break;
      }
    }
  };

  // Reset order (clear all data)
  const resetOrder = () => {
    setOrderData({
      currentStep: ORDER_STEPS.SELECT_ARTIST,
      completedSteps: [],
      artist: null,
      service: null,
      creativeBrief: {
        recipient: '',
        occasion: '',
        story: '',
      },
      addOns: [],
      totalPrice: 0,
    });
    localStorage.removeItem('songOrderData');
  };

  // Submit order (API call would go here)
  const submitOrder = async () => {
    try {
      // TODO: Implement API call to submit order
      // const response = await orderAPI.createOrder(orderData);
      
      console.log('Submitting order:', orderData);
      
      // After successful submission, reset order
      // resetOrder();
      // navigate('/order-confirmation');
      
      return { success: true, message: 'Order submitted successfully!' };
    } catch (error) {
      console.error('Error submitting order:', error);
      return { success: false, message: 'Failed to submit order' };
    }
  };

  // Check if a step is completed
  const isStepCompleted = (step) => {
    return orderData.completedSteps.includes(step);
  };

  // Check if current step is valid (all previous steps completed)
  const isStepAccessible = (step) => {
    if (step === 1) return true;
    const previousSteps = Array.from({ length: step - 1 }, (_, i) => i + 1);
    return previousSteps.every(s => orderData.completedSteps.includes(s));
  };

  const value = {
    orderData,
    selectArtist,
    selectService,
    updateCreativeBrief,
    completeCreativeBrief,
    updateAddOns,
    completeAddOns,
    goToStep,
    resetOrder,
    submitOrder,
    isStepCompleted,
    isStepAccessible,
    ORDER_STEPS,
    STEP_NAMES,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
