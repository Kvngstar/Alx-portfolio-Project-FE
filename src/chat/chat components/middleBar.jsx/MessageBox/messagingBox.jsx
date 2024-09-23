import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import MessageArea from "..";
import { Login_Auth } from "../../../../../auths/context/authContext";
import PreviewImage from "../inputBox/preview/preview";
import Textarea from "../inputBox/textarea";

export default function MessagingBox({
	data,
	getDom,
	group_control,
	closeGroupPopUp,
	CloseUpClone,
	socket,
	activeChat,
	unReadMessage,
	scrollInToView,
	setChatIndex,
	scrollPostion,
	setScrollPostion,
	setUnreadMessage,
}) {
	const auth = Login_Auth();
	const [inputData, setInputData] = useState({
		addIcon: false,
		disableInput: false,
		type: "",
		text: "",
		username: function () {
			if (auth.token) {
				return jwtDecode(auth.token).username;
			}
			return null;
		},
		_userId: function () {
			if (auth.token) {
				return jwtDecode(auth.token)._id;
			}
			return null;
		},
	});

	return (
		<div className="">
			{/* Handles the Chat box and Previewing of Images */}
			<div
				className="content-area  position-relative"
				onClick={() => {
					closeGroupPopUp();
					CloseUpClone();
				}}
			>
				<div>
					<MessageArea
						group_control={group_control}
						data={data}
						getDom={getDom}
						groupcontrol={group_control}
						unReadMessage={unReadMessage}
						scrollPostion={scrollPostion}
						setScrollPostion={setScrollPostion}
						scrollInToView={scrollInToView}
                        setUnreadMessage={setUnreadMessage}
					/>
				</div>
				{inputData.type === "image" && (
					<PreviewImage
						previewimg={inputData.text}
						setInputData={setInputData}
					/>
				)}
			</div>

			<Textarea
				inputData={inputData}
				setInputData={setInputData}
				socket={socket}
				data={data}
				activeChat={activeChat}
			/>
		</div>
	);
}
