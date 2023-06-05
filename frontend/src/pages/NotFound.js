import React from "react";

export default function NotFound() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-80 h-80 bg-gray-200 rounded-md shadow-xl">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-blue-600 text-8xl">404</h1>
                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-red-500">Oops!</span> Page not found
                    </h6>
                    <span className="mb-8 text-center text-gray-500 md:text-lg"> The page you’re looking for doesn’t exist.</span>
                    <a href="/" className="px-6 py-2 text-lg font-semibold text-blue-800 bg-orange-400">Go home</a>
                </div>
            </div>
        </div>
    );
}