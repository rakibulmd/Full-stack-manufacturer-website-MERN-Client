import React from "react";
import { useForm } from "react-hook-form";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const ResetPassword = () => {
    const [sendPasswordResetEmail, sending, error] =
        useSendPasswordResetEmail(auth);

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        const reset = async () => {
            await sendPasswordResetEmail(data?.email);
            toast("Reset Email Sent!");
            reset();
        };
        reset();
    };

    return (
        <div>
            <h2 className="text-center text-xl font-bold mt-10">
                Reset Password:
            </h2>
            <div className="max-w-[500px] mx-auto py-5 h-screen">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-5 bg-darkbg rounded-md border border-white"
                >
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            Enter your email:
                        </label>
                        <input
                            className="border   text-sm rounded-md  block w-full p-2.5 bg-slate-600/20  text-white  "
                            placeholder="Enter your email"
                            autoComplete="off"
                            type="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="text-rose-600">
                                Please enter email to reset password!
                            </span>
                        )}
                    </div>
                    <p className="text-rose-600 py-1">
                        {error?.message.split("auth/")[1].split(")")[0]}
                    </p>
                    <div className="mb-7">
                        {sending ? (
                            <div className="w-16 h-16 mx-auto">
                                <Loading></Loading>
                            </div>
                        ) : (
                            <input
                                className="w-full btn btn-primary"
                                type="submit"
                                value="Reset"
                            />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
