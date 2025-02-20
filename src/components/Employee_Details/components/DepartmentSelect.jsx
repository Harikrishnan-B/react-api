import React from 'react';
import CustomSelect from './CustomSelect.jsx';
import useDepartments from '../hooks/useDepartments.js';

const DepartmentSelect = ({ 
  value, 
  onChange, 
  disabled = false, 
  required = true,
  backendError,
}) => {
  const { departments } = useDepartments();

  return (
    <CustomSelect 
      label="Department" 
      field="department_id"
      required={required}
      disabled={disabled}
      backendError={backendError}
    >
      <option value="">Select Department</option>
      {departments?.map((dept) => (
        <option key={dept.id} value={dept.id}>
          {dept.name}
        </option>
      ))}
    </CustomSelect>
  );
};

export default DepartmentSelect;