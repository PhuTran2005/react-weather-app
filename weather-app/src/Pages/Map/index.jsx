import React from "react";
import {
  Home,
  BarChart3,
  Layout,
  Layers,
  Bell,
  Sliders,
  Smile,
  FileText,
  Edit3,
  Code,
  PieChart,
  Table,
  Search,
  Settings,
  HelpCircle,
  TrendingUp,
  ShoppingCart,
  Users,
  Eye,
} from "lucide-react";

const Map = () => {
  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Layout, label: "Page Layouts" },
    { icon: Layers, label: "Sidebar Layouts" },
    { icon: BarChart3, label: "Basic UI Elements" },
    { icon: Sliders, label: "Advanced UI" },
    { icon: Bell, label: "Notifications" },
    { icon: Smile, label: "Icons" },
    { icon: FileText, label: "Forms" },
    { icon: Edit3, label: "Text Editors" },
    { icon: Code, label: "Code Editors" },
    { icon: PieChart, label: "Charts" },
    { icon: Table, label: "Tables" },
  ];

  const statsCards = [
    {
      title: "Weekly Sales",
      value: "$ 15,0000",
      change: "Increased by 60%",
      color: "bg-gradient-to-br from-pink-400 to-red-400",
      icon: TrendingUp,
    },
    {
      title: "Weekly Orders",
      value: "45,6334",
      change: "Decreased by 10%",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      icon: ShoppingCart,
    },
    {
      title: "Visitors Online",
      value: "95,5741",
      change: "Increased by 5%",
      color: "bg-gradient-to-br from-green-400 to-teal-500",
      icon: Users,
    },
  ];

  const chartData = [
    { month: "JAN", visits: 20, sales: 15, orders: 25 },
    { month: "FEB", visits: 35, sales: 25, orders: 30 },
    { month: "MAR", visits: 25, sales: 20, orders: 20 },
    { month: "APR", visits: 40, sales: 35, orders: 25 },
    { month: "MAY", visits: 30, sales: 40, orders: 35 },
    { month: "JUN", visits: 45, sales: 30, orders: 40 },
    { month: "JUL", visits: 35, sales: 35, orders: 30 },
    { month: "AUG", visits: 25, sales: 20, orders: 35 },
  ];

  const trafficSources = [
    { source: "Search Engines", percentage: 30, color: "bg-blue-400" },
    { source: "Direct Click", percentage: 24, color: "bg-green-400" },
    { source: "Bookmarks Click", percentage: 40, color: "bg-pink-400" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-semibold text-purple-600">
              Purple
            </span>
          </div>
        </div>

        <nav className="mt-4">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center px-4 py-3 text-sm cursor-pointer transition-colors ${
                item.active
                  ? "bg-purple-50 text-purple-600 border-r-2 border-purple-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-4 h-4 mr-3" />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Home className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-semibold">Dashboard</span>
              </div>
              <span className="text-sm text-gray-500">Overview</span>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">David Greymaax</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className={`${card.color} rounded-lg p-6 text-white relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <h3 className="text-sm font-medium opacity-90">
                    {card.title}
                  </h3>
                  <div className="text-2xl font-bold mt-2">{card.value}</div>
                  <p className="text-xs mt-2 opacity-80">{card.change}</p>
                </div>
                <card.icon className="absolute right-4 top-4 w-8 h-8 opacity-20" />
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visit and Sales Statistics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  Visit And Sales Statistics
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span>Visits</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-pink-400 rounded-full mr-2"></div>
                    <span>Sales</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                    <span>Orders</span>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between h-64 px-2">
                {chartData.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2 flex-1"
                  >
                    <div className="flex items-end space-x-1 h-40">
                      <div
                        className="w-3 bg-purple-500 rounded-t"
                        style={{ height: `${data.visits * 2}%` }}
                      ></div>
                      <div
                        className="w-3 bg-pink-400 rounded-t"
                        style={{ height: `${data.sales * 2}%` }}
                      ></div>
                      <div
                        className="w-3 bg-blue-400 rounded-t"
                        style={{ height: `${data.orders * 2}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">Traffic Sources</h3>

              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg
                    className="w-32 h-32 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    {/* Blue segment (30%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="2"
                      strokeDasharray="30, 70"
                      strokeDashoffset="0"
                    />
                    {/* Green segment (24%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="2"
                      strokeDasharray="24, 76"
                      strokeDashoffset="-30"
                    />
                    {/* Pink segment (40%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f472b6"
                      strokeWidth="2"
                      strokeDasharray="40, 60"
                      strokeDashoffset="-54"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {trafficSources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${source.color}`}
                      ></div>
                      <span className="text-sm text-gray-700">
                        {source.source}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {source.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
