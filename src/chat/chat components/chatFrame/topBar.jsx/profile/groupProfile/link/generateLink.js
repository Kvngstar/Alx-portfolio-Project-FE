import React, { useState } from "react";
import GeneratedLink from "./generatedLink";
import toast from "react-hot-toast";
import { MdAddLink } from "react-icons/md";
import Button from "../../../../../../../components/Emoji/button/button";

const LinkGenerator = ({
	link,
	socket,
	activeChat,
	setLoadedData,

}) => {
	const [userCount, setUserCount] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const handleChange = (event) => {
		setUserCount(parseInt(event.target.value, 10));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrorMessage(null);
		GenerateInviteLink(userCount);
	};

	function GenerateInviteLink(count) {
		setIsLoading(true);
		socket.emit("generate-invite_link", count, activeChat, (link, count) => {
			console.log(link);

			if (!link) toast.success("Link deactivated");
			else toast.success("Link generated");
			setIsLoading(false);
			setLoadedData((values) => {
				return values.map((obj) => {
					if (obj._id === activeChat) {
						return {
							...obj,
							inviteLinke: !link
								? undefined
								: { link: link, limitActionTo: count },
						};
					} else {
						return obj;
					}
				});
			});
		});
	}

	return (
		<div className="container mt-4">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label
						htmlFor="userCount"
						className="d-flex align-items-center"
					>
						{" "}
						<div>
							<MdAddLink />{" "}
						</div>{" "}
						<div className="ms-1">Number of Users:</div>{" "}
					</label>
					<input
						type="number"
						className="form-control"
						id="userCount"
						min="1"
						value={userCount}
						onChange={handleChange}
					/>
				</div>
				<div className="d-flex justify-content-center align-items-center">
					<Button
						loading={isLoading}
						text={"Generate Link"}
					/>
				</div>
				{errorMessage && (
					<div className="alert alert-danger mt-3">{errorMessage}</div>
				)}
			</form>
			{link?.link ? (
				<GeneratedLink
					GenerateInviteLink={GenerateInviteLink}
					link={link}
				/>
			) : (
				<div className="mt-3 text-danger">Link Deactivated</div>
			)}
		</div>
	);
};

export default LinkGenerator;
