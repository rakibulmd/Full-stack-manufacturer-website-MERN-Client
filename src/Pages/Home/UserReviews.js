import axios from "axios";
import React, { useEffect, useState } from "react";

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
        <div>
            <h2>reviews : {reviews?.length}</h2>
        </div>
    );
};

export default UserReviews;
