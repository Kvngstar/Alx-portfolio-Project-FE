import ClipLoader from "react-spinners/ClipLoader";
import GridLoader from "react-spinners/GridLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import SyncLoader from "react-spinners/SyncLoader";

const cssProp = {
	display: "block",
	borderColor: " red",
};
const loaderColor = "blue";
const loaderSize = 150;
const DefaultLoader = "clipLoader";

export const Loader = (
	name = DefaultLoader,
	loading = false,
	css = cssProp,
	size = loaderSize,
	color = loaderColor
) => {
	if (name === "cliploader") {
		return (
			<ClipLoader
				color={color}
				loading={loading}
				cssOverride={css}
				size={size}
			/>
		);
	}
	if (name === "gridloader") {
		return (
			<GridLoader
				color={color}
				loading={loading}
				cssOverride={css}
				size={size}
			/>
		);
	}
	if (name === "syncloader") {
		return (
			<SyncLoader
				color={color}
				loading={loading}
				cssOverride={css}
				size={size}
			/>
		);
	}
	if (name === "scaleloader") {
		return (
			<ScaleLoader
				color={color}
				loading={loading}
				cssOverride={css}
				size={size}
			/>
		);
	}
};
