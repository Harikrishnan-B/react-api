import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { userRecoilState } from "../../../recoil/userState.js";
import { axiosInstance, API_ENDPOINTS } from "../../../config/axiosInstance.js";

const useEmploymentTypes = () => {
  const user = useRecoilValue(userRecoilState);
  const token = user?.token;
  const { data, error, isLoading } = useSWR(
    token ? ["employmentTypes", token] : null,
    ([, token]) =>
      axiosInstance
        .get(API_ENDPOINTS.settings.employmentTypes, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => res.data.data)
  );

  return { employmentTypes: data, error, isLoading };
};

export default useEmploymentTypes;