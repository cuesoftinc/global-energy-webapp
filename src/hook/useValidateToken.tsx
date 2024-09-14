import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import { TokenType } from "../types";


const useValidateToken = () => {
  //get the token stored in the cookies then decode it
  const getToken = useMemo(() => {
    const token = Cookies.get("glbATK");
    try {
      if (token) {
        const decode = jwtDecode(token);
        return decode;
      }
    } catch (error) {
      return false;
    }
  }, []);

  // Validate the token by checking its expiration
  const validateToken = useMemo(() => {
    const token = getToken as TokenType;
    const currentTime = Date.now() / 1000; // Current time in seconds
    return token?.exp > currentTime; // Validate expiration
  }, [getToken]);
  return {
    validateToken,
  };

};

export default useValidateToken;
