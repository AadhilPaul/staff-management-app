import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ErrorPage from "./pages/ErrorPage";

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
    path: "*",
    element: <ErrorPage />,
  },
]);
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
