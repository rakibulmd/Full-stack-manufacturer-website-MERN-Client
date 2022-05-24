import React from "react";

const Product = ({ product }) => {
    const { name, img, description, price, moq, stock, rating } = product;
    return (
        <div class="card bg-base-100 shadow-xl">
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
                    <p>Rating: {rating}</p>
                    <p>Price: {price}</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
