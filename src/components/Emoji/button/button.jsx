import React from "react";
import { Loader } from "../../../utils/loader/loader";

export default function Button({ text, func, loading, fullWidth }) {
	return loading ? (
		Loader("syncloader", loading, undefined, 8, "grey")
	) : (
		<button
			className={
				"text-center text-secondary bg-light py-1  px-3 btn my-2 shadow-sm " + (fullWidth ? "d-block w-100" : "")
			}
			onClick={func}
		>
			{text}
		</button>
	);
}
