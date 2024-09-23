import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SearchBox({ socket, setSearchArray, loadedData }) {
	const [search, setSearch] = useState("");

	const SerchItem = (event) => {
		const { value } = event.target;
		const regEx = new RegExp(value.toLowerCase(),"ig");
		setSearch(() => value);
		const result = loadedData.filter((v) => {
			if (regEx.test(v.groupName)) {
				return  v;
			}
		});
		setSearchArray(result);
	};
	return (
		<div className="search-box">
			<input
				type="text"
				placeholder="Search for group "
				name="search"
				id=""
				value={search}
				onChange={SerchItem}
			/>
		</div>
	);
}
