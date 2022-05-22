import axios from "axios";
import React, { useEffect, useState } from "react";

const useToken = (user) => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const email = user?.user?.email;
        const currentUser = { email: email };
        if (email) {
            const put = async () => {
                const response = axios.put(
                    `http://localhost:5000/user/${email}`,
                    currentUser
                );
                console.log(response);
            };
            put();
        }
    }, [user]);
    return token;
};

export default useToken;
