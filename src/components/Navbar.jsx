import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { NavUserMenu } from "./NavUserMenu";
import { NavMobileMenu } from "./NavMobileMenu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme } = useTheme();
  const { user, isAuthenticated, isEmployer } = useAuth();
  const location = useLocation();

  const isDark = theme === "dark";
  const cx = (light, dark) => (isDark ? dark : light);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl shadow-2xl border-b transition-all duration-300 ${cx(
        "bg-white/80 shadow-primary-500/10 border-gray-200/20",
        "bg-gray-900/80 shadow-primary-400/10 border-gray-700/20"
      )}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 blur-lg opacity-20 rounded-lg"></div>
                  <h1 className="relative text-3xl font-black bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent">
                    JobPortal
                  </h1>
                </div>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-12 flex items-center space-x-1">
                <Link
                  to="/jobs"
                  className={`relative group px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    isActive("/jobs")
                      ? cx("text-primary-600", "text-primary-400")
                      : cx(
                          "text-gray-900 hover:text-primary-600",
                          "text-gray-100 hover:text-primary-400"
                        )
                  }`}
                >
                  <span className="relative z-10">Find Jobs</span>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${cx(
                      "from-primary-50 to-purple-50",
                      "from-primary-900/20 to-purple-900/20"
                    )} rounded-xl transition-all duration-300 transform group-hover:scale-105 ${
                      isActive("/jobs")
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </Link>
                <Link
                  to="/companies"
                  className={`relative group px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    isActive("/companies")
                      ? cx("text-primary-600", "text-primary-400")
                      : cx(
                          "text-gray-700 hover:text-primary-600",
                          "text-gray-300 hover:text-primary-400"
                        )
                  }`}
                >
                  <span className="relative z-10">Companies</span>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${cx(
                      "from-primary-50 to-purple-50",
                      "from-primary-900/20 to-purple-900/20"
                    )} rounded-xl transition-all duration-300 transform group-hover:scale-105 ${
                      isActive("/companies")
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <ThemeToggleButton />

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center space-x-3 px-4 py-2 bg-gradient-to-r rounded-xl transition-all duration-300 ${cx(
                      "from-primary-50 to-purple-50 hover:from-primary-100 hover:to-purple-100",
                      "from-primary-900/20 to-purple-900/20 hover:from-primary-800/30 hover:to-purple-800/30"
                    )}`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className={`text-sm font-semibold ${cx("text-gray-900", "text-gray-100")}`}>
                        {user.name}
                      </div>
                      <div className={`text-xs ${cx("text-primary-600", "text-primary-400")}`}>
                        {isEmployer ? user.company : user.title}
                      </div>
                    </div>
                    <svg
                      className={`w-4 h-4 ${cx("text-gray-600", "text-gray-300")}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <NavUserMenu isOpen={showUserMenu} onClose={() => setShowUserMenu(false)} />
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`relative group px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl ${cx(
                      "text-gray-700 hover:text-primary-600",
                      "text-gray-300 hover:text-primary-400"
                    )}`}
                  >
                    <span className="relative z-10">Log In</span>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${cx(
                        "from-primary-50 to-purple-50",
                        "from-primary-900/20 to-purple-900/20"
                      )} rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}
                    ></div>
                  </Link>
                  <Link
                    to="/register"
                    className="relative group overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-purple-700 hover:from-primary-700 hover:via-primary-800 hover:to-purple-800 text-white px-7 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${cx(
                "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                "text-gray-300 hover:text-white hover:bg-gray-800"
              )}`}
            >
              <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <NavMobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </nav>
  );
};
