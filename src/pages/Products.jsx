import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useRef, useEffect } from 'react'; 
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
const [showDeletetModal, setShowDeletetModal] = useState(false);
const [showAddModal, setShowAddModal] = useState(false);


const navigate = useNavigate();
//Fetch to API
  const pushUpdateToAPI = (formData) => {
  const URI = API_URL + '/updateproduct';
  fetch(`${URI}?id=${formData.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token'),
    },
    body: JSON.stringify(formData)
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
      toast.warning('Manager access required', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      }
  );

  };

  const pushDeleteToAPI = (deletedProduct) => {
    const URI = API_URL + '/deleteproduct';
    fetch(`${URI}?id=${deletedProduct.id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
      },
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Error updating');
      }
      return response.json();
    })
    .then(data => {
      toast.warning('Delete successful!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      fetchProducts();
      return;     
    })
    .catch(error => {
      if(error.status === 401) {
        localStorage.removeItem('token')           
        navigate('/login');              
        ;}
        toast.warning('Manager access required', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
    });
  };

  const pushAddToAPI = (newProduct) => {
    const URI = API_URL + '/addproduct';
    fetch(URI, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token'),
    },
    body: JSON.stringify(newProduct)
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Error adding');
    }
    return response.json();
  })
  .then(data => {
    console.log('add successful:', data);
    fetchProducts();
  })
  .catch(error => {
    if(error.status === 401) {
      localStorage.removeItem('token')           
      navigate('/login');              
      ;}
      toast.warning('Manager access required', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
  });
  }

// Filter products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

//Misc functions
  const handleRowAction = (row, actionType) => {
    if (actionType === 'edit') {
      handleEdit(row);
    } else if (actionType === 'delete') {
      handleDelete(row);
    } else if (actionType === 'delete') {
      handleDetails(row);
    }
    
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

// Delete product
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeletetModal(true);
  };

  const handleDeleteSave = ( ) => {
    pushDeleteToAPI(selectedProduct);
  };

// Edit product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleEditSave = (formData) => {
    pushUpdateToAPI(formData);
  }

  const handleEditClose = () => {
    setShowEditModal(false);
  }

// Add product
  const handleAdd = () => {
    setShowAddModal(true);
  }

  const handleAddSave = (formData) => {
    pushAddToAPI(formData);
  }

  const handleAddClose = () => {
    setShowAddModal(false);
  }

  //Fields for table  & forms
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
    <div className="container mx-auto p-8 flex-1">
      <div className="flex justify-between items-center ">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">Products</h1>
      <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={fetchProducts}>
          <RotateCcw className="mr-2 h-4 w-4" /> Refresh Products
        </button>
        <button onClick={() => handleAdd()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
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
              className="pl-10 pr-4 py-2 border-gray-300 border-2	 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className=" relative">
        <Table
          columns={columns}
          data={filteredProducts}
          actions={true}
          onRowAction={handleRowAction}
        />    
        </div>
      </div>

      <FormModal
        show={showEditModal}
        onClose={handleEditClose}
        onSave={handleEditSave}
        title="Edit Product"
        fields={productFields}
        mode= "edit"
        selectedData = {selectedProduct}
      />

      <FormModal
        show={showAddModal}
        onClose={handleAddClose}
        onSave={handleAddSave}
        title="Add Product"
        fields={productFields}
        mode= "create"
      />

      <DeleteConfirmationModal
          show={showDeletetModal}
          product={selectedProduct}
          onClose={() => setShowDeletetModal(false)}
          onConfirm={handleDeleteSave}
      />
    </div>

  );
};

export default Products;
