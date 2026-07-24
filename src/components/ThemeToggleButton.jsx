import { useTheme } from "../context/ThemeContext";

export const ThemeToggleButton = ({ variant = "icon" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const cx = (light, dark) => (isDark ? dark : light);

  if (variant === "emoji") {
    return (
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-colors ${cx(
          "text-gray-600 hover:bg-gray-100",
          "text-gray-300 hover:bg-gray-800"
        )}`}
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative group p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${cx(
        "text-gray-600 hover:text-primary-600",
        "text-gray-300 hover:text-primary-400"
      )}`}
      aria-label="Toggle theme"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${cx(
          "from-primary-50 to-purple-50",
          "from-primary-900/20 to-purple-900/20"
        )} rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}
      ></div>
      <div className="relative z-10">
        {isDark ? (
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </div>
    </button>
  );
};
