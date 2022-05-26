import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
    const { _id, name, img, description, price, moq, stock, rating } = product;
    const navigate = useNavigate();
    return (
        <div className="card bg-slate-600/10 hover:bg-slate-600/20 text-white shadow-3xl">
            <figure className="px-10 pt-10 overflow-hidden">
                <img
                    src={img}
                    alt="Shoes"
                    className="rounded-xl hover:scale-105 transition-all"
                />
            </figure>
            <div className="card-body items-start  text-left">
                <h2 className="card-title text-left">{name}</h2>
                <p>{description}</p>
                <div className="pt-3">
                    <p>
                        MOQ: {moq} Stock: {stock}
                    </p>

                    <p className="">
                        Price:{" "}
                        <span className="font-bold text-xl">$ {price}</span>
                    </p>
                </div>
                <div className="card-actions">
                    <button
                        onClick={() => navigate(`/purchase/${_id}`)}
                        className="btn btn-primary"
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
