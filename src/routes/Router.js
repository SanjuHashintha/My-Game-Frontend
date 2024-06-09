import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const Login = lazy(() => import("../views/pages/Login.js"));
const Register = lazy(() => import("../views/pages/Register.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

const isAuth = () => {
  if (
    localStorage.getItem("access_token") &&
    localStorage.getItem("access_token").length > 0
  ) {
    return true;
  } else {
    return false;
  }
};

const PrivateRoute = ({ component: Component }) => {
  return isAuth() === true ? <Outlet /> : <Navigate to="/" />;
};

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    exact: true,
    element: <Login />,
  },
  {
    path: "/register",
    exact: true,
    element: <Register />,
  },
  {
    path: "/",
    element: <PrivateRoute />, // Protect the routes under this path
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      {
        path: "/",
        element: <FullLayout />, // Use FullLayout for all authenticated routes
        children: [
          { path: "/starter", exact: true, element: <Starter /> },
          { path: "/about", exact: true, element: <About /> },
          { path: "/alerts", exact: true, element: <Alerts /> },
          { path: "/badges", exact: true, element: <Badges /> },
          { path: "/buttons", exact: true, element: <Buttons /> },
          { path: "/cards", exact: true, element: <Cards /> },
          { path: "/grid", exact: true, element: <Grid /> },
          { path: "/table", exact: true, element: <Tables /> },
          { path: "/forms", exact: true, element: <Forms /> },
          { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
        ],
      },
    ],
  },
];

export default ThemeRoutes;
