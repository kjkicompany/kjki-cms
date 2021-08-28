//  INFO:  MIN WIDTH

//  NOTE:  EXPORT
// ============================================================
export const minWidth = async () => {
	const errorResolution = document.createElement("div")
	errorResolution.className = "page-error-resolution"
	errorResolution.innerHTML = "<br><br><h1><center>ERROR RESOLUTION MIN WIDTH 320 PX</center></h1>"
	document.querySelector(".box-cookie").after(errorResolution)
	const errorDiv = document.querySelectorAll(".page-error-resolution")

	for (const errorResolution of errorDiv) {
		const box = () => {
			if (window.innerWidth >= 320) {
				errorResolution.style.display = "none"
			} else {
				errorResolution.style.display = "block"
			}
		}

		box()

		window.addEventListener("resize", () => {
			box()
		})
	}
}
