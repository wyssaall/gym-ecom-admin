import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../services/AuthService";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login", { replace: true });
  };
    return (
        <aside
            className="
        w-64
        bg-gray-800
        text-gray-100
        flex
        flex-col
        justify-between
        p-6
      "
        >
            {/* Top Section */}
            <div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-10 tracking-wide text-center">
                    Admin Panel
                </h1>

                {/* Menu */}
                <nav className="flex flex-col gap-2">

                    {[
                        { name: "Dashboard", path: "/" },
                        { name: "Produits", path: "/products" },
                        { name: "Orders", path: "/orders" },
                        { name: "Categories", path: "/categories" },
                        { name: "Wilaya", path: "/wilaya" },
                    ].map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `
                py-2.5
                px-4
                rounded-lg
                transition-all
                duration-300
                ${isActive
                                    ? "bg-gray-700 font-semibold shadow"
                                    : "hover:bg-gray-700/60"
                                }
              `
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}

                </nav>
            </div>

            {/* Logout */}
            <button
                type="button"
                onClick={handleLogout}
                className="
          py-2.5
          px-4
          rounded-lg
          bg-red-500/20
          text-red-400
          hover:bg-red-500/40
          transition-all
          duration-300
          cursor-pointer
        "
            >
                Déconnexion
            </button>
        </aside>
    );
}

export default Sidebar;
