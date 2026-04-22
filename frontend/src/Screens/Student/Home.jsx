import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import Notice from "../Notice";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
import axiosWrapper from "../../utils/AxiosWrapper";
import Timetable from "./Timetable";
import Material from "./Material";
import Profile from "./Profile";
import Exam from "../Exam";
import ViewMarks from "./ViewMarks";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardSidebar from "../../components/DashboardSidebar";

const MENU_ITEMS = [
  { id: "home", label: "Home", component: null },
  { id: "timetable", label: "Timetable", component: Timetable },
  { id: "material", label: "Material", component: Material },
  { id: "notice", label: "Notice", component: Notice },
  { id: "exam", label: "Exam", component: Exam },
  { id: "marks", label: "Marks", component: ViewMarks },
];

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      toast.loading("Loading user details...");
      const response = await axiosWrapper.get(`/student/my-details`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setProfileData(response.data.data);
        dispatch(setUserData(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error fetching user details"
      );
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [dispatch, userToken]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">Loading...</div>
      );
    }

    if (selectedMenu === "home" && profileData) {
      return <Profile profileData={profileData} />;
    }

    const MenuItem = MENU_ITEMS.find(
      (item) => item.label.toLowerCase() === selectedMenu.toLowerCase()
    )?.component;

    return MenuItem && <MenuItem />;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pathMenuId = urlParams.get("page") || "home";
    const validMenu = MENU_ITEMS.find((item) => item.id === pathMenuId);
    setSelectedMenu(validMenu ? validMenu.id : "home");
  }, [location.pathname]);

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
    navigate(`/student?page=${menuId}`);
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
          isActive={(item) => selectedMenu.toLowerCase() === item.id.toLowerCase()}
          onMenuClick={(item) => handleMenuClick(item.id)}
          profileData={profileData}
          roleLabel="Student"
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
