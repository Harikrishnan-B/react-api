import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEmployeePage from "./hooks/useEmployeePage";
import EmployeeDetailsForm from "./EmployeeForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/EmployeeDetails.css";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    formData,
    editMode,
    showSuccessToast,
    error,
    isLoading,
    handleEdit,
    handleCancel,
    handleSuccess,
  } = useEmployeePage(id);

  const profileImage = useMemo(() => {
    if (
      formData?.profile_picture &&
      typeof formData.profile_picture === "string"
    ) {
      return (
        <img
          src={formData.profile_picture}
          alt="Profile"
          className="profile-image"
        />
      );
    }
    return null;
  }, [formData?.profile_picture]);

  if (isLoading || !formData) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <i className="bi bi-exclamation-triangle-fill"></i>
          Failed to load employee details
        </div>
        <button onClick={() => navigate(-1)} className="back-button">
          <i className="bi bi-arrow-left"></i>
          Back
        </button>
      </div>
    );
  }

  const personalInfo = [
    { label: "Employee Code", value: formData.employee_code },
    { label: "Email", value: formData.email },
    { label: "Mobile", value: formData.phone },
    { label: "Date of Birth", value: formData.formatted_dob },
    { label: "Address", value: formData.address },
    { label: "City", value: formData.city },
    { label: "State", value: formData.state },
    { label: "Country", value: formData.country },
  ];

  const employmentInfo = [
    { label: "Department", value: formData.department?.name },
    { label: "Designation", value: formData.designation?.title },
    { label: "Employment Type", value: formData.employment_type?.title },
    { label: "Joining Date", value: formData.formatted_joining_date },
    {
      label: "Salary",
      value: `₹${parseFloat(formData.salary).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
      })}`,
    },
  ];

  const bankingInfo = [
    { label: "Bank Account", value: formData.bank_account_number },
    { label: "IFSC Code", value: formData.ifsc_code },
  ];

  const emergencyInfo = [
    { label: "Emergency Contact", value: formData.emergency_contact },
  ];

  const renderInfoSection = (title, items) => (
    <div className="info-section">
      <div className="section-header">
        <h5>{title}</h5>
      </div>
      <div className="section-body">
        <div className="info-grid">
          {items.map(({ label, value }) => (
            <div key={label} className="info-item">
              <small className="info-label">{label}</small>
              <div className="info-value">
                {typeof value === "number" ? (
                  <span className="text-danger">Invalid value</span>
                ) : (
                  value || "N/A"
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      {/* Back Button Placed Outside the Main Container */}
      <button onClick={() => navigate(-1)} className="back-button">
        <i className="bi bi-arrow-left"></i> Back
      </button>

      <div className="page-container">
        <div className="content-wrapper">
          <div className="main-card">
            <div className="profile-section">
              <div className="profile-image-container">{profileImage}</div>
              <h2 className="employee-name">
                {typeof formData.name === "number" ? (
                  <span className="text-danger">Invalid name</span>
                ) : (
                  formData.name
                )}
              </h2>
              <p className="designation-badge">
                {formData.designation?.title || "Designation"}
              </p>
              {!editMode && (
                <button onClick={handleEdit} className="edit-button">
                  <i className="bi bi-pencil-square"></i>
                  Edit Details
                </button>
              )}
            </div>

            {editMode ? (
              <EmployeeDetailsForm
                initialValues={formData}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            ) : (
              <div className="info-sections">
                {renderInfoSection("Personal Information", personalInfo)}
                {renderInfoSection("Employment Details", employmentInfo)}
                {renderInfoSection("Banking Information", bankingInfo)}
                {renderInfoSection("Emergency Contact", emergencyInfo)}
              </div>
            )}
          </div>
        </div>
      </div>

      {showSuccessToast && (
        <div className="toast-container">
          <div className="toast-content">
            <div className="toast-header">
              <i className="bi bi-check-circle-fill"></i>
              <strong>Success</strong>
              <small>Just now</small>
              <button type="button" className="toast-close">
                ×
              </button>
            </div>
            <div className="toast-body">Record Updated Successfully</div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default EmployeeDetailsPage;
