import { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  
  // Get initial order data with user validation
  const getInitialOrderData = () => {
    const currentUser = localStorage.getItem('currentUserId');
    const savedOrder = localStorage.getItem('songOrderData');
    
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      // Check if the saved order belongs to the current user
      if (parsedOrder.userId && parsedOrder.userId === currentUser) {
        return parsedOrder;
      }
    }
    
    // Return fresh order data
    return {
      userId: currentUser,
      currentStep: ORDER_STEPS.SELECT_ARTIST,
      completedSteps: [],
      artist: null,
      service: null,
      creativeBrief: {
        recipient: '',
        occasion: '',
        story: '',
        mood: 'Balanced',
      },
      addOns: [],
      totalPrice: 0,
    };
  };
  
  // Load order data from localStorage on mount
  const [orderData, setOrderData] = useState(getInitialOrderData);

  // Reset order (clear all data)
  const resetOrder = useCallback(() => {
    const currentUser = localStorage.getItem('currentUserId');
    const freshData = {
      userId: currentUser,
      currentStep: ORDER_STEPS.SELECT_ARTIST,
      completedSteps: [],
      artist: null,
      service: null,
      creativeBrief: {
        recipient: '',
        occasion: '',
        story: '',
        mood: 'Balanced',
      },
      addOns: [],
      totalPrice: 0,
    };
    setOrderData(freshData);
    localStorage.setItem('songOrderData', JSON.stringify(freshData));
  }, []);

  // Persist order data to localStorage whenever it changes
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUserId');
    const dataToSave = { ...orderData, userId: currentUser };
    localStorage.setItem('songOrderData', JSON.stringify(dataToSave));
  }, [orderData]);

  // Check if user has changed and reset if needed
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUserId');
    if (orderData.userId && orderData.userId !== currentUser) {
      // User has changed, reset order data
      resetOrder();
    }
  }, [orderData.userId, resetOrder]);

  // Update artist selection (Step 1)
  const selectArtist = useCallback((artist) => {
    const currentUser = localStorage.getItem('currentUserId');
    setOrderData(prev => {
      // Check if selecting a different artist - if so, reset everything except artist
      const isDifferentArtist = prev.artist && (prev.artist.userId || prev.artist.id) !== (artist.userId || artist.id);
      
      if (isDifferentArtist) {
        return {
          userId: currentUser,
          currentStep: ORDER_STEPS.CHOOSE_SERVICE,
          completedSteps: [ORDER_STEPS.SELECT_ARTIST],
          artist,
          service: null,
          creativeBrief: {
            recipient: '',
            occasion: '',
            story: '',
            mood: 'Balanced',
          },
          addOns: [],
          totalPrice: 0,
        };
      }
      
      return {
        ...prev,
        userId: currentUser,
        artist,
        currentStep: ORDER_STEPS.CHOOSE_SERVICE,
        completedSteps: [...new Set([...prev.completedSteps, ORDER_STEPS.SELECT_ARTIST])],
      };
    });
  }, []);

  // Update service selection (Step 2)
  const selectService = useCallback((service) => {
    const currentUser = localStorage.getItem('currentUserId');
    setOrderData(prev => {
      // Check if selecting a different service - if so, reset creative brief and add-ons
      const isDifferentService = prev.service && (prev.service.id || prev.service._id) !== (service.id || service._id);
      
      if (isDifferentService) {
        return {
          ...prev,
          userId: currentUser,
          service,
          currentStep: ORDER_STEPS.CREATIVE_BRIEF,
          completedSteps: [ORDER_STEPS.SELECT_ARTIST, ORDER_STEPS.CHOOSE_SERVICE],
          creativeBrief: {
            recipient: '',
            occasion: '',
            story: '',
            mood: 'Balanced',
          },
          addOns: [],
          totalPrice: service.price,
        };
      }
      
      return {
        ...prev,
        userId: currentUser,
        service,
        currentStep: ORDER_STEPS.CREATIVE_BRIEF,
        completedSteps: [...new Set([...prev.completedSteps, ORDER_STEPS.CHOOSE_SERVICE])],
        totalPrice: service.price,
      };
    });
  }, []);

  // Update creative brief (Step 3)
  const updateCreativeBrief = useCallback((briefData) => {
    setOrderData(prev => ({
      ...prev,
      creativeBrief: { ...prev.creativeBrief, ...briefData },
    }));
  }, []);

  // Complete creative brief step
  const completeCreativeBrief = useCallback((briefData) => {
    setOrderData(prev => ({
      ...prev,
      creativeBrief: { ...prev.creativeBrief, ...briefData },
      currentStep: ORDER_STEPS.ADD_ONS,
      completedSteps: [...new Set([...prev.completedSteps, ORDER_STEPS.CREATIVE_BRIEF])],
    }));
  }, []);

  // Update add-ons (Step 4)
  const updateAddOns = useCallback((addOns) => {
    setOrderData(prev => {
      const addOnsTotal = addOns.reduce((sum, addon) => sum + addon.price, 0);
      const servicePrice = prev.service?.price || 0;
      
      return {
        ...prev,
        addOns,
        totalPrice: servicePrice + addOnsTotal,
      };
    });
  }, []);

  // Complete add-ons step
  const completeAddOns = useCallback((addOns) => {
    setOrderData(prev => {
      const addOnsTotal = addOns.reduce((sum, addon) => sum + addon.price, 0);
      const servicePrice = prev.service?.price || 0;
      
      return {
        ...prev,
        addOns,
        currentStep: ORDER_STEPS.REVIEW_PAY,
        completedSteps: [...new Set([...prev.completedSteps, ORDER_STEPS.ADD_ONS])],
        totalPrice: servicePrice + addOnsTotal,
      };
    });
  }, []);

  // Mark review & pay step as accessed/completed
  const accessReviewPay = useCallback(() => {
    setOrderData(prev => ({
      ...prev,
      currentStep: ORDER_STEPS.REVIEW_PAY,
      completedSteps: [...new Set([...prev.completedSteps, ORDER_STEPS.REVIEW_PAY])],
    }));
  }, []);

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
    accessReviewPay,
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
