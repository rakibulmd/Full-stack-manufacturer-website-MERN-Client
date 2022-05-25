import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AllProducts from "./Pages/AllProducts/AllProducts";
import Blogs from "./Pages/Blogs/Blogs";
import AddProduct from "./Pages/Dashboard/AddProduct";
import AllOrders from "./Pages/Dashboard/AllOrders";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyOrders from "./Pages/Dashboard/MyOrders";
import MyProfile from "./Pages/Dashboard/MyProfile";
import MyReview from "./Pages/Dashboard/MyReview";
import Users from "./Pages/Dashboard/Users";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import RequireAdmin from "./Pages/Login/RequireAdmin";
import RequireAuth from "./Pages/Login/RequireAuth";
import Purchase from "./Pages/Purchase/Purchase";
import Header from "./Pages/Shared/Header";

function App() {
    return (
        <div className="font-roboto bg-secondary text-white">
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route
                    path="/allProducts"
                    element={<AllProducts></AllProducts>}
                ></Route>
                <Route
                    path="/dashboard"
                    element={
                        <RequireAuth>
                            <Dashboard></Dashboard>
                        </RequireAuth>
                    }
                >
                    <Route index element={<MyProfile></MyProfile>}></Route>
                    <Route
                        path="myOrders"
                        element={<MyOrders></MyOrders>}
                    ></Route>
                    <Route
                        path="myReviews"
                        element={<MyReview></MyReview>}
                    ></Route>
                    <Route
                        path="users"
                        element={
                            <RequireAdmin>
                                <Users></Users>
                            </RequireAdmin>
                        }
                    ></Route>
                    <Route
                        path="allOrders"
                        element={
                            <RequireAdmin>
                                <AllOrders></AllOrders>
                            </RequireAdmin>
                        }
                    ></Route>
                    <Route
                        path="addProduct"
                        element={
                            <RequireAdmin>
                                <AddProduct></AddProduct>
                            </RequireAdmin>
                        }
                    ></Route>
                </Route>
                <Route
                    path="/purchase/:id"
                    element={
                        <RequireAuth>
                            <Purchase></Purchase>
                        </RequireAuth>
                    }
                ></Route>
                <Route
                    path="/blogs"
                    element={
                        <RequireAuth>
                            <Blogs></Blogs>
                        </RequireAuth>
                    }
                ></Route>
            </Routes>

            <ToastContainer
                position="top-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
