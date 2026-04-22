import React, { useState, useEffect } from "react";
import { FiLogIn, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setUserToken } from "../redux/actions";
import { useDispatch } from "react-redux";
import axiosWrapper from "../utils/AxiosWrapper";

const USER_TYPES = {
  STUDENT: "Student",
  FACULTY: "Faculty",
  ADMIN: "Admin",
};

const LoginForm = ({ selected, onSubmit, formData, setFormData }) => (
  <form
    className="w-full max-w-[420px] p-[48px_40px] bg-white"
    onSubmit={onSubmit}
  >
    <div className="mb-5">
      <span className="inline-flex items-center rounded-[100px] bg-[#dbeafe] text-[#1a56db] text-[0.8rem] font-semibold px-3 py-1">
        {selected} Portal
      </span>
    </div>

    <h1
      className="text-[2rem] font-bold text-[#0a1628] leading-tight mb-1.5"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      Welcome Back
    </h1>
    <p className="text-[0.9rem] text-[#475569] mb-8">
      Sign in to your account to continue
    </p>

    <div className="mb-5">
      <label
        className="block text-[0.82rem] font-semibold text-[#374151] mb-1.5"
        htmlFor="email"
      >
        {selected} Email
      </label>

      <div className="relative">
        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] text-base" />
        <input
          type="email"
          id="email"
          required
          className="w-full pl-11 pr-4 py-[11px] text-sm bg-[#f1f5f9] border-[1.5px] border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#1a56db] focus:bg-white focus:shadow-[0_0_0_3px_rgba(26,86,219,0.1)]"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
    </div>

    <div className="mb-5">
      <label
        className="block text-[0.82rem] font-semibold text-[#374151] mb-1.5"
        htmlFor="password"
      >
        Password
      </label>

      <div className="relative">
        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] text-base" />
        <input
          type="password"
          id="password"
          required
          className="w-full pl-11 pr-4 py-[11px] text-sm bg-[#f1f5f9] border-[1.5px] border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#1a56db] focus:bg-white focus:shadow-[0_0_0_3px_rgba(26,86,219,0.1)]"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
    </div>

    <div className="flex items-center justify-between mb-6">
      <Link
        className="text-sm text-[#1a56db] hover:underline"
        to="/forget-password"
      >
        Forgot Password?
      </Link>
    </div>

    <button
      type="submit"
      className="w-full py-[13px] bg-gradient-to-br from-[#1a56db] to-[#3b82f6] text-white font-semibold text-[0.95rem] rounded-lg shadow-[0_4px_14px_rgba(26,86,219,0.35)] transition-all duration-150 hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(26,86,219,0.45)] flex justify-center items-center gap-2"
    >
      Login
      <FiLogIn className="text-lg" />
    </button>
  </form>
);

const UserTypeSelector = ({ selected, onSelect }) => (
  <div className="flex flex-wrap items-center gap-2 mb-6">
    {Object.values(USER_TYPES).map((type) => (
      <button
        key={type}
        onClick={() => onSelect(type)}
        className={`px-3 py-1.5 text-[0.78rem] font-semibold rounded-full border transition duration-150 ${
          selected === type
            ? "bg-[#1a56db] text-white border-[#1a56db]"
            : "bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#eff6ff] hover:text-[#1a56db]"
        }`}
      >
        {type}
      </button>
    ))}
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [selected, setSelected] = useState(USER_TYPES.STUDENT);

  const handleUserTypeSelect = (type) => {
    const userType = type.toLowerCase();
    setSelected(type);
    setSearchParams({ type: userType });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axiosWrapper.post(
        `/api/${selected.toLowerCase()}/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token } = response.data.data;
      localStorage.setItem("userToken", token);
      localStorage.setItem("userType", selected);
      dispatch(setUserToken(token));
      navigate(`/${selected.toLowerCase()}`);
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      navigate(`/${localStorage.getItem("userType").toLowerCase()}`);
    }
  }, [navigate]);

  useEffect(() => {
    if (type) {
      const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
      setSelected(capitalizedType);
    }
  }, [type]);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:flex min-h-screen bg-[linear-gradient(160deg,#0a1628_0%,#1a56db_100%)] overflow-hidden">
        <div className="absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(255,255,255,0.35)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(255,255,255,0.35)_25px)]" />

        <div className="relative z-10 px-12 py-16 flex flex-col justify-center text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white text-xl font-bold">C</span>
            </div>
            <h2
              className="text-[2rem] font-bold tracking-[-0.02em]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              CampusSync
            </h2>
          </div>

          <p className="text-[1.1rem] leading-relaxed text-white/75 max-w-md mb-10">
            Centralizing campus life, one login at a time.
          </p>

          <ul className="space-y-4 text-[0.98rem]">
            <li className="flex items-center gap-3">
              <FiCheckCircle className="text-white" />
              <span>Secure JWT Authentication</span>
            </li>
            <li className="flex items-center gap-3">
              <FiCheckCircle className="text-white" />
              <span>Role-Based Access Control</span>
            </li>
            <li className="flex items-center gap-3">
              <FiCheckCircle className="text-white" />
              <span>Real-time Data Sync</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10 md:px-8">
        <div className="w-full max-w-[420px]">
          <UserTypeSelector
            selected={selected}
            onSelect={handleUserTypeSelect}
          />
          <LoginForm
            selected={selected}
            onSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>

      <Toaster
        position="bottom-center"
        toastOptions={{
          error: {
            style: {
              background: "#fee2e2",
              border: "1px solid #fca5a5",
              color: "#991b1b",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "0.85rem",
            },
          },
        }}
      />
    </div>
  );
};

export default Login;
