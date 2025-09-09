// Thêm function này vào component AirPollution của bạn
import React from "react";
// Function để lấy khuyến nghị sức khỏe dựa trên AQI
const getHealthRecommendations = (aqi, components) => {
  const pm25 = components.pm2_5 || 0;
  const pm10 = components.pm10 || 0;
  const o3 = components.o3 || 0;
  const no2 = components.no2 || 0;

  switch (aqi) {
    case 1: // Good (0-50)
      return {
        general: {
          icon: "🌿",
          title: "Excellent for all activities",
          description: "Air quality is good and safe for everyone",
          color: "green",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        },
        activities: [
          "🏃‍♂️ Exercise freely outdoors",
          "🚴‍♀️ Cycling, running without limitation",
          "🧘‍♀️ Yoga, meditation outside",
          "👶 Children can play outdoors comfortably",
        ],
        ventilation: {
          icon: "🪟",
          title: "Natural ventilation",
          description: "Open windows to let in fresh air",
          action: "Encouraged",
        },
        precautions: {
          icon: "✅",
          title: "No special measures needed",
          description: "Enjoy the clean air",
          level: "none",
        },
      };

    case 2: // Fair (51-100)
      return {
        general: {
          icon: "🌤️",
          title: "Acceptable for most people",
          description: "Some sensitive groups may experience mild effects",
          color: "yellow",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
        },
        activities: [
          "🏃‍♂️ Moderate outdoor activities",
          "👥 Normal people are not affected",
          "⚠️ Sensitive groups should limit strenuous activities",
          "👶 Children should reduce outdoor playtime",
        ],
        ventilation: {
          icon: "🪟",
          title: "Selective ventilation",
          description: "Open windows in the early morning or late evening",
          action: "Consider",
        },
        precautions: {
          icon: "👀",
          title: "Monitor symptoms",
          description:
            "Watch for coughing, shortness of breath, eye irritation",
          level: "low",
        },
      };

    case 3: // Moderate (101-150)
      return {
        general: {
          icon: "⚠️",
          title: "Unhealthy for sensitive groups",
          description:
            "Children, the elderly, and people with conditions should limit outdoor exposure",
          color: "orange",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
        },
        activities: [
          "🚫 Avoid intense outdoor exercise",
          "🏠 Prefer indoor activities",
          "👥 Healthy people may feel discomfort",
          "👶 Children and the elderly should stay indoors",
        ],
        ventilation: {
          icon: "🚪",
          title: "Limited ventilation",
          description: "Keep windows closed, use air purifiers",
          action: "Not recommended",
        },
        precautions: {
          icon: "😷",
          title: "Wear a mask outdoors",
          description:
            pm25 > 35
              ? "Pay special attention: High PM2.5 levels"
              : "N95 masks are recommended",
          level: "medium",
        },
      };

    case 4: // Unhealthy (151-200)
      return {
        general: {
          icon: "🔴",
          title: "Harmful to health",
          description: "Everyone may experience health effects",
          color: "red",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        },
        activities: [
          "🚫 Avoid all outdoor activities",
          "🏠 Stay indoors with windows tightly closed",
          "💊 Asthma patients should keep medication ready",
          "👶 Children must not go outside",
        ],
        ventilation: {
          icon: "🔒",
          title: "Keep windows closed",
          description: "Use air purifiers or air conditioners",
          action: "Prohibited",
        },
        precautions: {
          icon: "🏥",
          title: "Medical preparedness",
          description:
            o3 > 180
              ? "High Ozone - watch out for breathing difficulty"
              : "Be ready to go to the hospital if necessary",
          level: "high",
        },
      };

    case 5: // Very Unhealthy (201-300)
      return {
        general: {
          icon: "☠️",
          title: "Very harmful - Health alert",
          description: "Severely dangerous for everyone",
          color: "purple",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
        },
        activities: [
          "🛑 ABSOLUTELY AVOID GOING OUTSIDE",
          "🏠 Stay indoors, seal all doors and windows",
          "🚨 Be ready for emergency care if breathing difficulties occur",
          "💊 Heart and lung patients must have medication on hand",
        ],
        ventilation: {
          icon: "🚫",
          title: "Total isolation",
          description: "High-power air purifier required, do not open windows",
          action: "Strictly prohibited",
        },
        precautions: {
          icon: "🚨",
          title: "Emergency situation",
          description:
            pm25 > 150
              ? "Extremely high PM2.5 - life-threatening"
              : "Seek medical help immediately if symptoms occur",
          level: "emergency",
        },
      };

    default:
      return getHealthRecommendations(3, components); // Default to moderate
  }
};

