import _ from "lodash";
import React, { useState } from "react";
import EmojiPicker from "../../../../../components/Emoji/picker";
import FileReading from "../../../../../utils/filesUpload/image/image";
import attachment from "../../../../../assets/images/attachment.svg";
import send from "../../../../../assets/images/send.svg";
import smiley from "../../../../../assets/images/smiley.svg";
import toast from "react-hot-toast";
import { Loader } from "../../../../../utils/loader/loader";
import { useThemecontext } from "../../../../../auths/context/themeContext";
import { CgAttachment, CgSmile } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
export default function Textarea({
	inputData,
	setInputData,
	activeChat,
	socket,
	data,
}) {
	const maxSize = 1000000;
	const theme = useThemecontext();
	const [loading, setLoading] = useState(false);
	function HandleInputs(event) {
		const { name, value } = event.target;
		setInputData((values) => {
			return { ...values, type: name, text: value, groupId: activeChat };
		});
	}

	function SendInformation() {
		if (!inputData.text || inputData.text === "")
			return toast.error("message cannot be empty");
		setLoading(true);
		socket.emit(
			`grouper-message-${data._id}`,
			_.omit(inputData, ["disableInput"]),
			() => {
				setLoading(false);
			}
		);

		setInputData((values) => {
			return { ...values, type: "", text: "", disableInput: false };
		});
	}
	function UploadFile() {
		let file = document.querySelector(".file").click();
	}

	async function HandleFileUpload() {
		let file = document.querySelector("#fileUpload");

		if (file.files[0].size > maxSize)
			return toast.error("Image size should be less than 1mb");

		setInputData((values) => {
			return { ...values, disableInput: true };
		});
		const Base64 = await FileReading(file.files[0]);
		setInputData((values) => {
			return {
				...values,
				type: "image",
				text: Base64,
				groupId: activeChat,
			};
		});
	}
	function ShowIcons() {
		setInputData((v) => {
			return { ...v, addIcon: true };
		});
	}

	return (
		<div
			className={"text-area " + (theme.isLight ? "white_grad1" : "dark_grad1")}
		>
			<div className="Emoji-container">
				{inputData.addIcon && (
					<EmojiPicker
						setInputData={setInputData}
						inputData={inputData}
					/>
				)}
			</div>

			<div
				className={
					"icon-attachment " + (theme.isLight ? "white_grad2" : "dark_grad2")
				}
			>
				<div onClick={ShowIcons}>
					<CgSmile />
				</div>
				<div>
					<span onClick={UploadFile}>
						<CgAttachment />
					</span>

					<input
						type="file"
						id="fileUpload"
						onChange={HandleFileUpload}
						className="file"
						name="picture"
						hidden
					/>
				</div>
			</div>
			{inputData.disableInput == false && (
				<div className="textbox">
					<input
						type="text"
						value={inputData.text}
						onChange={HandleInputs}
						name="text"
						className="input"
						placeholder="Type a message"
					/>
				</div>
			)}
			<div className="styleSendButton py-2 ">
				{loading ? (
					Loader("syncloader", loading, undefined, 6, "grey")
				) : (
					<span onClick={SendInformation}>
						<FiSend />
					</span>
				)}
			</div>
		</div>
	);
}
