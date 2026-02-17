import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MerchandiseSection = ({ merchandise }) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // If no merchandise provided
  if (!merchandise || merchandise.length === 0) {
    return (
      <div className="w-full">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900">Merchandise</h2>
        </div>
        <div className="rounded-3xl bg-white p-12 text-center shadow-md">
          <p className="text-lg text-gray-500">No merchandise available at the moment.</p>
        </div>
      </div>
    );
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    console.log('Selected Product:', product);
    // You can add navigation to product detail page here if needed
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-gray-900">Merchandise</h2>
        <p className="text-sm text-gray-600">Check out exclusive artist merchandise</p>
      </div>

      {/* Merchandise Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {merchandise.map((product) => (
          <div
            key={product._id}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            {/* Product Image */}
            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
              {product.productImageUrls && product.productImageUrls.length > 0 ? (
                <img
                  src={product.productImageUrls[0]}
                  alt={product.productName}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
              )}
              
              {/* Color Badges - If available */}
              {product.colors && product.colors.length > 0 && (
                <div className="absolute top-3 right-3 flex flex-wrap gap-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <span 
                      key={index}
                      className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-sm"
                    >
                      {color}
                    </span>
                  ))}
                  {product.colors.length > 3 && (
                    <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6">
              {/* Product Name */}
              <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-1">
                {product.productName}
              </h3>

              {/* Product Description */}
              <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-2">
                {product.productDescription}
              </p>

              {/* Size Options - If available */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-700">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.5 4.5c-1.95 0-4.05 1.73-5.5 3.5-1.45-1.77-3.55-3.5-5.5-3.5-2.54 0-4.5 2.04-4.5 4.5 0 4.28 4.6 8.53 9.05 12.54l.95.86.95-.86C17.4 17.53 22 13.28 22 9c0-2.46-1.96-4.5-4.5-4.5z"/>
                  </svg>
                  <span className="font-medium">Sizes:</span>
                  <span>{product.sizes.map(s => s.size).join(', ')}</span>
                </div>
              )}

              {/* Product Specification */}
              {product.productSpecification && (
                <div className="mb-4 flex items-start gap-2 text-sm text-gray-700">
                  <svg className="h-4 w-4 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
                  </svg>
                  <span className="line-clamp-2">{product.productSpecification}</span>
                </div>
              )}

              {/* Price Section */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Price</p>
                  <p className="text-2xl font-extrabold text-primary">
                    ${product.productPrice}
                  </p>
                  {product.sizes && product.sizes.length > 0 && (
                    <p className="text-xs text-gray-500">Starting from</p>
                  )}
                </div>

                {/* View Details Button */}
                <button
                  className="rounded-full bg-primary px-6 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  View
                </button>
              </div>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchandiseSection;
