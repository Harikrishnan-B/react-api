
import React from "react";
import { useField, useFormState } from "informed";

const CustomInput = ({ label, field, type = "text", validate, backendError, ...rest }) => {
  const { fieldState, fieldApi, ref } = useField({ field, validate });
  const { error, touched, value } = fieldState;
  const { values } = useFormState();  
  const displayError = touched && (error || backendError);

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label fw-bold">
        {label}
      </label>
      <input
        type={type}
        id={field}
        ref={ref}
        value={value || ""}
        onChange={(e) => {
          const newValue = e.target.value;
          fieldApi.setValue(newValue);
          // Validate the field onChange using form values
          const validationError = validate ? validate(newValue, values) : null;
          fieldApi.setError(validationError);  
        }}
        onBlur={() => fieldApi.setTouched(true)}
        className="form-control"
        {...rest}
      />
      {displayError && <div className="text-danger small">{error || backendError}</div>}
    </div>
  );
};

export default CustomInput;