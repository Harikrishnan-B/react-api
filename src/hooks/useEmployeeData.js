import { useRecoilValue } from "recoil";
import { userRecoilState } from "../recoil/userState";
import useSWR from "swr";
import axios from "axios";

export const useEmployeeData = ({
  page = 1,
  length = 10,
  sort_order = "asc",
  sort_by = "name",
} = {}) => {
  const user = useRecoilValue(userRecoilState);
  const token = user?.token;

  const queryString = `?length=${length}&page=${page}&sort_order=${sort_order}&sort_by=${sort_by}`;
  const url = `https://core-skill-test.webc.in/employee-portal/api/v1/employee${queryString}`;

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR(
    token ? url : null,
    fetcher,
    {keepPreviousData: true}
  );

  const employees = data?.data?.rows?.data || [];
  const pagination = data?.data?.rows || {};

  return { data: employees, pagination, error, isLoading, mutate };
};
