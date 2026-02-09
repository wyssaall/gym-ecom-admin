import React from "react";
import Card from "../../components/dashboard/Card";
import Graphe from "../../components/dashboard/Graphe";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Page Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Ventes et statistiques
        </p>
      </div>

      {/* Cards Section */}
      <div className="mb-10">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Chiffres clés
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

      </div>

      {/* Graph Section */}
      <div>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Performances
        </h2>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <Graphe />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
