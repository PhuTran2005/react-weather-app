import React, { memo, useState } from "react";
import {
  Currency,
  X,
  Home,
  User,
  Settings,
  Mail,
  Phone,
  Info,
  Package,
  Star,
  Heart,
  Search,
  Bell,
  Calendar,
  FileText,
  Camera,
  Music,
  Video,
  Download,
  Upload,
  Globe,
  Shield,
  Zap,
  Bookmark,
  Map,
  Wind,
  MessageCircleWarning,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Animated sliding sidebar component
const ModernSidebar = memo(
  ({
    isOpen,
    onClose,
    title = "Menu",
    user = null,
    menuItems = [],
    position = "right", // "left" or "right"
    theme = "dark", // "light" or "dark"
    width = "250px",
    showSearch = false,
    footer = null,
    className = "",
  }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Default menu items if none provided
    const defaultMenuItems = [
      {
        id: 1,
        label: "Dashboard",
        icon: Home,
        href: "/weather-app/dashboard",
        badge: null,
      },
      {
        id: 2,
        label: "Current location",
        icon: User,
        href: "/weather-app/current-location",
        badge: null,
      },

      {
        id: 3,
        label: "Map",
        icon: Map,
        href: "/weather-app/map",
        badge: null,
      },
      {
        id: 4,
        label: "Air Pollution",
        icon: Wind,
        href: "/weather-app/air-pollution",
        badge: null,
      },
      {
        id: 5,
        label: "Alerts",
        icon: MessageCircleWarning,
        href: "/weather-app/alerts",
        badge: null,
      },
      { id: 6, label: "About", icon: Info, href: "/about", badge: null },
    ];

    const items = menuItems.length > 0 ? menuItems : defaultMenuItems;
    const filteredItems = items.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Theme classes
    const themes = {
      light: {
        overlay: "bg-black bg-opacity-20",
        sidebar: "bg-white text-gray-800 border-l border-gray-200",
        header: "bg-gray-50 border-b border-gray-200",
        search:
          "bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300",
        menuItem: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        closeBtn: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
        badge: "bg-blue-500 text-white",
      },
      dark: {
        overlay: "bg-black bg-opacity-40",
        sidebar: "bg-gray-900 text-white border-l border-gray-700",
        header: "bg-gray-800 border-b border-gray-700",
        search: "bg-gray-800 text-white placeholder-gray-400 border-gray-600",
        menuItem: "text-gray-300 hover:bg-gray-800 hover:text-white",
        closeBtn: "text-gray-400 hover:text-white hover:bg-gray-800",
        badge: "bg-blue-600 text-white",
      },
    };

    const currentTheme = themes[theme];
    // const slideDirection = position === "right" ? "100%" : "-100%";

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex">
        {/* Overlay */}
        <div
          className={`fixed inset-0 transition-opacity duration-300 ${currentTheme.overlay}`}
          onClick={onClose}
        />

        {/* Sidebar */}
        <div
          className={`
          fixed top-0 ${position === "right" ? "right-0" : "left-0"} h-full 
          ${
            currentTheme.sidebar
          } shadow-2xl transform transition-transform duration-300 ease-in-out
          flex flex-col ${className}
        `}
          style={{ width }}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-4 ${currentTheme.header}`}
          >
            <div className="flex items-center space-x-3">
              {user && user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name || "User"}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
                />
              )}
              <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                {user && user.name && (
                  <p className="text-sm opacity-75">{user.name}</p>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className={`
              p-2 rounded-full transition-all duration-200 
              ${currentTheme.closeBtn}
              hover:scale-110 active:scale-95
            `}
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          {showSearch && (
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`
                  w-full pl-10 pr-4 py-2 rounded-lg border transition-colors
                  ${currentTheme.search} focus:outline-none focus:ring-2 focus:ring-blue-500
                `}
                />
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-2">
            <nav className="space-y-1 px-2">
              {filteredItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.id}
                    onClick={() => navigate(item.href)}
                    data-sidebar-item
                    className={`
                    flex items-center justify-between px-4 py-3 rounded-lg 
                    transition-all duration-200 group
                    ${currentTheme.menuItem}
                    hover:scale-105 hover:shadow-lg cursor-pointer
                  `}
                    style={{
                      animationName: isOpen ? "slideInRight" : "none",
                      animationDuration: "0.3s",
                      animationTimingFunction: "ease-out",
                      animationFillMode: "forwards",
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent
                        size={20}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`
                      px-2 py-1 text-xs font-bold rounded-full
                      ${currentTheme.badge}
                    `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          {footer && (
            <div
              className={`p-4 border-t ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default ModernSidebar;
