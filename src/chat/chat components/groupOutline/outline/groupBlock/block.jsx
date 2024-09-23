import React from "react";
import displayImage from "../../../../../assets/images/vi hub.jpg";

export default function GroupOutlineCont({ v, DisplayChats, userGroupData }) {
	return (
		<div
			key={v._id}
			className="short-box  pe-2  rounded py-2"
			onClick={() => {
				DisplayChats(v._id);
			}}
		>
			<div className="d-flex px-3 justify-content-between  align-items-center ">
				<div className="d-flex handle-overflow">
					<div className="me-1">
						<img
							src={v.groupIcon || displayImage}
							className="round-image"
							alt="icon"
						/>
					</div>
					<div className="me-3 ">
						<div>{v.groupName}</div>

						<div>
							{" "}
							<small>
								<small
									className="last-message"
									_id={v._id}
								>
									{v.groupMessages.length < 1
										? ""
										: v.groupMessages[v.groupMessages.length - 1].type ===
										  "image"
										? "image file"
										: "~" +
										  v.groupMessages[v.groupMessages.length - 1].username +
										  ": " +
										  v.groupMessages[v.groupMessages.length - 1].text}
								</small>
							</small>
						</div>
					</div>
				</div>
				<div className="d-flex ps-3 justify-content-between">
					<div
						className="d-flex flex-column justify-content-center align-items-center"
						style={{ minWidth: "60px" }}
					>
						<div>
							<small>
								<small>
									{v.groupMessages.length > 0
										? new Date(
												v.groupMessages[v.groupMessages.length - 1].date
										  ).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
										  })
										: ""}
								</small>
							</small>
						</div>
						<div className="align-self-end">
							{userGroupData?.groups?.map((b, i) => {
								if (b.groupCode === v._id) {
									return b.numberOfNewMessages === 0 ? (
										""
									) : (
										<div
											key={i}
											className="bg-success p-1 py-0 d-flex align-items-center justify-content-center rounded-pill  text-light"
											style={{
												width: "20px",
												height: "20px",
												fontSize: "12px",
											}}
										>
											{b.numberOfNewMessages}
										</div>
									);
								} else {
									return "";
								}
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
