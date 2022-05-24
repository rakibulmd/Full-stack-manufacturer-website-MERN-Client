import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const Purchase = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();

    const {
        data: product,
        isLoading,
        error,
    } = useQuery(["products", id, user], () =>
        fetch(`http://localhost:5000/products/${id}`).then((res) => res.json())
    );
    const [orderQuantity, setOrderQuantity] = useState(product?.moq);
    const increaseOrderQuantity = (event) => {
        event.preventDefault();
        setOrderQuantity(orderQuantity + 1);
        reset({
            data: "quantity",
        });
    };
    const decreaseOrderQuantity = (event) => {
        event.preventDefault();
        setOrderQuantity(orderQuantity - 1);
        reset({
            data: "quantity",
        });
    };
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const onSubmit = (purchaseData) => {
        console.log(purchaseData);
    };
    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <div className="w-40 h-40 mx-auto">
                    <Loading></Loading>
                </div>
            </div>
        );
    }
    return (
        <div className="container mx-auto p-5">
            <div className="md:flex items-center justify-center gap-10">
                <div className="p-3 bg-base-100 rounded-xl mb-3">
                    <img
                        className="max-w-[220px] max-h-[280px] rounded-xl w-full mx-auto"
                        src={product?.img}
                        alt=""
                    />
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-xl">Name: {product?.name}</h2>
                    <p>id: {product?._id}</p>
                    <p>MOQ: {product?.moq}</p>
                    <p>Stock: {product?.stock}</p>
                    <p>Description: {product?.description}</p>
                    <p>Price: {product?.price}</p>
                    <p className="pb-3">Rating: {product?.rating}</p>
                </div>
            </div>
            <h2 className="text-3xl text-center mt-5">
                Please fill out this form to Purchase
            </h2>
            <div className="max-w-[500px] mx-auto py-10 px-2">
                <div className="p-5 bg-white rounded-md border border-gray-700">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-secondary"
                            >
                                Name:
                            </label>
                            <input
                                className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                value={user?.displayName}
                                id="name"
                                readOnly
                                autoComplete="off"
                                {...register("name")}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-secondary"
                            >
                                Email:
                            </label>
                            <input
                                className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                type="email"
                                id="email"
                                value={user?.email}
                                readOnly
                                autoComplete="off"
                                {...register("email")}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-medium text-secondary"
                            >
                                Phone:
                            </label>
                            <input
                                className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                type="tel"
                                placeholder="Phone"
                                autoComplete="off"
                                {...register("phone", {
                                    required: true,
                                    minLength: 5,
                                })}
                            />
                            {errors?.phone?.type === "required" && (
                                <span className="text-rose-600">
                                    Phone no is required.
                                </span>
                            )}
                            {errors?.phone?.type === "minLength" && (
                                <span className="text-rose-600">
                                    Please provide valid phone no.
                                </span>
                            )}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-secondary"
                            >
                                Shipping Address:
                            </label>
                            <input
                                className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                type="text"
                                placeholder="Address"
                                autoComplete="off"
                                {...register("address", {
                                    required: true,
                                    minLength: 10,
                                })}
                            />
                            {errors?.address?.type === "required" && (
                                <span className="text-rose-600">
                                    Address is required.
                                </span>
                            )}
                            {errors?.address?.type === "minLength" && (
                                <span className="text-rose-600">
                                    Please provide detailed address.
                                </span>
                            )}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="quantity"
                                className="block mb-2 text-sm font-medium text-secondary"
                            >
                                Quantity:
                            </label>
                            <div className="flex w-full justify-start gap-2">
                                <button
                                    onClick={decreaseOrderQuantity}
                                    className="btn btn-error"
                                >
                                    -
                                </button>
                                <input
                                    className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md w-20 p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                    type="number"
                                    defaultValue={orderQuantity}
                                    autoComplete="off"
                                    {...register("quantity", {
                                        required: true,
                                        min: `${product?.moq}`,
                                        max: `${product?.stock}`,
                                    })}
                                />
                                <button
                                    onClick={increaseOrderQuantity}
                                    className="btn btn-success"
                                >
                                    +
                                </button>
                            </div>
                            {errors?.quantity?.type === "required" && (
                                <span className="text-rose-600">
                                    Quantity is required.
                                </span>
                            )}
                            {errors?.quantity?.type === "min" && (
                                <span className="text-rose-600">
                                    {`Minimum Oder Quantity is ${product?.moq}`}
                                </span>
                            )}
                            {errors?.quantity?.type === "max" && (
                                <span className="text-rose-600">
                                    {`Maximum Oder Quantity is ${product?.stock}`}
                                </span>
                            )}
                        </div>

                        <input
                            className="w-full bg-primary hover:bg-secondary hover:text-primary px-5 py-2 rounded-md text-secondary transition-all"
                            type="submit"
                            value="Purchase"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Purchase;
