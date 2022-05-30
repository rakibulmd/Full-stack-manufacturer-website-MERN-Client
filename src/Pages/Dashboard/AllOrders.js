import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import AllOrderRow from "./AllOrderRow";

const AllOrders = () => {
    const [user] = useAuthState(auth);
    const [allOrders, setAllOrders] = useState(null);
    const [orderUpdated, setOrderUpdated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `https://mpt-server.herokuapp.com/dashboard/allOrders?email=${user?.email}`
                );

                setAllOrders(response?.data);
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

    if (!allOrders) {
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
                All Orders
            </h2>
            <div className="grid grid-cols-1 gap-y-8 p-3">
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
