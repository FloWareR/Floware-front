import { Package, ShoppingCart, Users, Boxes, LogOut } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ activeTab, setActiveTab }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <aside className="w-64 bg-white shadow-md flex-shrink-0 flex flex-col h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          <img src={logo} className="p-2" alt="Logo" />
        </h2>
      </div>

      <nav className="mt-6 flex flex-col flex-grow overflow-y-auto">
        {[
          { name: 'Dashboard', icon: Package, tab: 'dashboard' },
          { name: 'Products', icon: Boxes, tab: 'products' },
          { name: 'Orders', icon: ShoppingCart, tab: 'orders' },
          { name: 'Customers', icon: Users, tab: 'customers' },
          { name: 'Logout', icon: LogOut, tab: 'logout', last: true },
        ].map((item) => (
          <a
            key={item.tab}
            className={`flex items-center px-4 py-2 m-3 ${
              item.last ? 'mt-auto' : ''
            } ${
              activeTab === item.tab
                ? 'bg-blue-600 text-white rounded-lg'
                : 'text-gray-700 rounded-lg hover:bg-blue-200 hover:text-gray-800 hover:outline hover:outline-2 hover:outline-blue-600 hover:outline-offset-[-2px]'
            }`}

            onClick={item.tab === 'logout' ? handleLogout : () => setActiveTab(item.tab)}
          >
          <item.icon
              className={`mr-3 h-5 w-5 ${item.tab === 'logout' ? 'text-red-500' : ''}`}
            />            {item.name}
          </a>

          
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
