import React, { useState } from "react";
import { useField } from "informed";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordField = ({ label, required = false, placeholder, disabled, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { fieldState, fieldApi, render } = useField({ ...props });

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
      <div className="input-group">
        <div className="input-icon">
          <Lock size={18} />
        </div>
        <input
          {...props}
          id={inputId}
          type={showPassword ? "text" : "password"}
          value={value || ""}
          onChange={(e) => fieldApi.setValue(e.target.value)}
          onBlur={() => fieldApi.setTouched(true)}
          className={`form-input ${error ? "input-error" : ""}`}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle"
          disabled={disabled}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <div id={errorId} className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default PasswordField;
