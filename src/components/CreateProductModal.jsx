import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateProductModal = ({ show, onClose, onSave }) => {
  const [newProduct, setNewProduct] = useState('');
  const [fillError, setFillError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSave = () => {

    if(!newProduct.name || !newProduct.description || !newProduct.quantity || !newProduct.price) {
      toast.error('Fill in the fields!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setFillError(true);
      return;     
    }
    setFillError(false);
    onSave(newProduct);
    onClose(); 
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              value={newProduct.name}
              type="text"
              name="name"
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border focus:ring-blue-600 outline-none focus:ring rounded-md 
                ${fillError ? 'border-red-700' : 'border-gray-500'}`}

            />
          </div>

          <div>
            <label className="block mb-2">Barcode</label>
            <input
              value={newProduct.barcode}
              type="text"
              name="barcode"
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-500 outline-none focus:ring focus:ring-blue-600 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <input
              value={newProduct.description}
              type="text"
              name="description"
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border focus:ring-blue-600 outline-none focus:ring rounded-md 
                ${fillError ? 'border-red-700' : 'border-gray-500'}`}            />
          </div>

          <div>
            <label className="block mb-2">SKU</label>
            <input
              value={newProduct.sku}
              type="text"
              name="sku"
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-500 outline-none focus:ring focus:ring-blue-600 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2">Quantity</label>
            <input
              value={newProduct.quantity}
              type="number"
              name="quantity"
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border focus:ring-blue-600 outline-none focus:ring rounded-md 
                ${fillError ? 'border-red-700' : 'border-gray-500'}`}            />
          </div>

          <div>
            <label className="block mb-2">Price</label>
            <input
              value={newProduct.price}
              type="number"
              name="price"
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border focus:ring-blue-600 outline-none focus:ring rounded-md 
                ${fillError ? 'border-red-700' : 'border-gray-500'}`}            />
          </div>


          <div>
            <label className="block mb-2">Cost</label>
            <input
              value={newProduct.cost}
              type="number"
              name="cost"
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-500 outline-none focus:ring focus:ring-blue-600 rounded-md"
            />
          </div>

        </div>
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">
          Add
        </button>
        <button onClick={onClose} className="bg-red-600 text-white  px-5 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateProductModal;
