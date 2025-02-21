import { BiCategory } from "react-icons/bi";
import { FaHome, FaRegListAlt, FaRegEdit } from "react-icons/fa";

export const sidebarData = {
  admin: [
    { label: "Home", path: "/dashboard/admin/profile", icon: FaHome },
    {
      label: "Add Category",
      path: "/dashboard/admin/add-category",
      icon: BiCategory,
    },
    {
      icon: FaRegListAlt,
      label: "Add Service",
      path: "/dashboard/admin/add-service",
    },
    {
      icon: FaRegEdit,
      label: "Edit Service",
      path: "/dashboard/admin/edit-service",
    },
    {
      icon: FaRegEdit,
      label: "Change Password",
      path: "/dashboard/admin/change-password",
    },
  ],
};
