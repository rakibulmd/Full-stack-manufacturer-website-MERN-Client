import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { Rating } from "react-simple-star-rating";
import Loading from "../Shared/Loading";
import UserReview from "../Home/UserReview";

const MyReview = () => {
    const [user] = useAuthState(auth);
    const [rating, setRating] = useState(80);
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updated, setUpdated] = useState(false);
    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                `http://localhost:5000/myReview?email=${user?.email}`
            );
            setReview(data);
            setLoading(false);
        };
        get();
    }, [user, updated]);
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const handleRating = (rate) => {
        setRating(rate);
    };
    const onSubmit = async (reviewData) => {
        reviewData.date = new Date()
            .toString()
            .split(" ")
            .splice(1, 3)
            .join(" ");
        const { data } = await axios.get(
            `http://localhost:5000/user?email=${user?.email}`
        );
        reviewData.img = data.img;
        reviewData.rating = rating / 20;

        const response = await axios.put(
            `http://localhost:5000/review?email=${user?.email}`,
            reviewData
        );
        if (response?.data?.acknowledged) {
            toast.success("Review Posted!");
            reset();
            setUpdated(!updated);
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div className="w-40 h-40 mx-auto">
                    <Loading></Loading>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            {review ? (
                <div className="max-w-md w-full mx-auto my-10 p-3">
                    <UserReview review={review}></UserReview>
                </div>
            ) : (
                <div>
                    <h2 className="text-3xl font-bold text-center py-5">
                        My Review
                    </h2>

                    <div className="max-w-[500px] mx-auto px-2">
                        <div className="p-5 bg-white rounded-md border border-gray-700">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-5">
                                    <input
                                        className="py-2 border-b-2 border-gray-400 focus:border-green-400 text-black placeholder-gray-400 outline-none"
                                        value={user?.displayName}
                                        id="name"
                                        readOnly
                                        autoComplete="off"
                                        {...register("name")}
                                    />
                                </div>
                                <div className="mb-5">
                                    <input
                                        className="w-3/4 py-2 border-b-2 border-gray-400 focus:border-green-400 text-black placeholder-gray-400 outline-none"
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
                                        className="block text-md font-medium text-secondary"
                                    >
                                        Review Title
                                    </label>
                                    <input
                                        className="w-full border-b-2 border-gray-400 focus:border-green-400 text-black placeholder-gray-400 outline-none"
                                        type="text"
                                        placeholder="Review title...."
                                        autoComplete="off"
                                        {...register("title", {
                                            required: true,
                                            minLength: 3,
                                        })}
                                    />
                                    {errors?.title?.type === "required" && (
                                        <span className="text-rose-600">
                                            Title is required.
                                        </span>
                                    )}
                                    {errors?.title?.type === "minLength" && (
                                        <span className="text-rose-600">
                                            Please provide some words.
                                        </span>
                                    )}
                                </div>
                                <div className="mb-5">
                                    <label
                                        htmlFor="address"
                                        className="block text-md font-medium text-secondary"
                                    >
                                        Review details:
                                    </label>
                                    <textarea
                                        className="w-full  border-b-2 border-gray-400 focus:border-green-400 text-black placeholder-gray-400 outline-none"
                                        type="text"
                                        placeholder="Review details......."
                                        autoComplete="off"
                                        {...register("details", {
                                            required: true,
                                            minLength: 10,
                                        })}
                                    />
                                    {errors?.details?.type === "required" && (
                                        <span className="text-rose-600">
                                            Details is required.
                                        </span>
                                    )}
                                    {errors?.details?.type === "minLength" && (
                                        <span className="text-rose-600">
                                            Please provide detailed review.
                                        </span>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <div className="flex justify-center">
                                        <Rating
                                            onClick={handleRating}
                                            ratingValue={rating}
                                        />
                                    </div>
                                    <h2 className="font-bold text-center mb-5">
                                        Set the rating from 1 to 5
                                    </h2>
                                </div>
                                <input
                                    className="w-full bg-primary hover:bg-secondary hover:text-primary px-5 py-2 rounded-md text-secondary transition-all btn btn-primary"
                                    type="submit"
                                    value="Post Review"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReview;
