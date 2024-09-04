import { Package, DollarSign, ShoppingCart, Users, Boxes, AlertTriangle, TrendingUp } from 'lucide-react'


const Dashboard = ({products}) => {

  const lowStockAlert = products.filter(product => product.quantity < 10).length;

  return (
    <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold text-gray-70 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { title: 'Total Products', value: products.length, icon: Boxes, color: 'text-blue-500' },
            { title: 'Total Orders', value: '0', icon: ShoppingCart, color: 'text-green-500' },
            { title: 'Revenue', value: '0', icon: DollarSign, color: 'text-yellow-500' },
            { title: 'Customers', value: '0', icon: Users, color: 'text-purple-500' },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                <item.icon className={`h-8 w-8 ${item.color}`} />
              </div>
              <p className="text-3xl font-bold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Low Stock Alert</h2>
            <div className="flex items-center text-amber-500">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>{lowStockAlert} products are running low on stock</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Selling Products</h2>
            <div className="flex items-center text-green-500">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span>View this month's best sellers</span>
            </div>
          </div>
        </div>
      </main>
  )
}

export default Dashboard
