import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../utils/axios";

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          setUser(null);
          navigate("/login");
        } else {
            return Promise.reject(error)
        }
      }
    );
  }, [navigate, setUser]);

  return children
};

export default AxiosInterceptor
