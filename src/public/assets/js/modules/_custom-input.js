// INFO:  CUSTOM INPUT

//  NOTE:  ESLINT FIX
/* global getFocus passwordLengthMin letterUpper letterLower characterNumber characterSpecial passwordLengthMax audioCopy */

//  NOTE:  EXPORT
// ============================================================
export const customInputs = async () => {
	for (const customInput of document.querySelectorAll(".custom-input")) {
		const inputPassword = customInput.querySelector(".password")
		const inputCaptcha = customInput.querySelector(".captcha")

		const iconPassword = customInput.querySelector("#change-password")
		const iconPasswordGenerate = customInput.querySelector("#generate-password")
		const progressBarPassword = customInput.querySelector(".password-progress-bar")
		const progressValuePassword = customInput.querySelector(".password-progress-value")
		const statusAll = customInput.parentElement.parentElement.querySelectorAll("#status")
		const status = customInput.parentElement.parentElement.querySelector("#status")
		const iconCaptcha = customInput.querySelector("#change-captcha")

		const passwordStrength = () => {
			let strengthValue = {
				upper: false,
				lower: false,
				number: false,
				special: false
			}

			let password = inputPassword.value

			if (password.length >= passwordLengthMin) {
				strengthValue.length = true
			}

			if (letterUpper.test(password)) {
				strengthValue.upper = true
			}

			if (letterLower.test(password)) {
				strengthValue.lower = true
			}

			if (characterNumber.test(password)) {
				strengthValue.number = true
			}

			if (characterSpecial.test(password)) {
				strengthValue.special = true
			}

			let strengthIndicator = 0
			for (let metric in strengthValue) {
				if (strengthValue[metric] === true) {
					strengthIndicator++
				}
			}

			progressValuePassword.classList.remove("_zero")
			progressValuePassword.classList.remove("_danger-1")
			progressValuePassword.classList.remove("_danger-2")
			progressValuePassword.classList.remove("_warning-1")
			progressValuePassword.classList.remove("_warning-2")
			progressValuePassword.classList.remove("_success")

			if (password.length > passwordLengthMax) {
				strengthIndicator = 1
			}

			if (strengthIndicator === 1) {
				progressValuePassword.classList.add("_danger-1")
			} else if (strengthIndicator === 2) {
				progressValuePassword.classList.add("_danger-2")
			} else if (strengthIndicator === 3) {
				progressValuePassword.classList.add("_warning-1")
			} else if (strengthIndicator === 4) {
				progressValuePassword.classList.add("_warning-2")
			} else if (strengthIndicator === 5) {
				progressValuePassword.classList.add("_success")
			} else {
				progressValuePassword.classList.add("_zero")
			}
		}

		const passwordStatus = () => {
			if (inputPassword !== null) {
				if (inputPassword.value !== "") {
					setTimeout(() => {
						iconPassword.style.display = "block"
						if (progressValuePassword !== null) {
							progressBarPassword.style.display = "block"
						}
					}, 100)

					setTimeout(() => {
						iconPassword.style.opacity = "1"
						if (progressValuePassword !== null) {
							progressBarPassword.style.opacity = "1"
						}
					}, 300)
				} else {
					setTimeout(() => {
						iconPassword.style.opacity = "0"
						if (progressValuePassword !== null) {
							progressBarPassword.style.opacity = "0"
						}
					}, 300)

					setTimeout(() => {
						iconPassword.style.display = "none"
						if (progressValuePassword !== null) {
							progressBarPassword.style.display = "none"
						}
					}, 500)
				}

				if (progressValuePassword !== null) {
					passwordStrength()
				}
			}
		}
		passwordStatus()

		const passwordGenerate = () => {
			const getRandomUpperCase = () => {
				return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
			}

			const getRandomLowerCase = () => {
				return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
			}

			const getRandomNumber = () => {
				return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
			}

			const getRandomSymbol = () => {
				const symbol = "@*#_-"
				return symbol[Math.floor(Math.random() * symbol.length)]
			}

			const randomFunc = [getRandomUpperCase, getRandomLowerCase, getRandomNumber, getRandomSymbol]

			const getRandomFunc = () => {
				return randomFunc[Math.floor(Math.random() * Object.keys(randomFunc).length)]
			}

			let password = ""
			const passwordLength = Math.random() * (20 - 8) + 8
			for (let i = 1; i <= passwordLength; i++) {
				password += getRandomFunc()()
			}

			const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@*#_-])[A-Za-z*0-9@*#_-]{8,32}$/
			if (!password.match(regex)) {
				password = passwordGenerate()
			}

			return password
		}

		const passwordShow = () => {
			inputPassword.classList.remove("_password-hide")
			inputPassword.classList.add("_password-show")
			iconPassword.classList.remove("password-icon-show", "fa-eye")
			iconPassword.classList.add("password-icon-hide", "fa-eye-slash")
		}

		const passwordHide = () => {
			inputPassword.classList.add("_password-hide")
			inputPassword.classList.remove("_password-show")
			iconPassword.classList.add("password-icon-show", "fa-eye")
			iconPassword.classList.remove("password-icon-hide", "fa-eye-slash")
		}

		const captchaReload = () => {
			const imgCaptcha = customInput.parentElement.querySelector(".imgCaptcha")
			getFocus(inputCaptcha)

			let image = imgCaptcha.getAttribute("src")
			imgCaptcha.setAttribute("src", `${image}?last=${Math.random()}`)
		}

		const showHideAndProgressStrongPassword = e => {
			if (e.target.className.search("password") >= 1) {
				passwordStatus()
			}

			if (e.target.id === progressBarPassword?.id) {
				getFocus(inputPassword)
			}

			if (e.target.id === iconPassword?.id) {
				getFocus(inputPassword)

				if (
					inputPassword.className === "text password _password-hide" ||
					inputPassword.className === "text password _password-hide _danger" ||
					inputPassword.className === "text password _danger _password-hide"
				) {
					passwordShow()
				} else {
					passwordHide()
				}

				setTimeout(() => {
					if (inputPassword.setSelectionRange) {
						const inputIndex = inputPassword?.value?.length
						inputPassword.setSelectionRange(inputIndex, inputIndex)
					}
				}, 0)
			}

			if (e.target.id === iconPasswordGenerate?.id) {
				const inputIdPasswordValue = document.querySelector("#input-password")
				const inputIdRepeatPasswordValue = document.querySelector("#input-repeatPassword")
				const generate = passwordGenerate()

				inputIdPasswordValue.value = ""
				inputIdRepeatPasswordValue.value = ""
				inputIdPasswordValue.value = generate
				inputIdRepeatPasswordValue.value = generate

				getFocus(inputPassword)

				document.execCommand("SelectAll")
				document.execCommand("copy")

				audioCopy.play()

				statusAll.forEach(s => {
					s.innerHTML = ""
					s.classList.remove("_info")
					s.classList.remove("_danger")
				})

				setTimeout(() => {
					status.classList.add("_info")
					status.innerHTML = iconPasswordGenerate.title

					status.focus()
				}, 100)

				setTimeout(() => {
					const inputIndex = inputPassword?.value?.length

					if (inputPassword.setSelectionRange) {
						inputPassword.setSelectionRange(inputIndex, inputIndex)

						if (
							inputPassword.className === "text password _password-hide" ||
							inputPassword.className === "text password _password-hide _danger" ||
							inputPassword.className === "text password _danger _password-hide"
						) {
							passwordShow()
						}

						passwordStatus()
					}
				}, 0)
			}

			if (e.target.id === iconCaptcha?.id) {
				captchaReload()
			}
		}

		customInput.addEventListener("input", e => {
			showHideAndProgressStrongPassword(e)
		})

		customInput.addEventListener("click", e => {
			showHideAndProgressStrongPassword(e)
		})
	}
}
