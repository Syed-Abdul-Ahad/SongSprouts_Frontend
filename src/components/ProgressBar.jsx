import React from 'react';
import { useOrder } from '../context/OrderContext';

const ProgressBar = ({ showLabels = true, className = '' }) => {
  const { orderData, ORDER_STEPS, STEP_NAMES, goToStep, isStepAccessible } = useOrder();
  
  const steps = [
    { step: ORDER_STEPS.SELECT_ARTIST, label: STEP_NAMES[ORDER_STEPS.SELECT_ARTIST] },
    { step: ORDER_STEPS.CHOOSE_SERVICE, label: STEP_NAMES[ORDER_STEPS.CHOOSE_SERVICE] },
    { step: ORDER_STEPS.CREATIVE_BRIEF, label: STEP_NAMES[ORDER_STEPS.CREATIVE_BRIEF] },
    { step: ORDER_STEPS.ADD_ONS, label: STEP_NAMES[ORDER_STEPS.ADD_ONS] },
    { step: ORDER_STEPS.REVIEW_PAY, label: STEP_NAMES[ORDER_STEPS.REVIEW_PAY] },
  ];

  const getStepStatus = (step) => {
    if (orderData.completedSteps.includes(step)) {
      return 'completed';
    } else if (orderData.currentStep === step) {
      return 'current';
    } else {
      return 'pending';
    }
  };

  const handleStepClick = (step) => {
    if (isStepAccessible(step)) {
      goToStep(step);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((item, index) => {
          const status = getStepStatus(item.step);
          const isAccessible = isStepAccessible(item.step);
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={item.step}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleStepClick(item.step)}
                  disabled={!isAccessible}
                  className={`
                    relative flex items-center justify-center rounded-full 
                    transition-all duration-300
                    h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12
                    ${isCompleted 
                      ? 'bg-[#2D5F3F] cursor-pointer hover:bg-[#234a31] shadow-lg' 
                      : isCurrent 
                        ? 'bg-[#7BA991] cursor-pointer hover:bg-[#6a9880] shadow-md' 
                        : 'bg-gray-300 cursor-not-allowed'
                    }
                    ${isAccessible && !isCompleted && !isCurrent ? 'hover:bg-gray-400 cursor-pointer' : ''}
                  `}
                >
                  {isCompleted ? (
                    // Check mark for completed steps
                    <svg 
                      className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="3" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    // Step number
                    <span className={`text-sm sm:text-base md:text-lg font-bold ${isCurrent || isCompleted ? 'text-white' : 'text-gray-500'}`}>
                      {item.step}
                    </span>
                  )}
                </button>
                
                {/* Step Label */}
                {showLabels && (
                  <span 
                    className={`
                      mt-1 sm:mt-2 text-[9px] sm:text-xs font-medium text-center max-w-24
                      ${isCurrent ? 'text-[#2D5F3F] font-semibold' : 'text-gray-600'}
                      
                    `}
                  >
                    {item.label}
                  </span>
                )}
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div 
                  className={`
                    flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-[#2D5F3F]' 
                      : 'bg-gray-300'
                    }
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;