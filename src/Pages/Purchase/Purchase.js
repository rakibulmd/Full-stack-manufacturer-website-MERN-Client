import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import useAdmin from "../../Hooks/useAdmin";
import Loading from "../Shared/Loading";

const Purchase = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const [isAdmin] = useAdmin(user);

    const [product, setProduct] = useState({});
    useEffect(() => {
        const get = async () => {
            const response = await axios.get(
                `http://localhost:5000/products/${id}`
            );
            setProduct(response.data);
        };
        get();
    }, [id, user]);
    const [orderQuantity, setOrderQuantity] = useState(product?.moq);
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();
    useEffect(() => {
        setOrderQuantity(product?.moq);
    }, [product, user, id]);
    const increaseOrderQuantity = (event) => {
        event.preventDefault();
        setOrderQuantity(parseInt(orderQuantity) + 1);
        reset({
            data: "quantity",
        });
    };
    const decreaseOrderQuantity = (event) => {
        event.preventDefault();
        setOrderQuantity(parseInt(orderQuantity) - 1);
        reset({
            data: "quantity",
        });
    };
    const onSubmit = async (purchaseData) => {
        purchaseData.paid = false;
        purchaseData.quantity = parseInt(purchaseData.quantity);
        purchaseData.productName = product.name;
        purchaseData.productId = product._id;
        purchaseData.productPrice = product.price;
        console.log(purchaseData);
        const response = await axios.post(
            "http://localhost:5000/orders",
            purchaseData
        );

        if (response?.data?.insertedId) {
            toast.success("Order placed successfully");
            reset();
        }
    };

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
                    <h2 className="text-xl font-bold">Name: {product?.name}</h2>
                    <p>id: {product?._id}</p>
                    <p className="mb-5">Description: {product?.description}</p>
                    <p>MOQ: {product?.moq}</p>
                    <p>Stock: {product?.stock}</p>

                    <p className="text-xl">Price: $ {product?.price}</p>
                </div>
            </div>
            <h2 className="text-3xl text-center mt-5">
                Please fill out this form to Purchase
            </h2>
            <div className="max-w-[500px] mx-auto py-10 px-2">
                <div className="p-5 bg-slate-600/30 rounded-md border border-gray-700">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium "
                            >
                                Name:
                            </label>
                            <input
                                className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                value={user?.displayName}
                                id="name"
                                readOnly
                                disabled
                                autoComplete="off"
                                {...register("name")}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium "
                            >
                                Email:
                            </label>
                            <input
                                className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                type="email"
                                id="email"
                                disabled
                                value={user?.email}
                                readOnly
                                autoComplete="off"
                                {...register("email")}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-medium "
                            >
                                Phone:
                            </label>
                            <input
                                className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/50 text-black  border-secondary"
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
                                className="block mb-2 text-sm font-medium "
                            >
                                Shipping Address:
                            </label>
                            <input
                                className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/50 text-black  border-secondary"
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
                                className="block mb-2 text-sm font-medium "
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
                            className="w-full px-5 py-2 rounded-md  transition-all btn btn-primary text-black"
                            disabled={errors.quantity}
                            type="submit"
                            value="Order Now"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Purchase;
