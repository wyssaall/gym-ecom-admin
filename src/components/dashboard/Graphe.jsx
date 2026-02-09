import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Graphe() {

  // Fake data (pour tester)
  const data = [
    { name: "Lun", sales: 120 },
    { name: "Mar", sales: 200 },
    { name: "Mer", sales: 150 },
    { name: "Jeu", sales: 280 },
    { name: "Ven", sales: 300 },
    { name: "Sam", sales: 250 },
    { name: "Dim", sales: 180 },
  ];

  return (
    <div className="w-full h-[300px]">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#1f2937"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default Graphe;
