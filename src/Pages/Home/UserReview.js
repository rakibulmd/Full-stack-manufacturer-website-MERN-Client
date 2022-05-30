import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class Foo extends Component {
    changeRating(newRating, name) {
        this.setState({
            rating: newRating,
        });
    }

    render() {
        return (
            <StarRatings
                rating={this.state.rating}
                starRatedColor="rgb(230, 67, 47)"
                starEmptyColor="rgb(203, 211, 227)"
                changeRating={this.changeRating}
                numberOfStars={5}
                name="rating"
            />
        );
    }
}

const UserReview = ({ review }) => {
    const { name, email, title, details, date, img, rating } = review;
    return (
        <div className="bg-slate-300/10 rounded-xl hover:bg-slate-400/20 relative">
            <div className="p-5">
                <div className="flex justify-between pb-3 border-b-2 border-gray-600 items-center mb-5">
                    <div>
                        <StarRatings
                            rating={rating}
                            starRatedColor="rgb(230, 67, 47)"
                            starEmptyColor="rgb(203, 211, 227)"
                            starDimension="20px"
                            starSpacing="1px"
                        />
                    </div>
                    <p>{date}</p>
                </div>
                <div className="pb-12 mb-5">
                    <h2 className="font-bold py-3">
                        {" "}
                        <cite>{title}</cite>{" "}
                    </h2>
                    <p>
                        {" "}
                        <cite>{details}</cite>{" "}
                    </p>
                </div>
                <div className="flex justify-end items-center px-2 rounded-3xl absolute bottom-1 gap-3 mb-1">
                    <div className="w-16">
                        <img
                            className="rounded-full p-1 border-primary border"
                            src={img}
                            alt=""
                        />
                    </div>

                    <div>
                        <h2 className="text-xl"> - {name}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserReview;
