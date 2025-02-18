import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { userState } from "../../recoil/userState";

const Auth = ({ children }) => {
  const user = useRecoilValue(userState);
  return user ? children : <Navigate to="/" replace />;
};

export default Auth;
