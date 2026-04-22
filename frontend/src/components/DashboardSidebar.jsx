import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { BsBook } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { PiChalkboardTeacher } from "react-icons/pi";
import { TbBuildingCommunity } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiBookContent } from "react-icons/bi";
import { LiaUserShieldSolid } from "react-icons/lia";
import { GrScorecard } from "react-icons/gr";
import { LuCalendarDays } from "react-icons/lu";
import { BsFileEarmarkBarGraph } from "react-icons/bs";

const ICONS = {
  home: MdSpaceDashboard,
  student: HiOutlineUsers,
  "student info": HiOutlineUsers,
  faculty: PiChalkboardTeacher,
  branch: TbBuildingCommunity,
  notice: IoNotificationsOutline,
  subjects: BiBookContent,
  subject: BiBookContent,
  admin: LiaUserShieldSolid,
  marks: GrScorecard,
  timetable: LuCalendarDays,
  material: BsBook,
  exam: BsFileEarmarkBarGraph,
};

const getInitials = (profileData, fallbackRole) => {
  const firstName = profileData?.firstName || "";
  const lastName = profileData?.lastName || "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  if (initials.trim()) {
    return initials;
  }

  return (fallbackRole || "US").slice(0, 2).toUpperCase();
};

const getDisplayName = (profileData) => {
  const fullName = `${profileData?.firstName || ""} ${profileData?.lastName || ""}`.trim();
  return fullName || "Campus User";
};

const DashboardSidebar = ({
  menuItems,
  isActive,
  onMenuClick,
  profileData,
  roleLabel,
  onLogout,
}) => {
  return (
    <aside className="w-[240px] min-h-screen bg-[#eff6ff] border-r-[1.5px] border-[#e2e8f0] p-0 fixed left-0 top-0 flex flex-col">
      <div className="h-[72px] border-b border-[#e2e8f0] flex items-center px-5 gap-2.5">
        <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#1a56db] to-[#3b82f6]" />
        <h1
          className="text-[1.2rem] font-bold text-[#0a1628]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Campus<span className="text-[#1a56db]">Sync</span>
        </h1>
      </div>

      <div className="px-5 py-4 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1a56db] to-[#3b82f6] text-white font-bold text-sm flex items-center justify-center">
            {getInitials(profileData, roleLabel)}
          </div>
          <div className="min-w-0">
            <p className="text-[0.85rem] font-semibold text-[#0a1628] truncate">
              {getDisplayName(profileData)}
            </p>
            <p className="text-[0.72rem] text-[#94a3b8] uppercase tracking-[0.05em]">
              {roleLabel}
            </p>
          </div>
        </div>
      </div>

      <nav className="py-3">
        {menuItems.map((item) => {
          const active = isActive(item);
          const Icon = ICONS[item.id?.toLowerCase()] || ICONS[item.label?.toLowerCase()] || MdSpaceDashboard;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onMenuClick(item)}
              className={`w-[calc(100%-20px)] mx-[10px] my-[2px] px-3 py-2 rounded-lg text-[0.85rem] font-medium flex items-center gap-2.5 transition-all duration-150 ${
                active
                  ? "bg-white text-[#1a56db] shadow-[0_1px_6px_rgba(26,86,219,0.12)]"
                  : "text-[#475569] hover:bg-white hover:text-[#1a56db]"
              }`}
            >
              <Icon
                className={`text-[18px] ${
                  active ? "text-[#1a56db]" : "text-[#94a3b8]"
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-5 py-4 border-t border-[#e2e8f0]">
        <button
          type="button"
          onClick={onLogout}
          className="w-full px-3 py-2 rounded-lg text-[0.85rem] font-medium text-[#475569] flex items-center gap-2.5 transition-all duration-150 hover:bg-white hover:text-[#ef4444]"
        >
          <FiLogOut className="text-[18px] text-[#94a3b8]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
