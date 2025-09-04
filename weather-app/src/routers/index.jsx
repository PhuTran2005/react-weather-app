import DefaultLayout from "../Components/defaultLayout";
import { useRoutes } from "react-router-dom";
import Weather from "../Pages/Weather";
import NotFound from "../Pages/NotFound";
import WeatherDashboard from "../Pages/WeatherDashboard";
import Map from "../Pages/Map";
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
      ],
    },
    {
      path: "weather-map",
      children: [
        {
          index: true,
          element: <Map />,
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return routers;
};

export default AllRouters;
