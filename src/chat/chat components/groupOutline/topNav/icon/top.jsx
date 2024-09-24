import React from "react";
import groupAdd from "../../../../../assets/images/group-add.svg";
import { IoCreateOutline } from "react-icons/io5";

export default function Top({ toggleNewChat }) {
	return (
		<div className="center-bar"> 
			<div className="fw-bold fs-5"> Chats</div>
			<div>
				<div onClick={toggleNewChat}>
					<IoCreateOutline />
				</div>
			</div>
		</div>
	);
}
