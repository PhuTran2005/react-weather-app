import DefaultLayout from "../Components/defaultLayout";
import { useRoutes } from "react-router-dom";
import Home from "../Pages/Home";
const AllRouters = () => {
  const routers = useRoutes([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
  ]);

  return routers;
};

export default AllRouters;
