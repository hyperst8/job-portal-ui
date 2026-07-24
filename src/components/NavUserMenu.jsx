import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobContext";

export const NavUserMenu = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const { user, logout, isEmployer, isJobSeeker, isAdmin } = useAuth();
  const { totalAppliedJobs, totalSavedJobs, totalPostedJobs } = useJobs();
  const navigate = useNavigate();

  const isDark = theme === "dark";
  const cx = (light, dark) => (isDark ? dark : light);

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/", { replace: true });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg border py-2 z-50 ${cx(
        "bg-white border-gray-200",
        "bg-gray-800 border-gray-700"
      )}`}
    >
      <div className={`px-4 py-3 border-b ${cx("border-gray-200", "border-gray-700")}`}>
        <p className={`text-sm font-medium ${cx("text-gray-900", "text-gray-100")}`}>
          {user.name}
        </p>
        <p className={`text-xs ${cx("text-gray-500", "text-gray-400")}`}>{user.email}</p>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
            isAdmin
              ? cx("bg-red-100 text-red-800", "bg-red-900 text-red-200")
              : isEmployer
              ? cx("bg-purple-100 text-purple-800", "bg-purple-900 text-purple-200")
              : cx("bg-blue-100 text-blue-800", "bg-blue-900 text-blue-200")
          }`}
        >
          {isAdmin ? "Admin" : isEmployer ? "Employer" : "Job Seeker"}
        </span>
      </div>

      {isJobSeeker && (
        <div className={`py-2 border-b ${cx("border-gray-200", "border-gray-700")}`}>
          <Link
            to="/profile"
            className={`flex items-center px-4 py-2 text-sm transition-colors ${cx(
              "text-gray-700 hover:bg-gray-50",
              "text-gray-300 hover:bg-gray-700"
            )}`}
            onClick={onClose}
          >
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            My Profile
          </Link>
          <Link
            to="/applied-jobs"
            className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${cx(
              "text-gray-700 hover:bg-gray-50",
              "text-gray-300 hover:bg-gray-700"
            )}`}
            onClick={onClose}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Applied Jobs
            </span>
            {totalAppliedJobs > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${cx(
                  "bg-blue-100 text-blue-800",
                  "bg-blue-900 text-blue-200"
                )}`}
              >
                {totalAppliedJobs}
              </span>
            )}
          </Link>
          <Link
            to="/saved-jobs"
            className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${cx(
              "text-gray-700 hover:bg-gray-50",
              "text-gray-300 hover:bg-gray-700"
            )}`}
            onClick={onClose}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Saved Jobs
            </span>
            {totalSavedJobs > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${cx(
                  "bg-red-100 text-red-800",
                  "bg-red-900 text-red-200"
                )}`}
              >
                {totalSavedJobs}
              </span>
            )}
          </Link>
        </div>
      )}

      {isEmployer && (
        <div className={`py-2 border-b ${cx("border-gray-200", "border-gray-700")}`}>
          <Link
            to="/post-job"
            className={`flex items-center px-4 py-2 text-sm transition-colors ${cx(
              "text-gray-700 hover:bg-gray-50",
              "text-gray-300 hover:bg-gray-700"
            )}`}
            onClick={onClose}
          >
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Post New Job
          </Link>
          <Link
            to="/employer/jobs"
            className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${cx(
              "text-gray-700 hover:bg-gray-50",
              "text-gray-300 hover:bg-gray-700"
            )}`}
            onClick={onClose}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
              My Job Postings
            </span>
            {totalPostedJobs > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${cx(
                  "bg-purple-100 text-purple-800",
                  "bg-purple-900 text-purple-200"
                )}`}
              >
                {totalPostedJobs}
              </span>
            )}
          </Link>
        </div>
      )}

      {isAdmin && (
        <div className={`py-2 border-b ${cx("border-gray-200", "border-gray-700")}`}>
          <Link
            to="/admin/companies"
            className={`flex items-center px-4 py-2 text-sm transition-colors ${cx(
              "text-gray-700 hover:bg-gray-50",
              "text-gray-300 hover:bg-gray-700"
            )}`}
            onClick={onClose}
          >
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Company Management
          </Link>
          <Link
            to="/admin/employers"
            className={`flex items-center px-4 py-2 text-sm transition-colors ${cx(
              "text-gray-700 hover:bg-gray-50",
              "text-gray-300 hover:bg-gray-700"
            )}`}
            onClick={onClose}
          >
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Employer Management
          </Link>
          <Link
            to="/admin/contact-messages"
            className={`flex items-center px-4 py-2 text-sm transition-colors ${cx(
              "text-gray-700 hover:bg-gray-50",
              "text-gray-300 hover:bg-gray-700"
            )}`}
            onClick={onClose}
          >
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Messages
          </Link>
        </div>
      )}

      <button
        onClick={handleLogout}
        className={`w-full text-left px-4 py-2 text-sm transition-colors ${cx(
          "text-red-600 hover:bg-red-50",
          "text-red-400 hover:bg-red-900/20"
        )}`}
      >
        Sign Out
      </button>
    </div>
  );
};
