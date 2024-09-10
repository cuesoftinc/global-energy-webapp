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

  //validate the token by checking it's exp and other keys
  const validateToken = useMemo(() => {
    const token = getToken as TokenType;
    return token?.exp && token?.publicKey && token?.exp > Date.now() / 1000;
  }, [getToken]);
  return {
    validateToken,
  };
};

export default useValidateToken;
