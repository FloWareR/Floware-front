import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'; 
import { Search, Plus, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../components/Table';
import AddModal from '../views/AddOrderModal';
import OrderDetails from '../pages/OrderDetails';

const Orders = ({ orders, fetchOrders, API_URL, customers, products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const navigate = useNavigate();

  const enrichedOrders = orders.map((order) => {
    const customer = customers.find((cust) => cust.id === order.customer_id);
    return {
      ...order,
      customer_name: customer ? customer.email : 'Unknown Customer',
    };
  });

  const filteredOrders = enrichedOrders.filter((order) =>
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  // Handle View Details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleDetailsClose = () => {
    setShowDetailsModal(false);
  };

  const renderOrderActions = (row, closeDropdown) => (
    <button
      className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-100"
      onClick={() => {
        handleViewDetails(row);
        closeDropdown();
      }}
    >
      View Details
    </button>
  );

  const columns = [
    { Header: 'Ordered by', accessor: 'customer_name' },
    { Header: 'Total', accessor: 'total_amount' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Ordered at', accessor: 'order_date' },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-700">Orders</h1>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <button
          onClick={fetchOrders}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Refresh Orders
        </button>
        <button
          onClick={() => handleAdd()}       
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"    
        >
          <Plus className="mr-2 h-4 w-4" />       
          Add Orders      
        </button>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers"
            className="w-full sm:w-64 pl-10 pr-4 py-2 border-gray-300 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="relative">
          <Table
            columns={columns}
            data={filteredOrders}
            actions
            customActionRenderer={renderOrderActions}
          />
        </div>
      </div>

      {/* View Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            {selectedOrder ? (
              <OrderDetails orderId={selectedOrder.id} onClose={handleDetailsClose} API_URL = {API_URL} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
