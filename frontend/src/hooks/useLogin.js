import { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContent";

function useLogin() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const login = async (username, password) => {
        const success = handleInputErrors({
            username,
            password,
        });
        if (!success) return;
        setLoading(true);
        try {
            const res = await axios("/api/auth/login", {
                method: "post",
                data: { username, password },
            });
            localStorage.setItem("chat-user", JSON.stringify(res.data));
            setAuthUser(res.data);
        } catch (error) {
            let err = error.response;
            toast.error(err.data.error);
        } finally {
            setLoading(false);
        }
    };
    return { loading, login };
}

export default useLogin;

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}
