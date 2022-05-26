import React, { useEffect, useState } from "react";
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../Shared/Loading";

const CheckoutForm = ({ order }) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState("");
    const [success, setSuccess] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const { productPrice, quantity, name, email, _id } = order;
    const price = productPrice * quantity;
    useEffect(() => {
        const post = async () => {
            const { data } = await axios.post(
                `https://mpt-server.herokuapp.com/create-payment-intent`,
                {
                    price,
                }
            );
            setClientSecret(data?.clientSecret);
        };
        if (price) {
            post();
        }
    }, [price]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        setPaymentError(error?.message || "");
        setSuccess("");

        //confirm
        setPaymentLoading(true);
        const { paymentIntent, error: intentError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            });
        if (intentError) {
            setPaymentError(intentError?.message);
        } else {
            setPaymentError("");
            setTransactionId(paymentIntent.id);
            await axios.put(`https://mpt-server.herokuapp.com/orders/${_id}`, {
                paid: true,
                transactionId: paymentIntent.id,
            });
            setPaymentLoading(false);
            MySwal.fire(
                `"Congrats! Your payment is successful and transaction id is: ${paymentIntent.id}`
            );
            setSuccess("Congrats! Your payment is successful");
            navigate("/dashboard/myOrders");
        }
    };

    return (
        <>
            <form className="p-3" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#000000",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                {paymentLoading ? (
                    <span className="w-8">
                        <Loading></Loading>
                    </span>
                ) : (
                    <button
                        className="btn btn-primary mt-3 btn-sm"
                        type="submit"
                        disabled={!stripe || !clientSecret}
                    >
                        Pay
                    </button>
                )}
            </form>
            {paymentError && (
                <p className="text-rose-500 py-2">{paymentError}</p>
            )}
            {success && transactionId && (
                <p className="text-success py-2">
                    {success} and transaction id is {transactionId}
                </p>
            )}
        </>
    );
};

export default CheckoutForm;
