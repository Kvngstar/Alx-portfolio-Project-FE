import React from "react";

export default function General() {
	return (
		<div className="pt-3 px-3 pb-3">
			<div>General</div>
			<div className="mt-3 mb-2">
				<div className="mb-2">Language</div>
				<select
					name="language"
					className="form-select"
					id=""
				>
					<option value="">System default</option>
					<option value="">English</option>
					<option value="">French</option>
					<option value="">Russian</option>
				</select>
			</div>
			<div className="mt-3 mb-2">
				<div className="mb-2">Theme</div>
				<select
					name="language"
					className="form-select"
					id=""
				>
					<option value="">Default ~light~</option>
					<option value="">Light</option>
					<option value="">Dark</option>
				</select>
			</div>

			<div className="d-flex">
				<div className="w-100">
					<button className="btn  btn-danger btn-sm w-100">Log out</button>
				</div>
			</div>
		</div>
	);
}
