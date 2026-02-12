import { useState } from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Handle both MongoDB _id and regular id
  const productId = product._id || product.id;

  const handleDelete = () => {
    onDelete(productId);
    setShowDeleteConfirm(false);
  };

  const getColorStyle = (color) => {
    const colorMap = {
      'Black': '#000000',
      'White': '#FFFFFF',
      'Navy': '#000080',
      'Gray': '#808080',
      'Grey': '#808080',
      'Red': '#FF0000',
      'Blue': '#0000FF',
      'Green': '#008000',
      'Yellow': '#FFFF00',
      'Pink': '#FFC0CB',
      'Purple': '#800080',
      'Orange': '#FFA500',
      'Brown': '#A52A2A',
      'Natural': '#F5F5DC',
      'Beige': '#F5F5DC'
    };
    return colorMap[color] || color;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group relative">
      {/* Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onEdit(productId)}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-200"
          title="Edit Product"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-blue-600" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200"
          title="Delete Product"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-red-600" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete "{product.productName}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        {!imageError ? (
          <img
            src={product.productImageUrls?.[0] || product.productImages?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
            alt={product.productName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-20 w-20" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate" title={product.productName}>
          {product.productName}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={product.productDescription}>
          {product.productDescription}
        </p>

        {/* Price */}
        <div className="mb-3">
          {product.sizes && product.sizes.length > 0 ? (
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">From </span>
              <span className="text-lg font-bold text-primary">
                ${Math.min(...product.sizes.map(s => s.price)).toFixed(2)}
              </span>
            </div>
          ) : (
            <div className="text-lg font-bold text-primary">
              ${product.productPrice?.toFixed(2)}
            </div>
          )}
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Available Colors:</p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: getColorStyle(color) }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Available Sizes:</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((sizeObj, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                  title={`$${sizeObj.price}`}
                >
                  {sizeObj.size}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
