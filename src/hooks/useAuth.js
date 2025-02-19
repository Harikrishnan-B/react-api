import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userRecoilState } from "../recoil/userState";
import axios from "axios";
import { axiosInstance, API_ENDPOINTS } from '../config/axiosInstance.js'

const useAuth = () => {
  const [error, setError] = useState("");
  const setUser = useSetRecoilState(userRecoilState);
  const navigate = useNavigate();

  const login = async (username, password) => {
    setError(""); // 
    try {
      const response =  await axiosInstance.post(API_ENDPOINTS.auth.login, { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const userData = response.data?.data;
      if (userData?.token) {
        setUser(userData);
        navigate("/home");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return { login, logout, error };
};

export default useAuth;
