import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const UserRow = ({ rowUser, updated, setUpdated }) => {
    const { img, role, email, name } = rowUser;
    const [user] = useAuthState(auth);
    const handleAdminBtn = async (userEmail) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/users/admin?email=${user.email}`,
                {
                    email: userEmail,
                }
            );
            if (response.data.modifiedCount) {
                setUpdated(!updated);
                toast.success("Successfully added as Admin");
            }
        } catch (error) {
            if (
                error.response.status === 401 ||
                error.response.status === 403
            ) {
                toast.error("Unauthorized!");
                return;
            }
        }
    };

    return (
        <tr>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src={img} alt="user" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">
                            {name ? name : "Login to update"}
                        </div>
                    </div>
                </div>
            </td>
            <td>{email}</td>
            <td>
                {role === "admin" ? (
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
                        handleAdminBtn(email);
                    }}
                    class="btn btn-warning"
                    disabled={role === "admin"}
                >
                    Make Admin
                </button>
            </th>
        </tr>
    );
};

export default UserRow;
