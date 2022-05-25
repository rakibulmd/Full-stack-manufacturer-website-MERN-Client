import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import Product from "./Product";

const Products = () => {
    const {
        data: products,
        isLoading,
        error,
    } = useQuery("products", () =>
        fetch("http://localhost:5000/products?limit=6").then((res) =>
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
            </div>
        </div>
    );
};

export default Products;
