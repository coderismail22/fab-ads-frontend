import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import WhatsAppChat from "@/components/WhatappFloatingChat/WhatsappFloatingChat";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="">
        <Outlet />
      </div>
      <WhatsAppChat />
      <Footer />
    </>
  );
};

export default MainLayout;
