import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { IconContext } from "react-icons";

const Feature = () => {
    return (
        <div>
            <div className="container mx-auto p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-3 bg-slate-400/20 border border-gray-500 hover:scale-y-110 transition-transform hover:bg-primary hover:text-black">
                        <h2 className="text-xl pb-3">
                            Environmental Sensitivity
                        </h2>
                        <p className="py-3">
                            Environmental Sensitivity The world of international
                            supply chains involves a myriad of unknown risks and
                            challenging regulations.
                        </p>
                        <IconContext.Provider
                            value={{
                                className: "w-6 h-6 ml-2 text-primary",
                            }}
                        >
                            <div>
                                <FaArrowRight />
                            </div>
                        </IconContext.Provider>
                    </div>
                    <div className="p-3 bg-slate-400/20 border border-gray-500 hover:scale-y-125 transition-transform hover:bg-primary hover:text-black">
                        <h2 className="text-xl pb-3">Transparent Pricing</h2>
                        <p className="py-3">
                            The world of international supply chains involves a
                            myriad of unknown risks and challenging regulations.
                        </p>
                        <IconContext.Provider
                            value={{
                                className: "w-6 h-6 ml-2 text-primary",
                            }}
                        >
                            <div>
                                <FaArrowRight />
                            </div>
                        </IconContext.Provider>
                    </div>
                    <div className="p-3 bg-slate-400/20 border border-gray-500 hover:scale-y-110 transition-transform hover:bg-primary hover:text-black">
                        <h2 className="text-xl pb-3">
                            Professional &amp; Qualified
                        </h2>
                        <p className="py-3">
                            The world of international supply chains involves a
                            myriad of unknown risks and challenging regulations.
                        </p>
                        <IconContext.Provider
                            value={{
                                className: "w-6 h-6 ml-2 text-primary",
                            }}
                        >
                            <div>
                                <FaArrowRight />
                            </div>
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;
