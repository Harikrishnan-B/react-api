import useSWR from "swr";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userRecoilState } from "../../../recoil/userState.js";

const fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data.data);

const useDesignations = () => {
  const user = useRecoilValue(userRecoilState);
  const token = user?.token;
  const { data, error, isLoading } = useSWR(
    token ? ["designations", token] : null,
    ([, token]) =>
      fetcher(
        "https://core-skill-test.webc.in/employee-portal/api/v1/settings/designations",
        token
      )
  );

  return { designations: data, error, isLoading };
};

export default useDesignations;
