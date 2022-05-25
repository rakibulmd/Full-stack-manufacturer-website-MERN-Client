import React from "react";
import { useQuery } from "react-query";
import Product from "../Home/Product";
import Footer from "../Shared/Footer";
import Loading from "../Shared/Loading";

const AllProducts = () => {
    const {
        data: products,
        isLoading,
        error,
    } = useQuery("products", () =>
        fetch("http://localhost:5000/products").then((res) => res.json())
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
        <div>
            <div className="container mx-auto py-10">
                <h2 className="text-center text-4xl font-bold uppercase pb-5">
                    All Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                    {products?.map((product) => (
                        <Product product={product} key={product._id}></Product>
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AllProducts;
