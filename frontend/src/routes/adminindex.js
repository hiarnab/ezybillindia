import React from "react"
import { useRoutes } from "react-router-dom";
import AdminLoginForm from "../pages/admin/AdminLoginForm.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import ProtectedRoute from "../authentication/adminProtectedRoute.js";

import PropertyPage from "../pages/admin/PropertyPage.jsx";
import SettingPage from "../pages/admin/SettingPage.jsx";
import Profile from "../pages/admin/Profile.jsx";
import Menu from "../pages/admin/Menu.jsx";
import Payment from "../pages/admin/Payment.jsx";
import DashboardM from "../pages/admin/DashboardM.jsx";
import ToolsPage from "../pages/admin/ToolsPage.jsx";

export default function AdminRoutes() {
  return useRoutes([
    {
      path: "admin",
      children: [
        {
          path: "login",
          element: <AdminLoginForm />
        },
       
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
              children: [
                {
                  path: "property",
                  element: <PropertyPage />
                },
                {
                  path: "setting",
                  element: <SettingPage/>
                },
                {
                  path: "profile",
                  element: <Profile />
                },
                {
                  path: "menu",
                  element: <Menu />
                },
                {
                  path: "payment",
                  element: <Payment />
                },
                {
                  path: "dashboardm",
                  element: <DashboardM />
                },
                {
                  path: "tools",
                  element: <ToolsPage />
                }
              ]
            }
          ]
        }
      ]
    }
  ]);
}
