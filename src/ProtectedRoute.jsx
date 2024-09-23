import React from "react";
import { Navigate } from "react-router-dom";
import { Login_Auth } from "./auths/context/authContext";


const PrivateRoute = ({ children }) => {

	let auth = Login_Auth();
	return auth.token && auth.isAuthenticated && !auth.isTokenExpired() ? (
		<div>{children}</div>
	) : (
		<Navigate
			to="/login"
			replace
		/>
	);
};

export default PrivateRoute;
