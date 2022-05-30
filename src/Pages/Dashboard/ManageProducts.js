import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { signOut } from "firebase/auth";
import Loading from "../Shared/Loading";

const ManageProducts = () => {
    const [user] = useAuthState(auth);
    const [products, setProducts] = useState(null);
    const MySwal = withReactContent(Swal);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                "https://mpt-server.herokuapp.com/products"
            );
            setProducts(data);
        };
        get();
    }, [updated]);
    const handleDeleteBtn = async (id) => {
        MySwal.fire({
            title: "Are you sure?",
            text: `Delete ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axios.delete(
                        `https://mpt-server.herokuapp.com/products/delete/${id}?email=${user?.email}`
                    );
                    if (data.deletedCount) {
                        setUpdated(!updated);
                        MySwal.fire(
                            "Deleted!",

                            "success"
                        );
                    }
                } catch (error) {
                    if (
                        error.response.status === 401 ||
                        error.response.status === 403
                    ) {
                        signOut(auth);
                        localStorage.removeItem("accessToken");
                        return;
                    }
                }
            }
        });
    };
    if (!products) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-40 h-40 mx-auto">
                    <Loading></Loading>
                </div>
            </div>
        );
    }
    return (
        <div>
            <h2 className="text-3xl text-center py-5">Manage Products</h2>
            <div>
                <div className="overflow-x-auto p-3">
                    <table className="table table-zebra w-full text-black">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <!-- row 1 --> */}

                            {products.map((product, index) => (
                                <tr key={product._id} product={product}>
                                    <th>{index + 1}</th>
                                    <td>{product?.name}</td>
                                    <td>{product?.stock}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mr-2">
                                            Manage
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteBtn(product?._id)
                                            }
                                            className="btn btn-error btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
