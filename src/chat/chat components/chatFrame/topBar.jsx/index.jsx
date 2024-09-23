import React from "react";
import Profile from "./profile";
import TopIcons from "./liveCall";
import { useState } from "react";
export default function Topbar({
	data,
	socket,
	showGroupProfile,
	activeChat,
	callInit,
	setCallInit,
	isPersonalChat,
	setShowGroupProfile,
	setLoadedData,
    setActiveChat,
}) {
	const [groupControl, setGroupControl] = useState({
		overview: true,
		members: false,
		media: false,
		links: false,
		leave: false,
	});
	return (
		<div>
			<Profile
				data={data}
				setLoadedData={setLoadedData}
				socket={socket}
				showGroupProfile={showGroupProfile}
				activeChat={activeChat}
				isPersonalChat={isPersonalChat}
				groupControl={groupControl}
				setGroupControl={setGroupControl}
                setShowGroupProfile={setShowGroupProfile}
                setActiveChat={setActiveChat}
			/>
			<TopIcons
				data={data}
				setCallInit={setCallInit}
				socket={socket}
				callInit={callInit}
				setShowGroupProfile={setShowGroupProfile}
				setGroupControl={setGroupControl}
                setActiveChat={setActiveChat}
			/>
		</div>
	);
}
