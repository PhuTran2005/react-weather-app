// Legend component
import React from "react";
import "./Lengend.scss";
// Cấu hình legend cho từng lớp thời tiết
const legends = {
  temp_new: {
    title: "Temperature",
    unit: "°C",
    stops: [-40, -20, 0, 20, 40],
    colors: [
      "rgb(159, 85, 181)",
      "rgb(44, 106, 187) ",
      "rgb(82, 139, 213) ",
      "rgb(103, 163, 222) ",
      "rgb(142, 202, 240) ",
      "rgb(155, 213, 244) ",
      "rgb(172, 225, 253) ",
      "rgb(194, 234, 255) ",
      "rgb(255, 255, 208) ",
      "rgb(254, 248, 174) ",
      "rgb(254, 232, 146) ",
      "rgb(254, 226, 112) ",
      "rgb(253, 212, 97) ",
      "rgb(244, 168, 94) ",
      "rgb(244, 129, 89) ",
      "rgb(244, 104, 89) ",
      "rgb(244, 76, 73) ",
    ],
  },
  clouds_new: {
    title: "Clouds",
    unit: "%",
    stops: [0, 25, 50, 75, 100],
    colors: [
      "rgba(247, 247, 255, 0)",
      "rgba(251, 247, 255, 0) ",
      "rgba(244, 248, 255, 0.1) ",
      "rgba(240, 249, 255, 0.2) ",
      "rgba(221, 250, 255, 0.4) ",
      "rgba(224, 224, 224, 0.9) ",
      "rgba(224, 224, 224, 0.76) ",
      "rgba(228, 228, 228, 0.9) ",
      "rgba(232, 232, 232, 0.9) ",
      "rgb(214, 213, 213) ",
      "rgb(210, 210, 210) ",
      "rgb(183, 183, 183) ",
    ],
  },
  wind_new: {
    title: "Wind speed",
    unit: "m/s",
    stops: [0, 2, 3, 6, 12, 25, 50, 100],
    colors: [
      "rgb(158, 128, 177)",
      "rgba(116, 76, 172, 0.9)",
      "rgb(164, 123, 170)",
      "rgba(170, 128, 177, 0.84)",
      "rgba(176, 128, 177, 0.71)",
      "rgba(170, 128, 177, 0.54)",
      "rgba(170, 128, 177, 0.44)",
      "rgba(255, 255, 0, 0)",
    ],
  },
  precipitation_new: {
    title: "Precipitation",
    unit: "mm",
    stops: [0, 0.5, 1, 2, 4, 6, 7, 10, 12, 14, 16, 24, 32, 60],
    colors: [
      "rgb(170, 43, 195)",
      "rgb(255, 0, 146)",
      "rgb(255, 0, 100)",
      "rgb(255, 0, 0)",
      "rgb(255, 91, 0)",
      "rgb(255, 150, 0)",
      "rgb(255, 205, 0)",
      "rgb(239, 248, 0)",
      "rgb(0, 70, 0)",
      "rgb(0, 90, 0)",
      "rgb(0, 160, 0)",
      "rgb(0, 211, 0)",
      "rgb(0, 250, 100)",
      "rgba(0, 0, 0, 0)",
    ],
  },
  pressure_new: {
    title: "Pressure",
    unit: "hPa",
    stops: [950, 980, 1010, 1040, 1070],
    colors: [
      "rgb(0, 115, 255) ",
      "rgb(0, 170, 255)",
      "rgb(75, 208, 214) ",
      "rgb(141, 231, 199) ",
      "rgb(176, 247, 32) ",
      "rgb(240, 184, 0) ",
      "rgb(251, 85, 21) ",
      "rgb(243, 54, 59) ",
      "rgb(198, 0, 0) ",
    ],
  },
  snow: {
    title: "Snow",
    unit: "cm",
    stops: [0, 1, 5, 10, 20],
    colors: ["#ffffff", "#deebf7", "#9ecae1", "#3182bd", "#08519c"],
  },
};
const GradientLegend = ({ selectedLayer }) => {
  const config = legends[selectedLayer];
  return (
    config && (
      <div className="legend-container">
        <div className="legend-title">
          {config.title}, {config.unit}
        </div>
        <div>
          <div className="legend-labels">
            {config.stops.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
          <div
            className="legend-bar"
            style={{
              background: `linear-gradient(to right, ${config.colors.join(
                ","
              )})`,
            }}
          ></div>
        </div>
      </div>
    )
  );
};
export default GradientLegend;
