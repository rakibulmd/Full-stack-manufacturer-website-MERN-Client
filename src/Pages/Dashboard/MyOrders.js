import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import MyOrder from "./MyOrder";

const MyOrders = () => {
    const [user] = useAuthState(auth);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(
                `http://localhost:5000/myOrders?email=${user?.email}`
            );
            setOrders(data);
        };
        getData();
    }, [user]);
    return (
        <div>
            <h2>My Orders</h2>
            <div className="grid grid-cols-1 gap-5 p-3">
                {orders.map((order, index) => (
                    <MyOrder
                        key={order._id}
                        order={order}
                        serial={index + 1}
                    ></MyOrder>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
