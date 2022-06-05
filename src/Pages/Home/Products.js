import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import Product from "./Product";
import { FaArrowRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const navigate = useNavigate();
    const {
        data: products,
        isLoading,
        error,
    } = useQuery("products", () =>
        fetch("https://mpt-server.herokuapp.com/products?limit=6").then((res) =>
            res.json()
        )
    );
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
        <div className="bg-secondary">
            <div className="container mx-auto py-10">
                <h2 className="text-center text-4xl text-white uppercase font-bold pb-5">
                    Latest Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                    {products?.map((product) => (
                        <Product product={product} key={product._id}></Product>
                    ))}
                </div>
                <div className="flex justify-center items-center mt-10 mb-20">
                    <button
                        onClick={() => {
                            navigate("/allProducts");
                        }}
                        className="btn btn-primary px-10 text-xl"
                    >
                        All Products{" "}
                        <IconContext.Provider
                            value={{
                                className: "w-6 h-6 ml-2 text-black",
                            }}
                        >
                            <div>
                                <FaArrowRight />
                            </div>
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Products;
