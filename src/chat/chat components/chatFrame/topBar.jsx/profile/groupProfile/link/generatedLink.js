import React from "react";
import toast from "react-hot-toast";
import Button from "../../../../../../../components/Emoji/button/button";

const GeneratedLink = ({ link, GenerateInviteLink }) => {
	const handleCopy = () => {
		const getlink = document.getElementById("link3").innerHTML;
		navigator.clipboard.writeText(getlink);
		toast.success("Link copied to clipboard!");
	};

	const DeactivateLink = () => {
		GenerateInviteLink(null);
	};

	return (
		<div className="pb-2">
			<p>Generated Link:</p>
			<div className="card">
				<div className="card-body">
					<a
						href={link}
						id="link3"
						target="_blank"
						rel="noreferrer"
					>
						{`https://socialconnects.netlify.app/join?group=${link.link}`}
					</a>
					<p className="text-muted">Max Users: {link.limitActionTo || 0}</p>
					<div className="d-flex justify-content-between">
						<Button
							text={"Copy"}
							func={handleCopy}
                            fullWidth={false}
						/>
						<Button
							text={"Deactiveate"}
                            fullWidth={false}
							func={DeactivateLink}
						/>
					</div>
				</div> 
			</div>
		</div>
	);
};
export default GeneratedLink;
