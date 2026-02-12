import { useState, useEffect } from 'react';
import { artistAPI } from '../../../../api/artist';
import { showToast } from '../../../../utils/toast';
import AddProductModal from './subcomponents/AddProductModal';
import DeleteProductModal from './subcomponents/DeleteProductModal';
import ProductCard from './subcomponents/ProductCard';

const StoreFront = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await artistAPI.getAllMerchandize();
      console.log('API response for merchandize:', response);
      
      // Handle response - it should be an array of products
      if (Array.isArray(response?.data?.merchandize)) {
        setProducts(response.data.merchandize);
      } else{
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.response?.data?.message || 'Failed to fetch products');
      showToast.error('Failed to load products');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = (newProduct) => {
    // Add the new product to the list
    setProducts(prev => [newProduct, ...prev]);
    setIsModalOpen(false);
    setEditingProduct(null);
    showToast.success('Product added successfully!');
  };

  const handleUpdateProduct = (updatedProduct) => {
    // Update the product in the list
    setProducts(prev => prev.map(p => 
      (p._id || p.id) === (updatedProduct._id || updatedProduct.id) ? updatedProduct : p
    ));
    setIsModalOpen(false);
    setEditingProduct(null);
    showToast.success('Product updated successfully!');
  };

  const handleEditProduct = (productId) => {
    const product = products.find(p => (p._id || p.id) === productId);
    if (product) {
      setEditingProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleDeleteProduct = (productId) => {
    const product = products.find(p => (p._id || p.id) === productId);
    if (product) {
      setDeletingProduct(product);
      setIsDeleteModalOpen(true);
    }
  };

  const deleteProduct = (productId) => {
    // Remove product from list after successful API call
    setProducts(products.filter(p => (p._id || p.id) !== productId));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="lg:ml-20 min-h-screen bg-gray-50 p-4 md:p-8 pt-20 lg:pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Store Front</h1>
            <p className="text-sm md:text-base text-gray-600">
              Manage your merchandise and products
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <svg 
            className="animate-spin h-12 w-12 text-primary mb-4" 
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
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="lg:ml-20 min-h-screen bg-gray-50 p-4 md:p-8 pt-20 lg:pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Store Front</h1>
            <p className="text-sm md:text-base text-gray-600">
              Manage your merchandise and products
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
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
            Add Product
          </button>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-red-100 rounded-full p-8 mb-6">
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h3>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
        {/* Add/Edit Product Modal */}
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          editProduct={editingProduct}
        />
        
        {/* Delete Product Modal */}
        <DeleteProductModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingProduct(null);
          }}
          product={deletingProduct}
          onDelete={deleteProduct}
        />
      </div>
    );
  }

  return (
    <div className="lg:ml-20 min-h-screen bg-gray-50 p-4 md:p-8 pt-20 lg:pt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Store Front</h1>
          <p className="text-sm md:text-base text-gray-600">
            Manage your merchandise and products
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
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
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-gray-200 rounded-full p-8 mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-20 w-20 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Yet</h3>
          <p className="text-gray-600 text-center mb-6">
            Start selling by adding your first product
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        editProduct={editingProduct}
      />

      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingProduct(null);
        }}
        product={deletingProduct}
        onDelete={deleteProduct}
      />
    </div>
  );
};

export default StoreFront;
