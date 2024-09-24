import React, { useState, useEffect } from "react";

export default function Notification({
	playSound,
	setPlaySound,
	vibration,
	setVibration,
}) {
	// useEffect(() => {
		
	// }, [playSound, vibration]);

	const handleSoundChange = () => {
		setPlaySound(!playSound);
		console.log("playSound", !playSound);
	};

	const handleVibrationChange = (e) => {
		setVibration(e.target.value);
	};

	return (
		<div className="pt-3 px-3 pb-3 ">
			<div className="d-flex justify-content-between align-items-center pe-2 bg-light rounded py-2">
				<div className="">
					<div>Notification tones</div>
					<div>
						<small>
							<small>Play sound for messages</small>
						</small>
					</div>
				</div>
				<div>
					<input
						type="checkbox"
						name="checkbox"
						checked={playSound}
						onChange={handleSoundChange}
					/>
				</div>
			</div>
			<div className="mb-1">Vibration</div>
			<select
				name="language"
				className="form-select"
				value={vibration}
				onChange={handleVibrationChange}
			>
				<option value="Default ~on~">Default ~on~</option>
				<option value="on">On</option>
				<option value="off">Off</option>
			</select>
		</div>
	);
}
