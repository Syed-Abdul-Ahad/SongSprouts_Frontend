import React, { useState } from 'react';

const MoodSlider = ({ value = 2, onChange, name = 'mood' }) => {
  const [activeIndex, setActiveIndex] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  const moods = [
    { label: 'Deep & Soulful', emoji: '🧘', value: 0, description: 'Deep & Soulful' },
    { label: 'Soft & Chill', emoji: '☁️', value: 1, description: 'Soft & Chill' },
    { label: 'Perfectly Balanced', emoji: '⚖️', value: 2, description: 'Balanced' },
    { label: 'Bright & Groovy', emoji: '✨', value: 3, description: 'Bright & Groovy' },
    { label: 'High Energy / Party', emoji: '🥳', value: 4, description: 'Upbeat & Energetic' },
  ];

  const handleDotClick = (index) => {
    setActiveIndex(index);
    if (onChange) {
      onChange({
        target: {
          name,
          value: moods[index].description,
        },
      });
    }
  };

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setActiveIndex(newValue);
    if (onChange) {
      onChange({
        target: {
          name,
          value: moods[newValue].description,
        },
      });
    }
  };

  return (
    <div className="w-full py-6">
      {/* Mood Labels and Dots Container */}
      <div className="relative">
        {/* Mood Labels and Dots */}
        <div className="flex justify-between items-end px-4">
          {moods.map((mood, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ width: '20%' }}
            >
              {/* Mood Label Above Dot */}
              <div className={`flex flex-col items-center mb-4 transition-all duration-300 ${
                index === activeIndex ? 'scale-110' : 'scale-100 opacity-60'
              }`}>
                <span className="text-xl md:text-3xl mb-2 transition-transform duration-300 hover:scale-125">
                  {mood.emoji}
                </span>
                <span
                  className={`text-[10px] md:text-xs font-semibold text-center transition-all duration-300 ${
                    index === activeIndex ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {mood.label}
                </span>
              </div>

              {/* Dot Button */}
              <button
                type="button"
                onClick={() => handleDotClick(index)}
                className={`w-6 h-6 rounded-full border-4 transition-all duration-300 relative z-10 ${
                  index === activeIndex
                    ? 'bg-primary border-white scale-125 shadow-lg'
                    : 'bg-white border-gray-300 hover:border-primary hover:scale-110'
                }`}
                aria-label={mood.label}
              />
            </div>
          ))}

          {/* Track Line - Behind the dots */}
          <div className="absolute bottom-3 left-4 right-4 h-0.5 bg-primary" style={{ zIndex: 0 }} />
        </div>

        {/* Hidden Range Input for Dragging */}
        <input
          type="range"
          min="0"
          max="4"
          step="1"
          value={activeIndex}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute bottom-0 left-0 w-full h-8 opacity-0 cursor-pointer z-20"
          aria-label="Mood slider"
        />
      </div>

      {/* Current Selection Display */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-1">Selected Mood:</p>
        <p className="text-lg sm:text-2xl font-bold text-primary">
          {moods[activeIndex].emoji} {moods[activeIndex].label}
        </p>
      </div>
    </div>
  );
};

export default MoodSlider;
