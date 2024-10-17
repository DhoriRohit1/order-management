const AdminPanel = ({ products }) => {
    const lowStockProducts = products.filter((product) => product.stock < 5);
  
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Admin Panel</h2>
  
        {/* Low Stock Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Low Stock Products</h3>
          {lowStockProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="p-4 bg-white rounded-lg shadow-md">
                  <h4 className="text-xl font-medium mb-2 text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-500">Stock: <span className="text-red-500 font-semibold">{product.stock} left</span></p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">All products are sufficiently stocked.</p>
          )}
        </div>
  
        {/* Add/Edit/Delete Product Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Manage Products</h3>
          
          {/* Add Product Form */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-gray-900">Add Product</h4>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Add Product
              </button>
            </form>
          </div>
  
          {/* Update/Delete Product Form */}
          <div>
            <h4 className="text-lg font-medium mb-2 text-gray-900">Update/Delete Product</h4>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Product</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Stock Quantity</label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200"
                >
                  Update Product
                </button>
                <button
                  type="button"
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
                >
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminPanel;
  