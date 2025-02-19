import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { userRecoilState } from "../../../recoil/userState.js";
import { axiosInstance, API_ENDPOINTS } from "../../../config/axiosInstance.js";

const useDesignations = () => {
  const user = useRecoilValue(userRecoilState);
  const token = user?.token;
  const { data, error, isLoading } = useSWR(
    token ? ["designations", token] : null,
    ([, token]) =>
      axiosInstance
        .get(API_ENDPOINTS.settings.designations, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => res.data.data)
  );

  return { designations: data, error, isLoading };
};

export default useDesignations;