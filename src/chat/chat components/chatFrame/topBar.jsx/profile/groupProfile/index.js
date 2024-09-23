import React from "react";
import { GoFileMedia } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import {
	MdExitToApp,
	MdOutlineAccountBalance,
	MdOutlineInsertLink,
} from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { Login_Auth } from "../../../../../../auths/context/authContext";
import { useThemecontext } from "../../../../../../auths/context/themeContext";
import LinkGenerator from "./link/generateLink";
import Members from "./members/members";
import Overview from "./overview/overview";
import Leavegroup from "./leave/user/leave";
import RemoveUser from "./leave/admin/removeUser";
import DisbandGroup from "./leave/admin/leaveGroup";
import ChooseAdmin from "./leave/admin/chooseAdmin";
import AdminLeaveGroup from "./leave/admin/leaveGroup";
import DeleteGroup from "./leave/admin/deleteGroup";

export default function ProfilePopUp({
	data,
	setLoadedData,
	socket,
	activeChat,
	groupControl,
	setGroupControl,
	setShowGroupProfile,
	
}) {
	const auth = Login_Auth();
	const theme = useThemecontext();
	const ToggleProfileNav = (element) => {
		let navItems = document.querySelectorAll(".nav-item-profile");
		navItems.forEach((item) => {
			item.classList.remove("active-item");
		});
		if (
			element.target.localName !== "svg" &&
			element.target.localName !== "path" &&
			element.target.localName !== "span"
		) {
			if (!element.target.classList.contains("active-items")) {
				element.target.classList.add("active-item");
			}
		} else if (
			element.target.localName === "span" ||
			element.target.localName === "svg"
		) {
			const elem = element.target.parentElement;
			if (!elem.classList.contains("active-item")) {
				elem.classList.add("active-item");
			}
		} else if (element.target.localName === "path") {
			const elem = element.target.parentElement.parentElement.parentElement;
			if (!elem.classList.contains("active-item")) {
				elem.classList.add("active-item");
			}
		} else if (element.target.localName === "svg") {
			const elem = element.target.parentElement.parentElement;
			if (!elem.classList.contains("active-item")) {
				elem.classList.add("active-item");
			}
		}
	};

	const ShowMembers = () => {
		setGroupControl((values) => {
			return {
				overview: false,
				members: true,
				media: false,
				links: false,
				leave: false,
			};
		});
	};
	const ShowOverview = () => {
		setGroupControl((values) => {
			return {
				overview: true,
				members: false,
				media: false,
				links: false,
				leave: false,
			};
		});
	};
	const ShowMedia = () => {
		setGroupControl((values) => {
			return {
				overview: false,
				members: false,
				media: true,
				links: false,
				leave: false,
			};
		});
	};
	const Showlinks = () => {
		setGroupControl((values) => {
			return {
				overview: false,
				members: false,
				media: false,
				links: true,
				leave: false,
			};
		});
	};
	const LeaveGroup = () => {
		setGroupControl((values) => {
			return {
				overview: false,
				members: false,
				media: false,
				links: false,
				leave: true,
			};
		});
	};

	return (
		<>
			<div className="profile-popup py-2  d-flex">
				<div
					className={
						"group-menu  d-flex flex-column p-1 " +
						(theme.isLight ? "white_grad2" : "dark_grad2")
					}
				>
					<div
						className="active-item d-flex align-items-center nav-item-profile "
						onClick={(event) => {
							ShowOverview();
							ToggleProfileNav(event);
						}}
					>
						<RiErrorWarningLine />
						<span className="px-1"> Overview</span>
					</div>
					<div
						className="nav-item-profile  d-flex align-items-center"
						onClick={(event) => {
							ShowMembers();
							ToggleProfileNav(event);
						}}
					>
						<span className="px-1">
							<HiOutlineUserGroup />
						</span>
						<span>Members</span>
					</div>
					<div
						className="nav-item-profile  d-flex align-items-center"
						onClick={(event) => {
							ShowMedia();
							ToggleProfileNav(event);
						}}
					>
						<span className="px-1">
							<GoFileMedia />
						</span>
						<span>Media</span>
					</div>

					{auth.decodedToken().username === data.adminUsername && (
						<div
							className="nav-item-profile  d-flex align-items-center"
							onClick={(event) => {
								Showlinks();
								ToggleProfileNav(event);
							}}
						>
							<span className="px-1">
								<MdOutlineInsertLink />
							</span>
							<span>Links</span>
						</div>
					)}

					{auth.decodedToken().username === data.adminUsername ? (
						<div
							className="nav-item-profile d-flex text-danger align-items-center"
							onClick={(event) => {
								LeaveGroup();
								ToggleProfileNav(event);
							}}
						>
							<span className="px-1">
								<MdOutlineAccountBalance />
							</span>

							<span>Manage</span>
						</div>
					) : (
						<div
							className="nav-item-profile text-danger  d-flex align-items-center"
							onClick={(event) => {
								LeaveGroup();
								ToggleProfileNav(event);
							}}
						>
							<span className="px-1">
								<MdExitToApp />
							</span>
							<span>Leave group</span>
						</div>
					)}
				</div>
				<div
					className={
						"view-group-menu " + (theme.isLight ? "white_grad1" : "dark_grad1")
					}
				>
					{groupControl.overview && (
						<Overview
							data={data}
							socket={socket}
							setLoadedData={setLoadedData}
						/>
					)}

					{groupControl.members && <Members data={data} />}

					{groupControl.links &&
						auth.decodedToken().username === data.adminUsername && (
							<LinkGenerator
								socket={socket}
								setLoadedData={setLoadedData}
								activeChat={activeChat}
								link={data.inviteLinke}
							/>
						)}

					{groupControl.leave ? (
						auth.decodedToken().username === data.adminUsername ? (
							<div>
								{data.members.length > 1 ? (
									<div>
										<RemoveUser
											data={data}
											socket={socket}
											setLoadedData={setLoadedData}
											activeChat={activeChat}
										/>
										<ChooseAdmin
											data={data}
											socket={socket}
											setLoadedData={setLoadedData}
											activeChat={activeChat}
											setGroupControl={setGroupControl}
											setShowGroupProfile={setShowGroupProfile}
										/>
									</div>
								) : (
									""
								)}
								<DeleteGroup
									socket={socket}
									setLoadedData={setLoadedData}
									activeChat={activeChat}
									setGroupControl={setGroupControl}
									setShowGroupProfile={setShowGroupProfile}
								
								/>
							</div>
						) : (
							<Leavegroup
								socket={socket}
								setLoadedData={setLoadedData}
								activeChat={activeChat}
								setGroupControl={setGroupControl}
								setShowGroupProfile={setShowGroupProfile}
							/>
						)
					) : (
						""
					)}
				</div>
			</div>
		</>
	);
}
