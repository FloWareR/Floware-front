import React from 'react';

const DeleteConfirmationModal = ({ show, product, onClose, onConfirm }) => {

  if (!show) return null;

  const handleEdit = () => {
    onConfirm(product);
    onClose(); 
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
        <p>Are you sure you want to delete <strong>{product?.name}</strong> forever? (That's a really long time) </p>
        <div className="mt-4 flex justify-end">
          <button
              onClick={() => handleEdit()} 
            className="bg-red-600 text-white px-4 py-2 mr-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
