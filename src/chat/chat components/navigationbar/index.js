import React, { useState } from "react";
import DownIcon from "./bottomIcons/downIcon";
import Settings from "./bottomIcons/settings/settings";
import TopIcons from "./topIcons";

export default function NavigationBar({
	setShowProfile,
	showInputFor,
	setShowInputFor,
	userGroupData,
	showProfile,
	socket,
	setUserGroupData,
    playSound,
	setPlaySound,
	vibration,
	setVibration,
    navRef
}) {
	const [showSetting, SetShowSetting] = useState({
		profile: false,
	});

	const toggleSettings = () => {
		setShowProfile(true);
	};
	const ShowProfile = () => {
		SetShowSetting(() => {
			return { profile: true };
		});
		setShowProfile(true);
	};

	return (
		<div className="d-flex justify-content-between h-100 flex-column">
			{showProfile && (
				<Settings
					SetShowSetting={SetShowSetting}
					showSetting={showSetting.settings}
					showProfile={showSetting.profile}
					setShowProfile={setShowProfile}
					showInputFor={showInputFor}
					setShowInputFor={setShowInputFor}
					userGroupData={userGroupData}
					setUserGroupData={setUserGroupData}
					socket={socket}
					playSound={playSound}
					setPlaySound={setPlaySound}
					vibration={vibration}
					setVibration={setVibration}
				/>
			)}
			<TopIcons navRef={navRef} />
			<DownIcon
            userGroupData={userGroupData}
				toggleSettings={toggleSettings}
				ShowProfile={ShowProfile}
				setShowProfile={setShowProfile}
			/>
		</div>
	);
}
