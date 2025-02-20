import React from "react";
import { useField } from "informed";

const CustomRadioGroup = ({ label, field, options, backendError, ...rest }) => {
  const { fieldState, fieldApi } = useField({ field });
  const { error, touched, value } = fieldState;
  const displayError = touched && (error || backendError);

  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{label}</label>
      <div>
        {options.map((option) => (
          <div className="form-check form-check-inline" key={option.value}>
            <input
              type="radio"
              id={`${field}-${option.value}`}
              name={field}
              value={option.initialValues}
              checked={value === option.value}
              onChange={() => fieldApi.setValue(option.value)}
              onBlur={() => fieldApi.setTouched(true)}
              className="form-check-input"
              {...rest}
            />
            <label
              className="form-check-label"
              htmlFor={`${field}-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {displayError && (
        <div className="text-danger small">{error || backendError}</div>
      )}
    </div>
  );
};

export default CustomRadioGroup;
