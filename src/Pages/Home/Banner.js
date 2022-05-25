import React from "react";
import { Link } from "react-router-dom";
import background from "../../asset/images/bg.png";

const Banner = () => {
    return (
        <div
            className=""
            style={{
                background: `url(${background}) no-repeat center center/cover`,
            }}
        >
            <div className="w-100 h-screen flex items-center container mx-auto">
                <div className="text-white p-5">
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
        </div>
    );
};

export default Banner;
