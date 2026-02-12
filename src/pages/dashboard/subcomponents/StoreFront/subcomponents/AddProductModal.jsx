import { useState, useEffect } from 'react';
import { artistAPI } from '../../../../../api/artist';
import { showToast } from '../../../../../utils/toast';
import ColorPicker from './ColorPicker';

const AddProductModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productSpecification: '',
    productPrice: '',
    colors: [],
  });

  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Common size options
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        productName: '',
        productDescription: '',
        productSpecification: '',
        productPrice: '',
        colors: [],
      });
      setSizes([]);
      setImages([]);
      setImagePreviews([]);
      setErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleColorChange = (selectedColors) => {
    setFormData(prev => ({ ...prev, colors: selectedColors }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + images.length > 5) {
      showToast.error('Maximum 5 images allowed');
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        showToast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showToast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    setImages(prev => [...prev, ...validFiles]);

    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    // Clear error
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: '' }));
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const addSize = () => {
    setSizes(prev => [...prev, { size: 'M', price: formData.productPrice || '' }]);
  };

  const updateSize = (index, field, value) => {
    setSizes(prev => prev.map((size, i) => 
      i === index ? { ...size, [field]: value } : size
    ));
  };

  const removeSize = (index) => {
    setSizes(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.productDescription.trim()) {
      newErrors.productDescription = 'Product description is required';
    }

    if (!formData.productPrice || parseFloat(formData.productPrice) <= 0) {
      newErrors.productPrice = 'Valid price is required';
    }

    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    // Validate sizes if any are added
    sizes.forEach((size, index) => {
      if (!size.price || parseFloat(size.price) <= 0) {
        newErrors[`size_${index}`] = 'Valid price required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast.error('Please fix all errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      
      formDataToSend.append('productName', formData.productName);
      formDataToSend.append('productDescription', formData.productDescription);
      formDataToSend.append('productSpecification', formData.productSpecification || '');
      formDataToSend.append('productPrice', parseFloat(formData.productPrice));
      
      // Add colors as JSON string
      if (formData.colors.length > 0) {
        formDataToSend.append('colors', JSON.stringify(formData.colors));
      }
      
      // Add sizes as JSON string
      if (sizes.length > 0) {
        const sizesData = sizes.map(s => ({
          size: s.size,
          price: parseFloat(s.price)
        }));
        formDataToSend.append('sizes', JSON.stringify(sizesData));
      }
      
      // Add images
      images.forEach((image, index) => {
        formDataToSend.append('productImages', image);
      });

      // Call API
      const response = await artistAPI.createMerchandize(formDataToSend);
      
      // Handle different response formats
      const newProduct = response.data?.merchandize || response.data || response;
      
      showToast.success('Product created successfully!');
      onSubmit(newProduct);
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
      showToast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
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
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.productName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Band T-Shirt"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
            )}
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="productDescription"
              value={formData.productDescription}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none ${
                errors.productDescription ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your product..."
            />
            {errors.productDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.productDescription}</p>
            )}
          </div>

          {/* Product Specification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Specification
            </label>
            <textarea
              name="productSpecification"
              value={formData.productSpecification}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              placeholder="e.g., 100% cotton, screen printed..."
            />
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.productPrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.productPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.productPrice}</p>
            )}
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Colors (Optional)
            </label>
            <ColorPicker
              selectedColors={formData.colors}
              onChange={handleColorChange}
            />
          </div>

          {/* Sizes */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Sizes & Pricing (Optional)
              </label>
              <button
                type="button"
                onClick={addSize}
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
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
                Add Size
              </button>
            </div>
            {sizes.length > 0 && (
              <div className="space-y-3">
                {sizes.map((size, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <select
                      value={size.size}
                      onChange={(e) => updateSize(index, 'size', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {sizeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={size.price}
                        onChange={(e) => updateSize(index, 'price', e.target.value)}
                        step="0.01"
                        min="0"
                        className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors[`size_${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                      />
                      {errors[`size_${index}`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`size_${index}`]}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
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
                ))}
              </div>
            )}
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images <span className="text-red-500">*</span>
              <span className="text-gray-500 text-xs ml-2">(Max 5 images, up to 5MB each)</span>
            </label>
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
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
            )}

            {/* Upload Button */}
            {images.length < 5 && (
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                errors.images ? 'border-red-500' : 'border-gray-300'
              }`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-10 h-10 mb-2 text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                    />
                  </svg>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
            )}
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg 
                    className="animate-spin h-5 w-5" 
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
                  Creating...
                </span>
              ) : (
                'Create Product'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
