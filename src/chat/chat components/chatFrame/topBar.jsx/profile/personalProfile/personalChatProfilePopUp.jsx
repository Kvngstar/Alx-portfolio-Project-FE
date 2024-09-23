import React from "react";
import groupAdd from "../../assets/images/group-add.svg";
import displayImage from "../../assets/images/vi hub.jpg";

export default function PersonalProfilePopUp({
	personalChatControl,
	setPersonalChatControl,
	ToggleProfileNav,
}) {
	function ShowOverview() {
		setPersonalChatControl((values) => {
			return {
				showPersonalChatProfile: true,
				overview: true,
				members: false,
				media: false,
				links: false,
			};
		});
	}
	function ShowMedia() {
		setPersonalChatControl((values) => {
			return {
				showPersonalChatProfile: true,
				overview: false,

				media: true,
				links: false,
			};
		});
	}
	function Showlinks() {
		setPersonalChatControl((values) => {
			return {
				showPersonalChatProfile: true,
				overview: false,

				media: false,
				links: true,
			};
		});
	}

	return (
		<>
			{personalChatControl.showPersonalChatProfile && (
				<div className="profile-popup rounded d-flex">
					<div className="group-menu bg-secondary d-flex flex-column p-1">
						<div
							className="nav-item-profile rounded active-item"
							onClick={(event) => {
								ShowOverview();
								ToggleProfileNav(event);
							}}
						>
							Overview{" "}
						</div>
						<div
							onClick={(event) => {
								ShowMedia();
								ToggleProfileNav(event);
							}}
							className="nav-item-profile rounded"
						>
							Media
						</div>
						<div
							onClick={(event) => {
								Showlinks();
								ToggleProfileNav(event);
							}}
							className="nav-item-profile rounded"
						>
							Links
						</div>
					</div>
					<div className="view-group-menu">
						{personalChatControl.overview == true && (
							<div className="pt-3 px-3 pb-3 d-block">
								<div>
									<img
										src={displayImage}
										className="round-image"
										style={{ height: "100px", width: "100px" }}
										alt=""
									/>
								</div>

								<div className="mt-3">
									<div>Kingsley Okoronkwo</div>
								</div>

								<div className="mt-2">
									<small>Phone Number</small>
									<br />
									+2349030299983
								</div>
								<div className="mt-2">
									<button className="w-50 btn-primary btn btn-sm">Block</button>
									<button className="w-50 btn  btn-danger btn-sm">
										Report
									</button>
								</div>
							</div>
						)}

						{personalChatControl.media && (
							<div className="d-flex align-items-center justify-content-center h-100 w-100">
								No media to display
							</div>
						)}
						{personalChatControl.links && <div>{/* links */} Links</div>}
					</div>
				</div>
			)}
		</>
	);
}
