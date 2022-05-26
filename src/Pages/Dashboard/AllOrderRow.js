import axios from "axios";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const AllOrderRow = ({ order, orderUpdated, setOrderUpdated }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const {
        _id,
        name,
        email,
        address,
        quantity,
        paid,
        productPrice,
        productName,
        productId,
    } = order;
    const handleShipment = async (productId, orderId) => {
        MySwal.fire({
            title: "Are you sure?",
            text: `Deliver: ${productName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm shipment!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.put(
                        `https://mpt-server.herokuapp.com/products/${productId}?email=${user?.email}&quantity=${quantity}`
                    );
                    if (response?.data?.modifiedCount) {
                        setOrderUpdated(!orderUpdated);
                        await axios.put(
                            `https://mpt-server.herokuapp.com/orders/${orderId}`,
                            {
                                shipped: true,
                            }
                        );
                        MySwal.fire(
                            "Shipped!",
                            "Order completed successfully.",
                            "success"
                        );
                    }
                } catch (error) {
                    if (error.response.status === 406) {
                        toast.error("Insufficient Stock to shipment!");
                    } else if (
                        error.response.status === 401 ||
                        error.response.status === 403
                    ) {
                        navigate("/login");
                        signOut(auth);
                        localStorage.removeItem("accessToken");
                        return;
                    }
                }
            }
        });
    };
    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await axios.delete(
                `https://mpt-server.herokuapp.com/orders/${orderId}?email=${user?.email}`
            );
            if (response?.data?.deletedCount) {
                setOrderUpdated(!orderUpdated);
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
            className="card w-full shadow-3xl bg-slate-600/20"
            // style={{
            //     background: `url(${logoDim}) no-repeat`,
            // }}
        >
            <div className="card-body">
                <div className="lg:flex justify-between">
                    <Link
                        to={`/purchase/${productId}`}
                        className="card-title underline"
                    >
                        {productName}
                    </Link>
                    <div>
                        <h2>Order Id: {_id}</h2>
                        {order?.transactionId && (
                            <h2>TXN Id: {order?.transactionId}</h2>
                        )}
                    </div>
                </div>
                <p className="font-bold pb-3">
                    Order by: {name}({email})
                </p>
                <p>Order Quantity: {quantity}</p>
                <p>Unit Price: $ {productPrice}</p>
                <p>Shipping Address: {address}</p>
                <div className="flex gap-3">
                    {paid ? (
                        <div className="card-actions">
                            {order?.shipped ? (
                                <button className="btn btn-disabled  text-white">
                                    Shipped
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleShipment(productId, _id);
                                    }}
                                    className="btn btn-success"
                                >
                                    Pending Shipment
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="card-actions">
                            <button className="btn btn-primary">UnPaid</button>
                        </div>
                    )}

                    {(order?.shipped || !paid) && (
                        <div className="card-actions">
                            <button
                                className="btn btn-error"
                                onClick={() => {
                                    handleDeleteOrder(_id);
                                }}
                            >
                                Delete Order
                            </button>
                        </div>
                    )}
                </div>

                <ul className="steps mt-3">
                    <li className="step step-primary">Ordered</li>
                    <li className={paid ? "step step-primary" : "step"}>
                        Paid
                    </li>
                    <li
                        className={
                            order?.shipped ? "step step-primary" : "step"
                        }
                    >
                        Shipped
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AllOrderRow;
