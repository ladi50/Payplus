import { useCallback, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState();

  const login = useCallback((res) => {
    setToken(res.token);
    localStorage.setItem("adminId", res.admin._id);
    localStorage.setItem("token", res.token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("adminId");
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  return { logout, token, login };
};
