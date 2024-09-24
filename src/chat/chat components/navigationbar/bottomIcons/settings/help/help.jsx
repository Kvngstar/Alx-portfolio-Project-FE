import React from "react";

export default function Help() {
	return (
		<div className="pt-3 px-3 pb-3">
			<div className="d-flex flex-column">
				<div>Social Connect for Web </div>
				<div>
					<small>Version 1.0.0</small>
				</div>
			</div>
			<hr />
			<div className="d-flex flex-column">
				<div>Contact us </div>
				<div>
					<small>We will like to know your thoughts about this app</small>
					<div>
						<a href="#">
							<small>Contact Us</small>
						</a>
					</div>
					<hr />
					<div>
						<a href="#">
							<small>Help center</small>
						</a>
						<br />
						<a href="#">
							<small>Licenses</small>
						</a>
						<br />
						<a href="#">
							<small>Terms and Privacy Policy</small>
						</a>
					</div>
					<hr />
					<div>2024 @ Social Connect Inc.</div>
				</div>
			</div>
		</div>
	);
}
