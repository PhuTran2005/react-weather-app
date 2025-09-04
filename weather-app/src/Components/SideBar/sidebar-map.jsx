import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Layers,
  Map,
  Eye,
  MapPin,
  X,
} from "lucide-react";
import "./sidebar-map.scss";
const WeatherMapSidebar = (prop) => {
  const {
    isOpen,
    onClose,
    onSetLayer,
    onSetMapType,
    onSetOpacity,
    onSetCityVisible,
    layers,
    opacity,
    mapType,
    citiesVisible,
  } = prop;
  const [expandedSections, setExpandedSections] = useState({});

  // Dữ liệu cho các mục
  const weatherLayers = [
    { key: "default", name: "Default" },
    { key: "temp_new", name: "Temperature 🌡️" },
    { key: "clouds_new", name: "Clouds ☁️" },
    { key: "wind_new", name: "Wind 💨" },
    { key: "precipitation_new", name: "Precipitation 🌧️" },
    { key: "pressure_new", name: "Pressure 🌍" },
    { key: "snow", name: "Snow ❄️" },
  ];

  const basemaps = [
    { key: "streets", name: "Streets" },
    { key: "satellite", name: "Satellite" },
    { key: "terrain", name: "Terrain" },
    { key: "dark", name: "Dark" },
    { key: "light", name: "Light" },
  ];
  const basemapsData = {
    streets: {
      name: "Streets",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "&copy; OpenStreetMap contributors",
    },
    satellite: {
      name: "Satellite",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "&copy; Esri",
    },
    terrain: {
      name: "Terrain",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution:
        "Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)",
    },
    dark: {
      name: "Dark",
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution: "&copy; CARTO",
    },
    light: {
      name: "Light",
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: "&copy; CARTO",
    },
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const SectionHeader = ({ title, icon: Icon, section, isExpanded }) => (
    <div className="section-header-plus" onClick={() => toggleSection(section)}>
      <div className="section-header-content">
        <Icon size={18} className="section-icon" />
        <span className="section-title-plus">{title}</span>
      </div>
      <div className="chevron-icon">
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>
    </div>
  );
  if (!isOpen) return null;
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Weather Map Controls</h2>
          <button
            onClick={onClose}
            className={`
              p-2 rounded-full transition-all duration-200 
              text-white hover:text-white hover:bg-gray-800
              hover:scale-110 active:scale-95
            `}
          >
            <X size={20} />
          </button>
        </div>

        {/* Weather Layers Section */}
        <div className="section">
          <SectionHeader
            title="Các lớp thời tiết"
            icon={Layers}
            section="layers"
            isExpanded={expandedSections.layers}
          />
          {expandedSections.layers && (
            <div className="section-content">
              <div className="option-list">
                {weatherLayers.map((layer) => (
                  <label
                    key={layer.key}
                    className={`option-item ${
                      layers === layer.key ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="weatherLayer"
                      value={layer.key}
                      checked={layers === layer.key}
                      onChange={(e) => onSetLayer(e.target.value)}
                    />
                    <span className="option-text">{layer.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Basemaps Section */}
        <div className="section">
          <SectionHeader
            title="Các loại bản đồ nền"
            icon={Map}
            section="basemaps"
            isExpanded={expandedSections.basemaps}
          />
          {expandedSections.basemaps && (
            <div className="section-content">
              <div className="option-list">
                {basemaps.map((basemap) => (
                  <label
                    key={basemap.key}
                    className={`option-item ${
                      mapType.name === basemap.name ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="basemap"
                      value={basemap.key}
                      checked={mapType.name === basemap.name}
                      onChange={(e) =>
                        onSetMapType(basemapsData[e.target.value])
                      }
                    />
                    <span className="option-text">{basemap.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Opacity Section */}
        <div className="section">
          <SectionHeader
            title="Độ trong suốt"
            icon={Eye}
            section="opacity"
            isExpanded={expandedSections.opacity}
          />
          {expandedSections.opacity && (
            <div className="section-content">
              <div className="opacity-controls">
                <div className="opacity-header">
                  <span className="opacity-label">Độ mờ:</span>
                  <span className="opacity-value">
                    {Math.round(opacity * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={opacity}
                  onChange={(e) => onSetOpacity(parseFloat(e.target.value))}
                  className="opacity-slider"
                  style={{ "--value": `${opacity * 100}%` }}
                />
                <div className="opacity-labels">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Cities Section */}
        <div className="section">
          <SectionHeader
            title="Hiển thị thành phố"
            icon={MapPin}
            section="cities"
            isExpanded={expandedSections.cities}
          />
          {expandedSections.cities && (
            <div className="section-content">
              <label className="toggle-item">
                <input
                  type="checkbox"
                  checked={citiesVisible}
                  onChange={(e) => onSetCityVisible(e.target.checked)}
                />
                <div className="toggle-content">
                  <span className="toggle-title">Hiện thị tên thành phố</span>
                  <p className="toggle-description">
                    Bật/tắt hiển thị tên các thành phố trên bản đồ
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Current Selection Summary */}
        <div className="summary">
          <h3 className="summary-title">Cài đặt hiện tại</h3>
          <div className="summary-items">
            <div className="summary-item">
              <span className="summary-label">Layer:</span>
              <span className="summary-value">
                {layers
                  ? weatherLayers.find((l) => l.key === layers)?.name
                  : "None"}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Basemap:</span>
              <span className="summary-value">{mapType.name}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Opacity:</span>
              <span className="summary-value">
                {Math.round(opacity * 100)}%
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Cities:</span>
              <span className="summary-value">
                {citiesVisible ? "Visible" : "Hidden"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherMapSidebar;
