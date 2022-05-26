import React from "react";

const MyPortfolio = () => {
    return (
        <div className="bg-secondary">
            <div className="container mx-auto mt-7">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold uppercase text-center">
                    MD. Rakibul Islam
                </h2>
                <h2 className="text-center text-xl md:text-2xl">
                    this.rakibul@gmail.com
                </h2>
                <div className="mt-12">
                    <h2 className="text-2xl lg:text-4xl font-bold text-center">
                        Educational Background
                    </h2>
                    <p className="text-center pt-3 font-bold">
                        Diploma Engineering in Marine Technology
                    </p>
                </div>
                <div className="mt-12">
                    <h2 className="text-2xl lg:text-4xl font-bold text-center">
                        My Skills
                    </h2>

                    <div>
                        <h3 className="text-xl underline font-bold text-center mt-7">
                            Front End
                        </h3>
                        <p className="text-center">
                            HTML, CSS, JavaScript, React.js, Tailwind CSS,
                            Bootstrap
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl underline font-bold text-center mt-7">
                            Back-End
                        </h3>
                        <p className="text-center">
                            Node.js, Express.js, REST API
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl underline font-bold text-center mt-7">
                            Tools
                        </h3>
                        <p className="text-center">
                            VS Code, Chrome Dev Tools, GitHub, Figma, Firebase
                            Authentication, Netlify, Heroku
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl underline font-bold text-center mt-7">
                            Database
                        </h3>
                        <p className="text-center">MongoDB</p>
                    </div>
                    <div className="mt-16">
                        <h2 className="text-2xl lg:text-4xl font-bold text-center pb-5">
                            My Projects
                        </h2>
                        <div className="text-center pb-7">
                            <h3 className="text-xl font-bold">
                                1. Full Stack: Inventory Management App
                            </h3>
                            <a
                                className="underline"
                                href="https://ps-wms.web.app/"
                                rel="noreferrer"
                                target="_blank"
                            >
                                PS WareHouse Management System
                            </a>
                        </div>
                        <div className="text-center pb-7">
                            <h3 className="text-xl font-bold">
                                2. Full Stack: Simple To Do App
                            </h3>
                            <a
                                className="underline"
                                href="https://up-keep-397c7.web.app/"
                                rel="noreferrer"
                                target="_blank"
                            >
                                Up Keep (To Do)
                            </a>
                        </div>
                        <div className="text-center pb-5">
                            <h3 className="text-xl font-bold">
                                3. Individual Service Provider Web App
                            </h3>
                            <a
                                className="underline"
                                href="https://your-vtax.web.app/"
                                rel="noreferrer"
                                target="_blank"
                            >
                                Your VatTax
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPortfolio;
