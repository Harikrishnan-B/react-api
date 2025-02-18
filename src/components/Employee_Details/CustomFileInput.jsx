import React from "react";
import { useField, useFormState } from "informed";

const CustomFileInput = ({ label, field, validate, backendError, ...rest }) => {
  const { fieldState, fieldApi, ref } = useField({ field, validate });
  const { touched, error } = fieldState;
  const { values } = useFormState();
  const displayError = touched && (error || backendError);
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label fw-bold">
        {label}
      </label>
      <input
        ref={ref}
        type="file"
        id={field}
        name={field}
        className="form-control"
        onChange={(e) => {
          const file = e.target.files[0];
          fieldApi.setValue(file);
          const validationError = validate ? validate(file, values) : null;
          fieldApi.setError(validationError);
        }}
        {...rest}
      />
      {displayError && <div className="text-danger small">{error || backendError}</div>}
    </div>
  );
};

export default CustomFileInput;