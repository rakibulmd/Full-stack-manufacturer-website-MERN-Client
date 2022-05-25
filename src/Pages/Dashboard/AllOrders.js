import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import AllOrderRow from "./AllOrderRow";

const AllOrders = () => {
    const [user] = useAuthState(auth);
    const [allOrders, setAllOrders] = useState([]);
    const [orderUpdated, setOrderUpdated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/dashboard/allOrders?email=${user?.email}`
                );

                setAllOrders(response?.data);
                console.log(response.data);
            } catch (error) {
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                ) {
                    navigate("/login");
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                    return;
                }
            }
        };
        getData();
    }, [navigate, user, orderUpdated]);
    return (
        <div>
            <h2>This is all orders {allOrders?.length}</h2>
            <div className="grid grid-cols-1 gap-y-6 p-3">
                {allOrders.map((order) => (
                    <AllOrderRow
                        key={order._id}
                        order={order}
                        orderUpdated={orderUpdated}
                        setOrderUpdated={setOrderUpdated}
                    ></AllOrderRow>
                ))}
            </div>
        </div>
    );
};

export default AllOrders;
