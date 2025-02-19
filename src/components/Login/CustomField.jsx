import React from "react";
import { useField } from "informed";

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

export default CustomField;
