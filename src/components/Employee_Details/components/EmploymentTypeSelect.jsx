import React from 'react';
import CustomSelect from './CustomSelect';
import useEmploymentTypes from '../hooks/useEmploymentTypes';

const EmploymentTypeSelect = ({ 
  value, 
  onChange, 
  disabled = false, 
  required = true,
  backendError,
}) => {
  const { employmentTypes } = useEmploymentTypes();

  return (
    <CustomSelect 
      label="Employment Type" 
      field="employment_type_id"
      required={required}
      disabled={disabled}
      backendError={backendError}
    >
      <option value="">Select Employment Type</option>
      {employmentTypes?.map((type) => (
        <option key={type.id} value={type.id}>
          {type.title}
        </option>
      ))}
    </CustomSelect>
  );
};

export default EmploymentTypeSelect;