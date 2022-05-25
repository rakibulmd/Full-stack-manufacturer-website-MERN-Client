import axios from "axios";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoDim from "../../asset/images/logo/logoDim.png";
import auth from "../../firebase.init";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
const MyOrder = ({ order, updated, setUpdated }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const {
        _id,
        address,
        quantity,
        paid,
        shipped,
        productPrice,
        productName,
        productId,
    } = order;
    const handleDeleteOrder = async (orderId) => {
        console.log(orderId);
        try {
            const response = await axios.delete(
                `http://localhost:5000/orders/${orderId}?email=${user?.email}`
            );
            if (response?.data?.deletedCount) {
                setUpdated(!updated);
                toast.success("Order removed");
            }
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
    return (
        <div
            className="card w-full shadow-3xl"
            style={{
                background: `url(${logoDim}) no-repeat`,
            }}
        >
            <div className="card-body">
                <div className="lg:flex justify-between">
                    <Link to={`/purchase/${productId}`} className="card-title">
                        {productName}
                    </Link>
                    <h2>Order Id: {_id}</h2>
                </div>
                <p>Order Quantity: {quantity}</p>
                <p>Unit Price: $ {productPrice}</p>
                <p>Shipping Address: {address}</p>
                <div className="flex gap-3">
                    {paid ? (
                        <div className="card-actions">
                            {shipped ? (
                                <button className="btn btn-success">
                                    Order Completed{" "}
                                    <IconContext.Provider
                                        value={{
                                            className:
                                                "w-6 h-6 ml-2 text-black",
                                        }}
                                    >
                                        <div>
                                            <FaCheckCircle />
                                        </div>
                                    </IconContext.Provider>
                                </button>
                            ) : (
                                <div className="card-actions">
                                    <button className="btn btn-info">
                                        Pending Shipment
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="card-actions">
                            <button className="btn btn-primary">Pay Now</button>
                            <button
                                className="btn btn-error"
                                onClick={() => handleDeleteOrder(_id)}
                            >
                                Cancel Order
                            </button>
                        </div>
                    )}
                </div>

                <ul className="steps mt-3">
                    <li className="step step-primary">Register</li>
                    <li className="step step-primary">Place Order</li>
                    <li className={paid ? "step step-primary" : "step"}>
                        Payment
                    </li>
                    <li className={shipped ? "step step-primary" : "step"}>
                        Receive Product
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MyOrder;
