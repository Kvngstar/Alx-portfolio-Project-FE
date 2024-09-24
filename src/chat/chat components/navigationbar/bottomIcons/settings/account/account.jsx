import React from "react";
import groupAdd from "../../../../../../assets/images/group-add.svg";

export default function Account() {
	return (
		<div className="pt-3 px-3 pb-3 ">
			<div className="d-flex bg-light rounded py-2">
				<div className="px-3 ">
					<img
						height="22px"
						src={groupAdd}
						alt=""
					/>
				</div>
				<div>Change number</div>
			</div>
			<div className="d-flex bg-light rounded py-2">
				<div className="px-3 ">
					<img
						height="22px"
						src={groupAdd}
						alt=""
					/>
				</div>
				<div>Request account info</div>
			</div>
			<div className="d-flex bg-light rounded py-2">
				<div className="px-3 ">
					<img
						height="22px"
						src={groupAdd}
						alt=""
					/>
				</div>
				<div>Delete account</div>
			</div>
		</div>
	);
}
