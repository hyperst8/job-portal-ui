import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { ThemeToggleButton } from "./ThemeToggleButton";

export const NavMobileMenu = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const { user, logout, isAuthenticated, isEmployer } = useAuth();
  const navigate = useNavigate();

  const isDark = theme === "dark";
  const cx = (light, dark) => (isDark ? dark : light);

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/", { replace: true });
  };

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link
          to="/jobs"
          className={`block px-3 py-2 text-base font-medium transition-colors ${cx(
            "text-gray-900 hover:text-primary-600",
            "text-gray-100 hover:text-primary-400"
          )}`}
          onClick={onClose}
        >
          Find Jobs
        </Link>
        <Link
          to="/companies"
          className={`block px-3 py-2 text-base font-medium transition-colors ${cx(
            "text-gray-700 hover:text-primary-600",
            "text-gray-300 hover:text-primary-400"
          )}`}
          onClick={onClose}
        >
          Companies
        </Link>

        {isAuthenticated ? (
          <div className="px-3 py-2">
            <div
              className={`flex items-center space-x-3 p-3 bg-gradient-to-r rounded-lg ${cx(
                "from-primary-50 to-purple-50",
                "from-primary-900/20 to-purple-900/20"
              )}`}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className={`text-sm font-semibold ${cx("text-gray-900", "text-gray-100")}`}>
                  {user.name}
                </div>
                <div className={`text-xs ${cx("text-primary-600", "text-primary-400")}`}>
                  {isEmployer ? user.company : user.title}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={`w-full text-left px-3 py-2 mt-2 rounded-lg transition-colors text-base font-medium ${cx(
                "text-red-600 hover:bg-red-50",
                "text-red-400 hover:bg-red-900/20"
              )}`}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4 px-3 py-2">
            <Link
              to="/login"
              className={`text-base font-medium transition-colors ${cx(
                "text-gray-700 hover:text-primary-600",
                "text-gray-300 hover:text-primary-400"
              )}`}
              onClick={onClose}
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </div>
        )}

        <div className="px-3 py-2">
          <ThemeToggleButton variant="emoji" />
        </div>
      </div>
    </div>
  );
};
