import React, { useState } from "react";
import Outline from "./outline/outline";
import SearchBox from "./searchBox/searchBox";
import NewChat from "./topNav/createNewChat";
import CreateNewGroup from "./topNav/createNewChat/newgroup/createNewGroup";
import Top from "./topNav/icon/top";
import { useThemecontext } from "../../../auths/context/themeContext";

export default function GroupOutline({
	showCreateGroup,
	setShowCreateGroup,
	NewGroup,
	toggleNewChat,
	loadedData,
	DisplayChats,
	CloseUpClone,
	userGroupData,
	socket,
	setLoadedData,
	chatRef,
	loading,
	loaded,
	setChatIndex,
    setActiveChat
}) {
	const [controls, setControls] = useState({
		newChat: true,
		next: false,
	});
	const theme = useThemecontext();
	const [newGroupData, setGroupData] = useState({
		groupIcon: "",
		groupName: "",
		groupDescription: "",
	});
	const [searchArray, setSearchArray] = useState([]);
	return (
		<div
			ref={chatRef}
			className={"chats " + (theme.isLight ? "white_grad1" : "dark_grad1")}
		>
			{showCreateGroup && controls.newChat && (
				<NewChat
					createNewGroup={NewGroup}
					setControls={setControls}
					controls={controls}
					setShowCreateGroup={setShowCreateGroup}
					
				/>
			)}
			{showCreateGroup && controls.next && (
				<div
					className={
						"create-new-group py-3 px-2 " +
						(theme.isLight ? "white_grad1" : "dark_grad1 border-3 border-dark")
					}
				>
					<CreateNewGroup
						setControls={setControls}
						controls={controls}
						socket={socket}
                        loadedData={loadedData}
						setShowCreateGroup={setShowCreateGroup}
						setLoadedData={setLoadedData}
                        setActiveChat={setActiveChat}
						setChatIndex={setChatIndex}
					/>
				</div>
			)}

			<Top toggleNewChat={toggleNewChat} />
			<SearchBox
				socket={socket}
				setSearchArray={setSearchArray}
				loadedData={loadedData}
			/>

			<div onClick={CloseUpClone}>
				<Outline
					loadedData={searchArray.length > 0 ? searchArray : loadedData}
					DisplayChats={DisplayChats}
					loading={loading}
					userGroupData={userGroupData}
					loaded={loaded}
				/>
			</div>
		</div>
	);
}
