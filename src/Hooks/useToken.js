import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (user) => {
    const [token, setToken] = useState("");
    console.log(user);

    useEffect(() => {
        const email = user?.user?.email;
        const currentUser = {
            email: user?.user?.email,
            name: user?.user?.displayName,
            img:
                user?.user?.photoURL ||
                "https://i.ibb.co/C81qjZG/Pngtree-man-default-avatar-5938280-1.png",
            role: "user",
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
