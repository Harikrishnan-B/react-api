// useEmployeeUpdate.js
import { useState, useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userRecoilState } from "../../../recoil/userState";
const allowedKeys = [
  "id",
  "name",
  "email",
  "phone",
  "designation_id",
  "department_id",
  "gender",
  "date_of_birth",
  "address",
  "city",
  "state",
  "zip_code",
  "country",
  "employment_type_id",
  "joining_date",
  "salary",
  "bank_account_number",
  "ifsc_code",
  "emergency_contact",
  "employee_code",
];

const numericKeys = [
  "designation_id",
  "department_id",
  "gender",
  "employment_type_id",
  "salary",
  "id",
];
const useEmployeeUpdate = () => {
  const user = useRecoilValue(userRecoilState);
  const token = user?.token;
  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const createPayload = useCallback((data) => {
    const formDataToSend = new FormData();
    allowedKeys.forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        const value = numericKeys.includes(key)
          ? Number(data[key]).toString()
          : data[key];
        formDataToSend.append(key, value);
      }
    });
    // Append the file if provided
    if (data.profile_picture instanceof File) {
      formDataToSend.append("profile_picture", data.profile_picture);
    }
    return formDataToSend;
  }, []);

  const updateEmployee = useCallback(
    async (data) => {
      setIsSaving(true);
      setFieldErrors({});
      try {
        const payload = createPayload(data);
        for (let [key, value] of payload.entries()) {
          console.log(key, value);
        }
        const response = await axios.post(
          "https://core-skill-test.webc.in/employee-portal/api/v1/employee/update",
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          return { success: true, data: response.data };
        } else {
          throw new Error("Failed to update employee details.");
        }
      } catch (err) {
        const backendErrors = err.response?.data?.errors || {};
        setFieldErrors(backendErrors);
        const backendMessage =
          err.response?.data?.message || "Error updating employee details.";
        console.error("Update employee error:", err.response?.data || err.message);
        return { success: false, error: backendMessage, fieldErrors: backendErrors };
      } finally {
        setIsSaving(false);
      }
    },
    [createPayload, token]
  );

  return { updateEmployee, isSaving, fieldErrors };
};

export default useEmployeeUpdate;
