import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { BsThreads } from "react-icons/bs";
export default function TopIcons({ navRef }) {
	const ToggleActiveNav = (element) => {
		element.stopPropagation();
		let navItems = document.querySelectorAll(".nav-item");
		navItems.forEach((item) => {
			item.classList.remove("active-item");
		});
		if (element.target.localName !== "svg") {
			element.target.classList.add("active-item");
		} else {
			element.target.parentElement.classList.add("active-item");
		}
	};
	return (
		<div className="side-icon">
			<div
				className="nav-item p-1 active-item "
				onClick={(element) => {
					ToggleActiveNav(element);
				}}
				ref={navRef}
			>
				<BiMessageRoundedDetail />
			</div>
			<div
				className="nav-item  p-1 "
				onClick={(element) => {
					ToggleActiveNav(element);
				}}
			>
				<IoCallOutline />
			</div>
			<div
				className="nav-item p-1 "
				onClick={(element) => {
					ToggleActiveNav(element);
				}}
			>
				<BsThreads />
			</div>
		</div>
	);
}
