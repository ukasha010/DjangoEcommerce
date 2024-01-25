import React, { useEffect, useState } from "react";
import axios from "axios";

const ActivationComponent = () => {
    const [activationStatus, setActivationStatus] = useState("pending");

    useEffect(() => {
        console.log("useEffect is running");
        const activateUser = async () => {
            // Set loading state
            setActivationStatus("loading");

            const activationUrl = new URL(window.location.href);
            const uid = activationUrl.pathname.split("/")[3];
            const token = activationUrl.pathname.split("/")[4];

            const activationData = {
                uid: uid,
                token: token,
            };

            try {
                const response = await axios.post("http://localhost:8000/auth/users/activation/", activationData);

                console.log("API Response:", response); // Add this line to log the response

                // Check for a successful activation (204 status)
                if (response.status === 204) {
                    setActivationStatus("success");
                    // Display success message or perform further actions
                } else {
                    setActivationStatus("error");
                    // Handle other unexpected responses
                    // Display an appropriate error message
                }
            } catch (error) {
                // Handle specific errors
                if (error.response) {
                    // The request was made and the server responded with a status code
                    if (error.response.status === 403) {
                        setActivationStatus("success");
                        // Display success message or perform further actions
                    } else {
                        setActivationStatus("error");
                        // Handle other server responses (e.g., 400 Bad Request)
                        // Display an appropriate error message
                    }
                } else {
                    setActivationStatus("error");
                    // Something else went wrong
                    // Display an appropriate error message
                }
            }
        };

        activateUser();
    }, []); // Empty dependency array ensures that this effect runs once, similar to componentDidMount

    // Render based on activationStatus
    return (
        <div>
            {activationStatus === "loading" && <p>Activation in progress...</p>}
            {activationStatus === "success" && <p>Your account has been activated successfully!</p>}
            {activationStatus === "error" && (
                <p>There was an error activating your account. Please try again or contact support.</p>
            )}
        </div>
    );
};

export default ActivationComponent;
