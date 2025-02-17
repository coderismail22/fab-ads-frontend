import { BiCategory } from "react-icons/bi";
import { FaHome, FaRegListAlt } from "react-icons/fa";

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
  ],
};
