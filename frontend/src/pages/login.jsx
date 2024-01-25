import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Don't forget to import axios
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [signInData, setSignInData] = useState({
    password: '',
    username: '', // Change 'email' to 'username'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/token/login", signInData);

      // Assuming the token is present in the response data as 'auth_token'
      const authToken = response.data.auth_token;

      // Save the token in local storage
      localStorage.setItem('authToken', authToken);

      // You can also redirect the user to another page or perform any other actions here

      console.log('Login successful');
      toast.success(response.data.message)
    } catch (error) {
      console.error(error)
      // Handle login errors and show toastr notifications
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data.non_field_errors) {
          error.response.data.non_field_errors.forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        } else {
          toast.error('An unexpected error occurred. Please try again later.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response received from the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error('An unexpected error occurred. Please try again later.');
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
            Sign In
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
                {/* SVG path for the user icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 0l-9 2 9-18 9 18-9-2z"
                />
              </svg>
            </span>

            <input
              name="username" // Change 'email' to 'username'
              type="text"
              value={signInData.username}
              onChange={handleInputChange}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Username" // Change 'Email address' to 'Username'
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
              name="password"
              type="password"
              value={signInData.password}
              onChange={handleInputChange}
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={(e) => handleSignIn(e)}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign in
            </button>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to="/signup"
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
