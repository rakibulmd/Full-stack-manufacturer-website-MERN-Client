import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IconContext } from "react-icons";

const UserRow = ({ user }) => {
    const handleAdminBtn = (userEmail, updated, setUpdated) => {
        console.log(userEmail);
        setUpdated(!updated);
    };
    return (
        <tr>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src={user?.img} alt="user" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">
                            {user?.name ? user?.name : "Login to update"}
                        </div>
                    </div>
                </div>
            </td>
            <td>{user?.email}</td>
            <td>
                {user?.role === "admin" ? (
                    <IconContext.Provider
                        value={{
                            className: "w-6 h-6",
                            color: "green",
                        }}
                    >
                        <div>
                            <FaCheckCircle />
                        </div>
                    </IconContext.Provider>
                ) : (
                    <IconContext.Provider
                        value={{
                            className: "w-6 h-6",
                        }}
                    >
                        <div>
                            <FaTimesCircle />
                        </div>
                    </IconContext.Provider>
                )}
            </td>
            <th>
                <button
                    onClick={() => {
                        handleAdminBtn(user.email);
                    }}
                    class="btn btn-warning"
                    disabled={user?.role === "admin"}
                >
                    Make Admin
                </button>
            </th>
        </tr>
    );
};

export default UserRow;
