import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import logoDim from "../../asset/images/logo/logoDim.png";
import axios from "axios";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();
    const imgBBKey = "ef3f2d60caa94b223266f9efbfea12b8";
    const onSubmit = async (data) => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    data.img = result.data.url;
                    data.stock = parseInt(data.stock);
                    data.price = parseInt(data.price);
                    data.moq = parseInt(data.moq);
                    console.log(data);
                    try {
                        const post = async () => {
                            const response = await axios.post(
                                `http://localhost:5000/addProduct?email=${user?.email}`,
                                data
                            );
                            if (response?.data.insertedId) {
                                toast.success("Item added successfully");
                                reset();
                            }
                        };
                        post();
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
                }
            });

        // reset();
    };

    return (
        <div
            className="container mx-auto"
            style={{
                background: `url(${logoDim}) no-repeat center center/cover`,
            }}
        >
            <h2 className="text-2xl font-bold uppercase pt-10 text-center">
                Add A Product
            </h2>
            <div className="max-w-[500px] mx-auto py-5">
                <form
                    className="p-5 bg-darkbg rounded-md border border-emerald-500 animate__animated animate__fadeInUp animate__faster"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-7">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-secondary"
                        >
                            Product Name:
                        </label>
                        <input
                            id="name"
                            className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                            placeholder="eg: Light sensor"
                            type="text"
                            autoComplete="off"
                            {...register("name", {
                                minLength: 3,
                                required: true,
                            })}
                        />
                        {errors.name && (
                            <span className="text-rose-600">
                                Minimum 3 letters
                            </span>
                        )}
                    </div>
                    {/* <div className="mb-7">
                        <label
                            htmlFor="img"
                            className="block mb-2 text-sm font-medium text-secondary"
                        >
                            Image URL:
                        </label>
                        <input
                            id="img"
                            className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                            placeholder="eg: https://i.ibb.co/fnkyFJg/btmark.png"
                            type="url"
                            autoComplete="off"
                            {...register("img", { required: true })}
                        />
                        {errors.img && (
                            <span className="text-rose-600">
                                URL is required.
                            </span>
                        )}
                    </div> */}
                    <div className="mb-7">
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-secondary"
                        >
                            Select Category
                        </label>
                        <select
                            {...register("category")}
                            className="select select-primary block w-full p-2.5"
                        >
                            <option value="transistor">Transistor</option>
                            <option value="sensor">Sensor</option>
                            <option value="solenoid">Solenoid</option>
                            <option value="capacitor">Capacitor</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-secondary"
                        >
                            Short Description:
                        </label>
                        <textarea
                            id="description"
                            className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                            placeholder="Item description here"
                            type="text"
                            autoComplete="off"
                            {...register("description", {
                                minLength: 10,
                                required: true,
                            })}
                        />
                        {errors.description && (
                            <span className="text-rose-600">
                                Description at least 10 letters
                            </span>
                        )}
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-secondary"
                        >
                            Item Price:
                        </label>
                        <input
                            id="price"
                            className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                            placeholder="Item price"
                            type="number"
                            defaultValue={"0"}
                            autoComplete="off"
                            {...register("price", { min: 0, required: true })}
                        />
                        {errors.price && (
                            <span className="text-rose-600">
                                Price can't be less than zero!
                            </span>
                        )}
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="quantity"
                            className="block mb-2 text-sm font-medium text-secondary"
                        >
                            Initial Stock:
                        </label>
                        <input
                            id="quantity"
                            className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                            placeholder="Opening Stock here"
                            type="number"
                            autoComplete="off"
                            {...register("stock", {
                                min: 0,
                                required: true,
                            })}
                        />
                        {errors.stock && (
                            <span className="text-rose-600">
                                Quantity can't be less than zero!
                            </span>
                        )}
                    </div>

                    <div className="mb-7">
                        <label
                            htmlFor="sold"
                            className="block mb-2 text-sm font-medium text-secondary"
                        >
                            Min Order Quantity:{" "}
                        </label>
                        <input
                            id="sold"
                            className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                            type="number"
                            defaultValue={"1"}
                            autoComplete="off"
                            {...register("moq", {
                                min: 1,
                                required: true,
                            })}
                        />
                        {errors.moq && (
                            <span className="text-rose-600">
                                MOQ at least 1!
                            </span>
                        )}
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-secondary"
                        >
                            Authorized Email:
                        </label>
                        <input
                            id="email"
                            className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                            defaultValue={user?.email}
                            autoComplete="off"
                            readOnly
                            {...register("email")}
                        />
                    </div>
                    <div className="mb-7">
                        <label
                            htmlFor="sold"
                            className="block mb-2 text-sm font-medium text-secondary"
                        >
                            Upload Image:
                        </label>
                        <input
                            className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block p-2.5  placeholder-secondary/75 text-black  border-secondary"
                            type="file"
                            {...register("img", {
                                required: true,
                            })}
                        />
                        {errors.img1 && (
                            <span className="text-rose-600">
                                Please attach a image file!
                            </span>
                        )}
                    </div>

                    <input
                        className="w-full bg-primary hover:bg-emerald-500 active:bg-emerald-600 px-5 py-2 rounded-md text-black tracking-wide"
                        type="submit"
                        value="Add Item"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
