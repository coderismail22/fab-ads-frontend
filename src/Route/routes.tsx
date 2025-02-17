import MainLayout from "@/Layout/MainLayout";
import Home from "@/Pages/Home";
import NotFoundPage from "@/Pages/NotFoundPage";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/Pages/Dashboard/Dashboard/Dashboard";
import Login from "@/components/Auth/Login/Login";
import AdminProfile from "@/Pages/Dashboard/Admin/AdminProfile/AdminProfile";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
      <Dashboard />
      // </ProtectedRoute>
    ),
    children: [
      // Role: Admin
      { path: "/dashboard/admin/profile", element: <AdminProfile /> },
      { path: "/dashboard/admin/add-category", element: <AdminProfile /> },
      { path: "/dashboard/admin/add-service", element: <AdminProfile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
