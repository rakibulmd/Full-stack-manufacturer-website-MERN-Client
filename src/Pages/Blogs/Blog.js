import React from "react";

const Blog = ({ item }) => {
    const { question, answer } = item;
    return (
        <div className="container mx-auto py-5 animate__animated animate__fadeInUp animate__faster">
            <div className="border mx-auto bg-slate-600/20 hover:bg-slate-600/40 p-5 border-emerald-500 rounded-lg max-w-[700px]">
                <h2 className="text-xl md:font-bold text-center pb-2 mb-4 border-b">
                    {question}
                </h2>
                <p className="text-md md:font-bold  pb-2">{answer}</p>
            </div>
        </div>
    );
};

export default Blog;
