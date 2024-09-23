import _ from "lodash"; // Importing lodash library for utility functions
import React, { useEffect, useState } from "react"; // Importing necessary modules from React
import toast, { Toaster } from "react-hot-toast"; // Importing toast notification library
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import { Login_Auth } from "../../auths/context/authContext"; // Importing authentication context
import axios from "../../services/api/axios"; // Importing Axios for API requests
import { Loader } from "../../utils/loader/loader"; // Importing loader utility component
import "./register.css"; // Importing CSS file for styling

// Functional component for Registration
export default function Register() {
    const [loader, setLoader] = useState(false); // State for loader
    const navigate = useNavigate(); // Hook for navigation
    const auth = Login_Auth(); // Accessing login authentication context

    const [formData, setFormData] = useState({ // State for form data
        name: "",
        username: "",
        email: "",
        phoneNum: "",
        password: "",
        confirmpswd: "",
        gender: "",
        country: "",
    });

    useEffect(() => { // Effect hook to check authentication status and redirect if logged in
        if (auth.isAuthenticated && !auth.isTokenExpired()) {
            navigate("chat"); // Redirect to chat page
        }
    });

    // Function to update form data based on input changes
    function getFormData(event) {
        const { name, value } = event.target;
        setFormData((values) => {
            return { ...values, [name]: value };
        });
    }

    // Function to handle form submission
    async function submit(event) {
        setLoader(true); // Show loader while processing
        event.preventDefault(); // Prevent default form submission behavior

        try {
            const array = Object.values(formData);
            const index = array.findIndex((v) => v === "");

            if (index > -1) { // Check if any required field is empty
                setLoader(false); // Hide loader
                return toast.error(`${Object.keys(formData)[index]} is required`); // Show error message
            }

            const response = await axios.post(
                "/register",
                _.pick(formData, [ // Pick specific fields from form data using lodash
                    "name",
                    "username",
                    "email",
                    "phoneNum",
                    "password",
                    "gender",
                    "country",
                ])
            );

            if (response && typeof response !== undefined) {
                toast.success(response.data); // Show success message
            }
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status < 500
            ) {
                return toast.error(error.response.data); // Show server-side validation errors
            }

            return toast.error(error.message); // Show general error message
        } finally {
            setLoader(false); // Hide loader
        }
    }

    return (
        <div style={{ height: "100vh" }}> {/* Main container */}
            <div className="container2 d-flex flex-column justify-content-center align-items-center"> {/* Registration container */}
                <Toaster position="top" /> {/* Toast notification container */}
                <div className="title">Registration</div> {/* Title */}
                <div className="content"> {/* Registration form */}
                    <form action="#">
                        <div className="user-details"> {/* User details section */}
                            {/* Input fields for user details */}
                            <div className="input-box">
                                <span className="details">Full Name</span>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    onChange={getFormData}
                                    value={formData.name}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Username</span>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    name="username"
                                    onChange={getFormData}
                                    value={formData.username}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    name="email"
                                    onChange={getFormData}
                                    value={formData.email}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input
                                    type="text"
                                    placeholder="Enter your number"
                                    name="phoneNum"
                                    onChange={getFormData}
                                    value={formData.phoneNum}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input
                                    type="text"
                                    placeholder="Enter your password"
                                    name="password"
                                    onChange={getFormData}
                                    value={formData.password}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Confirm Password</span>
                                <input
                                    type="text"
                                    placeholder="Confirm your password"
                                    name="confirmpswd"
                                    onChange={getFormData}
                                    value={formData.confirmpswd}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Country</span>
                                <input
                                    type="text"
                                    placeholder="Enter your country"
                                    name="country"
                                    onChange={getFormData}
                                    value={formData.country}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <div className="details">Select Gender</div>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={getFormData}
                                    className="form-select form-select-lg"
                                >
                                    <option value="">Choose</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="button d-flex align-items-center justify-content-center"> {/* Button section */}
                            {/* Conditional rendering of loader or register button */}
                            {loader ? (
                                Loader("cliploader", loader, undefined, 30) // Using Loader component
                            ) : (
                                <input
                                    type="submit"
                                    onClick={submit}
                                    value="Register"
                                />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
