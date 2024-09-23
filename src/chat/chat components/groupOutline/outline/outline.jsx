import React from "react";
import GroupOutlineCont from "./groupBlock/block";
import NoGroupOutline from "./noGroupBlock/block";
import CreateGroup from "./createGroup/create";

export default function Outline({
	loadedData,
	DisplayChats,
	userGroupData,
	loading,
	loaded,
}) {
	return (
		<div className="container-short-box">
			{!loaded && loadedData.length > 0 ? (
				loadedData.map((v) => {
					return (
						<GroupOutlineCont
							v={v}
							DisplayChats={DisplayChats}
							loadedData={loadedData}
							userGroupData={userGroupData}
						/>
					);
				})
			) : !loaded && loadedData.length <= 0 ? (
				<CreateGroup/>
			) : (
				<NoGroupOutline loading={loading} />
			)}
		</div>
	);
}
