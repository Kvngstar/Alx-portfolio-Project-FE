import React, { useState } from "react";
import General from "./general/general";
import Notification from "./notification/notification";
import Account from "./account/account";
import Help from "./help/help";
import UserProfile from "../profile/userProfile";
import { ToggleSettingNav } from "../../../../../utils/toggleIndicator/toggle";
import { MdOutlineComputer } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { BiBell } from "react-icons/bi";
import { FiHelpCircle } from "react-icons/fi";
import { BsSendCheck } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

export default function Settings({
	clearPopUpRef,
	showProfile,
	showInputFor,
	setShowInputFor,
	userGroupData,
	SetShowSetting,
	socket,
	setUserGroupData,
	playSound,
	setPlaySound,
	vibration,
	setVibration,
}) {
	const [settingsControls, setSettingsControls] = useState({
		general: true,
		account: false,
		chats: false,
		help: false,
	});
	//FUNCTIONS THAT HANDLE CONDITIONAL RENDERING OF SETTINNGS
	const ShowAccount = () => {
		setSettingsControls((values) => {
			return {
				showSettings: true,
				general: false,
				account: true,
				chats: false,
				help: false,
			};
		});
		SetShowSetting((values) => {
			return { ...values, profile: false };
		});
	};
	const ShowGeneral = () => {
		setSettingsControls((values) => {
			return {
				showSettings: true,
				general: true,
				account: false,
				chats: false,
				help: false,
			};
		});
		SetShowSetting((values) => {
			return { ...values, profile: false };
		});
	};
	const ShowChats = () => {
		setSettingsControls((values) => {
			return {
				showSettings: true,
				general: false,
				account: false,
				chats: true,
				help: false,
			};
		});
		SetShowSetting((values) => {
			return { ...values, profile: false };
		});
	};
	const ShowHelp = () => {
		setSettingsControls((values) => {
			return {
				showSettings: true,
				general: false,
				account: false,
				chats: false,
				help: true,
			};
		});
		SetShowSetting((values) => {
			return { ...values, profile: false };
		});
	};
	const ShowProfilee = () => {
		setSettingsControls((values) => {
			return {
				general: false,
				account: false,
				chats: false,
				help: false,
			};
		});
		SetShowSetting((values) => {
			return { ...values, profile: true };
		});
	};

	//FUNCTIONS THAT HANDLE CONDITIONAL RENDERING OF SETTINNGS

	return (
		<>
			<div className="settings">
				<div
					className="bg-light settings-popup rounded d-flex"
					ref={clearPopUpRef}
				>
					<div className="group-menu white_grad1  justify-content-between d-flex flex-column">
						<div
							onClick={(event) => {
								ToggleSettingNav(event);
								ShowGeneral();
							}}
							className="nav-item-settings active-item d-flex px-2 align-items-center"
						>
							<MdOutlineComputer />
							<span className="px-2">General</span>
						</div>
						<div
							onClick={(event) => {
								ShowAccount();
								ToggleSettingNav(event);
							}}
							className="nav-item-settings d-flex align-items-center px-2"
						>
							<IoKeyOutline />
							<span className="px-2 ">Account</span>
						</div>
						<div
							onClick={(event) => {
								ToggleSettingNav(event);
								ShowChats();
							}}
							className="nav-item-settings d-flex align-items-center px-2"
						>
							<BiBell />
							<span className="px-2">Notify</span>
						</div>
						<div
							onClick={(event) => {
								ToggleSettingNav(event);
								ShowHelp();
							}}
							className="nav-item-settings d-flex align-items-center px-2"
						>
							<FiHelpCircle />
							<span className="px-2">Help</span>
						</div>
						<div
							onClick={(event) => {
								ToggleSettingNav(event);
								ShowHelp();
							}}
							className="nav-item-settings d-flex align-items-center px-2"
						>
							<BsSendCheck />
							<span className="px-2">Invite</span>
						</div>
						<div
							onClick={(event) => {
								ToggleSettingNav(event);
								ShowProfilee();
							}}
							className="nav-item-settings d-flex align-items-center px-2"
						>
							<CgProfile />
							<span className="px-2">Profile</span>
						</div>
					</div>
					<div className="view-profile-menu">
						{settingsControls.general && showProfile === false && <General />}

						{settingsControls.chats && (
							<Notification
								playSound={playSound}
								setPlaySound={setPlaySound}
								vibration={vibration}
								setVibration={setVibration}
							/>
						)}
						{settingsControls.account && <Account />}

						{settingsControls.help && <Help />}
						{showProfile && (
							<UserProfile
								userGroupData={userGroupData}
								showInputFor={showInputFor}
								setShowInputFor={setShowInputFor}
								socket={socket}
								setUserGroupData={setUserGroupData}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
