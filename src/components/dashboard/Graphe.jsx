import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = { ventes: "#1f2937", commandes: "#3b82f6" };

function Graphe({ data = [], dataKey = "ventes", title }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center text-gray-500">
        Aucune donnée pour l’instant
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
      )}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
              formatter={(value) => [Number(value).toLocaleString("fr-FR"), dataKey === "ventes" ? "Ventes (DA)" : "Commandes"]}
              labelStyle={{ color: "#374151" }}
            />
            <Legend />
            <Bar
              dataKey="ventes"
              name="Ventes (DA)"
              fill={COLORS.ventes}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="commandes"
              name="Commandes"
              fill={COLORS.commandes}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphe;
