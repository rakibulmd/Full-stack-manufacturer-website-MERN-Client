import axios from "axios";
import React, { useEffect, useState } from "react";
import UserReview from "./UserReview";

const UserReviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                `http://localhost:5000/reviews?limit=6`
            );
            setReviews(data);
        };
        get();
    }, []);
    return (
        <div className="container mx-auto p-5 py-12 mt-5">
            <h2 className="text-center text-4xl font-bold pb-5 uppercase">
                Customers Review
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <UserReview key={review._id} review={review}></UserReview>
                ))}
            </div>
        </div>
    );
};

export default UserReviews;
