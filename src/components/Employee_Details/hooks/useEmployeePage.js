import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
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
    async (payload) => {
      try {
        // First, update the local state optimistically
        setFormData(prevData => ({
          ...prevData,
          ...payload
        }));
        
        // Then, trigger a revalidation of the data
        await mutate();
        
        // Finally, close the edit mode
        setEditMode(false);

        toast.success("Record updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } catch (error) {
        // If something goes wrong, show an error
        toast.error("Failed to update the record. Please try again.");
        // Revalidate to ensure we have the correct data
        mutate();
      }
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




