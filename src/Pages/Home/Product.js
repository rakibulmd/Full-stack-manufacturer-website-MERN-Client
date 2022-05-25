import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
    const { _id, name, img, description, price, moq, stock, rating } = product;
    const navigate = useNavigate();
    return (
        <div class="card bg-slate-600/10 text-white shadow-3xl">
            <figure class="px-10 pt-10">
                <img src={img} alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-start  text-left">
                <h2 class="card-title text-left">{name}</h2>
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
                <div class="card-actions">
                    <button
                        onClick={() => navigate(`/purchase/${_id}`)}
                        class="btn btn-primary"
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
