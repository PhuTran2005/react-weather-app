# React Weather App

Một ứng dụng thời tiết được xây dựng bằng React + Vite, cung cấp dự báo, dữ liệu chất lượng không khí, bản đồ tương tác và cảnh báo thời tiết. README này mô tả cấu trúc, cách cài đặt, biến môi trường cần thiết và các lưu ý phát triển.

## Tổng quan

- Loại: SPA dashboard thời tiết
- Mục tiêu: Hiển thị thông tin thời tiết (dự báo, hiện tại), không khí (air quality), cảnh báo thời tiết và bản đồ vị trí với trải nghiệm người dùng mượt mà.
- Công nghệ chính: React 19, Vite, Redux Toolkit, React Router, Leaflet, Recharts, Sass, Tailwind, MUI, Framer Motion, GSAP.

## Tính năng nổi bật

- Lấy dữ liệu thời tiết từ nhiều nguồn (WeatherAPI, Weatherbit, OpenWeather).
- Trang bản đồ tương tác (Leaflet) để chọn/hiển thị vị trí.
- Trang chỉ số chất lượng không khí (air pollution) và cảnh báo thời tiết.
- Tìm kiếm và gợi ý địa điểm (autocomplete) dùng dữ liệu local và GeoDB API.
- Hình nền/ảnh địa điểm từ Unsplash cho trải nghiệm trực quan.
- Biểu đồ (Recharts) và animation (Framer Motion / GSAP) cho giao diện hấp dẫn.
- Quản lý state bằng Redux Toolkit (slices `weather` và `location`).

## Cấu trúc chính của dự án

- `src/main.jsx`: entry, mount React app với `BrowserRouter` và Redux `Provider` — [src/main.jsx](src/main.jsx)
- `src/App.jsx`: thành phần gốc — [src/App.jsx](src/App.jsx)
- `src/routers/index.jsx`: định nghĩa route chính (sử dụng `DefaultLayout`) — [src/routers/index.jsx](src/routers/index.jsx)
- `src/store/index.jsx`: cấu hình Redux store với các slice — [src/store/index.jsx](src/store/index.jsx)
- `src/features/Weather/weatherSlice.jsx` và `src/features/location/locationSlice.jsx` — slices
- `src/services/`: các file gọi API (weatherService, locationService)
- `src/utils/Api/index.jsx`: helper `Get/Post/Patch/Delete` wrapper cho fetch
- `public/data/`: chứa dữ liệu danh sách thành phố (ví dụ `cities_5M.json`) để autocomplete
- `src/Components/` và `src/Pages/`: các component giao diện và trang ứng dụng

## Biến môi trường (env)

Ứng dụng sử dụng biến môi trường bắt đầu bằng `VITE_`. Tạo file `.env` hoặc `.env.local` ở thư mục gốc của dự án với các biến sau (ví dụ):

```
VITE_CURRENT_WEATHER_API_KEY=your_weatherapi_key
VITE_OPEN_WEATHER_API_KEY=your_openweathermap_key
VITE_WEATHERBIT_API_KEY=your_weatherbit_key
VITE_GEO_DB_API_KEY=your_geodb_rapidapi_key
VITE_GEO_IMG_API_KEY=your_unsplash_key
```

Lưu ý: không commit file `.env` chứa API keys.

## Chạy ứng dụng (local)

1. Cài dependencies:

```bash
npm install
```

2. Chạy dev server:

```bash
npm run dev
```

3. Build production:

```bash
npm run build
npm run preview
```

## Ghi chú kỹ thuật & Đề xuất cải tiến

- `locationSlice` hiện có reducer/action tên `setWeatherData` — có vẻ là copy/paste; nên đổi tên thành `setLocationData` để rõ ràng hơn.
- `weatherService` đang dùng kết hợp helper `Get` và một số `fetch` trực tiếp — cân nhắc chuẩn hóa việc gọi HTTP qua `src/utils/Api/index.jsx` để dễ bảo trì và test.
- Kiểm tra file `.env` trước khi chạy để tránh lỗi API key.
- Có thể thêm xử lý lỗi và trạng thái loading/empty cho trải nghiệm người dùng tốt hơn khi API trả lỗi hoặc mạng chậm.

## Thử nghiệm và debug

- Dùng React DevTools, Redux DevTools để kiểm tra state (slices `weather` và `location`).
- Kiểm tra console/network tab để debug các request API (URL được log trong `weatherService`).

## Hướng mở rộng

- Thêm caching/TTL cho các request thời tiết để giảm số lần gọi API.
- Thêm tính năng chọn multiple locations và so sánh forecast.
- Hỗ trợ cấu hình theme (light/dark) lưu trên localStorage.

## Liên hệ

Nếu cần trợ giúp tiếp theo (ví dụ: viết README bằng tiếng Anh, sửa `locationSlice`, hoặc chuẩn hóa các gọi API), hãy cho tôi biết bước tiếp theo bạn muốn.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
