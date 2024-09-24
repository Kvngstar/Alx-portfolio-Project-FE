import React, { useState } from "react";
import toast from "react-hot-toast";
import { Login_Auth } from "../../../../../auths/context/authContext";
import { BiEditAlt } from "react-icons/bi";
import Button from "../../../../../components/Emoji/button/button";
import FileReading from "../../../../../utils/filesUpload/image/image";
import { Loader } from "../../../../../utils/loader/loader";
export default function UserProfile({
	userGroupData,
	showInputFor,
	setShowInputFor,
	socket,
	setUserGroupData,
}) {
	const maxSize = 1000000;
	const [resetProfileData, setResetProfileData] = useState({
		type: "",
		new: "",
	});
	const [loading, setLoading] = useState(false);
	const auth = Login_Auth();

	const SubmitNewProfileData = () => {
		setLoading(true);
		// Limit this action to bi-weekly
		setShowInputFor((v) => {
			return { name: false, about: false, phoneNo: false };
		});
		socket.emit("update_user-data", resetProfileData, (message) => {
			toast.success(message);
		});

		setUserGroupData((v) => {
			return { ...v, [resetProfileData.type]: resetProfileData.data };
		});
		if (!socket || resetProfileData.type !== "username") {
			setLoading(false);
			return;
		}
		console.log("logging out ...");
		setLoading(false);
		// auth.logout();
	};

	const EditName = () => {
		setShowInputFor((values) => {
			return {
				name: !showInputFor.name,
				about: false,
				phoneNo: false,
			};
		});
	};
	const EditAbout = () => {
		setShowInputFor((values) => {
			return {
				name: false,
				about: !showInputFor.about,
				phoneNo: false,
			};
		});
	};
	const EditPhoneNo = () => {
		setShowInputFor((values) => {
			return {
				name: false,
				about: false,
				phoneNo: !showInputFor.phoneNo,
			};
		});
	};
	const ResetUserData = (event) => {
		let { name, value } = event.target;
		let data;
		if (name === "username") {
			data = "username";
		} else if (name === "about") {
			data = "about";
		} else if (name === "phoneNum") {
			data = "phoneNum";
		}
		setResetProfileData((values) => {
			return { type: data, data: value };
		});
	};

	return (
		<div className="pt-3 px-3 pb-3">
			<div>
				<img
					src={userGroupData.profileImage}
					className="round-image mb-2"
					height="400px"
					width="400px"
					alt=""
				/>
			</div>
			<div className="">
				{showInputFor.name === true ? (
					<div className="d-flex justify-content-between flex-column">
						<input
							type="text"
							name="username"
							className="input"
							id=""
							value={resetProfileData.new}
							onChange={ResetUserData}
							placeholder="Change name"
						/>
						<div className="mt-2 d-flex justify-content-between">
							<Button
								text={"Change"}
								loading={loading}
								fullWidth={false}
								func={SubmitNewProfileData}
							/>

							<Button
								text={"Cancel"}
								fullWidth={false}
								func={EditName}
							/>
						</div>
					</div>
				) : (
					<div className="d-flex justify-content-between  mt-2">
						<div>{userGroupData?.username} </div>
						<div
							className=""
							onClick={EditName}
						>
							<BiEditAlt />
						</div>
					</div>
				)}
			</div>

			<div className=" mt-2">
				{showInputFor.about === false ? (
					<div className="d-flex justify-content-between">
						<div className="d-flex flex-column">
							<div>About</div>
							<div>{userGroupData?.about}</div>{" "}
						</div>
						<div
							className=""
							onClick={EditAbout}
						>
							<BiEditAlt />
						</div>
					</div>
				) : (
					<div className="d-flex mt-4 mb-2 flex-column">
						<input
							type="text"
							name="about"
							className="input"
							onChange={ResetUserData}
							value={resetProfileData.new}
							id=""
							placeholder="Change about"
						/>
						<div className="mt-2 d-flex justify-content-between">
							<Button
								text={"Change"}
								loading={loading}
								fullWidth={false}
								func={SubmitNewProfileData}
							/>

							<Button
								text={"Cancel"}
								fullWidth={false}
								func={EditAbout}
							/>
						</div>
					</div>
				)}
			</div>
			<div className="mt-2">
				{showInputFor.phoneNo === false ? (
					<div className="d-flex justify-content-between">
						<div className="d-flex flex-column ">
							<div>phone number</div>
							<div>{userGroupData.phoneNum}</div>{" "}
						</div>
						<div
							className=""
							onClick={EditPhoneNo}
						>
							<BiEditAlt />
						</div>
					</div>
				) : (
					<div className="d-flex mb-2 flex-column">
						<input
							type="text"
							name="phoneNo"
							// onChange={ResetUserData}
							// value={resetProfileData.new}
							className="input"
							id=""
							placeholder="Change phone no."
						/>
						<div className="mt-2 d-flex justify-content-between">
							<Button
								text={"Change"}
								loading={loading}
								fullWidth={false}
								// func={SubmitNewProfileData}
							/>

							<Button
								text={"Cancel"}
								fullWidth={false}
								func={EditPhoneNo}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
