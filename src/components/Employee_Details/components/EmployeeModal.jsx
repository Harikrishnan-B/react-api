import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import { toast } from 'react-toastify';

const EmployeeModal = ({ employee, onSuccess }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSuccess = (response) => {
    onSuccess?.(response);
    handleCloseModal();
    toast.success('Employee details updated successfully');
  };

  return (
    <>
      <button onClick={handleOpenModal} className="edit-button">
        <i className="bi bi-pencil-square"></i>
        Edit Details
      </button>

      <EmployeeForm
        show={showModal}
        onHide={handleCloseModal}
        initialValues={employee}
        onSuccess={handleFormSuccess}
        onCancel={handleCloseModal}
      />
    </>
  );
};

export default EmployeeModal;