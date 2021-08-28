//  INFO:  TOGGLE SETTINGS

export const toggleSettings = async () => {
	for (const toggleSettings of document.querySelectorAll(".settings")) {
		const mainTag = toggleSettings.parentElement.parentElement
		const navTag = mainTag.querySelector(".box-settings")

		toggleSettings.addEventListener("click", () => {
			if (navTag.className !== "box-settings _toggle-settings") {
				navTag.classList.add("_toggle-settings")
			} else {
				toggleSettings.blur()
				navTag.classList.remove("_toggle-settings")
			}
		})

		window.addEventListener("click", e => {
			if (!navTag.contains(e.target) && !toggleSettings.contains(e.target)) {
				navTag.classList.remove("_toggle-settings")
			}
		})
	}
}
