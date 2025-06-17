import DefaultLayout from "../Components/defaultLayout";
import { useRoutes } from "react-router-dom";
import Home from "../Pages/Home";
import Weather from "../Pages/Weather";
import NotFound from "../Pages/NotFound";
import WeatherDashboard from "../Pages/WeatherDashboard";
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
    { path: "*", element: <NotFound /> },
  ]);

  return routers;
};

export default AllRouters;
