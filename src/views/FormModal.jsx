import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DynamicModal = ({ show, onClose, onSave, title, fields, mode, selectedData }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    if (mode === 'edit' && selectedData) {
      setFormData(selectedData);
      setInitialData(selectedData);
    } else {
      setFormData({});
    }
  }, [mode, selectedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: false });
  };

  const handleSave = () => {
    if (mode === 'create') {
      const newErrors = {};
      fields.forEach(field => {
        if (field.required && !formData[field.name]) {
          newErrors[field.name] = true;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        toast.error('Please fill in all required fields!', {
          position: "top-right",
          autoClose: 4000,
        });
        setErrors(newErrors);
        return;
      }
    }

    if (mode === 'edit') {

      // Edit mode logic, check for changes
      const hasChanges = Object.keys(formData).some(
        key => formData[key] !== initialData[key]
      );

      if (!hasChanges) {
        toast.error('No changes were made!', {
          position: "top-right",
          autoClose: 4000,
        });
        return;
      }
    }

    setErrors({});
    onSave(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {fields.map((field, index) => (
            <div key={index}>
              <label className="block mb-2">{field.label}</label>
<<<<<<< HEAD
              {field.options ? (
                <select
                  value={formData[field.name] || ''}
                  name={field.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${
                    errors[field.name] ? 'border-red-700' : 'border-gray-500'
                  } outline-none focus:ring focus:ring-blue-600 rounded-md`}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  value={formData[field.name] || ''}
                  type={field.type || 'text'}
                  name={field.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${
                    errors[field.name] ? 'border-red-700' : 'border-gray-500'
                  } outline-none focus:ring focus:ring-blue-600 rounded-md`}
                />
              )}
=======
              <input
                value={formData[field.name] || ''}
                type={field.type || 'text'}
                name={field.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors[field.name] ? 'border-red-700' : 'border-gray-500'
                } outline-none focus:ring focus:ring-blue-600 rounded-md`}
              />
>>>>>>> 543bcef277a1d69fdfc6b43c15fce4bb05658c7e
            </div>
          ))}
        </div>

        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">
          {mode === 'create' ? 'Create' : 'Save'}
        </button>
        <button onClick={onClose} className="bg-red-600 text-white px-5 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default DynamicModal;
