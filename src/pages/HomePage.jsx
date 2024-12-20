import { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import SideBar from './SideBar';
import Products from './Products';
import MobileMessage from './MobileMessage';
import Customers from './Customers';
import Orders from './Orders';



export default function Component({ API_URL }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 379px)').matches);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const URI = API_URL + '/getproduct';
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
      setProducts(data);
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    const URI = API_URL + '/getcustomer';
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
      setCustomers(data);
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    const URI = API_URL + '/getorder';
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
      setOrders(data);
      console.log(data)
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts();
        await fetchCustomers();
        await fetchOrders();
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 379px)').matches);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center w-full h-full">
          <Audio height="80" width="80" radius="10" color="blue" ariaLabel="loading" wrapperStyle wrapperClass />
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard products={products} customers={customers} orders={orders}/>;
      case 'products':
        return <Products products={products} fetchProducts={fetchProducts} API_URL={API_URL} />;
      case 'orders':
        return <Orders customers={customers} products={products} orders={orders} fetchOrders={fetchOrders} API_URL={API_URL} />;
      case 'customers':
        return <Customers customers={customers} fetchCustomers={fetchCustomers} API_URL={API_URL} />;

      default:
        return <Dashboard products={products} />;
    }
  };

  return (
<div className={`flex h-screen w-screen bg-gray-200`}>
    <>
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow overflow-auto">
        {renderContent()}
      </main>
    </>
</div>

  );
}
