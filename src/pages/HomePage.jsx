import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import SideBar from './SideBar';
import Products from './Products';
import { Audio } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


export default function Component({API_URL}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const URI = API_URL + '/getproduct';
  const fetchProducts = async () => {
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
        if(error.status === 401) {
          localStorage.removeItem('token')           
          navigate('/login');              
          ;}        throw new Error('Error while fetching');
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
        return <Products products={products} fetchProducts={fetchProducts} API_URL= {API_URL} />;
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
