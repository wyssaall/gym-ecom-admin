import React from 'react'

function Products() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
        {/* titre */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Produits
          </h1>
          <p className="text-gray-500 text-sm">
            Les produits
          </p>
        </div>

        {/* table des produits */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom produit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Produit 1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Leggings</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2000 DA</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">300</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">Disponible</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">Modifier</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Supprimer</button>
                    <button className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition">Voir</button>
                  </td>
               </tr>
            </tbody>
          </table>
        </div>

        {/* Ajouter produit */}
        <div className="mt-6 text-right">
          <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
            Ajouter un produit
          </button>
        </div>
    </div>
  )
}

export default Products
