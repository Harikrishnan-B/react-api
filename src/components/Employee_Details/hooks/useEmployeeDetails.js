import { useMemo } from "react";
import useSWR from "swr";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userRecoilState } from "../../../recoil/userState";

const fetcher = async (url, id, token) => {
  const response = await axios.get(url, {
    params: { id },
    headers: {
      "Content-Type": "application/json",
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
    ([, id, token]) =>
      fetcher(
        "https://core-skill-test.webc.in/employee-portal/api/v1/employee/show",
        id,
        token
      )
  );

  const details = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      designation_id: data.designation?.id,
      department_id: data.department?.id,
      employment_type_id: data.employment_type?.id,
    };
  }, [data]);

  return { details, error, isLoading, mutate };
};

export default useEmployeeDetails;
