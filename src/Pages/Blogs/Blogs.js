import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Shared/Loading";
import Blog from "./Blog";

const Blogs = () => {
    const [questionAndAnswers, setQuestionAndAnswers] = useState(null);
    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                "https://mpt-server.herokuapp.com/qna"
            );
            setQuestionAndAnswers(data);
        };
        get();
    }, []);
    if (!questionAndAnswers) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-40 h-40 mx-auto">
                    <Loading></Loading>
                </div>
            </div>
        );
    }
    return (
        <div className="container mx-auto py-10 bg-secondary">
            <h2 className="text-3xl font-bold text-center pb-5">QnAs</h2>
            {questionAndAnswers.map((item) => (
                <Blog key={item._id} item={item}></Blog>
            ))}
        </div>
    );
};

export default Blogs;
