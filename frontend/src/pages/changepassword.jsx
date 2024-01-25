import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const ChangePassword = () => {
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        new_password: '',
        re_new_password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        try {
            // Get the auth token from local storage
            const authToken = localStorage.getItem('authToken');

            if (!authToken) {
                console.error('Auth token not found');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            };

            const response = await axios.post("http://localhost:8000/auth/users/set_password/", passwordData, config);

            // Handle the response as needed
            console.log('Password changed successfully', response);

            if (response.status == 204) {
                toast.success("Password Changed Successfully!");
            }

            localStorage.removeItem('authToken');
        } catch (error) {
            console.error('Password change failed', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.data.current_password) {
                    // If the password property exists in the error response, it means it's an array
                    error.response.data.current_password.forEach((errorMessage) => {
                        toast.error(errorMessage);
                    });
                }
                else if (error.response.data.new_password) {
                    // If the password property exists in the error response, it means it's an array
                    error.response.data.new_password.forEach((errorMessage) => {
                        toast.error(errorMessage);
                    });
                }
                else if (error.response.data.detail) {
                    toast.error(error.response.data.detail);
                }
                else if (error.response.data.non_field_errors) {
                    error.response.data.non_field_errors.forEach((errorMessage) => {
                        toast.error(errorMessage);
                    });
                }
                else {
                    // Handle other types of errors in the response
                    toast.error('An unexpected error occurred');
                }
            } else if (error.request) {
                // The request was made but no response was received
                toast.error('No response received from the server');
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error('An unexpected error occurred');
            }
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <Toaster />
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md">
                    <img
                        className="w-auto h-7 sm:h-8 mb-4"
                        src="https://merakiui.com/images/logo.svg"
                        alt=""
                    />

                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
                        Change Password
                    </h1>

                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                {/* SVG path for the lock icon */}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 0h-2v8h2zm0 0h2v8h-2z"
                                />
                            </svg>
                        </span>

                        <input
                            name="current_password"
                            type="password"
                            value={passwordData.current_password}
                            onChange={handleInputChange}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-10 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Current Password"
                        />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                {/* SVG path for the lock icon */}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 0h-2v8h2zm0 0h2v8h-2z"
                                />
                            </svg>
                        </span>

                        <input
                            name="new_password"
                            type="password"
                            value={passwordData.new_password}
                            onChange={handleInputChange}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-10 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="New Password"
                        />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                {/* SVG path for the lock icon */}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 0h-2v8h2zm0 0h2v8h-2z"
                                />
                            </svg>
                        </span>

                        <input
                            name="re_new_password"
                            type="password"
                            value={passwordData.re_new_password}
                            onChange={handleInputChange}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-10 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={(e) => handleChangePassword(e)}
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};


export default ChangePassword;
