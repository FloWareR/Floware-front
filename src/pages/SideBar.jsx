import { useState } from 'react'
import { Package, DollarSign, ShoppingCart, Users, Boxes, AlertTriangle, TrendingUp } from 'lucide-react'

const SideBar = ({ activeTab, setActiveTab}) => {
  
  return (
    <aside className="w-64 bg-white shadow-md">
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800">Floware Inventory</h2>
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
          className={`flex items-center px-4 py-2 ${
            activeTab === item.tab ? 'bg-gray-300' : ''
          } text-gray-700 hover:bg-gray-500 hover:text-white`}
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
