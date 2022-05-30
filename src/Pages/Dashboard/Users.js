import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import UserRow from "./UserRow";

const Users = () => {
    const [user] = useAuthState(auth);
    const [users, setUsers] = useState(null);
    const [updated, setUpdated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `https://mpt-server.herokuapp.com/users?email=${user?.email}`
                );

                setUsers(response?.data);
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
    }, [navigate, user, updated]);
    if (!users) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-40 h-40 mx-auto">
                    <Loading></Loading>
                </div>
            </div>
        );
    }

    return (
        <div className="p-3">
            <h2 className="text-3xl font-bold text-center py-5">Manage User</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full text-black">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <UserRow
                                key={user._id}
                                rowUser={user}
                                updated={updated}
                                setUpdated={setUpdated}
                            ></UserRow>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin Status</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Users;
