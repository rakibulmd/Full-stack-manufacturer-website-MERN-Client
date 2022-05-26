import axios from "axios";
import { useEffect, useState } from "react";

const useAdmin = (user) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        const email = user.email;
        if (email) {
            const getData = async () => {
                const { data } = await axios.get(
                    `https://mpt-server.herokuapp.com/checkAdmin?email=${email}`
                );
                setIsAdmin(data.isAdmin);
                setAdminLoading(false);
            };
            getData();
        }
    }, [user]);
    return [isAdmin, adminLoading];
};

export default useAdmin;
