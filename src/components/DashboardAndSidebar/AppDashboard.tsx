import { Separator } from "@radix-ui/react-separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import { Outlet, useNavigate } from "react-router-dom";
import AppSidebar from "@/components/DashboardAndSidebar/AppSidebar";
import CustomBreadcrumbLink from "../CustomBreadcrumbLink/CustomBreadcrumbLink";
// import { authKey } from "@/api/authKey";
import { FaArrowLeft } from "react-icons/fa";

import Loader from "../Loader/Loader";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { logout } from "@/redux/slices/authSlice";
// import Loader from "../Loader/Loader";

const AppDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user", user);
  // if (!role) {
  //   return <Loader />;
  // }

  // While redirecting, role will be undefined, so render nothing
  // if (!role) {
  //   navigate("/auth/login");
  //   return null; // Prevent further rendering while redirecting
  // }
  const role = user?.role;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        {/* <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 "> */}
        <header className="flex items-center gap-2 px-4 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
          <SidebarTrigger className="-ml-1 text-black bg-[#a8ecf0]" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className=" w-full">
            <BreadcrumbList className=" flex justify-between items-center">
              <BreadcrumbItem className="hidden md:block">
                <CustomBreadcrumbLink to={`/`}>
                  <p className="flex gap-2 items-center justify-center text-white ">
                    <FaArrowLeft />
                    Go to Homepage
                  </p>
                </CustomBreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Button
                  className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div
          className=" bg-[#e2f0f1] min-h-screen"
          style={{
            backgroundImage: "url('/dashboard-bg-1.png')",
            backgroundSize: "cover", // Makes the image cover the full container
            backgroundPosition: "center", // Centers the background image
            height: "100%", // Full height of the container
            padding: "20px", // Your custom padding
          }}
        >
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppDashboard;
