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
        <h2 className="text-xl font-semibold mb-4">View details & edit</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">ID</label>
            <input
              disabled
              type="number"
              name="id"
              value={product.id}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 outline-none focus:ring focus:ring-blue-600 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2">Name</label>
            <input
              
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-500 outline-none focus:ring focus:ring-blue-600 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2">Barcode</label>
            <input
              type="text"
              name="barcode"
              value={product.barcode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-500 outline-none focus:ring focus:ring-blue-600 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-500 outline-none focus:ring focus:ring-blue-600 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-500 outline-none focus:ring focus:ring-blue-600 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-500 outline-none focus:ring focus:ring-blue-600 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-500 outline-none focus:ring focus:ring-blue-600 rounded-md"
            />
          </div>


          <div>
            <label className="block mb-2">Cost</label>
            <input
              type="number"
              name="cost"
              value={product.cost}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-500 outline-none focus:ring focus:ring-blue-600 rounded-md"
            />
          </div>

        </div>

        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;
