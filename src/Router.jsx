import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Pages
import Homepage from "./pages/home/Homepage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Error404 from "./pages/Error404.jsx";

// Layouts & User Protected Layout
import RootLayout from "./layout/RootLayout.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import GuardLayout from "./layout/GuardLayout.jsx";

// Role Based Protected Routes
import AdminProtectedRoutes from "./layout/protectedRoute/AdminProtectedRoutes.jsx";
import MaidProtectedRoutes from "./layout/protectedRoute/MaidProtectedRoutes.jsx";
import ClientProtectedRoutes from "./layout/protectedRoute/ClientProtectedRoutes.jsx";

// Admin Routes
import AllClients from "./pages/dashboard/admin/AllClients.jsx";
import AllServices from "./pages/dashboard/admin/AllServices.jsx";
import AllMaids from "./pages/dashboard/admin/AllMaids.jsx";

import Settings from "./pages/dashboard/settings/Settings.jsx";
import SingleUser from "./pages/dashboard/admin/SingleUser.jsx";

export const router = createBrowserRouter([
  {
    element: <GuardLayout />,
    children: [
      {
        // Main
        element: <RootLayout />,
        children: [
          {
            path: "/",
            element: <Homepage />,
          },
        ],
      },

      {
        path: "*",
        element: <Error404 />,
      },

      // Auth
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
        ],
      },

      //Dashboard
      {
        element: <DashboardLayout />,
        path: "/dashboard",
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "settings",
            element: <Settings />,
          },

          // Admin Dashboard
          {
            path: "admin",
            element: <AdminProtectedRoutes />,
            children: [
              {
                path: "maids",
                element: <AllMaids />,
              },
              {
                path: "maids/:id",
                element: <SingleUser />,
              },
              {
                path: "clients",
                element: <AllClients />,
              },
              {
                path: "clients/:id",
                element: <SingleUser />,
              },
              {
                path: "services",
                element: <AllServices />,
              },
            ],
          },

          // Maid Dashboard
          {
            path: "maid",
            element: <MaidProtectedRoutes />,
            children: [],
          },
          // Clients Dashboard
          {
            path: "clients",
            element: <ClientProtectedRoutes />,
            children: [],
          },
        ],
      },
    ],
  },
]);
