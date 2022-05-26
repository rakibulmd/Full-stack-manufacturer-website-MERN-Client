import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

const Statusbar = () => {
    const [user] = useAuthState(auth);
    return (
        <div className=" bg-secondary border-b border-gray-600 text-white">
            <div className=" container mx-auto text-md py-2">
                <div className="flex md:justify-between justify-end">
                    <p className="mr-4 hidden md:inline">
                        Master Precision Tech. Ltd
                        <IconContext.Provider
                            value={{
                                className: "w-5 h-5 ml-5 text-primary",
                            }}
                        >
                            <span>
                                <FaPhoneAlt /> +8801790660669
                            </span>
                        </IconContext.Provider>{" "}
                    </p>{" "}
                    {user && (
                        <p className="px-2">
                            <IconContext.Provider
                                value={{
                                    className: "w-5 h-5 text-primary",
                                }}
                            >
                                <span>
                                    <FaUser />
                                </span>
                            </IconContext.Provider>{" "}
                            {user.displayName}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Statusbar;
