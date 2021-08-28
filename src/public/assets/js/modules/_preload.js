//  INFO:  PRELOAD

//  NOTE:  IMPORT
// ============================================================
import { boxCookie } from "./_box-cookie.js"

//  NOTE:  EXPORT
// ============================================================
export const preload = async () => {
	window.addEventListener("load", () => {
		setTimeout(() => {
			const loadingPage = document.querySelector(".loading")

			loadingPage.style.marginTop = "-100vh"

			setTimeout(() => {
				loadingPage.style.pointerEvents = "none"
				loadingPage.style.opacity = "0"
				document.body.style.overflow = "auto"
				boxCookie()
			}, 1000)
		}, 300)
	})
}
