import DefaultLayout from "../Components/defaultLayout";
import { useRoutes } from "react-router-dom";
import Weather from "../Pages/Weather";
import NotFound from "../Pages/NotFound";
import WeatherDashboard from "../Pages/Weather/WeatherDashboard";
import Map from "../Pages/Map";
import WeatherCurrentLocation from "../Pages/Weather/WeatherCurrentLocation";
import AirPollution from "../Pages/Weather/AirPollution";
import WeatherAlerts from "../Pages/Weather/WeatherAlerts";
const AllRouters = () => {
  const routers = useRoutes([
    {
      path: "/",
      element: <DefaultLayout />,
    },
    {
      path: "weather-app",
      children: [
        {
          index: true,
          element: <Weather />,
        },
        {
          path: "dashboard",
          element: <WeatherDashboard />,
        },
        {
          path: "current-location",
          element: <WeatherCurrentLocation />,
        },
        {
          path: "map",
          element: <Map />,
        },
        {
          path: "air-pollution",
          element: <AirPollution />,
        },
        {
          path: "alerts",
          element: <WeatherAlerts />,
        },
      ],
    },

    { path: "*", element: <NotFound /> },
  ]);

  return routers;
};

export default AllRouters;
