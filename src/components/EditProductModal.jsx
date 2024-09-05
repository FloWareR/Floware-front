import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditProductModal = ({ show, product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleSave = () => {

    if(!editedProduct.name && !editedProduct.sku && !editedProduct.price && !editedProduct.quantity) {
      toast.error('No changes were made!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;     
    }
    onSave(editedProduct);
    onClose(); 
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={editedProduct.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border border-gray-400 outline-none focus:ring focus:ring-blue-600 rounded-md"
        />

        <label className="block mb-2">Description</label>
        <input
          type="text"
          name="description"
          value={editedProduct.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border border-gray-400 outline-none focus:ring focus:ring-blue-600 rounded-md"
        />

        <label className="block mb-2">SKU</label>
        <input
          type="text"
          name="sku"
          value={editedProduct.sku}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border border-gray-400 outline-none focus:ring focus:ring-blue-600 rounded-md"
          />

        <label className="block mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={editedProduct.price}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border border-gray-400 outline-none focus:ring focus:ring-blue-600 rounded-md"
        />
        
        <label className="block mb-2">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={editedProduct.quantity}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border border-gray-400 outline-none focus:ring focus:ring-blue-600 rounded-md"
        />


        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Save
        </button>
        <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;
