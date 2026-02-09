import React from 'react';

function Categories() {
  // Exemple de données pour l'UI
  const categories = [
    {
      name: "Leggings",
      products: ["Leggings sport femme", "Leggings yoga femme", "Leggings running homme"]
    },
    {
      name: "T-Shirts",
      products: ["T-shirt running homme", "T-shirt training femme"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Titre */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Catégories</h1>
        <p className="text-gray-500 text-sm">Liste des catégories et leurs produits</p>
      </div>

      {/* Table des catégories */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((cat, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cat.name}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {cat.products.map((prod, i) => (
                      <span key={i} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
                        {prod}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2 flex-wrap">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">Modifier</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Supprimer</button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">Ajouter</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ajouter catégorie */}
      <div className="mt-6 text-right">
        <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
          Ajouter une catégorie
        </button>
      </div>
    </div>
  );
}

export default Categories;
