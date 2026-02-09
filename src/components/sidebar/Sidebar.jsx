import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="
        h-screen
        w-64
        bg-gray-900
        text-gray-100
        flex
        flex-col
        justify-between
        p-6
      "
    >
      {/* Logo / Title */}
      <div>

        <h1 className="text-2xl font-bold mb-10 tracking-wide">
          Admin Panel
        </h1>

        {/* Menu */}
        <nav className="flex flex-col gap-4">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `py-2 px-4 rounded-lg transition ${
                isActive
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `py-2 px-4 rounded-lg transition ${
                isActive
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-800"
              }`
            }
          >
            Produits
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `py-2 px-4 rounded-lg transition ${
                isActive
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-800"
              }`
            }
          >
            Orders
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `py-2 px-4 rounded-lg transition ${
                isActive
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-800"
              }`
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="/wilaya"
            className={({ isActive }) =>
              `py-2 px-4 rounded-lg transition ${
                isActive
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-800"
              }`
            }
          >
            Wilaya
          </NavLink>

        </nav>
      </div>

      {/* Logout */}
      <button
        className="
          py-2 px-4
          rounded-lg
          bg-red-500/10
          text-red-400
          hover:bg-red-500/20
          transition
        "
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