// Component Health Recommendations được cải tiến
// Improved Health Recommendations Component
const HealthRecommendations = ({ aqi, components }) => {
  const recommendations = getHealthRecommendations(aqi, components);

  const getColorClasses = (color) => {
    const colors = {
      green: {
        text: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
      },
      yellow: {
        text: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
      },
      orange: {
        text: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
      },
      red: { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
      purple: {
        text: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-200",
      },
    };
    return colors[color] || colors.yellow;
  };

  const colorClasses = getColorClasses(recommendations.general.color);

  return (
    <div className="health-recommendations bg-white rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        Health Recommendations - AQI {aqi}
      </h3>

      {/* General Status */}
      <div
        className={`mb-6 ${colorClasses.bg} ${colorClasses.border} border-2 rounded-lg p-4`}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{recommendations.general.icon}</span>
          <div>
            <h4 className={`font-bold text-lg ${colorClasses.text}`}>
              {recommendations.general.title}
            </h4>
            <p className="text-gray-600 text-sm">
              {recommendations.general.description}
            </p>
          </div>
        </div>
      </div>

      {/* Grid of recommendations */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Activities */}
        <div className="recommendation-card bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🏃‍♂️</span>
            <div className="font-semibold text-gray-800">Activities</div>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            {recommendations.activities.map((activity, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-xs mt-1">•</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ventilation */}
        <div className="recommendation-card bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{recommendations.ventilation.icon}</span>
            <div className="font-semibold text-gray-800">
              {recommendations.ventilation.title}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {recommendations.ventilation.description}
          </p>
          <div
            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
              recommendations.ventilation.action === "Recommended"
                ? "bg-green-100 text-green-700"
                : recommendations.ventilation.action === "Consider"
                ? "bg-yellow-100 text-yellow-700"
                : recommendations.ventilation.action === "Not recommended"
                ? "bg-orange-100 text-orange-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {recommendations.ventilation.action}
          </div>
        </div>

        {/* Precautions */}
        <div className="recommendation-card bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{recommendations.precautions.icon}</span>
            <div className="font-semibold text-gray-800">
              {recommendations.precautions.title}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {recommendations.precautions.description}
          </p>
          {recommendations.precautions.level === "emergency" && (
            <div className="mt-2 bg-red-100 border border-red-300 rounded px-2 py-1">
              <span className="text-red-700 text-xs font-bold">⚠️ URGENT</span>
            </div>
          )}
        </div>
      </div>

      {/* Extra info for high pollutants */}
      {(components.pm2_5 > 35 ||
        components.pm10 > 50 ||
        components.o3 > 120 ||
        components.no2 > 100) && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h5 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            ⚠️ Special Warning
          </h5>
          <div className="text-sm text-amber-700 space-y-1">
            {components.pm2_5 > 35 && (
              <div>
                • High PM2.5 ({components.pm2_5} μg/m³) - Harmful to respiratory
                and cardiovascular health
              </div>
            )}
            {components.pm10 > 50 && (
              <div>
                • High PM10 ({components.pm10} μg/m³) - Causes eye, nose, and
                throat irritation
              </div>
            )}
            {components.o3 > 120 && (
              <div>
                • High Ozone ({components.o3} μg/m³) - Can cause shortness of
                breath, chest pain
              </div>
            )}
            {components.no2 > 100 && (
              <div>
                • High NO2 ({components.no2} μg/m³) - Increases risk of
                respiratory infections
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sensitive groups */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          👥 Sensitive Groups - Pay Special Attention
        </h5>
        <div className="text-sm text-blue-700 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>• 👶 Children under 5 years old</div>
          <div>• 👴 Adults over 65 years old</div>
          <div>• 🫁 People with asthma, COPD</div>
          <div>• ❤️ People with cardiovascular disease</div>
          <div>• 🤰 Pregnant women</div>
          <div>• 🏃‍♂️ Outdoor exercisers</div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecommendations;

// Usage in main component:
// Replace old Health Recommendations with:
{
  /* 
  <HealthRecommendations 
    aqi={weatherData.airPollution.main.aqi} 
    components={weatherData.airPollution.components} 
  /> 
  */
}
