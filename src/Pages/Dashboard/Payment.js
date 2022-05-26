import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";
import { loadStripe } from "@stripe/stripe-js";
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
    "pk_test_51L3ZZoAHflLsjugiyAbjz8KKnCRishJVdB0A9A57fGeoW5hh8uDbPqggBmYnUUOP50WKAloJcLpYd8fH3Rq7Uqni00H61so74Y"
);

const Payment = () => {
    const [user] = useAuthState(auth);
    const { orderId } = useParams();
    const [order, setOrder] = useState({});
    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                `https://mpt-server.herokuapp.com/order/${orderId}?email=${user?.email}`
            );
            setOrder(data);
        };
        get();
    }, [orderId, user]);
    return (
        <div className="bg-slate-300/10 rounded-xl max-w-sm w-full mx-auto mt-7 hover:bg-slate-400/20">
            <div className="p-5">
                <h2 className="text-2xl font-bold text-primary text-center">
                    Hello {order?.name}
                </h2>
                <h2 className="text-xl font-bold text-center pb-5">
                    Please Pay for {order?.productName}
                </h2>
                <div className="text-center">
                    <p className="font-bold py-3">Order Information:</p>
                    <p>Order Quantity: {order?.quantity}</p>
                    <p>Unit Price: {order?.productPrice}</p>
                    <p>
                        Payable Amount: ${" "}
                        {order?.productPrice * order?.quantity}
                    </p>
                </div>
                <div className="py-5 bg-white/75 mt-5 rounded-lg text-black">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;

// address: "Dakhin Salna, Salna Bazar, Gazipur"
// data: "quantity"
// email: "demo1@demo.com"
// name: "demo 1"
// paid: false
// phone: "+8801790660669"
// productId: "628e11d0fe47a41a14fb18a0"
// productName: "Fingerprint Sensor"
// productPrice: 12
// quantity: 51
// _id: "628ecd9441142d52ecf1ad19"
