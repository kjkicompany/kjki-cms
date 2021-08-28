//  INFO:  BOX COOKIE

//  NOTE:  ESLINT FIX
/* global checkCookie getCookie, setCookie */

//  NOTE:  EXPORT
// ============================================================
export const boxCookie = async () => {
	setTimeout(() => {
		if (checkCookie() === true) {
			const cookieBox = document.querySelector(".box-cookie")
			const cookieButtonBox = document.querySelector(".button-cookie")

			if (!getCookie("cookie-privacy")) {
				cookieBox.style.visibility = "visible"
				cookieBox.classList.add("show")

				cookieButtonBox.addEventListener("click", e => {
					e.preventDefault()
					setCookie("cookie-privacy", "ok", 365)
					cookieBox.classList.remove("show")
					cookieBox.classList.add("hide")
				})
			} else {
				cookieBox.style.visibility = "hidden"
				cookieBox.style.display = "none"
			}
		} else {
			console.log("%c [ERROR] : [Cookie Disabled]", "color: #dc3545; font-size: 14px; font-weight: 900;")
		}
	}, 300)
}
