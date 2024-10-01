import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import { isAuthenticated } from "./utils/authenticated";
import Profile from "./pages/ProfilePage/Profile";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: isAuthenticated() ? (
      <Dashboard />
    ) : (
      <ErrorPage content="Dashboard" />
    ),
  },
  {
    path: "/notifications",
    element: <ErrorPage content="Notifications" />,
  },
  {
    path: "/deadlines",
    element: <ErrorPage content="Deadlines" />,
  },
  {
    path: "/apply-for-loa",
    element: <ErrorPage content="Application for Leave of absence" />,
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
