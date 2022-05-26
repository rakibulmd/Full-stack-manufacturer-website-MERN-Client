import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState([]);
    const [updated, setUpdated] = useState(false);
    const MySwal = withReactContent(Swal);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();
    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                `http://localhost:5000/user?email=${user?.email}`
            );
            setUserData(data);
            console.log(data);
        };
        get();
    }, [user, updated]);

    const onSubmit = async (data) => {
        const response = await axios.put(
            `http://localhost:5000/user/${user?.email}`,
            { data }
        );
        if (response?.data?.result?.modifiedCount) {
            setUpdated(!updated);
            MySwal.fire(`Profile Updated!`);
            reset();
        }
    };
    return (
        <div className="bg-slate-600/20 max-w-md w-full mx-auto p-2 mt-10 rounded-lg">
            <div className="pt-5">
                <div className="flex justify-start items-center gap-5 border-b-2 pb-2 border-gray-500 mb-5">
                    {userData?.img && (
                        <div class="avatar">
                            <div class="w-16">
                                <img src={userData.img} alt="" />
                            </div>
                        </div>
                    )}
                    <div>
                        <h2>{user?.displayName}</h2>
                        <h2>{user?.email}</h2>
                    </div>
                </div>
                <div className="p-2">
                    <h2>Location: {userData?.data?.location}</h2>
                    <h2>Phone: {userData?.data?.phone}</h2>
                    <h2>Education: {userData?.data?.education}</h2>
                    <h2>LinkedIn: {userData?.data?.linkedIn}</h2>
                </div>
                <div>
                    <div className="max-w-[500px] mx-auto py-5">
                        <form
                            className="p-5 bg-slate-600/40 rounded-md border border-emerald-500 animate__animated animate__fadeInUp animate__faster"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="mb-5">
                                <label
                                    htmlFor="location"
                                    className="block mb-2 text-sm font-medium"
                                >
                                    *Your Location:
                                </label>
                                <input
                                    id="location"
                                    className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                    placeholder="Your location"
                                    type="text"
                                    autoComplete="off"
                                    {...register("location", {
                                        minLength: 3,
                                        required: true,
                                    })}
                                />
                                {errors.location && (
                                    <span className="text-rose-600">
                                        Location is required.
                                    </span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="phone"
                                    className="block mb-2 text-sm font-medium"
                                >
                                    *Your Phone no:
                                </label>
                                <input
                                    id="phone"
                                    className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                    placeholder="Your phone no"
                                    type="text"
                                    autoComplete="off"
                                    {...register("phone", {
                                        minLength: 5,
                                        required: true,
                                    })}
                                />
                                {errors.phone && (
                                    <span className="text-rose-600">
                                        Phone no is required
                                    </span>
                                )}
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="education"
                                    className="block mb-2 text-sm font-medium"
                                >
                                    Your education:
                                </label>
                                <textarea
                                    id="education"
                                    className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                    placeholder="Your education"
                                    type="text"
                                    autoComplete="off"
                                    {...register("education")}
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="linkedIn"
                                    className="block mb-2 text-sm font-medium"
                                >
                                    Your LinkedIn URL:
                                </label>
                                <input
                                    id="linkedIn"
                                    className="focus:outline-none focus:ring focus:ring-primary border text-sm rounded-md block w-full p-2.5  placeholder-secondary/75 text-black  border-secondary"
                                    placeholder="LinkedIn URL"
                                    type="url"
                                    autoComplete="off"
                                    {...register("linkedIn")}
                                />
                            </div>
                            <input
                                className="w-full bg-primary hover:bg-emerald-500 active:bg-emerald-600 px-5 py-2 rounded-md text-black tracking-wide"
                                type="submit"
                                value="Update"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
