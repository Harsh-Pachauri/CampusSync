import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import Notice from "../Notice";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
import axiosWrapper from "../../utils/AxiosWrapper";
import Timetable from "./Timetable";
import Material from "./Material";
import StudentFinder from "./StudentFinder";
import Profile from "./Profile";
import Marks from "./AddMarks";
import Exam from "../Exam";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../../components/DashboardSidebar";

const MENU_ITEMS = [
  { id: "home", label: "Home", component: null },
  { id: "timetable", label: "Timetable", component: Timetable },
  { id: "material", label: "Material", component: Material },
  { id: "notice", label: "Notice", component: Notice },
  { id: "student info", label: "Student Info", component: StudentFinder },
  { id: "marks", label: "Marks", component: Marks },
  { id: "exam", label: "Exam", component: Exam },
];

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const [profileData, setProfileData] = useState(null);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosWrapper.get("/faculty/my-details", {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (response.data.success) {
          setProfileData(response.data.data);
          dispatch(setUserData(response.data.data));
        }
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    fetchUserDetails();
  }, [dispatch, userToken]);

  const renderContent = () => {
    if (selectedMenu === "Home" && profileData) {
      return <Profile profileData={profileData} />;
    }

    const menuItem = MENU_ITEMS.find(
      (item) => item.label.toLowerCase() === selectedMenu.toLowerCase()
    );

    if (menuItem && menuItem.component) {
      const Component = menuItem.component;
      return <Component />;
    }

    return null;
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen bg-[#f1f5f9]">
        <DashboardSidebar
          menuItems={MENU_ITEMS}
          isActive={(item) =>
            selectedMenu.toLowerCase() === item.id.toLowerCase() ||
            selectedMenu.toLowerCase() === item.label.toLowerCase()
          }
          onMenuClick={(item) => setSelectedMenu(item.label)}
          profileData={profileData}
          roleLabel="Faculty"
          onLogout={handleLogout}
        />

        <div className="ml-[240px] min-h-screen">
          <Navbar />
          <div className="px-7 py-6">{renderContent()}</div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;
