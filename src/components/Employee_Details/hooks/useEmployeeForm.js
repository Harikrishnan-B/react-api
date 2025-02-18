import { useCallback } from "react";
import useEmployeeUpdate from "./useEmployeeUpdate";

const useEmployeeForm = (initialValues, onSuccess) => {
  const { updateEmployee, isSaving, fieldErrors } = useEmployeeUpdate();

  const handleSubmit = useCallback(
    async (values) => {
      const payload = { ...values.values, id: initialValues.id };
      console.log("Form Data Submitted:", payload);
      const result = await updateEmployee(payload);
      if (result.success) {
        onSuccess && onSuccess(payload);
      }
    },
    [initialValues.id, onSuccess, updateEmployee]
  );
  return { handleSubmit, isSaving, fieldErrors };
};

export default useEmployeeForm;
