import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { Search, Plus, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from '../views/DeleteModal';
import FormModal from '../views/FormModal';
import Table from '../components/Table';

const Products = ({ products, fetchProducts, API_URL }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();

  const pushUpdateToAPI = (formData) => {
    const URI = `${API_URL}/updateproduct?id=${selectedProduct.id}`;
    fetch(URI, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error updating');
        return response.json();
      })
      .then(() => {
        toast.success('Product updated successfully!', { position: 'top-right' });
        fetchProducts();
      })
      .catch(handleError);
  };

  const pushDeleteToAPI = () => {
    const URI = `${API_URL}/deleteproduct?id=${selectedProduct.id}`;
    
    fetch(URI, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())  
      .then((data) => {
        if (data.status === 'error') {
          toast.warning(data.message, { position: 'top-right' });
        } else if (data.status === 'success') {
          toast.success('Product deleted successfully!', { position: 'top-right' });
          fetchProducts();  
          setShowDeleteModal(false);  
        } else {
          // Handle unexpected status or errors
          toast.error('Unexpected error occurred!', { position: 'top-right' });
        }
      })
      .catch(handleError);
  };
  

  const pushAddToAPI = (newProduct) => {
    fetch(`${API_URL}/addproduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error adding');
        return response.json();
      })
      .then(() => {
        toast.success('Product added successfully!', { position: 'top-right' });
        fetchProducts();
        setShowAddModal(false);
      })
      .catch(handleError);
  };

  const handleError = (error) => {
    if (error.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
      toast.warning('Manager access required!', { position: 'top-right' });
    } else {
      console.error(error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleRowAction = (row, actionType) => {
    if (actionType === 'edit') handleEdit(row);
    else if (actionType === 'delete') handleDelete(row);
  };
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };
  const handleAdd = () => setShowAddModal(true);

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'SKU', accessor: 'sku' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Quantity', accessor: 'quantity' },
  ];

  const productFields = [
    { name: 'name', label: 'Name', required: true },
    { name: 'barcode', label: 'Barcode' },
    { name: 'description', label: 'Description', required: true },
    { name: 'sku', label: 'SKU' },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    { name: 'cost', label: 'Cost', type: 'number' },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-700">Products</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={fetchProducts}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Refresh Products

          </button>
          <button
            onClick={() => handleAdd()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 sm:gap-6 mb-4">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers"
          className="w-full sm:w-64 pl-10 pr-4 py-2 border-gray-300 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
        <div className="overflow-x-auto">
          <Table columns={columns} data={filteredProducts} actions onRowAction={handleRowAction} />
        </div>
      </div>

      <FormModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={pushUpdateToAPI}
        title="Edit Product"
        fields={productFields}
        mode="edit"
        selectedData={selectedProduct}
      />

      <FormModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={pushAddToAPI}
        title="Add Product"
        fields={productFields}
        mode="create"
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        product={selectedProduct}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={pushDeleteToAPI}
      />
    </div>
  );
};

export default Products;
