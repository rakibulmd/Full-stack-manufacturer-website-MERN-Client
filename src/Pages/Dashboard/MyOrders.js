import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import MyOrder from "./MyOrder";

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [updated, setUpdated] = useState(false);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/myOrders?email=${user?.email}`
                );

                setOrders(response?.data);
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
    }, [user, navigate, updated]);
    return (
        <div>
            <h2>My Orders</h2>
            <div className="grid grid-cols-1 gap-y-6 p-3">
                {orders.map((order) => (
                    <MyOrder
                        key={order._id}
                        order={order}
                        updated={updated}
                        setUpdated={setUpdated}
                    ></MyOrder>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
