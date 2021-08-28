//  INFO:  OPTIONS

//  NOTE:  ESLINT FIX
/* global timer */

//  NOTE:  EXPORT
// ============================================================
export const options = async () => {
	//  NOTE:  GLOBALS
	// ============================================================
	globalThis.timer = new Date()
	globalThis.hour = timer.getHours()

	globalThis.passwordLengthMin = 8
	globalThis.passwordLengthMax = 20
	globalThis.letterUpper = /[A-Z]/
	globalThis.letterLower = /[a-z]/
	globalThis.characterNumber = /[0-9]/
	globalThis.characterSpecial = /[@*#_-]/

	globalThis.audioDanger = new Audio("/assets/audio/danger.mp3")
	globalThis.audioSuccess = new Audio("/assets/audio/success.mp3")
	globalThis.audioCopy = new Audio("/assets/audio/copy.mp3")

	//  NOTE:  CHECK COOKIE
	// ============================================================
	globalThis.checkCookie = () => {
		if (navigator.cookieEnabled) {
			return true
		} else {
			return false
		}
	}

	//  NOTE:  SET COOKIE
	// ============================================================
	globalThis.setCookie = (cName, cValue, cDays) => {
		let d = new Date()
		d.setTime(d.getTime() + cDays * 24 * 60 * 60 * 1000)
		let expires = "expires=" + d.toUTCString()
		document.cookie = cName + "=" + cValue + ";" + expires + ";path=/"
	}

	//  NOTE:  GET COOKIE
	// ============================================================
	globalThis.getCookie = cName => {
		let name = cName + "="
		let decodedCookie = decodeURIComponent(document.cookie)
		let ca = decodedCookie.split(";")
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i]
			while (c.charAt(0) == " ") {
				c = c.substring(1)
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length)
			}
		}
		return ""
	}

	//  NOTE:  FIX offsetTop
	// ============================================================
	globalThis.getOffsetTop = element => {
		let offsetTop = 0
		while (element) {
			offsetTop += element.offsetTop
			element = element.offsetParent
		}
		return offsetTop
	}

	//  NOTE:  FIX FOCUS SCROLL TOP SELECT
	// ============================================================
	globalThis.getFocus = element => {
		element.scrollIntoView({ behavior: "smooth", block: "nearest" })
		element.focus({ preventScroll: true })
		if (typeof element.select == "function") {
			element.select()
		}
	}

	//  NOTE:  STOP KEY
	// ============================================================
	document.addEventListeners("keyup keydown", e => {
		if (e.code !== "F5" && e.code !== "Tab" && e.code !== "Enter") {
			if (e.target.type === "text" || e.target.type === "password") {
				if (
					e.code === "F1" ||
					e.code === "F2" ||
					e.code === "F3" ||
					e.code === "F4" ||
					e.code === "F6" ||
					e.code === "F7" ||
					e.code === "F8" ||
					e.code === "F9" ||
					e.code === "F10" ||
					e.code === "F11" ||
					e.code === "F12"
				) {
					e.preventDefault()
				}
			} else {
				e.preventDefault()
			}
		}
	})

	//  NOTE:  DISABLE DRAG LINK AND RIGHT CLICK OF THE MOUSE
	// ============================================================
	document.addEventListeners("dragstart contextmenu", e => {
		e.preventDefault()
	})

	//  NOTE:  INPUTS AUTOCOMPLETE OFF
	// ============================================================
	let tagArr = document.getElementsByTagName("input")
	for (let i = 0; i < tagArr.length; i++) {
		tagArr[i].autocomplete = "off"
	}
}
