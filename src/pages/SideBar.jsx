import { useState } from 'react'
import { Package, DollarSign, ShoppingCart, Users, Boxes, AlertTriangle, TrendingUp } from 'lucide-react'
import logo from '../assets/images/logo.png';

const SideBar = ({ activeTab, setActiveTab}) => {
  
  return (
    <aside className="w-64 bg-white shadow-md flex-shrink-0">
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800"> <img src={logo} className='p-2' alt="Logo" /> </h2>
    </div>
    <nav className="mt-6">
      {[
        { name: 'Dashboard', icon: Package, tab: 'dashboard' },
        { name: 'Products', icon: Boxes, tab: 'products' },
        { name: 'Orders', icon: ShoppingCart, tab: 'orders' },
        { name: 'Customers', icon: Users, tab: 'customers' },
      ].map((item) => (
        <a
          key={item.tab}
          className={`flex items-center px-4 py-2 m-3 ${
            activeTab === item.tab
              ? 'bg-blue-600 text-white rounded-lg' 
              : 'text-gray-700 rounded-lg hover:bg-blue-200 hover:text-gray-800 hover:outline hover:outline-2 hover:outline-blue-600 hover:outline-offset-[-2px]' // Inactive tab styles with outline and negative offset
            }`}
          href="#"
          onClick={() => setActiveTab(item.tab)}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.name}
        </a>
      ))}
    </nav>
  </aside>
  )
}

export default SideBar
