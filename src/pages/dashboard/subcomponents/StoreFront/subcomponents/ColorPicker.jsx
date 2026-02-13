import { useState } from 'react';

const ColorPicker = ({ selectedColors = [], onChange }) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customColor, setCustomColor] = useState('#000000');

  const predefinedColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Gray', value: '#808080' },
    { name: 'Navy', value: '#000080' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Green', value: '#008000' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Orange', value: '#FFA500' },
    { name: 'Pink', value: '#FFC0CB' },
    { name: 'Purple', value: '#800080' },
    { name: 'Brown', value: '#A52A2A' },
    { name: 'Beige', value: '#F5F5DC' },
    { name: 'Gold', value: '#FFD700' },
    { name: 'Silver', value: '#C0C0C0' },
    { name: 'Teal', value: '#008080' },
  ];

  const toggleColor = (colorName) => {
    if (selectedColors.includes(colorName)) {
      onChange(selectedColors.filter(c => c !== colorName));
    } else {
      onChange([...selectedColors, colorName]);
    }
  };

  const addCustomColor = () => {
    const colorName = customColor.toUpperCase();
    if (!selectedColors.includes(colorName)) {
      onChange([...selectedColors, colorName]);
    }
    setCustomColor('#000000');
    setShowCustomInput(false);
  };

  const removeColor = (colorName) => {
    onChange(selectedColors.filter(c => c !== colorName));
  };

  const getColorValue = (colorName) => {
    const predefined = predefinedColors.find(c => c.name === colorName);
    return predefined ? predefined.value : colorName;
  };

  return (
    <div className="space-y-4">
      {/* Selected Colors */}
      {selectedColors.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Selected Colors:</p>
          <div className="flex flex-wrap gap-2">
            {selectedColors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-100 rounded-full pl-1 pr-3 py-1"
              >
                <div
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: getColorValue(color) }}
                />
                <span className="text-sm text-gray-700">{color}</span>
                <button
                  type="button"
                  onClick={() => removeColor(color)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Predefined Colors */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Choose Colors:</p>
        <div className="grid grid-cols-8 gap-3">
          {predefinedColors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => toggleColor(color.name)}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                selectedColors.includes(color.name)
                  ? 'border-primary ring-2 ring-primary ring-offset-2 scale-110'
                  : 'border-gray-300 hover:border-gray-400 hover:scale-105'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Custom Color */}
      <div className="space-y-2">
        {!showCustomInput ? (
          <button
            type="button"
            onClick={() => setShowCustomInput(true)}
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
                clipRule="evenodd" 
              />
            </svg>
            Add Custom Color
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-12 h-12 rounded cursor-pointer border-2 border-gray-300"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              placeholder="#000000"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="button"
              onClick={addCustomColor}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCustomInput(false);
                setCustomColor('#000000');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
