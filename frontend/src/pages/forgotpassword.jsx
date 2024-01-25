import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            // Make a request to the server to handle forgot password logic
            const response = await axios.post("http://localhost:8000/auth/users/reset_password/", {
                email,
            });

            // Show success message using toast
            toast.success(response.data.message);
        } catch (error) {
            console.error("Check", error)
            if (error.response.data) {
                error.response.data.forEach((errorMessage) => {
                    toast.error(errorMessage);
                });
            }
            else {
                toast.error("Unexpected Error!")
            }
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <Toaster />
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md">
                    <img
                        className="w-auto h-7 sm:h-8"
                        src="https://merakiui.com/images/logo.svg"
                        alt=""
                    />

                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
                        Forgot Password
                    </h1>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                {/* SVG path for the envelope icon */}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0l-9 2 9-18 9 18-9-2z"
                                />
                            </svg>
                        </span>

                        <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleInputChange}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Email address"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={(e) => handleForgotPassword(e)}
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        >
                            Reset Password
                        </button>

                        {message && (
                            <p className="mt-4 text-center text-green-600">
                                {message}
                            </p>
                        )}

                        {error && (
                            <p className="mt-4 text-center text-red-600">
                                {error}
                            </p>
                        )}

                        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                            Remember your password?{" "}
                            <Link
                                to="/login"
                                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ForgotPassword;