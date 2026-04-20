import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronsDown } from "react-icons/fi";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  function toggleMobilemenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="shadow-lg bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-8 ">
          {/* Logo + Mobile Toggle */}
          <div className="flex items-center justify-center sm:justify-between w-full sm:w-auto gap-x-3">
            <Link to="/" className="text-gray-900 font-extrabold text-lg">
              EVENT{" "}
              <span className="text-txtorange hover:text-orange-500">HIVE</span>
            </Link>

            {/* Mobile Icon */}
            <div className="sm:hidden  w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-600 to-white shadow-md  hover:shadow-2xl hover:translate-y-1 transition-all duration-300">
              <FiChevronsDown
                onClick={toggleMobilemenu}
                className={`text-2xl  cursor-pointer transition-transform duration-300 hover:translate-y-1 ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-900 hover:text-orange-600 transition"
            >
              Events
            </Link>

            {user ? (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  className="text-gray-800 hover:text-orange-600 transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-orange-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-txtorange text-white px-4 py-2 rounded-md hover:bg-orange-500 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div
            className={`w-full sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-60 opacity-100 mt-2"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col items-center gap-4 py-2">
              <Link
                to="/"
                className="text-gray-900 hover:text-orange-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>

              {user ? (
                <>
                  <Link
                    to={user.role === "admin" ? "/admin" : "/dashboard"}
                    className="text-gray-800 hover:text-orange-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-800 hover:text-orange-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
