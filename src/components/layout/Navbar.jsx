import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../store/slices/authSlice";
import { getMyNotifications } from "../../services/notificationService";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  /* =========================
     FETCH NOTIFICATIONS
  ========================= */

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getMyNotifications();
        setNotifications(response.data || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  /* =========================
     CLOSE DROPDOWNS ON OUTSIDE CLICK
  ========================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================
     CTRL + /
  ========================= */

  useEffect(() => {
    const handleKeyboardShortcut = (event) => {
      if (event.ctrlKey && event.key === "/") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyboardShortcut
      );
    };
  }, []);

  /* =========================
     SEARCH
  ========================= */

  useEffect(() => {
    const searchData = async () => {
      if (!searchQuery.trim()) {
        setSearchResults(null);
        setShowSearchResults(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/search`,
          {
            params: {
              q: searchQuery,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSearchResults(response.data);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Global search failed:", error);
        setSearchResults(null);
      }
    };

    const timer = setTimeout(() => {
      searchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  /* =========================
     NOTIFICATION COUNT
  ========================= */

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  /* =========================
     SEARCH RESULT CLICK
  ========================= */

  const handleSearchResultClick = (result) => {
    setSearchQuery("");
    setShowSearchResults(false);

    if (result.type === "EMPLOYEE") {
      navigate(`/employees/${result.id}`);
    }

    if (result.type === "DEPARTMENT") {
      navigate("/departments");
    }

    if (result.type === "TASK") {
      navigate(`/tasks/${result.id}`);
    }

    if (result.type === "LEAVE") {
      navigate("/leaves");
    }
  };

  /* =========================
     USER DISPLAY
  ========================= */

  const displayName =
    user?.employeeName ||
    user?.name ||
    user?.email ||
    "User";

  const displayRole = user?.role || "User";

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* =========================
          LEFT - SEARCH
      ========================= */}

      <div
        ref={searchContainerRef}
        className="relative w-96"
      >
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            onFocus={() => {
              if (searchResults) {
                setShowSearchResults(true);
              }
            }}
            placeholder="Search employees, tasks, leaves..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-12 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

          {/* Search Icon */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>

          {/* Shortcut */}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-400">
            Ctrl /
          </span>
        </div>

        {/* =========================
            SEARCH DROPDOWN
        ========================= */}

        {showSearchResults && searchResults && (
          <div className="absolute left-0 right-0 top-12 z-50 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
            {Object.values(searchResults)
              .flat()
              .filter(Boolean).length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No results found
              </div>
            ) : (
              Object.entries(searchResults).map(
                ([category, results]) => {
                  if (!results || results.length === 0) {
                    return null;
                  }

                  return (
                    <div key={category}>
                      <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase text-gray-500">
                        {category}
                      </div>

                      {results.map((result) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          type="button"
                          onClick={() =>
                            handleSearchResultClick(result)
                          }
                          className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-sm">
                            {result.type === "EMPLOYEE" && "👤"}
                            {result.type === "DEPARTMENT" && "🏢"}
                            {result.type === "TASK" && "📝"}
                            {result.type === "LEAVE" && "📅"}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {result.title}
                            </p>

                            <p className="truncate text-xs text-gray-500">
                              {result.subtitle}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                }
              )
            )}
          </div>
        )}
      </div>

      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="flex items-center gap-4">
        {/* =========================
            NOTIFICATION
        ========================= */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(
                (previous) => !previous
              );
              setShowUserMenu(false);
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
          >
            🔔

            {unreadCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Notifications
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    navigate("/notifications");
                  }}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  View all
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications
                    .slice(0, 5)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={`border-b border-gray-100 px-4 py-3 ${
                          !notification.isRead
                            ? "bg-indigo-50/50"
                            : "bg-white"
                        }`}
                      >
                        <p className="text-sm text-gray-700">
                          {notification.message}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {new Date(
                            notification.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* =========================
            USER MENU
        ========================= */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowUserMenu(
                (previous) => !previous
              );
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
              {displayName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="hidden text-left sm:block">
              <p className="max-w-32 truncate text-sm font-medium text-gray-900">
                {displayName}
              </p>

              <p className="text-xs text-gray-500">
                {displayRole}
              </p>
            </div>

            <span className="text-xs text-gray-400">
              ▼
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Profile
              </button>

              <button
                type="button"
                onClick={() => navigate("/settings")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Settings
              </button>

              <div className="my-1 border-t border-gray-100" />

              <button
                type="button"
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;