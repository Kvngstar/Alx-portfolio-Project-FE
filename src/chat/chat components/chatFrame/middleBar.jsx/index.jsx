import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import getToken from "../../../../auths/jwt/authToken";
import "./chat.css";
import { CgProfile } from "react-icons/cg";
import { Login_Auth } from "../../../../auths/context/authContext";
import { useThemecontext } from "../../../../auths/context/themeContext";
import { FiArrowDown } from "react-icons/fi";
const MessageArea = ({
	data,
	getDom,
	group_control,
	unReadMessage,
	scrollInToView,
	scrollPostion,
	setScrollPostion,
	setUnreadMessage,
}) => {
	const auth = Login_Auth();
	const theme = useThemecontext();
	useEffect(() => {
		const ScrollFunc = () => {
			let scrollposition =
				getDom.current.scrollTop +
				getDom.current.parentElement.computedStyleMap().get("height").value +
				20;
			let childHeight = getDom.current.children[0].clientHeight;
			// let parentHeight = getDom.current.clientHeight;

			if (Math.ceil(scrollposition) < childHeight) {
				setScrollPostion(true);
			} else {
				setScrollPostion(false);
				setUnreadMessage(0);
			}
			if (scrollPostion) {
			}
		};
		ScrollFunc();

		const scrollListener = getDom.current.addEventListener(
			"scroll",
			ScrollFunc
		);

		return () => {
			getDom.current.removeEventListener("scroll", scrollListener);
		};
	}, [unReadMessage]);

	function IsItYesterday(givenDateString) {
		// Get the current date
		const currentDate = new Date();

		// Get yesterday's date by subtracting one day (24 hours) from the current date
		const yesterdayDate = new Date(currentDate);
		yesterdayDate.setDate(currentDate.getDate() - 1);

		// Given date to check (e.g., "2024-05-07T06:54:54.391Z")

		const givenDate = new Date(givenDateString);

		// Compare if the given date is equal to yesterday's date
		if (givenDate.toDateString() === yesterdayDate.toDateString()) {
			return true;
		} else {
			return false;
		}
	}
	function IsItToday(incomingDate) {
		const currentDate = new Date().toDateString();
		const incomingDateReformed = new Date(incomingDate).toDateString();
		if (incomingDateReformed === currentDate) {
			return true;
		} else {
			return false;
		}
	}

	const viewImageFullscreen = (event) => {
		event.target.requestFullscreen();
	};

	return (
		<div className="messageUs rounded box-position">
			{(scrollPostion || unReadMessage > 0) && (
				<div className="rounded d-flex align-items-center justify-content-center position-absolute z-2 pop_up d-flex align-items-center bg-danger text-light">
					<span
						onClick={() => {
							getDom.current.children[0].lastElementChild.scrollIntoView({
								behavior: "smooth",
							});
						}}
					>
						{unReadMessage > 0 ? <div>{unReadMessage}</div> : ""}
						<FiArrowDown />
					</span>{" "}
				</div>
			)}
			<div
				className="chatBox"
				ref={getDom}
			>
				<div className="scrollable">
					{group_control.showGroupChat && data.groupMessages.length < 1 ? (
						<div className="text-center mt-4 p-3 mx-4  text-success fw-bold rounded">
							Start chatting now 💚
						</div>
					) : (
						data.groupMessages.map((v, index) => {
							return (
								<div
									className="textContainer"
									key={index}
								>
									{index &&
									new Date(v.date).toISOString().slice(0, 10) >
										new Date(data.groupMessages[index - 1].date)
											.toISOString()
											.slice(0, 10) ? (
										<div className="text-center my-5 position-sticky top-0">
											<span className="bg-success p-2 rounded-pill">
												<small>
													{IsItToday(v.date)
														? "Today"
														: IsItYesterday(v.date)
														? "Yesterday"
														: new Date(v.date).toDateString()}
												</small>
											</span>{" "}
										</div>
									) : (
										""
									)}

									{v.type !== "joined" &&
									v.type !== "left" &&
									v.type !== "changedProfile" &&
									v.type !== "deleteGroup" &&
									jwtDecode(auth.token)._id === v._userId ? (
										<div
											className={
												"customer_textbox " +
												(theme.isLight ? "textbox_light" : "textbox_dark")
											}
										>
											{v.type === "image" ? (
												<div>
													<img
														src={v.text}
														alt=""
														height="200px"
														onClick={viewImageFullscreen}
													/>
												</div>
											) : (
												<span className="d-flex align-items-center  mb-2">
													<CgProfile size={20} />

													<div className="ralewaymeduim ms-2 fontsize12">
														{" "}
														{v.text}
													</div>
												</span>
											)}
											<span className="chat_date p-1">
												{" "}
												<span
													className={
														"customer_label me-1 " +
														(theme.isLight ? "white_label" : "dark_label")
													}
												>
													{v.username}
												</span>
												{new Date(v.date).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</span>
										</div>
									) : v.type !== "joined" &&
									  v.type !== "left" &&
									  v.type !== "deleteGroup" &&
									  v.type !== "changedProfile" ? (
										<div
											className={
												"me-4 admin_textbox " +
												(theme.isLight ? "textbox_light" : "textbox_dark")
											}
										>
											{v.type === "image" ? (
												<div>
													<img
														src={v.text}
														alt=""
														height="200px"
														onClick={viewImageFullscreen}
													/>
												</div>
											) : (
												<div className="d-flex align-items-center mb-2">
													<CgProfile size={20} />
													<div className="ms-2 fontsize12"> {v.text}</div>
												</div>
											)}
											<span className="chat_date">
												{" "}
												<span
													className={
														"admin_label me-1 " +
														(theme.isLight ? "white_label" : "dark_label")
													}
												>
													{v.username}
												</span>
												{new Date(v.date).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</span>
										</div>
									) : v.type !== "changedProfile" &&
									  v.type !== "deleteGroup" &&
									  v.type !== "left" ? (
										<div className="text-center my-2">
											<span className="bg-success  p-2 rounded-pill ">
												<small>
													<small>
														{v.username === auth.decodedToken().username
															? "You joined"
															: v.text}
													</small>
												</small>
											</span>
										</div>
									) : v.type !== "changedProfile" &&
									  v.type !== "deleteGroup" ? (
										<div className="text-center my-2">
											<span className="bg-info  p-2 rounded-pill ">
												<small>
													<small>
														{v.username === auth.decodedToken().username &&
														v.username === data.adminUsername
															? v.text.replace(
																	`admin ~${auth.decodedToken().username}`,
																	"You"
															  )
															: v.username !== auth.decodedToken().username &&
															  new RegExp(
																	auth.decodedToken().username,
																	"gi"
															  ).test(v.text)
															? v.text.replace(
																	auth.decodedToken().username,
																	"you"
															  )
															: v.username === auth.decodedToken().username &&
															  new RegExp(
																	auth.decodedToken().username,
																	"gi"
															  ).test(v.text)
															? "You left"
															: v.text}
													</small>
												</small>
											</span>
										</div>
									) : v.type !== "deleteGroup" ? (
										<div className="text-center my-2">
											<span className="bg-info  p-2 rounded-pill ">
												<small>
													<small>
														{v.username === auth.decodedToken().username
															? v.text.replace(
																	`admin ~${auth.decodedToken().username}`,
																	"You"
															  )
															: v.text}
													</small>
												</small>
											</span>
										</div>
									) : (
										<div className="text-center my-2">
											<span className="bg-danger  p-2 rounded-pill ">
												<small>
													<small>
														{v.username === auth.decodedToken().username
															? "You deleted the group"
															: v.text}
													</small>
												</small>
											</span>
										</div>
									)}
								</div>
							);
						})
					)}{" "}
				</div>
			</div>
		</div>
	);
};

export default MessageArea;
