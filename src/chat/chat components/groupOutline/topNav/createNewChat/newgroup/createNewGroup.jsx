import React, { useState } from "react";
import FileReading from "../../../../../../utils/filesUpload/image/image";
import groupAdd from "../../../../../../assets/images/group-add.svg";
import toast from "react-hot-toast";
import { SlPicture } from "react-icons/sl";
import Button from "../../../../../../components/Emoji/button/button";
import { useThemecontext } from "../../../../../../auths/context/themeContext";
import { Login_Auth } from "../../../../../../auths/context/authContext";
import _ from "lodash";
export default function CreateNewGroup({
	socket,
	setControls,
	controls,
	setShowCreateGroup,
	setLoadedData,
	setChatIndex,
	loadedData,
	setActiveChat,
}) {
	const [newGroupData, setGroupData] = useState({
		groupIcon: "",
		groupName: "",
		groupDescription: "",
	});
	const theme = useThemecontext();
	const [loading, setLoading] = useState(false);
	const maxSize = 1000000;
	const auth = Login_Auth();

	const SubmitNewGroup = () => {
		setLoading(() => true);
		socket.emit("new-group", newGroupData, (error, response, group) => {
			setLoading(false);
			if (error) return toast.error(error);
			toast.success(response);

			setControls((values) => {
				return {
					newChat: !controls.newChat,
					next: !controls.next,
				};
			});
			const username = auth.decodedToken().username;
			const filterData = _.omit(group, ["groupParticipants", "adminId"]);

			const constructGroup = {
				members: [username],
				adminUsername: username,
				...filterData,
			};

			setGroupData(() => {
				return { groupIcon: "", groupName: "", groupDescription: "" };
			});
			setLoadedData((values) => {
				return [constructGroup, ...values];
			});
			setChatIndex((v) => {
				if (loadedData.length === 0) {
					setActiveChat(group._id);
					return 0;
				} else {
					return v + 1;
				}
			});
			setShowCreateGroup(false);
		});
	};

	function HandleNewGroupData(event) {
		const { name, value } = event.target;
		setGroupData((values) => {
			return { ...values, [name]: value };
		});
	}
	function UploadProfileimage(event) {
		document.querySelector("#file").click();
	}
	async function OnchangeProfileImage() {
		const file = document.querySelector("#file");
		if (file.files[0].size > maxSize)
			return toast.error("image size should be less than 1MB");

		const base64 = await FileReading(file.files[0]);

		setGroupData((values) => {
			return { ...values, groupIcon: base64 };
		});
	}

	return (
		<div>
			{" "}
			<div className="p-1 ">
				<div
					className={
						"d-flex  align-items-center mt-1 px-2 rounded py-2 " +
						(theme.isLight ? "white_grad2" : "dark_grad2")
					}
				>
					<div className="d-flex align-items-center">
						{newGroupData.groupIcon ? (
							<img
								src={newGroupData.groupIcon}
								className="round-image"
								alt=""
							/>
						) : (
							<SlPicture />
						)}
						<input
							onChange={OnchangeProfileImage}
							type="file"
							name="file"
							id="file"
							hidden
							accept="image/*"
						/>
					</div>
					<div>
						<small
							onClick={UploadProfileimage}
							className="ms-2"
						>
							Add group icon (optional)
						</small>
					</div>
				</div>
				<div className=" rounded py-2">
					<div>Provide group name</div>
					<div>
						<input
							type="text"
							name="groupName"
							value={newGroupData.groupName}
							onChange={HandleNewGroupData}
							className="input mandatoryInput"
							placeholder="*"
						/>
					</div>
					<div className="mt-2">
						<div>Group description</div>
						<textarea
							name="groupDescription"
							value={newGroupData.groupDescription}
							className=""
							onChange={HandleNewGroupData}
							placeholder="  Write about group"
							id=""
							cols=""
							style={{ width: "100%" }}
							rows="3"
						></textarea>
					</div>

					<div>
						<div className="d-flex  mt-3 align-items-center mt-3">
							<div className="w-100 d-flex align-items-center justify-content-center">
								<Button
									text={"Create"}
									loading={loading}
									func={SubmitNewGroup}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
