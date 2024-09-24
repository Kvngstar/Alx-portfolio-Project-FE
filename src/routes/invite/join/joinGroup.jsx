import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../../services/api/axios";

function JoinGroup() {
	const { groupId } = useParams(); // Assuming group ID is in the URL parameter
	const location = useLocation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false); // Track loading state
	const Join = async () => {
		try {
			setIsLoading(true); // Set loading state to true initially
			const response = await axios.get(`/\join-group${location.search}`); // Use group ID
			console.log(response);
			toast.success("Joined group successfully!"); // Display success toast
			setTimeout(() => navigate("/login"), 2000);
			if (response.status >= 200 && response.status < 400) {
				setIsLoading(false);
			}
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status < 500
			) {
				return toast.error(error.response.data);
			}

			return toast.error(error.message);
		} finally {
			setIsLoading(false); // Set loading state to false after request completes
		}
	};

	useEffect(() => {}, [groupId]); // Re-run useEffect on group ID change

	return (
		<div className="container d-flex justify-content-center align-items-center min-vh-100">
			<Toaster /> {/* Include ToastContainer for notifications */}
			{isLoading ? (
				<div
					className="spinner-border"
					role="status"
				>
					<span className="visually-hidden">Loading...</span>
				</div>
			) : (
				<div>
					<h2>Group Join Request</h2>
					<p>You are about to join the group.</p>
					<button
						className="btn btn-primary"
						disabled={isLoading}
						onClick={Join}
					>
						{isLoading ? "Joining..." : "Join Group"}
					</button>
				</div>
			)}
		</div>
	);
}

export default JoinGroup;
