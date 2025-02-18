import useSWRMutation from "swr/mutation";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userRecoilState } from "../recoil/userState";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "./EmployeeTable.jsx";
import { axiosInstance, API_ENDPOINTS } from "../config/axiosInstance.js";
import "../assets/Logout.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const logoutFetcher = async (url, { arg }) => {
  const response = await axios.post(
    url,
    {},
    {
      headers: { Authorization: `Bearer ${arg}` },
    }
  );
  return response.data;
};

const Home = () => {
  const [user, setUser] = useRecoilState(userRecoilState);
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const { trigger } = useSWRMutation(
    "https://core-skill-test.webc.in/employee-portal/api/v1/settings/logout",
    logoutFetcher
  );

  const initiateLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    if (!user?.token) {
      toast.warning("Not logged in");
      return;
    }

    try {
      const response = await trigger(user.token);
      console.log("Logout response:", response);

      if (response.success) {
        setUser(null);
        toast.success("Logged out successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      toast.error("Logout failed. Please try again!");
    }
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="home-container">
      <div className="header-container">
        <button onClick={initiateLogout} className="logout-button">
          Logout
        </button>
      </div>

      <EmployeeTable />

      {showLogoutConfirm && (
        <div className="logout-confirmation-overlay">
          <div className="logout-confirmation-dialog">
            <p>Do you want to logout?</p>
            <div className="dialog-buttons">
              <button onClick={confirmLogout} className="btn btn-primary">
                Yes
              </button>
              <button onClick={cancelLogout} className="btn btn-secondary">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
