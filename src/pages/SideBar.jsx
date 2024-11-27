import { Package, ShoppingCart, Users, Boxes, LogOut, Menu } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SideBar = ({ activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Initially, the sidebar is closed
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Check if screen size is large and set sidebar to open by default
  const checkScreenSize = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      setIsSidebarOpen(true); // Open sidebar by default on large screens
    } else {
      setIsSidebarOpen(false); // Close sidebar on smaller screens
    }
  };

  // Initialize sidebar state based on screen size
  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div className="relative flex">
      {/* Sidebar for large screens */}
      <aside
        className={`lg:w-64 bg-white shadow-md flex-shrink-0 flex flex-col h-screen fixed top-0 left-0 z-50 transition-all ease-in-out duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0'
        }`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            <img src={logo} className="p-2" alt="Logo" />
          </h2>
        </div>

        <nav className="mt-6 flex flex-col flex-grow overflow-y-auto">
          {[ 
            { name: 'Dashboard', icon: Package, tab: 'dashboard' },
            { name: 'Products', icon: Boxes, tab: 'products' },
            { name: 'Customers', icon: Users, tab: 'customers' },
            { name: 'Orders', icon: ShoppingCart, tab: 'orders' },
            { name: 'Logout', icon: LogOut, tab: 'logout', last: true },
          ].map((item) => (
            <a
              key={item.tab}
              className={`flex items-center px-4 py-2 m-3 ${item.last ? 'mt-auto ' : ''} ${
                activeTab === item.tab
                  ? 'bg-blue-600 cursor-pointer text-white rounded-lg'
                  : 'text-gray-700 cursor-pointer rounded-lg hover:bg-blue-200 hover:text-gray-800 hover:outline hover:outline-2 hover:outline-blue-600 hover:outline-offset-[-2px]'
              }`}
              onClick={item.tab === 'logout' ? handleLogout : () => setActiveTab(item.tab)}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${item.tab === 'logout' ? 'text-red-500' : ''}`}
              />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        } w-full`}
      >
        {/* Toggle Button (only visible on small screens) */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Add your main content */}
      </div>
    </div>
  );
};

export default SideBar;
