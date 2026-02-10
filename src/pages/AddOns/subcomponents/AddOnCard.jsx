import React from 'react';

const AddOnCard = ({ addon, isSelected, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(addon)}
      className={`
        cursor-pointer rounded-xl transition-all duration-200
        ${isSelected 
          ? 'bg-primary ring-2 ring-white/30' 
          : 'bg-primary hover:bg-primary'
        }
      `}
    >
      <div className="p-5 flex items-center justify-between gap-4">
        {/* Left side - Title and Description */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base mb-1">
            {addon.name}
          </h3>
          <p className="text-white/80 text-sm leading-snug">
            {addon.description}
          </p>
        </div>

        {/* Right side - Price and Icon */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-white font-bold text-lg whitespace-nowrap">
            + ${addon.price}
          </span>
          
          {/* Plus icon or Checkmark */}
          {isSelected ? (
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v12m6-6H6" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOnCard;
