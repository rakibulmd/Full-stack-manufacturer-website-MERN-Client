import React from "react";
import { Link } from "react-router-dom";
import background from "../../asset/images/bg.png";

const Banner = () => {
    return (
        <div
            className="w-screen h-screen flex items-center"
            style={{
                background: `url(${background}) no-repeat center center/cover`,
            }}
        >
            <div className="text-white container p-5 mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold">
                    Global Standards in
                </h2>
                <h2 className="text-3xl md:text-5xl font-bold">
                    Manufacturing Technology
                </h2>
                <div className="pt-5">
                    <Link
                        className="btn btn-outline text-primary mr-3 hover:bg-primary hover:text-black"
                        to="/about"
                    >
                        About Us
                    </Link>
                    <Link className="btn btn-primary " to="/products">
                        Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
