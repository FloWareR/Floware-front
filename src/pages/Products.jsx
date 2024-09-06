import React, { useState, useRef, useEffect } from 'react'; 
import { Search, Plus, MoreVertical, RotateCcw, View } from 'lucide-react';
import EditProductModal from '../components/EditProductModal'; 
import { useNavigate } from 'react-router-dom';




const Products = ({ products, fetchProducts, API_URL }) => {
const [searchTerm, setSearchTerm] = useState('');
const [activeDropdown, setActiveDropdown] = useState(null);
const [selectedProduct, setSelectedProduct] = useState(null);
const [showEditModal, setShowEditModal] = useState(false);
const navigate = useNavigate();

const URI = API_URL + '/updateproduct';
useEffect(() => { 
  if (activeDropdown !== null) {
    document.addEventListener('mousedown', handleMouseClick);
    return () => {
      document.removeEventListener('mousedown', handleMouseClick);
    };
  }
}, [activeDropdown]);

console.log(URI)
const pushUpdateToAPI = (selectedProduct, editedProduct) => {
  fetch(`${URI}?id=${selectedProduct.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token'),
    },
    body: JSON.stringify(editedProduct)
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Error updating');
    }
    return response.json();
  })
  .then(data => {
    console.log('Update successful:', data);
    fetchProducts();
  })
  .catch(error => {
    if(error.status === 401) {
      localStorage.removeItem('token')           
      navigate('/login');              
      ;}
    console.error('Error failed:', error);
  });

  };
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMouseClick = (e) => {
    if (!e.target.closest('.absolute') || !e.target.closest('.relative')) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };



  const handleSave = (editedProduct) => {
    console.log('Saving edited product:', editedProduct);
    console.log(selectedProduct.id)
    pushUpdateToAPI(selectedProduct, editedProduct);
  };

  return (
    <div className="container mx-auto p-8 flex-1">
      <div className="flex justify-between items-center ">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">Products</h1>
      <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={fetchProducts}>
          <RotateCcw className="mr-2 h-4 w-4" /> Refresh Products
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products"
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded">
            Filter
          </button>
        </div>
        <div className=" relative">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">quantity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(product.id)}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="More options"
                      >
                        <MoreVertical className="h-5 w-5 " />
                      </button>
                      {activeDropdown === product.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          <div className="py-1">
                            <button onClick={() => handleEdit(product)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">More</button>
                            <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditProductModal 
          show={showEditModal}
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
      />
    </div>

  );
};

export default Products;
