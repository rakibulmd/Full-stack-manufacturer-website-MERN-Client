import React, { useState } from "react";
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState("");
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
                <button
                    className="btn btn-primary mt-3 btn-sm"
                    type="submit"
                    disabled={!stripe}
                >
                    Pay
                </button>
            </form>
            {paymentError && (
                <p className="text-rose-500 py-2">{paymentError}</p>
            )}
        </>
    );
};

export default CheckoutForm;
