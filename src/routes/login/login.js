import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Importing toast notification library
import { NavLink, useNavigate } from "react-router-dom"; // Importing NavLink for navigation
import axios from "../../services/api/axios"; // Importing Axios for API requests
import "./login.css"; // Importing CSS file for styling
import { Login_Auth } from "../../auths/context/authContext"; // Importing authentication context
import { Loader } from "../../utils/loader/loader";

// Functional component for Login
export default function Login() {
	const navigate = useNavigate(); // Hook for navigation
	const auth = Login_Auth(); // Accessing login authentication context
	const [loader, setLoader] = useState(false); // State for loader
	const [formData, setFormData] = useState({
		// State for form data
		email: "",
		password: "",
	});

	// Function to update form data based on input changes
	function getFormData(event) {
		const { name, value } = event.target;
		setFormData((values) => {
			return { ...values, [name]: value };
		});
	}

	// Function to handle form submission
	async function Submit(event) {
		setLoader(true); // Show loader while processing
		event.preventDefault(); // Prevent default form submission behavior
		try {
			const array = Object.values(formData);
			const index = array.findIndex((v) => v === "");
			if (index > -1) {
				// Check if any required field is empty
				setLoader(false); // Hide loader
				return toast.error(`${Object.keys(formData)[index]} is required`); // Show error message
			}
			const response = await axios.post("/login", formData); // Send login request
			console.log("headers", response);
			if (response && typeof response !== undefined) {
				auth.login(response.headers["x-auth"]); // Set authentication token
				toast.success("Login Successful"); // Show success message
			}
			setTimeout(() => {
				navigate("/chat"); // Redirect after successful login
			}, 3000);
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
		<>
			<div className="login-form">
				<Toaster position="top center" /> {/* Toast notification container */}
				<form>
					<h1>Login</h1>
					<div class="content">
						<div class="input-field">
							<input
								type="email"
								placeholder="Email"
								name="email"
								onChange={getFormData}
								value={formData.email}
								autoComplete="true" // Corrected attribute name
							/>
						</div>
						<div class="input-field">
							<input
								type="password"
								placeholder="Password"
								name="password"
								onChange={getFormData}
								value={formData.password}
								autoComplete="true" // Corrected attribute name
							/>
						</div>
						<a
							href="forgotpassword"
							class="link" // Changed class attribute to className for JSX
						>
							Forgot Your Password?
						</a>
					</div>
					<div class="action">
						<NavLink to="/register">
							{" "}
							{/* Navigation link to Register page */}
							<button> Register</button>
						</NavLink>

						{loader ? (
							Loader("syncloader", loader, undefined, 20, "black")
						) : (
							<button onClick={Submit}>Sign in</button>
						)}
					</div>
				</form>
			</div>
		</>
	);
}
