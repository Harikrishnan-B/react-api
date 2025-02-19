import React from "react";
import { Form } from "informed";
import { Modal, Button } from "react-bootstrap"; // Assuming you're using react-bootstrap for modals
import useDesignations from "./hooks/useDesignations.js";
import useDepartments from "./hooks/useDepartments.js";
import useEmploymentTypes from "./hooks/useEmploymentTypes.js";
import CustomInput from "./CustomInput.jsx";
import CustomSelect from "./CustomSelect.jsx";
import CustomRadioGroup from "./CustomRadioGroup.jsx";
import CustomFileInput from "./CustomFileInput.jsx";
import useEmployeeForm from "./hooks/useEmployeeForm.js";
import { validation } from "../../utils/validation.js";

const EmployeeForm = ({ initialValues, onSuccess, onCancel, show, onHide }) => {
  const { handleSubmit, isSaving, fieldErrors } = useEmployeeForm(
    initialValues,
    onSuccess
  );
  const { departments } = useDepartments();
  const { designations } = useDesignations();
  const { employmentTypes } = useEmploymentTypes();

  // const masterData = {
  //   departments,
  //   designations,
  //   employmentTypes,
  // };

  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Employee Code", field: "employee_code", type: "text" },
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
        {
          label: "Bank Account Number",
          field: "bank_account_number",
          type: "text",
        },
        { label: "IFSC Code", field: "ifsc_code", type: "text" },
      ],
    },
    {
      title: "Emergency Contact",
      fields: [
        {
          label: "Emergency Contact",
          field: "emergency_contact",
          type: "text",
        },
      ],
    },
  ];

  const genderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
    { label: "Other", value: 3 },
  ];

  // const validateForm = (values) => {
  //   console.log("Form validation running with values:", values);
  //   const errors = validation(values, masterData);
  //   console.log("Validation errors:", errors);
  //   return errors;
  // };

  const validateName = (value) => {
    if (!value) return "This field is required";
    if (!/^[A-Za-z\s'-]{2,50}$/.test(value.trim())) {
      return "Only letters and spaces are allowed";
    }
    return undefined;
  };

  const handleFormSubmit = (values) => {
    handleSubmit(values);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="employee-details-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="employee-details-modal">
          {initialValues?.id ? "Edit Employee Details" : "Add New Employee"}
        </Modal.Title>
      </Modal.Header>

      <Form
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        className="employee-form"
        focusOnInvalid="true"
      >
        <Modal.Body>
          <div className="form-container modal-form-container">
            <div className="section">
              <h5>Profile Picture</h5>
              <CustomFileInput
                label="Upload Photo"
                field="profile_picture"
                backendError={fieldErrors["profile_picture"]}
                validate={(values) => validation(values).profile_picture}
              />
            </div>

            {sections.map(({ title, fields }) => (
              <div key={title} className="section">
                <h5>{title}</h5>
                <div className="form-grid modal-form-grid">
                  {fields.map(({ label, field, type }) => (
                    <CustomInput
                      key={field}
                      label={label}
                      field={field}
                      type={type || "text"}
                      required
                      backendError={fieldErrors[field]}
                      validate={field === "name" ? validateName : undefined}
                    />
                  ))}
                </div>
              </div>
            ))}

            <div className="section">
              <h5>Gender</h5>
              <CustomRadioGroup
                label="Select Gender"
                field="gender"
                options={genderOptions}
                className="bg-light rounded p-3"
              />
            </div>

            <div className="section">
              <h5>Employment Details</h5>
              <div className="form-grid modal-form-grid">
                <CustomSelect label="Department" field="department_id" required>
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
                >
                  {employmentTypes?.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.title}
                    </option>
                  ))}
                </CustomSelect>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;
