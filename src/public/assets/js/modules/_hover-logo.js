//  INFO:  HOVER LOGO

//  NOTE:  EXPORT
// ============================================================
export const hoverLogo = async () => {
	for (const hoverLogo of document.querySelectorAll(".header .box-header")) {
		const boxList = hoverLogo.parentElement.querySelector(".box-list")

		hoverLogo.addEventListener("touchstart", () => {
			if (hoverLogo.className !== "box-header _toggle-link") {
				hoverLogo.classList.add("_toggle-link")
				boxList.style.height = `${boxList.scrollHeight}px`
			} else {
				setTimeout(() => {
					hoverLogo.classList.remove("_toggle-link")
					boxList.style.height = "0"
				}, 100)
			}
		})

		hoverLogo.addEventListener("mouseenter", () => {
			hoverLogo.classList.add("_toggle-link")
			boxList.style.height = `${boxList.scrollHeight}px`
		})

		hoverLogo.addEventListener("mouseleave", () => {
			hoverLogo.classList.remove("_toggle-link")
			boxList.style.height = "0"
		})
	}
}
