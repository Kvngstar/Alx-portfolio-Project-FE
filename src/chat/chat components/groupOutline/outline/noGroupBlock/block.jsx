import React from "react";
import { Loader } from "../../../../../utils/loader/loader";

export default function NoGroupOutline({ loading }) {
	return (
		<div className=" loading-container   rounded py-2">
			<div className="d-flex w-100 align-items-center justify-content-center">
				{loading && Loader("syncloader", loading, undefined, 15, "#ececec")}
			</div>
		</div>
	);
}
