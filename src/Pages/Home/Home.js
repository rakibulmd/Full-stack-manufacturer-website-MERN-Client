import React from "react";
import Footer from "../Shared/Footer";
import Statusbar from "../Shared/Statusbar";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";
import Feature from "./Feature";
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
            <Footer></Footer>
        </div>
    );
};

export default Home;
