import React from "react";

const BusinessSummary = () => {
    return (
        <div className="container mx-auto bg-slate-300/10 p-5 rounded-3xl">
            <h2 className="text-5xl text-center  my-5">We Grow With You!</h2>
            <div className="stats shadow flex justify-center bg-white/10 text-white">
                <div className="stat">
                    <div className="stat-figure text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-8 h-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </div>
                    <div className="text-5xl">Revenue</div>
                    <div className="stat-value text-7xl text-primary">~22M</div>
                    <div className="stat-desc  text-xl">
                        Jan 1st 2021 - Feb 1st 2022
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-8 h-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            ></path>
                        </svg>
                    </div>
                    <div className=" text-5xl">Orders</div>
                    <div className="stat-value text-7xl  text-primary">
                        9,200
                    </div>
                    <div className="stat-desc text-xl">↗︎ 1800 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-8 h-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            ></path>
                        </svg>
                    </div>
                    <div className="text-5xl">New Registers</div>
                    <div className="text-7xl text-primary">1,200</div>
                    <div className="text-xl">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;
