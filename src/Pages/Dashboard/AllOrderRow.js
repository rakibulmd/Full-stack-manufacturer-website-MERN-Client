import React from "react";
import { Link } from "react-router-dom";
import logoDim from "../../asset/images/logo/logoDim.png";
const AllOrderRow = ({ order }) => {
    const {
        _id,
        address,
        quantity,
        paid,
        productPrice,
        productName,
        productId,
    } = order;
    return (
        <div
            className="card w-full p-3 shadow-3xl"
            style={{
                background: `url(${logoDim}) no-repeat`,
            }}
        >
            <div className="card-bod">
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
                            <button className="btn btn-success">
                                Pending Shipment
                            </button>
                        </div>
                    ) : (
                        <div className="card-actions">
                            <button className="btn btn-primary">UnPaid</button>
                        </div>
                    )}

                    {(order?.shipped || !paid) && (
                        <div className="card-actions">
                            <button className="btn btn-error">
                                Delete Order
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
                    <li className={paid ? "step step-primary" : "step"}>
                        Receive Product
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AllOrderRow;
