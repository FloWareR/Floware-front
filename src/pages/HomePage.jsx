import { useState } from 'react'
import Dashboard from './Dashboard'
import SideBar from './SideBar'
import Products from './Products'
export default function Component() {
  const [activeTab, setActiveTab] = useState('dashboard')
  console.log(activeTab)


const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Dashboard />;
      case 'customers':
        return <Dashboard />;
      default:
        return <Dashboard />;
  }
};


  return (
    <div className="flex h-screen bg-gray-300">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}    
</div>
  )
}