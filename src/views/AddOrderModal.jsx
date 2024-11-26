import React, { useState, useEffect } from 'react';

const AddModal = ({ isVisible, onClose, onSave, customers, products }) => {
  const [formData, setFormData] = useState({
    customer_id: '',
    total_amount: 0, // This will be dynamically calculated
    status: '',
    order_data: [], // Changed field name to `order_data`
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrderDataChange = (index, field, value) => {
    const updatedOrderData = [...formData.order_data];
    updatedOrderData[index] = {
      ...updatedOrderData[index],
      [field]: field === 'quantity' ? parseInt(value) : value,
    };
    setFormData({ ...formData, order_data: updatedOrderData });
  };

  const addOrderDataRow = () => {
    setFormData({
      ...formData,
      order_data: [...formData.order_data, { product_id: '', quantity: 1 }], // Initialize with empty `product_id`
    });
  };

  const removeOrderDataRow = (index) => {
    const updatedOrderData = formData.order_data.filter((_, i) => i !== index);
    setFormData({ ...formData, order_data: updatedOrderData });
  };

  // Calculate total amount dynamically whenever order_data changes
  useEffect(() => {
    const total = formData.order_data.reduce((sum, order) => {
      const productDetails = products.find((p) => p.product_id === order.id);
      const price = productDetails ? productDetails.price : 0;
      console.log(order)
      return sum + price * (order.quantity || 0);
    }, 0);
    setFormData((prevData) => ({ ...prevData, total_amount: total }));
  }, [formData.order_data, products]);

  const handleSave = () => {
    if (!formData.customer_id || formData.total_amount <= 0 || !formData.status) {
      alert('Please fill out all required fields and add valid products.');
      return;
    }
    if (formData.order_data.length === 0) {
      alert('Please add at least one product to the order.');
      return;
    }
    onSave(formData);
    setFormData({
      customer_id: '',
      total_amount: 0,
      status: '',
      order_data: [], // Reset order_data after saving
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-xl font-semibold mb-4">Add New Order</h2>
        <div className="mb-4">
          <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700">
            Customer
          </label>
          <select
            name="customer_id"
            id="customer_id"
            value={formData.customer_id}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.email}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="total_amount" className="block text-sm font-medium text-gray-700">
            Total Amount
          </label>
          <input
            type="number"
            name="total_amount"
            id="total_amount"
            value={formData.total_amount}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Products</h3>
          {formData.order_data.map((order, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <select
                value={order.product_id}
                onChange={(e) => handleOrderDataChange(index, 'product_id', e.target.value)}
                className="block w-3/4 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select a product
                </option>
                {products.map((prod) => (
                  <option key={prod.product_id} value={prod.id}>
                    {prod.name} 
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={order.quantity}
                onChange={(e) => handleOrderDataChange(index, 'quantity', e.target.value)}
                className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Qty"
              />
              <button
                onClick={() => removeOrderDataRow(index)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addOrderDataRow}
            className="mt-2 text-blue-500 hover:text-blue-700 font-bold"
          >
            + Add Product
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
