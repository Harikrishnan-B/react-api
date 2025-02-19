import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState.js";
import { Form } from "informed";
import useAuth from "../../hooks/useAuth.js";
import { UserCircle, Loader2 } from "lucide-react";
import "../../assets/Login.css";
import CustomField from "./CustomField"; 
import PasswordField from "./PasswordField"; 

const validateEmail = (value) => {
  if (!value) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regex.test(value) ? "Invalid email address" : undefined;
};

const Login = () => {
  const { login, error } = useAuth();
  const user = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await login(values.values.username, values.values.password);
    } catch (error) {
      // Error handling is done in useAuth
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-circle">
              <UserCircle size={40} className="logo-icon" />
            </div>
          </div>
          <h2 className="header-title">Welcome Back</h2>
          <p className="header-subtitle">Sign in to your account</p>
        </div>

        <div className="login-form-container">
          {error && (
            <div className="error-alert" role="alert">
              <span>{error}</span>
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <CustomField
              label="Email"
              name="username"
              validate={validateEmail}
              required
              icon={<UserCircle size={18} />}
              placeholder="Enter your email address"
              disabled={isLoading}
            />

            <PasswordField
              label="Password"
              name="password"
              required
              placeholder="Enter your password"
              disabled={isLoading}
            />

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading && <Loader2 size={18} className="animate-spin" />}
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
