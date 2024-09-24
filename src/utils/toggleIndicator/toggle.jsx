//  Profile/Settings toggler
export const ToggleSettingNav = (element) => {
	let navItems = document.querySelectorAll(".nav-item-settings");
	navItems.forEach((item) => {
		item.classList.remove("active-item");
	});
	if (
		element.target.localName !== "svg" &&
		element.target.localName !== "path" &&
		element.target.localName !== "span"
	) {
		element.target.classList.add("active-item");
	} else if (
		element.target.localName === "svg" ||
		element.target.localName === "span"
	) {
		element.target.parentElement.classList.add("active-item");
	} else if (element.target.localName === "path") {
		element.target.parentElement.parentElement.classList.add("active-item");
	}
};
