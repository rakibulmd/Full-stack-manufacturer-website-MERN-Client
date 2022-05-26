import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../../asset/images/pageNotFound.png";
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto p-5 h-screen">
            <h2 className="text-primary lg:font-bold sm:font-normal text-center md:text-5xl text-3xl my-10">
                Page Not Found!
            </h2>
            <img
                className="max-w-md w-full block mx-auto py-10"
                src={notFound}
                alt=""
            />
            <div className="flex justify-center mt-7">
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                    className="btn btn-primary"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
