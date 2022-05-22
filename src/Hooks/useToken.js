import axios from "axios";
import React, { useEffect, useState } from "react";

const useToken = (user) => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const email = user?.user?.email;
        const currentUser = {
            email: user?.user?.email,
            name: user?.user?.displayName,
        };
        if (email) {
            const put = async () => {
                const response = await axios.put(
                    `http://localhost:5000/user/${email}`,
                    currentUser
                );
                localStorage.setItem("accessToken", response?.data?.token);
                setToken(response?.data?.token);
            };
            put();
        }
    }, [user]);
    return token;
};

export default useToken;
