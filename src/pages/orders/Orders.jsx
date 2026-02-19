import React, { useState, useEffect } from "react";
import orderService from "../../services/OrderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openOrders, setOpenOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAllOrders();
      setOrders(Array.isArray(data) ? data : (data.orders || []));
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Erreur lors de la récupération des commandes.");
    } finally {
      setLoading(false);
    }
  };

  const toggleOrder = (id) => {
    setOpenOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Chargement des commandes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détails</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                  Aucune commande trouvée.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order._id.substring(order._id.length - 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total} DZD</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => toggleOrder(order._id)}
                      >
                        {openOrders.includes(order._id) ? "⬆ Masquer" : "⬇ Voir"}
                      </button>
                    </td>
                  </tr>

                  {/* Dropdown / détails items */}
                  {openOrders.includes(order._id) && (
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
                            <span className="font-semibold">Adresse:</span> {order.customer?.address}, {order.customer?.commune}, {order.customer?.wilaya} <br />
                            <span className="font-semibold">Téléphone:</span> {order.customer?.phone}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
