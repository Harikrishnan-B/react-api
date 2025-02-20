import { useMemo } from "react";
import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { userRecoilState } from "../../../recoil/userState";
import { axiosInstance, API_ENDPOINTS } from "../../../config/axiosInstance";

const fetcher = async (url, id, token) => {
  const response = await axiosInstance.get(url, {
    params: { id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

const useEmployeeDetails = (id) => {
  const user = useRecoilValue(userRecoilState);
  const token = user?.token;

  const { data, error, isLoading, mutate } = useSWR(
    token && id ? ["employeeDetails", id, token] : null,
    ([, id, token]) => fetcher(API_ENDPOINTS.employee.show, id, token)
  );

  const details = data
    ? {
        ...data,
        designation_id: data.designation?.id,
        department_id: data.department?.id,
        employment_type_id: data.employment_type?.id,
      }
    : null;

  return { details, error, isLoading, mutate };
};

export default useEmployeeDetails;
