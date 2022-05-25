import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [isAdmin] = useAdmin(user);
    console.log("checking admin ", isAdmin);
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                {/* <!-- Page content here --> */}
                <div className="flex lg:block justify-between items-center ">
                    {/* <label for="my-drawer-2" class="btn btn-primary lg:hidden">
                        Open drawer
                    </label>{" "} */}

                    <label
                        tabIndex="1"
                        for="my-drawer-2"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                </div>
                <Outlet></Outlet>
            </div>
            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay"></label>

                <ul class="menu p-4 overflow-y-auto w-44 bg-slate-900 lg:bg-slate-400/10">
                    {/* <!-- Sidebar content here --> */}
                    <h2 className="lg:text-center text-2xl mb-7 uppercase">
                        Dashboard
                    </h2>
                    <li className="mb-3">
                        <Link
                            className="btn btn-primary text-black"
                            to="/dashboard"
                        >
                            My Profile
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link
                            className="btn btn-primary text-black"
                            to="/dashboard/myOrders"
                        >
                            My Orders
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link
                            className="btn btn-primary text-black"
                            to="/dashboard/myReviews"
                        >
                            My Review
                        </Link>
                    </li>

                    {isAdmin && (
                        <>
                            <li className="mb-3">
                                <Link
                                    className="btn btn-primary text-black"
                                    to="/dashboard/users"
                                >
                                    Manage Users
                                </Link>
                            </li>
                            <li className="mb-3">
                                <Link
                                    className="btn btn-primary text-black"
                                    to="/dashboard/allOrders"
                                >
                                    All Orders
                                </Link>
                            </li>
                            <li className="mb-3">
                                <Link
                                    className="btn btn-primary text-black"
                                    to="/dashboard/addProduct"
                                >
                                    Add Product
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
