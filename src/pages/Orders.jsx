import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'; 
import { Search, Plus, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../components/Table';
import AddModal from '../views/AddOrderModal';

const Orders = ({ orders, fetchOrders, API_URL, customers, products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const navigate = useNavigate();
  
  const pushUpdateToAPI = (formData) => {
    const URI = API_URL + '/updateorder';
    fetch(`${URI}?id=${selectedOrder.id}`, {
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
      fetchOrders();
    })
    .catch(error => {
      if(error.status === 401) {
        localStorage.removeItem('token')           
        navigate('/login');              
      }
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
  
  const pushDeleteToAPI = (selectedOrder) => {
    const URI = API_URL + '/deleteorder';
    fetch(`${URI}?id=${selectedOrder.id}`, {
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
      fetchOrders();
    })
    .catch(error => {
      if(error.status === 401) {
        localStorage.removeItem('token')           
        navigate('/login');              
      }
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
    const URI = API_URL + '/addorder';
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
      fetchOrders();
    })
    .catch(error => {
      if(error.status === 401) {
        localStorage.removeItem('token')           
        navigate('/login');              
      }
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

  // Map orders to include customer details
  const enrichedOrders = orders.map(order => {
    const customer = customers.find(cust => cust.id === order.customer_id);

    console.log(customer)
    return {
      ...order,
      customer_name: customer ? customer.email : 'Unknown Customer', // Replace 'name' with the actual field you want to show
    };
  });

  // Filter orders based on search term
  const filteredOrders = enrichedOrders.filter(order =>
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleSave = (editedOrder) => {
    pushUpdateToAPI(selectedOrder, editedOrder);
  };

  // Delete order
  const handleDelete = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleDeleteSave = () => {
    pushDeleteToAPI(selectedOrder);
  };

  // Edit order
  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
    console.log(order);
  };

  const handleEditSave = (formData) => {
    pushUpdateToAPI(formData);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  // Add order
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
    }
  };

  const columns = [
    { Header: 'Ordered by', accessor: 'customer_name' }, 
    { Header: 'Total', accessor: 'total_amount' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Ordered at', accessor: 'order_date' },
  ];

  const orderFields = [
    { name: 'customer_id', label: 'Customer', options: customers, required: true }, 
    { name: 'product_id', label: 'Product', required: true },
    { name: 'total_amount', label: 'Total', required: true },
    { name: 'status', label: 'Status', required: true },
    { name: 'order_date', label: 'Ordered at', required: true },
  ];

  return (
    <div className="container mx-auto p-8 flex-1">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">Orders</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={fetchOrders}>
          <RotateCcw className="mr-2 h-4 w-4" /> Refresh Orders
        </button>
        <button onClick={() => handleAdd()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Place order
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Orders"
              className="pl-10 pr-4 py-2 border-gray-300 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="relative">
          <Table
            columns={columns}
            data={filteredOrders}
            actions={true}
            onRowAction={handleRowAction}
          />
        </div>
      </div>
      <AddModal
        isVisible={showAddModal}
        onClose={handleAddClose}
        onSave={handleAddSave}
        customers={customers}
        products={products}
      />
    </div>
  );
};

export default Orders;
