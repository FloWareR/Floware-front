import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import SideBar from './SideBar';
import Products from './Products';
import { Audio } from 'react-loader-spinner';

export default function Component() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true); 
    try {
      const response = await fetch('http://localhost:80/floware/api/getproduct', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
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

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []); 

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center w-full h-full">
        <Audio height="80" width="80" radius="10" color="blue" ariaLabel="loading" wrapperStyle wrapperClass />
        </div>;

    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard products={products}/>;
      case 'products':
        return <Products products={products} fetchProducts={fetchProducts} />;
      case 'orders':
        return <Dashboard products={products}/>;
      case 'customers':
        return <Dashboard products={products}/>;
      default:
        return <Dashboard products={products}/>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
}
