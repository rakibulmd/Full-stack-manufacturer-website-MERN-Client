import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../../asset/images/logo/logo.png";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

const Header = () => {
    const [user] = useAuthState(auth);
    function CustomLink({ children, to, ...props }) {
        let resolved = useResolvedPath(to);
        let match = useMatch({ path: resolved.pathname, end: true });

        return (
            <div>
                <Link
                    style={{
                        borderBottom: match ? "2px solid #f7c02d" : "",
                    }}
                    to={to}
                    {...props}
                >
                    {children}
                </Link>
            </div>
        );
    }
    const navItems = (
        <>
            <li className="font-bold hover:text-primary">
                <CustomLink to="/">Home</CustomLink>
            </li>
            <li className="font-bold hover:text-primary">
                <CustomLink to="/products">Products</CustomLink>
            </li>
            <li className="font-bold hover:text-primary">
                <CustomLink to="/slot">Slot</CustomLink>
            </li>
            {user && (
                <li className="font-bold hover:text-primary">
                    <CustomLink to="/dashboard">Dashboard</CustomLink>
                </li>
            )}
            <li className="font-bold hover:text-primary">
                <CustomLink to="/blogs">Blogs</CustomLink>
            </li>
        </>
    );
    return (
        <div className=" bg-secondary/75 text-white sticky top-0">
            <div className="container mx-auto">
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label
                                tabIndex="0"
                                className="btn btn-ghost lg:hidden"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
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
                            <ul
                                tabIndex="0"
                                className="menu menu-compact dropdown-content mt-3 p-2 w-40 shadow bg-secondary rounded-box text-white"
                            >
                                {navItems}
                            </ul>
                        </div>
                        <Link
                            to="/"
                            className="btn btn-ghost normal-case text-xl"
                        >
                            {" "}
                            <img className="w-8 h-6" src={logo} alt="" />
                            MPT
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">{navItems}</ul>
                    </div>
                    <div className="navbar-end">
                        {user ? (
                            <button
                                onClick={() => {
                                    signOut(auth);
                                }}
                                className="btn btn-primary text-black"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="btn btn-primary text-black"
                            >
                                Log In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
