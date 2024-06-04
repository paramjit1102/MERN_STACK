import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContent";
function useLogout() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios("/api/auth/logout", {
        method: "post",
      });
      localStorage.removeItem("chat-user", JSON.stringify(res.data));
      setAuthUser(null);
    } catch (error) {
      let err = error.response;
      toast.error(err.data.error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
}

export default useLogout;
