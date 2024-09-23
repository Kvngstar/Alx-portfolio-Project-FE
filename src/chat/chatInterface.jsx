import React, { useEffect, useRef, useState } from "react";

import GetToken, { DecodedToken } from "../auths/jwt/authToken.js";

import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";
import { Login_Auth } from "../auths/context/authContext.js";
import Socket from "../services/socket/socket.js";
import MessagingBox from "./chat components/chatFrame/middleBar.jsx/MessageBox/messagingBox.jsx";
import Topbar from "./chat components/chatFrame/topBar.jsx/index.jsx";
import GroupOutline from "./chat components/groupOutline/index.jsx";
import NavigationBar from "./chat components/navigationbar/index.js";
import tone from "../assets/audio/iphone_sound.mp3";
import whatsapp from "../assets/audio/whatsapp.mp3";
import whatsapp_notification from "../assets/audio/whatsapp_notification.mp3";
import "./chatInterface.css";
// import Typed from "typed.js";

export default function ChatInterface() {
	const [loaded, setLoaded] = useState(false);
	const [activeChat, setActiveChat] = useState("");
	const activeChatRef = useRef(activeChat);
	const clearPopUpRef = useRef([]);
	const [isPersonalChat, setIsPersonalChat] = useState(false);
	const [loadedData, setLoadedData] = useState([]);

	// New ones under
	const [showProfile, setShowProfile] = useState(false);
	const [showCreateGroup, setShowCreateGroup] = useState(false);
	const [userGroupData, setUserGroupData] = useState({});
	const getDom = useRef(null);
	const chatRef = useRef(null);
	const spaceRef = useRef(null);
	const loadedDataRef = useRef(loadedData);
	const [chatIndex, setChatIndex] = useState();
	const audio = new Audio(whatsapp_notification);
	const token = GetToken();
	let socket = useRef(null);
	const auth = Login_Auth();
	const typedRef = useRef(null);
	const [playSound, setPlaySound] = useState(
		JSON.parse(localStorage.getItem("playSound")) || true
	);
	const activeSound = useRef(playSound);
	const [vibration, setVibration] = useState(
		localStorage.getItem("vibration") || "Default ~on~"
	);
	const [inlineGrpMsg, setInlineGrpMsg] = useState(0);
	const inlineMsgRef = useRef(0);
	const [group_control, setGroup_Control] = useState({
		showGroupChat: false,
		_id: "",
		groupId: "",
	});

	const [callInit, setCallInit] = useState({
		isCall: false,
		type: "",
	});
	const navRef = useRef(null);

	// Handle User input both text, image, audio and video call

	const [personalChatControl, setPersonalChatControl] = useState({
		showPersonalChatProfile: false,
		overview: false,
		media: false,
		links: false,
	});

	// For Change of Data
	const [showInputFor, setShowInputFor] = useState({
		name: false,
		about: false,
		phoneNo: false,
	});

	// For Creating New Group
	const [newGroupData, setGroupData] = useState({
		groupIcon: "",
		groupName: "",
		groupDescription: "",
	});
	const [resetProfileData, setResetProfileData] = useState({
		type: "",
		new: "",
	});

	const [showGroupProfile, setShowGroupProfile] = useState(false);

	// FUNCTIONS FOR HANDLING CREATE NEW CHAT POP-UPS
	const CreateNewChat = (event) => {
		setShowCreateGroup(true);
	};

	// SHOW GROUP PROFILE

	const DisplayChats = (chatId) => {
		const extractGroup = loadedData.filter((p) => {
			return p._id === chatId;
		});

		const indexx = loadedData.findIndex((t) => t._id === chatId);
		setChatIndex((v) => indexx);

		// Console.log("hhhmm",extractGroup[0])
		setUserGroupData((v) => {
			return {
				...v,
				groups: v.groups.map((v) => {
					if (v.groupCode === chatId) {
						return { ...v, numberOfNewMessages: 0 };
					} else {
						return v;
					}
				}),
			};
		});
		socket.current.emit("reset-group-count", chatId);

		setGroup_Control((values) => {
			return {
				showGroupChat: true,
				_id: "",
				groupId: "",
			};
		});
		setShowGroupProfile(false);
		setInlineGrpMsg(0);
		setActiveChat(() => chatId);
		setLoaded(true);
	};

	const closeGroupPopUp = () => {
		setShowGroupProfile(false);
		setShowCreateGroup(false);
		setPersonalChatControl((values) => {
			return {
				showPersonalChatProfile: false,
				overview: false,
				members: false,
				media: false,
				links: false,
			};
		});
	};

	// Function send Message to Group

	const CloseUpClone = () => {
		setShowProfile(false);
		setShowCreateGroup(false);

		setShowInputFor((values) => {
			return {
				name: false,
				about: false,
				phoneNo: false,
			};
		});
	};

	const scrollInToView = () => {
		getDom.current.children[0].lastElementChild.scrollIntoView({
			behavior: "smooth",
		});
		setInlineGrpMsg(0);
	};

	useEffect(() => {
		const hideChat = () => {
			const elem1 = chatRef.current;
			const computedStyle = window.getComputedStyle(elem1);
			const chatDisplay = computedStyle.getPropertyValue("display");
			console.log(chatDisplay, "chatDisplay");
			elem1.style.display = "block";
			// const computedStyle2 = window.getComputedStyle(elem2);
			// const spaceDisplay = computedStyle2.getPropertyValue("display");
			// console.log(spaceDisplay, "chatDisplay");
			// elem2.style.display = "none";
			// chatRef.current.style.display = "block";
			// chatRef.current.style.classList.toggle("chat");
			// spaceRef.current.style.display = "none";
		};

		const funcr = () => {
			let play = document.getElementsByClassName("short-box");
			play = Array.from(play);

			chatRef.current.style.display = "none";
			spaceRef.current.style.display = "block";
			console.log(spaceRef.current, "spaceRef.current");
			// const style = window.getComputedStyle(spaceRef.current)
			// console.log(style, "style");
			console.log("herer");
		};

		const handleResize = () => {
			let play = document.getElementsByClassName("short-box");
			play = Array.from(play);
			if (window.innerWidth < 700) {
				console.log("play");
				navRef.current.addEventListener("click", hideChat);

				play.forEach((v) => {
					v.addEventListener("click", funcr);
				});
			} else {
				play.forEach((v) => {
					v.removeEventListener("click", funcr);
				});
				navRef.current.removeEventListener("click", hideChat);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [loadedData]);

	// useEffect(() => {
	// 	const typed = new Typed(typedRef.current, {
	// 		strings: [
	// 			"Welcome to SocialConnect",
	// 			"Where Freedom truely lies",
	// 			"Even ELON can attest to that",
	// 		],
	// 		typeSpeed: 50,
	// 		backSpeed: 50,
	// 		backDelay: 200,
	// 		loop: true,
	// 	});

	// 	return () => {
	// 		typed.destroy();
	// 	};
	// }, []);
	useEffect(() => {
		if (socket.current === null) {
			socket.current = Socket(auth.token, "chat");
		}
		return () => {
			socket.current.disconnect();
		};
	}, [token]);
	useEffect(() => {
		loadedDataRef.current = loadedData;
	}, [loadedData]);
	useEffect(() => {
		inlineMsgRef.current = inlineGrpMsg;
	}, [inlineGrpMsg]);

	useEffect(() => {
		activeSound.current = playSound;
		localStorage.setItem("playSound", playSound);
		localStorage.setItem("vibration", vibration);
	}, [playSound]);
	useEffect(() => {
		activeChatRef.current = activeChat;
	}, [activeChat]);
	useEffect(() => {
		if (!socket.current) {
			return;
		}
		console.log("userGroupData", userGroupData);
		socket.current.on("group-information", (data) => {
			setLoadedData(() => data);
		});
		socket.current.on("user-groupdata", (data) => {
			setUserGroupData(() => data);
		});

		return () => {
			socket.current.off("group-information");
			socket.current.off("user-groupdata");
		};
	}, []);

	useEffect(() => {
		if (!socket.current) return;

		socket.current.on("newMessage", (v) => {
			const preview = document.getElementsByClassName("last-message");
			const ElemArray = Array.from(preview);
			ElemArray.forEach((b) => {
				if (v.grpId === b.getAttribute("_id")) {
					v.type === "image"
						? (b.innerHTML = "image")
						: (b.innerHTML = v.text || "loading ..");
				}
			});
			const loadedData = loadedDataRef.current;
			const indexx = loadedData.findIndex((t) => {
				return t._id === v.grpId;
			});

			if (indexx === -1) {
				toast.error("Negative index error");
				return;
			}

			// For demonstration, let's update the name of the first object

			if (
				loadedData[indexx]._id === v.grpId &&
				DecodedToken()._id === v._userId
			) {
				setTimeout(() => {
					getDom.current.children[0].lastElementChild.scrollIntoView({
						behavior: "smooth",
					});
				}, 500);
				setChatIndex(0);
			}

			if (
				DecodedToken()._id !== v._userId &&
				activeChatRef.current === v.grpId
			) {
				setInlineGrpMsg((v) => inlineMsgRef.current + 1);
			}
			if (
				DecodedToken()._id !== v._userId &&
				activeChatRef.current !== v.grpId
			) {
				setUserGroupData((t) => {
					return {
						...t,
						groups: t.groups.map((f) => {
							if (f.groupCode === v.grpId) {
								return { ...f, numberOfNewMessages: f.numberOfNewMessages + 1 };
							} else {
								return f;
							}
						}),
					};
				});
				if (activeSound.current && activeChatRef.current) {
					audio.play();
					navigator.vibrate(200);
				}
			}

			setLoadedData((values) => {
				// Find the index of the object to update
				const updateIndex = values.findIndex((obj) => obj._id === v.grpId);

				// Handle the case where the object to update isn't found
				if (updateIndex === -1) {
					console.warn("Object to update not found in loadedData.");
					return values; // Return the original values if not found
				}

				// Create a new array with the updated object at the beginning
				const updatedValues = [
					// Spread the updated object with the new message
					{
						...values[updateIndex],
						groupMessages: [...values[updateIndex].groupMessages, v],
					},
					// Spread the remaining objects from the original array (excluding the updated one)
					...values.slice(0, updateIndex),
					...values.slice(updateIndex + 1),
				];

				return updatedValues;
			});

			// Reciever(socket.current, groupChatDisplay.groupId);
		});
	}, []);

	return (
		<>
			<div className="hero-section">
				<Toaster position="top center" />
				<div
					className="side-menu"
					onClick={closeGroupPopUp}
				>
					{/* MODULARIZE TO NAVBAR CHAT-BOX */}
					<NavigationBar
						showProfile={showProfile}
						setShowProfile={setShowProfile}
						showInputFor={showInputFor}
						setShowInputFor={setShowInputFor}
						userGroupData={userGroupData}
						resetProfileData={resetProfileData}
						socket={socket.current}
						setUserGroupData={setUserGroupData}
						playSound={playSound}
						setPlaySound={setPlaySound}
						vibration={vibration}
						setVibration={setVibration}
						navRef={navRef}
					/>
				</div>
				<div
					className="chat-section"
					ref={clearPopUpRef}
				>
					<GroupOutline
						socket={socket.current}
						showCreateGroup={showCreateGroup}
						setShowCreateGroup={setShowCreateGroup}
						toggleNewChat={CreateNewChat}
						loadedData={loadedData}
						userGroupData={userGroupData}
						DisplayChats={DisplayChats}
						CloseUpClone={CloseUpClone}
						setGroupData={setGroupData}
						newGroupData={newGroupData}
						setLoadedData={setLoadedData}
						chatRef={chatRef}
					/>
					<div ref={spaceRef}>
						{loaded ? (
							<div className="space position-relative">
								<Topbar
									data={loadedData[chatIndex || 0]}
									activeChat={activeChat}
									setLoadedData={setLoadedData}
									socket={socket.current}
									showGroupProfile={showGroupProfile}
									setCallInit={setCallInit}
									callInit={callInit}
									userGroupData={userGroupData}
									isPersonalChat={isPersonalChat}
									setShowGroupProfile={setShowGroupProfile}
								/>
								<MessagingBox
									closeGroupPopUp={closeGroupPopUp}
									CloseUpClone={CloseUpClone}
									group_control={group_control}
									data={loadedData[chatIndex || 0]}
									getDom={getDom}
									activeChat={activeChat}
									socket={socket.current}
									unReadMessage={inlineGrpMsg}
									scrollInToView={scrollInToView}
								/>
							</div>
						) : (
							<div className="d-flex d-none align-items-center flex-column justify-content-center w-100 key text-light">
								<div className="fw-bolder text-secondary">
									<b>SocialConnect For Web</b>
								</div>
								<div className="fw-bolder fs-3 text-success text-center px-3">
									The Best PlatForm For Chatting and Messaging 🗣️
								</div>
								{/* <div
								className="text-success fs-4 fw-bolder text-center"
								ref={typedRef}
							></div> */}
								<br />
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
