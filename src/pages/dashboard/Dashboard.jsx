import React, { useState, useEffect } from "react";
import Card from "../../components/dashboard/Card";
import Graphe from "../../components/dashboard/Graphe";
import dashboardService from "../../services/DashboardService";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    dashboardService
      .getStats()
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.message || "Erreur chargement statistiques");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <p className="text-gray-600 font-medium">Chargement du tableau de bord…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  const formatDa = (n) => (n != null ? Number(n).toLocaleString("fr-FR") + " DA" : "0 DA");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-500 text-sm">Ventes et statistiques</p>
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Chiffres clés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Chiffre d’affaires total"
            value={formatDa(stats?.totalSales)}
          />
          <Card
            title="Nombre total de commandes"
            value={stats?.totalOrders ?? 0}
            subtitle={`dont ${stats?.ordersThisMonth ?? 0} ce mois-ci`}
          />
          <Card
            title="Commandes ce mois"
            value={stats?.ordersThisMonth ?? 0}
            subtitle={
              stats?.growthOrders != null
                ? `${stats.growthOrders >= 0 ? "+" : ""}${stats.growthOrders} % vs mois dernier`
                : ""
            }
          />
          <Card
            title="Nombre de produits"
            value={stats?.productsCount ?? 0}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Ventes par mois</h2>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <Graphe
            data={stats?.salesPerMonth ?? []}
            title=""
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
