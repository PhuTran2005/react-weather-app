import React from "react";
import {
  Search,
  Package,
  Users,
  FileText,
  Image,
  Inbox,
  AlertCircle,
} from "lucide-react";

const EmptyState = ({
  type = "default",
  title,
  description,
  icon,
  action,
  actionText = "Thực hiện hành động",
  className = "",
  size = "medium",
}) => {
  // Predefined empty states
  const presets = {
    search: {
      icon: Search,
      title: "Không tìm thấy kết quả",
      description: "Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc của bạn",
      color: "text-blue-400",
    },
    products: {
      icon: Package,
      title: "Chưa có sản phẩm nào",
      description: "Bạn chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!",
      color: "text-purple-400",
    },
    users: {
      icon: Users,
      title: "Chưa có người dùng",
      description: "Danh sách người dùng hiện đang trống",
      color: "text-green-400",
    },
    documents: {
      icon: FileText,
      title: "Không có tài liệu",
      description: "Bạn chưa có tài liệu nào được tải lên",
      color: "text-orange-400",
    },
    images: {
      icon: Image,
      title: "Không có hình ảnh",
      description: "Thư mục này chưa có hình ảnh nào",
      color: "text-pink-400",
    },
    inbox: {
      icon: Inbox,
      title: "Hộp thư trống",
      description: "Bạn đã đọc hết tất cả tin nhắn!",
      color: "text-indigo-400",
    },
    error: {
      icon: AlertCircle,
      title: "Đã xảy ra lỗi",
      description: "Không thể tải dữ liệu. Vui lòng thử lại sau.",
      color: "text-red-400",
    },
    default: {
      icon: Package,
      title: "Không có dữ liệu",
      description: "Hiện tại chưa có dữ liệu để hiển thị",
      color: "text-gray-400",
    },
  };

  const preset = presets[type] || presets.default;
  const IconComponent = icon || preset.icon;
  const finalTitle = title || preset.title;
  const finalDescription = description || preset.description;

  const sizes = {
    small: {
      container: "py-8",
      icon: "w-12 h-12",
      title: "text-lg",
      description: "text-sm",
      button: "px-4 py-2 text-sm",
    },
    medium: {
      container: "py-16",
      icon: "w-16 h-16",
      title: "text-xl",
      description: "text-base",
      button: "px-6 py-3 text-base",
    },
    large: {
      container: "py-24",
      icon: "w-20 h-20",
      title: "text-2xl",
      description: "text-lg",
      button: "px-8 py-4 text-lg",
    },
  };

  const sizeConfig = sizes[size];

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${sizeConfig.container} ${className}`}
      style={{
        overflowX: "hidden",
        overflowY: "hidden",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Icon with subtle animation */}
      <div
        className={`${preset.color} mb-6 opacity-60 transition-all duration-300 hover:opacity-80 hover:scale-110`}
      >
        <IconComponent className={sizeConfig.icon} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3
        className={`font-semibold text-gray-900 dark:text-gray-100 mb-3 ${sizeConfig.title}`}
      >
        {finalTitle}
      </h3>

      {/* Description */}
      <p
        className={`text-gray-500 dark:text-gray-400 mb-8 max-w-sm leading-relaxed ${sizeConfig.description}`}
      >
        {finalDescription}
      </p>

      {/* Action Button */}
      {action && (
        <button
          onClick={action}
          className={`
            bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
            text-white font-medium rounded-lg transition-all duration-200 
            transform hover:scale-105 hover:shadow-lg active:scale-95
            focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
            ${sizeConfig.button}
          `}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
export default EmptyState;
