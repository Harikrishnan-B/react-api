import React, { useState, useEffect } from "react";
import { useField, useFormState } from "informed";

const CustomFileInput = ({ label, field, validate, backendError, ...rest }) => {
  const { fieldState, fieldApi, ref } = useField({ field, validate });
  const { touched, error, value } = fieldState;
  const { values } = useFormState();
  const displayError = touched && (error || backendError);
  const [preview, setPreview] = useState(value || null);

  // Cleanup useEffect is still necessary
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      fieldApi.setValue(file);
      const validationError = validate ? validate(file, values) : null;
      fieldApi.setError(validationError);
    } else {
      setPreview(null);
      fieldApi.setValue(null);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    fieldApi.setValue(null);
    if (ref.current) {
      ref.current.value = '';
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label fw-bold">
        {label}
      </label>
      
      {preview && (
        <div className="position-relative mb-2" style={{ width: '150px', height: '150px' }}>
          <div className="border rounded overflow-hidden" style={{ width: '100%', height: '100%' }}>
            <img
              src={preview}
              alt="Preview"
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="btn btn-danger btn-sm position-absolute"
            style={{ top: '5px', right: '5px', padding: '2px 6px' }}
          >
            ×
          </button>
        </div>
      )}

      <input
        ref={ref}
        type="file"
        id={field}
        name={field}
        className="form-control"
        onChange={handleFileChange}
        accept="image/*"
        {...rest}
      />
      
      {displayError && (
        <div className="text-danger small">{error || backendError}</div>
      )}
    </div>
  );
};

export default CustomFileInput;