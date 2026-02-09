import React, { useState } from "react";

function Orders() {
  // Exemple de données (mock)
  const orders = [
    {
      id: "ORD-001",
      customer: "Wissal Zabour",
      phone: "0555-123-456",
      wilaya: "Alger",
      commune: "Bab Ezzouar",
      address: "Rue des Fleurs 12",
      total: 7200,
      items: [
        { name: "Leggings Sport Femme", quantity: 2, price: 2000, color: "Noir", size: "M" },
        { name: "T-shirt Running Homme", quantity: 1, price: 3200, color: "Bleu", size: "L" },
      ],
    },
    {
      id: "ORD-002",
      customer: "Salim NAIT ALI",
      phone: "0555-987-654",
      wilaya: "tizi ouzou",
      commune: "tizi ouzou",
      address: "Av. de la Liberté 5",
      total: 5000,
      items: [
        { name: "Leggings Yoga Femme", quantity: 1, price: 2000, color: "Gris", size: "S" },
        { name: "T-shirt Training Femme", quantity: 1, price: 3000, color: "Rose", size: "M" },
      ],
    },
  ];

  const [openOrders, setOpenOrders] = useState([]);

  const toggleOrder = (id) => {
    setOpenOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Titre */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Commandes</h1>
        <p className="text-gray-500 text-sm">Aperçu général et détails des commandes</p>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détails</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total} DZD</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => toggleOrder(order.id)}
                    >
                      {openOrders.includes(order.id) ? "⬆ Masquer" : "⬇ Voir"}
                    </button>
                  </td>
                </tr>

                {/* Dropdown / détails items */}
                {openOrders.includes(order.id) && (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-4">
                      <div className="flex flex-col gap-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                            <div className="text-gray-800 font-medium">{item.name}</div>
                            <div className="text-gray-600 text-sm">
                              Quantité: {item.quantity} | Prix: {item.price} DZD | Couleur: {item.color} | Taille: {item.size}
                            </div>
                          </div>
                        ))}

                        {/* Adresse livraison */}
                        <div className="text-gray-600 text-sm mt-2">
                          <span className="font-semibold">Adresse:</span> {order.address}, {order.commune}, {order.wilaya} <br/>
                          <span className="font-semibold">Téléphone:</span> {order.phone}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
