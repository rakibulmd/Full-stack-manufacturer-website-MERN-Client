import React from "react";
import Footer from "../Shared/Footer";
import Banner from "./Banner";
import Products from "./Products";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <Footer></Footer>
        </div>
    );
};

export default Home;
