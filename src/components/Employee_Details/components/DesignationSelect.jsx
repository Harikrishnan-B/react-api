import React from 'react';
import CustomSelect from './CustomSelect';
import useDesignations from '../hooks/useDesignations';

const DesignationSelect = ({ 
  value, 
  onChange, 
  disabled = false, 
  required = true,
  backendError,
}) => {
  const { designations } = useDesignations();

  return (
    <CustomSelect 
      label="Designation" 
      field="designation_id"
      required={required}
      disabled={disabled}
      backendError={backendError}
    >
      <option value="">Select Designation</option>
      {designations?.map((designation) => (
        <option key={designation.id} value={designation.id}>
          {designation.title}
        </option>
      ))}
    </CustomSelect>
  );
};

export default DesignationSelect;