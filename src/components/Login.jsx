import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userState";
import { Form, useField } from "informed";
import useAuth from "../hooks/useAuth";
import { Eye, EyeOff, UserCircle, Lock, Loader2 } from "lucide-react";
import "../assets/Login.css";

const CustomField = ({
  label,
  fieldType = "text",
  validate,
  required = false,
  placeholder,
  validateOn,
  append,
  icon,
  disabled,
  ...props
}) => {
  const { fieldState, fieldApi, render } = useField({
    ...props,
    validate,
    validateOn,
  });

  const { error, value } = fieldState;
  const inputId = `${props.name}-input`;
  const errorId = `${props.name}-error`;

  return render(
    <div className="form-field">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="required-mark">*</span>}
        </label>
      )}
      {append ? (
        <div className="input-group">
          {icon && <div className="input-icon">{icon}</div>}
          <input
            {...props}
            id={inputId}
            type={fieldType}
            value={value || ""}
            onChange={(e) => fieldApi.setValue(e.target.value)}
            onBlur={() => fieldApi.setTouched(true)}
            className={`form-input ${error ? "input-error" : ""}`}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            disabled={disabled}
          />
          <div className="input-append">{append}</div>
        </div>
      ) : (
        <div className="input-container">
          {icon && <div className="input-icon">{icon}</div>}
          <input
            {...props}
            id={inputId}
            type={fieldType}
            value={value || ""}
            onChange={(e) => fieldApi.setValue(e.target.value)}
            onBlur={() => fieldApi.setTouched(true)}
            className={`form-input ${error ? "input-error" : ""}`}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            disabled={disabled}
          />
        </div>
      )}
      {error && (
        <div id={errorId} className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

const validateEmail = (value) => {
  if (!value) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regex.test(value) ? "Invalid email address" : undefined;
};

const Login = () => {
  const { login, error } = useAuth();
  const user = useRecoilValue(userState);
  const [showPassword, setShowPassword] = useState(false);
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
              <div className="error-content">
                <svg
                  className="error-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
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

            <CustomField
              label="Password"
              name="password"
              fieldType={showPassword ? "text" : "password"}
              validate={(value) => !value ? "Password is required" : undefined}
              required
              icon={<Lock size={18} />}
              placeholder="Enter your password"
              disabled={isLoading}
              append={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading && <Loader2 size={18} className="animate-spin" />}
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export { Login, CustomField };
export default Login;