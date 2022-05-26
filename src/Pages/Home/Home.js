import React from "react";
import Footer from "../Shared/Footer";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";
import Feature from "./Feature";
import Newsletter from "./Newsletter";
import Products from "./Products";
import UserReviews from "./UserReviews";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Feature></Feature>
            <Products></Products>
            <BusinessSummary></BusinessSummary>
            <UserReviews></UserReviews>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
};

export default Home;
