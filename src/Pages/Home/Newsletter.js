import React from "react";

const Newsletter = () => {
    return (
        <div class="hero  py-10 bg-slate-600/20">
            <div class="hero-content container mx-auto flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-4xl font-bold">
                        Subscribe to our offer &amp; Newsletter.
                    </h1>
                    <p class="py-6">
                        For promotional offer and newsletter, just submit your
                        email and stay in touch with us! We do not share your
                        email with anyone else.
                    </p>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="email"
                                class="input input-bordered"
                            />
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
