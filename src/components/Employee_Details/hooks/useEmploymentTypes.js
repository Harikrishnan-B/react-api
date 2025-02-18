import useSWR from "swr";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userRecoilState } from "../../../recoil/userState.js";

const fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data.data);

const useEmploymentTypes = () => {
  const user = useRecoilValue(userRecoilState);
  const token = user?.token;
  const { data, error, isLoading } = useSWR(
    token ? ["employmentTypes", token] : null,
    ([, token]) =>
      fetcher("https://core-skill-test.webc.in/employee-portal/api/v1/settings/employment-types", token)
  );

  return { employmentTypes: data, error, isLoading };
};

export default useEmploymentTypes;
