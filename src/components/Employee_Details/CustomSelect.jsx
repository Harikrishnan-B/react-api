import React from "react";
import { useField, useFormState } from "informed";

const CustomSelect = ({ label, field, validate, backendError, children, ...rest }) => {
  const { fieldState, fieldApi, ref } = useField({ field, validate });
  const { error, touched, value } = fieldState;
  const { values } = useFormState();  
  const displayError = touched && (error || backendError);
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label fw-bold">
        {label}
      </label>
      <select
        ref={ref}
        id={field}
        value={value}
        required
        onChange={(e) => {
          const newValue = e.target.value;
          fieldApi.setValue(newValue);

          const validationError = validate ? validate(newValue, values) : null;
          fieldApi.setError(validationError);  
        }}
        onBlur={() => fieldApi.setTouched(true)}
        className="form-select"
        {...rest}
      >
        {children}
      </select>
      {displayError && <div className="text-danger small">{error || backendError}</div>}
    </div>
  );
};

export default CustomSelect;
