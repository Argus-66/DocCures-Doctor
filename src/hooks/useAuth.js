import { useDispatch } from "react-redux";
import { authenticate } from "../redux/DoctorSlice.mjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const server_url = import.meta.env.VITE_DOCCURES_SERVER_URL;

function useAuth() {
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate()

  const authStatus = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${server_url}/doctor/auth/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Auth status response:', data);
      setAuthData(data);

      if (data.auth) {
        console.log(data.user);
        
        dispatch(authenticate(data));
      }
    } catch (error) {
      console.error('Error in authStatus:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authStatus();
  }, []);

  return { authData, isLoading, error };
}

export default useAuth;