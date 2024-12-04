import React, { useState, useEffect } from 'react';

const OrderDetails = ({ orderId, onClose, API_URL }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchOrderItems = async () => {
      var URI = API_URL + `/getorderitems?id=${orderId}`
      setLoading(true);
      try {
        const response = await fetch(URI, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token'),
          },
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
          throw new Error('Error while fetching');
        }
  
        const data = await response.json();
        setOrderItems(data);
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, [orderId]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <ul className="space-y-2">
      {
        orderItems.map((item, index) => (
          <div key={index}>
            <p>
              Product: {item.name}
            </p>
            <p>
              Quantity: {item.quantity}
            </p>
            <p>
              Price: ${(parseFloat(item.price) || 0).toFixed(2)} 
            </p>
            <p>
              Total: ${(parseFloat(item.total) || 0).toFixed(2)} 
            </p>
          </div>
        ))}
      </ul>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
