import React, { useEffect } from "react";
import { Form } from "informed";
import useDesignations from "./hooks/useDesignations.js";
import useDepartments from "./hooks/useDepartments.js";
import useEmploymentTypes from "./hooks/useEmploymentTypes.js";
import CustomInput from "./CustomInput.jsx";
import CustomSelect from "./CustomSelect.jsx";
import CustomRadioGroup from "./CustomRadioGroup.jsx";
import CustomFileInput from "./CustomFileInput.jsx";
import useEmployeeForm from "./hooks/useEmployeeForm.js";
import { validation } from '../../utils/validation.js';

const EmployeeDetailsForm = ({ initialValues, onSuccess, onCancel }) => {
  const { handleSubmit, isSaving, fieldErrors } = useEmployeeForm(initialValues, onSuccess);
  const { departments } = useDepartments();
  const { designations } = useDesignations();
  const { employmentTypes } = useEmploymentTypes();

  const masterData = {
    departments,
    designations,
    employmentTypes
  };

  

  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Employee Code", field: "employee_code", type: "text"  },
        { label: "Name", field: "name", type: "text" },
        { label: "Email", field: "email", type: "email" },
        { label: "Mobile", field: "phone", type: "text" },
        { label: "Date of Birth", field: "date_of_birth", type: "date" },
        { label: "Joining Date", field: "joining_date", type: "date" },
            { label: "Salary", field: "salary", type: "number" },
      ],
    },
    {
      title: "Address Details",
      fields: [
        { label: "Address", field: "address", type: "text" },
        { label: "City", field: "city", type: "text" },
        { label: "State", field: "state", type: "text" },
        { label: "Zip Code", field: "zip_code", type: "text" },
        { label: "Country", field: "country", type: "text" },
      ],
    },
    {
      title: "Banking Information",
      fields: [
        { label: "Bank Account Number", field: "bank_account_number", type: "text" },
        { label: "IFSC Code", field: "ifsc_code", type: "text" },
      ],
    },
    {
      title: "Emergency Contact",
      fields: [{ label: "Emergency Contact", field: "emergency_contact", type: "text" }],
    },
  ];


   const genderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
    { label: "Other", value: 3 },
  ];

  const validateForm = (values) => {
    console.log("Form validation running with values:", values);
    const errors = validation(values, masterData);
    console.log("Validation errors:", errors);
    return errors;
  };

  const validateName = (value) => {
    if (!value) return "This field is required";
    if (!/^[A-Za-z\s'-]{2,50}$/.test(value.trim())) {
      return "Name should only contain alphabets, spaces, hyphens, or apostrophes and be 2-50 characters long.";
    }
    return undefined;
  };

  return (
    <Form initialValues={initialValues} onSubmit={handleSubmit}  className="employee-form">
      <div className="form-container">
        <div className="section">
          <h3>Profile Picture</h3>
          <CustomFileInput 
            label="Upload Photo" 
            field="profile_picture" 
            backendError={fieldErrors["profile_picture"]} 
            validate={( values) =>
              validation(values).profile_picture
            }
          />
        </div>

        {sections.map(({ title, fields }) => (
          <div key={title} className="section">
            <h3>{title}</h3>
            <div className="form-grid">
              {fields.map(({ label, field, type }) => (
             <CustomInput
             key={field}
             label={label}
             field={field}
             type='text'
             required
             backendError={fieldErrors[field]}
             validate={field === 'name' ? validateName : undefined}
           />
              ))}
            </div>
          </div>
        ))}

        <div className="section">
          <h3>Gender</h3>
          <CustomRadioGroup 
           label="Select Gender"
           field="gender"
           options={genderOptions}
           className="bg-light rounded p-3"
          />
        </div>

        <div className="section">
          <h3>Employment Details</h3>
          <div className="form-grid">
            <CustomSelect 
              label="Department" 
              field="department_id" 
              required 
              // validate={(value, values) => validation("department_id", { ...values, department_id: value }, masterData)}
            >
 
              {departments?.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </CustomSelect>

            <CustomSelect 
              label="Designation" 
              field="designation_id" 
              required 
              // validate={(value, values) => validation("designation_id", { ...values, designation_id: value }, masterData)}
            >
             
              {designations?.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.title}
                </option>
              ))}
            </CustomSelect>

            <CustomSelect 
              label="Employment Type" 
              field="employment_type_id" 
              required 
              // validate={(value, values) => validation("employment_type_id", { ...values, employment_type_id: value }, masterData)}
            >
   
              {employmentTypes?.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.title}
                </option>
              ))}
            </CustomSelect>
          </div>

          {/* {[
            { label: "Joining Date", field: "joining_date", type: "date" },
            { label: "Salary", field: "salary", type: "number" },
          ].map(({ label, field, type }) => (
            <CustomInput
              key={field}
              label={label}
              field={field}
              type={type}
              required
              backendError={fieldErrors[field]}
              validate={( values) =>
                validation(values)[field]
              }
            />
          ))} */}
        </div>

        <div className="button-container">
          <button type="submit" className={`btn ${isSaving ? "btn-loading ms-2" : "btn-primary ms-2" }`} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary ms-2">
            Cancel
          </button>
        </div>
      </div>
    </Form>
  );
};

export default EmployeeDetailsForm;