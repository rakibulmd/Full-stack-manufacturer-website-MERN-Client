import React from "react";
import { Link } from "react-router-dom";
import logoDim from "../../asset/images/logo/logoDim.png";
const MyOrder = ({ order }) => {
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
            class="card w-full bg-primary/10 shadow-xl p-2"
            style={{
                background: `url(${logoDim}) no-repeat`,
            }}
        >
            <div class="card-body">
                <div className="lg:flex justify-between">
                    <Link to={`/purchase/${productId}`} class="card-title">
                        {productName}!
                    </Link>
                    <h2>Order Id: {_id}</h2>
                </div>
                <p>Order Quantity: {quantity}</p>
                <p>Unit Price: $ {productPrice}</p>
                <p>Shipping Address: {address}</p>
                <div className="flex gap-3">
                    {paid ? (
                        <div class="card-actions">
                            <button class="btn btn-success">Paid</button>
                        </div>
                    ) : (
                        <div class="card-actions">
                            <button class="btn btn-primary">Pay Now</button>
                        </div>
                    )}
                    {paid ? (
                        <div class="card-actions">
                            <button class="btn btn-info">
                                Pending Shipment
                            </button>
                        </div>
                    ) : (
                        <div class="card-actions">
                            <button class="btn btn-error">Cancel Order</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOrder;

//http://localhost:3000/purchase/628c81eece30003a7422cae1
//http://localhost:3000/purchase/628cea5f1463f3af4f9d35d7
