import React, { useEffect, useState } from "react";
import SenderAudio from "../../../../../../calls/functions/audio";
import call from "../../../../../../assets/images/call.svg";
import groupadd from "../../../../../../assets/images/group.svg";
import "./video.css";
import { MdCallEnd, MdOutlineCancel } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { SlCallIn } from "react-icons/sl";
import { useThemecontext } from "../../../../../../auths/context/themeContext";
export default function VideoCall({ socket, data, setCallInit }) {
	const [declined, setDeclined] = useState(false);
	const theme = useThemecontext();
	useEffect(() => {
		SenderAudio(socket, data._id);
		return () => {};
	}, []);

	function StopVideo() {
		setCallInit((v) => {
			return { ...v, isCall: false, type: "" };
		});
	}

	return (
		<div className="video-container d-flex align-items-center justify-content-center flex-column px-2 text-dark">
			<div
				className={
					"video-wrap rounded  w-100 px-2 " +
					(theme.isLight ? "white_grad2" : "dark_grad2")
				}
			>
				<div className="d-flex align-items-center p-2 justify-content-between">
					<div>Social Connect</div>
					<div>Encrypted</div>
					<div onClick={StopVideo}>
						<MdOutlineCancel />
					</div>
				</div>
				{/* <div className="video-center white_grad1 rounded d-flex flex-column justify-content-center align-items-center">
					<img
						src={data.groupIcon}
						className="round-image"
						style={{ width: "100px", height: "100px" }}
						alt=""
					/>
					<div>{data.groupName}</div>
					<div>
						{declined ? (
							<small className="text-danger">Declined</small>
						) : (
							<small className="calling">Calling</small>
						)}
					</div>
				</div> */}
				<video src=""></video>
				<video
					src=""
					id="videoo"
					height="auto"
					width="100%"
				></video>
				<div className="py-2 d-flex align-items-center justify-content-around">
					<div>
						<BiUserCircle fontSize={30} />
					</div>
					<div>
						<MdCallEnd fontSize={30} />
					</div>
				</div>
			</div>
		</div>
	);
}
