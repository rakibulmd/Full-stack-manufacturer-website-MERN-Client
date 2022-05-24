import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const Users = () => {
    const [user] = useAuthState(auth);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/users?email=${user?.email}`
                );

                setUsers(response?.data);
                console.log(response.data);
            } catch (error) {
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                ) {
                    navigate("/login");
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                    return;
                }
            }
        };
        getData();
    }, [navigate, user]);

    return (
        <div>
            <h2>Users : {users.length}</h2>
            <div class="overflow-x-auto w-full">
                <table class="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <div class="flex items-center space-x-3">
                                        <div class="avatar">
                                            <div class="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={user?.img}
                                                    alt="user"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">
                                                {user?.name
                                                    ? user?.name
                                                    : "Login to update"}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user?.email}</td>
                                <td>{user?.isAdmin && "Admin"}</td>
                                <th>
                                    <button
                                        class="btn btn-warning"
                                        disabled={user?.isAdmin}
                                    >
                                        Make Admin
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Users;
