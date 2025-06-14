import DefaultLayout from "../Components/defaultLayout";
import { useRoutes } from "react-router-dom";
import Home from "../Pages/Home";
import Weather from "../Pages/Weather";
import NotFound from "../Pages/NotFound";
const AllRouters = () => {
  const routers = useRoutes([
    {
      path: "/",
      element: <DefaultLayout />,
    },
    {
      path: "weather-app",
      element: <Weather />,
    },
    { path: "*", element: <NotFound /> },
  ]);

  return routers;
};

export default AllRouters;
