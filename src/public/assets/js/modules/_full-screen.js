//  INFO:  FULL SCREEN

//  NOTE:  EXPORT
// ============================================================
export const fullScreen = async () => {
	for (const fullScreen of document.querySelectorAll(".full-screen")) {
		let is_touch_supported = "ontouchstart" in window ? true : false
		if (!is_touch_supported) {
			fullScreen.addEventListener("click", () => {
				if (!document.fullscreenElement) {
					document.documentElement.requestFullscreen()
					fullScreen.classList.remove("full-screen-on")
					fullScreen.classList.add("full-screen-off")
				} else {
					if (document.exitFullscreen) {
						document.exitFullscreen()
						fullScreen.classList.add("full-screen-on")
						fullScreen.classList.remove("full-screen-off")
					}
				}
			})
		} else {
			fullScreen.style.display = "none"
		}
	}
}
