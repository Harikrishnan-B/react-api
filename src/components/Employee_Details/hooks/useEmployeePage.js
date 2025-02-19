import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify"; // ✅ Import Toastify
import useEmployeeDetails from "./useEmployeeDetails";

const useEmployeePage = (id) => {
  const { details, error, isLoading, mutate } = useEmployeeDetails(id);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (details?.id && !editMode) {
      // Only update if we have a real data change
      setFormData(details);
    }
  }, [details?.id, editMode]); // Depend on specific properties instead of the whole object

  const handleEdit = useCallback(() => setEditMode(true), []);
  const handleCancel = useCallback(() => setEditMode(false), []);

  const handleSuccess = useCallback(
    (payload) => {
      setEditMode(false);
      setFormData(payload);
      mutate();

      // ✅ Show Toastify notification
      toast.success("Record updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    },
    [mutate]
  );

  return {
    formData,
    editMode,
    error,
    isLoading,
    handleEdit,
    handleCancel,
    handleSuccess,
  };
};

export default useEmployeePage;
