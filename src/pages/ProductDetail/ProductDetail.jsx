import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { artistAPI } from '../../api/artist';
import { showToast } from '../../utils/toast';

const ProductDetail = () => {
  const { merchandizeId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [merchandizeId]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await artistAPI.getMerchandizeById(merchandizeId);
      console.log('Product response:', response);
      
      const productData = response.data?.merchandize || response.data || response;
      setProduct(productData);

      // Set default selections
      if (productData.sizes && productData.sizes.length > 0) {
        setSelectedSize(productData.sizes[0]);
      }
      if (productData.colors && productData.colors.length > 0) {
        setSelectedColor(productData.colors[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(error.response?.data?.message || 'Failed to load product details');
      showToast.error('Failed to load product details');
    } finally {
      setIsLoading(false);
    }
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

  const getCurrentPrice = () => {
    if (selectedSize && selectedSize.price) {
      return selectedSize.price;
    }
    return product?.productPrice || 0;
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    showToast.success('Product added to cart!');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <svg 
            className="animate-spin h-16 w-16 text-primary mx-auto mb-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 rounded-full p-8 inline-block mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-20 w-20 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Product Not Found</h3>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-gray-50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={
                  product.productImageUrls?.[selectedImage] || 
                  product.productImages?.[selectedImage] || 
                  'https://via.placeholder.com/600x600?text=No+Image'
                }
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.productImageUrls && product.productImageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.productImageUrls.map((imageUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-primary shadow-md scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`${product.productName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Title and Price */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.productName}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${getCurrentPrice().toFixed(2)}
                </span>
                {selectedSize && selectedSize.price !== product.productPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.productPrice?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="border-t border-b border-gray-200 py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.productDescription}
              </p>
            </div>

            {/* Product Specification */}
            {product.productSpecification && (
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Specifications</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.productSpecification}
                </p>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Color: <span className="text-primary">{selectedColor}</span>
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color 
                          ? 'border-primary scale-110 shadow-lg' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: getColorStyle(color) }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-6 w-6 mx-auto ${
                            color === 'White' || color === 'Yellow' || color === 'Natural' || color === 'Beige' 
                              ? 'text-gray-800' 
                              : 'text-white'
                          }`}
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Size: <span className="text-primary">{selectedSize?.size}</span>
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((sizeObj, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(sizeObj)}
                      className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                        selectedSize?.size === sizeObj.size 
                          ? 'border-primary bg-primary text-white shadow-md' 
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span>{sizeObj.size}</span>
                        <span className="text-xs mt-1">${sizeObj.price.toFixed(2)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-4 py-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg min-w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 99}
                    className="px-4 py-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-gray-600">
                  Total: <span className="font-semibold text-gray-900 text-lg">
                    ${(getCurrentPrice() * quantity).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-6">
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                Add to Cart
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-blue-600 mt-0.5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-blue-900">Secure Checkout</h4>
                  <p className="text-sm text-blue-700">Your payment information is protected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-blue-600 mt-0.5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-blue-900">Fast Shipping</h4>
                  <p className="text-sm text-blue-700">Get your order delivered quickly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
