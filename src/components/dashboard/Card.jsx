import React from "react";

function Card({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 transition duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
          {title}
        </h2>
        {Icon && <Icon className="w-8 h-8 text-gray-400" />}
      </div>
      <h1 className="text-2xl font-bold text-gray-900">
        {value}
      </h1>
      {subtitle != null && subtitle !== "" && (
        <p className="text-sm text-gray-600">{subtitle}</p>
      )}
    </div>
  );
}

export default Card;
