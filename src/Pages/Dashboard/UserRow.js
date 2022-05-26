import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UserRow = ({ rowUser, updated, setUpdated }) => {
    const { img, role, email, name } = rowUser;
    const [user] = useAuthState(auth);
    const MySwal = withReactContent(Swal);
    const handleAdminBtn = async (userEmail) => {
        MySwal.fire({
            title: "Are you sure?",
            text: `Make admin ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.put(
                        `https://mpt-server.herokuapp.com/users/admin?email=${user.email}`,
                        {
                            email: userEmail,
                        }
                    );
                    if (response.data.modifiedCount) {
                        setUpdated(!updated);
                        MySwal.fire("Success!");
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
            }
        });
    };

    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={img} alt="user" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">
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
                    className="btn btn-warning"
                    disabled={role === "admin"}
                >
                    Make Admin
                </button>
            </th>
        </tr>
    );
};

export default UserRow;
