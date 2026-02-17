import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { artistAPI } from '../../api/artist';
import { showToast } from '../../utils/toast';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { getColorStyle } from '../../utils/products';
import { ArrowLeft, Check, Minus, Plus, ShoppingCart, Lock, Truck } from 'lucide-react';

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
      
      const productData = response.data?.merchandize;
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
        <Loading />
      </div>
    );
  }
  // Error state
  if (error || !product) {
    return (
        <Error message={error || 'The product you are looking for does not exist.'} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
       {/* Back Button */}
        <div className="flex items-center gap-x-3 absolute top-4 left-4">
          <button 
            onClick={()=> navigate(-1)}
            className="flex items-center rounded-full bg-primary px-4 py-4 text-white font-semibold shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
          >
            <img src="/BackIcon.png" alt="" width={18} height={20}/>
          </button>
          <span className="font-bold text-xl">Back</span>
        </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-5 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square max-h-90 lg:aspect-4/3 lg:max-h-100 bg-white rounded-2xl overflow-hidden shadow-lg mx-auto">
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
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Product Title and Price */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {product.productName}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl md:text-3xl font-bold text-primary">
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
                      className={`w-8 md:w-11 h-8 md:h-11 rounded-full border-2 transition-all ${
                        selectedColor === color 
                          ? 'border-primary scale-110 shadow-lg' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: getColorStyle(color) }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <Check 
                          className={`h-6 w-6 mx-auto ${
                            color === 'White' || color === 'Yellow' || color === 'Natural' || color === 'Beige' 
                              ? 'text-gray-800' 
                              : 'text-white'
                          }`}
                        />
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
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg min-w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 99}
                    className="px-4 py-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-5 w-5" />
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
                <ShoppingCart className="h-6 w-6" />
                Add to Cart
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Secure Checkout</h4>
                  <p className="text-sm text-blue-700">Your payment information is protected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
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
