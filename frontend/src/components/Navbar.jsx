import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const userType = localStorage.getItem("userType") || "user";
  const roleText = userType.toUpperCase();

  const dashboardTitle =
    (router.state && router.state.type) ||
    userType.charAt(0).toUpperCase() + userType.slice(1);

  const displayName = `${userData?.firstName || ""} ${
    userData?.lastName || ""
  }`.trim();

  const initials = `${(userData?.firstName || "").charAt(0)}${(
    userData?.lastName || ""
  ).charAt(0)}`.toUpperCase();


  return (
    <header className="h-16 bg-[rgba(255,255,255,0.95)] backdrop-blur-[12px] border-b border-[#e2e8f0] shadow-[0_1px_20px_rgba(26,86,219,0.07)] sticky top-0 z-50 flex items-center justify-between px-7">
      <div className="flex items-center gap-2">
        <span className="text-[#1a56db] text-lg">
          <RxDashboard />
        </span>
        <p
          className="text-[1.3rem] font-bold text-[#0a1628] cursor-pointer"
          style={{ fontFamily: "'Playfair Display', serif" }}
          onClick={() => navigate("/")}
        >
          {dashboardTitle} Dashboard
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="w-9 h-9 rounded-full bg-[#eff6ff] text-[#1a56db] flex items-center justify-center transition-colors duration-150 hover:bg-[#dbeafe]"
          aria-label="Notifications"
        >
          <IoNotificationsOutline className="text-[18px]" />
        </button>

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a56db] to-[#3b82f6] text-white text-xs font-semibold flex items-center justify-center">
          {initials || roleText.slice(0, 2)}
        </div>

        <p className="text-[0.85rem] font-semibold text-[#1e293b] hidden sm:block">
          {displayName || "Campus User"}
        </p>

        <span className="text-[0.7rem] font-semibold text-[#1e40af] bg-[#dbeafe] rounded-[100px] px-2.5 py-[3px]">
          {roleText}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
