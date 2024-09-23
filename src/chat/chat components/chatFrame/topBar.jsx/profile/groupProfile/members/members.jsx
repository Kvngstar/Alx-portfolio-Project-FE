import React from "react";
import groupAdd from "../../../../../../../assets/images/group-add.svg";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
export default function Members({ data }) {
	return (
		<div className=" pt-3 px-3 pb-3">
			<div className="p-1">
				<div className="fw-bold px-3 mb-2">({data.members.length})</div>
				<div className="px-3">
					<input
						type="text"
						className="input mb-2"
					/>
				</div>
				{data.members.length > 0 &&
					data.members.map((v) => {
						return (
							<div className="d-flex profile justify-content-between  rounded py-2">
								<div className="d-flex align-item-center">
									<div className="me-2  ps-2 ">
										<AiOutlineUsergroupAdd />
									</div>
									<div>{v}</div>
								</div>
								{data.adminUsername === v ? (
									<div className="me-1"><MdOutlineAdminPanelSettings /></div>
								) : (
									""
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
}
