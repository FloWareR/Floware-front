import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useRef, useEffect } from 'react'; 
import { Search, Plus, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from '../views/DeleteModal';
import FormModal from '../views/FormModal';
import Table from '../components/Table';

const Customers = ({ customers, fetchCustomers, API_URL }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  
  const navigate = useNavigate();
  
    const pushUpdateToAPI = (formData) => {
    const URI = API_URL + '/updatecustomer';
    fetch(`${URI}?id=${selectedCustomer.id}`, {
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
      fetchCustomers();
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
  
    const pushDeleteToAPI = (selectedCustomer) => {
      const URI = API_URL + '/deletecustomer';
      fetch(`${URI}?id=${selectedCustomer.id}`, {
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
        fetchCustomers();
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
  
    const pushAddToAPI = (formData) => {
      console.log(formData)
      const URI = API_URL + '/addcustomer';
      fetch(URI, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Error adding');
      }
      return response.json();
    })
    .then(data => {
      console.log('add successful:', data);
      fetchCustomers();
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
  
    const filteredCustomers = customers.filter(customers =>
      customers.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customers.phone_number.includes(searchTerm.toLowerCase()))
    );
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value.trim());
    };
  
  
    const handleSave = (editedCustomer) => {
      pushUpdateToAPI(selectedCustomer, editedCustomer);
    };
  
  // Delete product
  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const handleDeleteSave = ( ) => {
    pushDeleteToAPI(selectedCustomer);
  };

// Edit product
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
    console.log(customer)
  };

  const handleEditSave = (formData) => {
    pushUpdateToAPI(formData);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

// Add product
  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleAddSave = (formData) => {
    pushAddToAPI(formData);
  };

  const handleAddClose = () => {
    setShowAddModal(false);
  };

// Misc functions
  const handleRowAction = (row, actionType) => {
      if (actionType === 'edit') {
        handleEdit(row);
      } else if (actionType === 'delete') {
        handleDelete(row);
      } else if (actionType === 'delete') {
        handleDetails(row);
      }
      
  };
  
    const columns = [
      { Header: 'Name', accessor: 'first_name' },
      { Header: 'Last name', accessor: 'last_name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone Number', accessor: 'phone_number' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'type', accessor: 'type' },
      { Header: 'Company name', accessor: 'company_name' },
      { Header: 'Payment method', accessor: 'payment_method' },

    ];
    
    const customerFields = [
      { name: 'first_name', label: 'Name', required: true },
      { name: 'last_name', label: 'Last name', required: true },
      { name: 'email', label: 'Email', required: true },
      { name: 'phone_number',type: 'number', label: 'Phone number' , required: true},
      { name: 'type', label: 'Type', options:['vip', 'regular', 'wholesale'], required: true },
      { name: 'company_name', label: 'Company name', required: true },
      { name: 'payment_method', label: 'Payment method', options:['credit_card', 'debit_card', 'cash', 'paypal'], required: true },
      { name: 'address', label: 'Address', required: true },
      
    ];

    return (
<div className="container mx-auto p-4 md:p-8 flex-1">
  {/* Header Section */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
    <h1 className="text-2xl md:text-3xl font-semibold text-gray-700">Customers</h1>
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        onClick={fetchCustomers}
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Refresh Customers
      </button>
      <button
        onClick={() => handleAdd()}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Customer
      </button>
    </div>
  </div>

  {/* Search Section */}
  <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
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
          <div className="relative overflow-x-auto">
          <Table
            columns={columns}
            data={filteredCustomers}
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
        fields={customerFields}
        mode= "edit"
        selectedData = {selectedCustomer}
      />

      <FormModal
        show={showAddModal}
        onClose={handleAddClose}
        onSave={handleAddSave}
        title="Add Product"
        fields={customerFields}
        mode= "create"
      /> 

      <DeleteConfirmationModal
          show={showDeleteModal}
          product={selectedCustomer}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteSave}
      />
      </div>
  
    );
  };
  
export default Customers;
