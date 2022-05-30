import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import MyOrder from "./MyOrder";

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [updated, setUpdated] = useState(false);
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `https://mpt-server.herokuapp.com/myOrders?email=${user?.email}`
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
    if (!orders) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-40 h-40 mx-auto">
                    <Loading></Loading>
                </div>
            </div>
        );
    }
    return (
        <div>
            <h2 className="text-3xl uppercase font-bold text-center py-5">
                My Orders
            </h2>
            {orders.length === 0 ? (
                <div>
                    <h2 className="text-center text-xl py-5">
                        You do not have any orders
                    </h2>
                    <div className="flex justify-center">
                        <Link to="/allProducts" className="btn btn-primary">
                            Order Now
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-y-8 p-3">
                    {orders.map((order) => (
                        <MyOrder
                            key={order._id}
                            order={order}
                            updated={updated}
                            setUpdated={setUpdated}
                        ></MyOrder>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
