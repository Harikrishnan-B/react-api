
// useDepartments.js
import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { userRecoilState } from "../../../recoil/userState.js";
import { axiosInstance, API_ENDPOINTS } from "../../../config/axiosInstance.js";

const useDepartments = () => {
  const user = useRecoilValue(userRecoilState);
  const token = user?.token;
  const { data, error, isLoading } = useSWR(
    token ? ["departments", token] : null,
    ([, token]) =>
      axiosInstance
        .get(API_ENDPOINTS.settings.departments, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => res.data.data)
  );

  return { departments: data, error, isLoading };
};

export default useDepartments;