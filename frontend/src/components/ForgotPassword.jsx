import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const ResetPasswordComponent = () => {
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStatus, setResetStatus] = useState("pending");

  useEffect(() => {
    // Parse the uid and token from the reset URL
    const resetUrl = new URL(window.location.href);
    const uidParam = resetUrl.pathname.split("/")[3];
    const tokenParam = resetUrl.pathname.split("/")[4];
    console.log(uidParam)
    console.log(tokenParam)

    if (uidParam && tokenParam) {
      // Set uid and token in state
      setUid(uidParam);
      setToken(tokenParam);
    } else {
      // Handle the case when uid or token is not available
      console.error("Uid or token not found in the URL.");
    }
  }, []); // Empty dependency array ensures that this effect runs once, similar to componentDidMount

  const handleResetPassword = async () => {
    // Perform password reset API request
    const resetData = {
      uid: uid,
      token: token,
      new_password: password,
      re_new_password: confirmPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/users/reset_password_confirm/",
        resetData
      );

      console.log(resetData)
      console.log("Password Reset Response:", response);
      toast.success(response.data.message)
    } catch (error) {
      console.error("Password Reset Error:", error);
      setResetStatus("error");
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data.new_password) {
          // If the password property exists in the error response, it means it's an array
          error.response.data.new_password.forEach((errorMessage) => {
            toast.error(errorMessage);
          });
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
      // Handle specific errors or display an appropriate error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20 bg-black h-screen">
      <Toaster />
      <h2>Reset Password</h2>
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 0l-9 2 9-18 9 18-9-2z"
            />
          </svg>
        </span>

        <input
          name="username"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-80 py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="New Password"
        />
      </div>
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 0l-9 2 9-18 9 18-9-2z"
            />
          </svg>
        </span>

        <input
          name="username"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block w-80 py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Confirm New Password"
        />
      </div>

      <button
        onClick={handleResetPassword}
        className="bg-white px-9 py-4 mt-4 border-neutral-400 border-2  hover:text-white hover:shadow-[inset_33rem_0_0_0] hover:shadow-black duration-[400ms,700ms] transition-[color,box-shadow]"
      >
        RESET PASSWORD
      </button>
    </div>
  );
};

export default ResetPasswordComponent;
