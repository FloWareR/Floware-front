import React from 'react';

const DeleteConfirmationModal = ({ show, product, onClose, onConfirm }) => {
  if (!show) return null;

  const handleEdit = () => {
    onConfirm(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md max-h-screen overflow-y-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-red-600">Delete Product</h2>
        <p className="text-gray-700">
          Are you sure you want to delete <strong>{product?.name}</strong> forever? <br />
          (That's a really long time.)
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => handleEdit()}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
