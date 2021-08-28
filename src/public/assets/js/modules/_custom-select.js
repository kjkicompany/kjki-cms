// INFO:  CUSTOM SELECT

//  NOTE:  ESLINT FIX
/* global getFocus getOffsetTop letterUpper letterLower characterNumber setCookie hour getCookie */

//  NOTE:  EXPORT
// ============================================================
export const customSelects = async () => {
	for (const [customSelectIndex, customSelect] of document.querySelectorAll(".custom-select").entries()) {
		if (customSelect.tagName !== "SELECT") {
			customSelect.style.display = "none"
			console.log(`%c ERROR: Required "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`, "color: #dc3545; font-size: 14px; font-weight: 900;")
		} else if (customSelect.parentElement.parentElement.nodeName === "FORM" && customSelect.id === null) {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Required attribute "id" in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.parentElement.parentElement.nodeName === "FORM" && customSelect.id === "") {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Attribute "id" is empty in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.parentElement.parentElement.nodeName === "FORM" && customSelect.name === null) {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Required attribute "name" in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.parentElement.parentElement.nodeName === "FORM" && customSelect.name === "") {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Attribute "name" is empty in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.getAttribute("label") === null) {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Required attribute "label" in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.getAttribute("label") === "") {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Attribute "label" is empty in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.getAttribute("icon") === null) {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Required attribute "icon" in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.getAttribute("icon") !== "true" && customSelect.getAttribute("icon") !== "false") {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Attribute "icon" required: "true" or "false", in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.getAttribute("icon") === "true" && customSelect.getAttribute("icon-type") === null) {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Required attribute "icon-type" in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.getAttribute("icon") === "true" && customSelect.getAttribute("icon-type") !== "img" && customSelect.getAttribute("icon-type") !== "awesome") {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Attribute "icon-type" required: "img" or "awesome", in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.getAttribute("icon") === "true" && customSelect.getAttribute("icon-type") === "img" && customSelect.getAttribute("icon-path") === null) {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Required attribute "icon-path" in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.getAttribute("icon") === "true" && customSelect.getAttribute("icon-type") === "img" && customSelect.getAttribute("icon-path") === "") {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Attribute "icon-path" is empty in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.getAttribute("icon") === "true" && customSelect.getAttribute("icon-type") === "img" && customSelect.getAttribute("icon-ext") === null) {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Required attribute "icon-ext" in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.getAttribute("icon") === "true" && customSelect.getAttribute("icon-type") === "img" && customSelect.getAttribute("icon-ext") === "") {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Attribute "icon-ext" is empty in "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else if (customSelect.firstElementChild?.tagName !== "OPTION") {
			customSelect.style.display = "none"
			console.log(
				`%c ERROR: Required minimum one "option" tag inside "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
				"color: #dc3545; font-size: 14px; font-weight: 900;"
			)
		} else {
			const optionsTag = customSelect.querySelectorAll("option")
			let optionTagCheck = null

			optionsTag.forEach(option => {
				if (option.text === "") {
					customSelect.style.display = "none"
					optionTagCheck = console.log(
						`%c ERROR: Required text inside "option" tag inside "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
						"color: #dc3545; font-size: 14px; font-weight: 900;"
					)
				} else if (option.getAttribute("value") === null) {
					customSelect.style.display = "none"
					optionTagCheck = console.log(
						`%c ERROR: Required attribute "value" in "option" tag inside "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
						"color: #dc3545; font-size: 14px; font-weight: 900;"
					)
				} else if (customSelect.getAttribute("icon") === "true" && option.getAttribute("icon") === null) {
					customSelect.style.display = "none"
					optionTagCheck = console.log(
						`%c ERROR: Required attribute "icon" in "option" tag inside "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
						"color: #dc3545; font-size: 14px; font-weight: 900;"
					)
				} else if (customSelect.getAttribute("icon") === "true" && option.getAttribute("icon") === "") {
					customSelect.style.display = "none"
					optionTagCheck = console.log(
						`%c ERROR: Attribute "icon" is empty in "option" tag inside "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
						"color: #dc3545; font-size: 14px; font-weight: 900;"
					)
				}
			})

			if (optionTagCheck !== null) {
				optionTagCheck
			} else if (Array.from(optionsTag).find(selected => selected.getAttribute("selected")) === undefined) {
				customSelect.style.display = "none"
				console.log(
					`%c ERROR: Required minimum one attribute "selected" in "option" tag inside "select" tag | CLASS NAME: "${customSelect.className}" | ID POSITION: "${customSelectIndex + 1}"`,
					"color: #dc3545; font-size: 14px; font-weight: 900;"
				)
			} else {
				customSelect.style.display = "none"

				const selectsDiv = document.createElement("div")
				selectsDiv.className = "custom-selects"
				customSelect.after(selectsDiv)

				const selectDiv = document.createElement("div")
				selectDiv.className = "custom-select"

				if (customSelect.id !== null && customSelect.id !== "") {
					selectDiv.id = `input-${customSelect.id}`
				}
				selectDiv.setAttribute("icon", customSelect.getAttribute("icon"))
				selectDiv.tabIndex = 0
				selectsDiv.appendChild(selectDiv)

				const arrowDiv = document.createElement("div")
				arrowDiv.className = "arrow"
				selectDiv.appendChild(arrowDiv)

				const optionsDiv = document.createElement("div")
				optionsDiv.className = "options"
				selectsDiv.appendChild(optionsDiv)

				for (const customOption of optionsTag) {
					const optionDiv = document.createElement("div")

					if (customOption.getAttribute("selected") === "selected") {
						optionDiv.className = "option selected"
					} else {
						optionDiv.className = "option"
					}
					optionsDiv.appendChild(optionDiv)

					if (customSelect.getAttribute("icon") === "true") {
						optionDiv.setAttribute("icon", customOption.getAttribute("icon"))

						if (customSelect.getAttribute("icon-type") === "img") {
							let optionImg = document.createElement("img")
							optionImg.src = `${customSelect.getAttribute("icon-path")}/${customOption.getAttribute("icon")}.${customSelect.getAttribute("icon-ext")}`
							optionImg.setAttribute("onerror", "this.onerror = null; this.src = '/assets/img/null.png'")
							optionDiv.appendChild(optionImg)
						}

						if (customSelect.getAttribute("icon-type") === "awesome") {
							const optionAwesome = document.createElement("i")
							optionAwesome.className = customOption.getAttribute("icon")
							optionDiv.appendChild(optionAwesome)
						}
					}

					optionDiv.setAttribute("value", customOption.getAttribute("value"))

					const optionSpan = document.createElement("span")
					optionSpan.textContent = customOption.text
					optionDiv.appendChild(optionSpan)

					optionDiv.addEventListener("click", () => {
						optionsDiv.querySelectorAll(".option").forEach(option => {
							option.classList.remove("selected")
						})

						if (customSelect.getAttribute("icon") === "true") {
							if (customSelect.getAttribute("icon-type") === "img") {
								selectsDiv.querySelector(".custom-select > img").src = `${customSelect.getAttribute("icon-path")}/${optionDiv.getAttribute("icon")}.${customSelect.getAttribute(
									"icon-ext"
								)}`
							}

							if (customSelect.getAttribute("icon-type") === "awesome") {
								selectsDiv.querySelector(".custom-select > i").className = optionDiv.getAttribute("icon")
							}
						}

						selectsDiv.querySelector(".custom-select > .text").textContent = optionSpan.textContent

						if (customSelect.id !== null && customSelect.id !== "") {
							selectsDiv.querySelector("input[type='hidden']").value = optionDiv.getAttribute("value")
						}

						optionDiv.classList.add("selected")
						getFocus(selectDiv)

						if (optionDiv.getAttribute("value") === "") {
							selectDiv.classList.remove("_valid")
							if (selectDiv !== document.activeElement) {
								selectText.style.opacity = 0
							}
						} else {
							selectDiv.classList.add("_valid")
							selectText.style.opacity = 1
						}
						eventClick()
					})
				}

				if (customSelect.getAttribute("icon") === "true") {
					if (customSelect.getAttribute("icon-type") === "img") {
						var selectImg = document.createElement("img")

						selectImg.src = `${customSelect.getAttribute("icon-path")}/${optionsDiv.querySelector(".option.selected").getAttribute("icon")}.${customSelect.getAttribute("icon-ext")}`
						selectImg.setAttribute("onerror", "this.onerror = null; this.src = '/assets/img/null.png'")
						arrowDiv.before(selectImg)
					}

					if (customSelect.getAttribute("icon-type") === "awesome") {
						var selectAwesome = document.createElement("i")
						selectAwesome.className = optionsDiv.querySelector(".option.selected").getAttribute("icon")
						arrowDiv.before(selectAwesome)
					}
				}

				const selectLabel = document.createElement("span")
				selectLabel.className = "label"
				selectLabel.textContent = customSelect.getAttribute("label")
				arrowDiv.before(selectLabel)

				const selectText = document.createElement("span")
				selectText.className = "text"
				selectText.textContent = optionsDiv.querySelector(".option.selected").textContent
				arrowDiv.before(selectText)

				if (optionsDiv.querySelector(".option.selected").getAttribute("value") === "") {
					selectDiv.classList.remove("_valid")
					selectText.style.opacity = 0
				} else {
					selectDiv.classList.add("_valid")
				}

				selectDiv.addEventListeners("mouseenter focus", () => {
					if (optionsDiv.querySelector(".option.selected").getAttribute("value") === "") {
						selectText.style.opacity = 1
					}
				})

				selectDiv.addEventListeners("mouseleave blur", () => {
					if (optionsDiv.querySelector(".option.selected").getAttribute("value") === "") {
						if (selectDiv !== document.activeElement) {
							selectDiv.classList.remove("_valid")
							selectText.style.opacity = 0
						}
					} else {
						selectDiv.classList.add("_valid")
						selectText.style.opacity = 1
					}
				})

				selectDiv.addEventListener("click", () => {
					let scrollTop = window.pageYOffset
					let topOffset = getOffsetTop(selectsDiv)
					let relativeOffset = topOffset - scrollTop
					let windowHeight = window.innerHeight

					if (relativeOffset > windowHeight / 1.3) {
						selectDiv.classList.toggle("_open-reverse")
					} else {
						selectDiv.classList.toggle("_open")
					}

					if (selectsDiv.querySelector("._open, ._open-reverse")) {
						selectsDiv.querySelector(".selected").scrollIntoView({ behavior: "smooth", block: "nearest" })
					}

					if (optionsDiv.scrollWidth - optionsDiv.scrollTop === optionsDiv.clientWidth) {
						optionsDiv.classList.add("_decrement-scroll")
					} else {
						optionsDiv.classList.remove("_decrement-scroll")
					}
				})

				selectDiv.addEventListener("keyup", e => {
					if (e.code === "Space") {
						if (selectsDiv.querySelector("._open, ._open-reverse")) {
							eventClick()
						}
						selectDiv.click()
					}

					if (e.code === "Tab") {
						if (selectsDiv.querySelector("._open, ._open-reverse")) {
							eventClick()
						}
						selectDiv.click()
					}

					if (selectsDiv.querySelector("._open, ._open-reverse")) {
						if (e.code === "Escape") {
							eventClick()
							selectDiv.click()
						}

						if (e.code === "Enter") {
							eventClick()
							selectDiv.click()
						}
					}
				})

				selectDiv.addEventListener("keydown", e => {
					if (e.code === "Tab") {
						if (selectsDiv.querySelector("._open, ._open-reverse")) {
							eventClick()
						}
						selectDiv.click()
					}
				})

				let optionArray = Array.from(optionsDiv.querySelectorAll(".option"))
				selectDiv.addEventListener("keyup", e => {
					let optionActive = optionsDiv.querySelector(".selected") || optionsDiv.querySelector(".option")

					if (e.code === "Home" || e.code === "PageUp") {
						optionActive.classList.remove("selected")

						for (let index = 0; index < optionArray.length; index++) {
							if (customSelect.getAttribute("icon") === "true") {
								if (customSelect.getAttribute("icon-type") === "img") {
									optionArray[0].closest(".custom-selects").querySelector(".custom-select > img").src = `${customSelect.getAttribute("icon-path")}/${optionArray[0].getAttribute(
										"icon"
									)}.${customSelect.getAttribute("icon-ext")}`
								}

								if (customSelect.getAttribute("icon-type") === "awesome") {
									optionArray[0].closest(".custom-selects").querySelector(".custom-select > i").className = optionArray[0].getAttribute("icon")
								}
							}
							selectText.textContent = optionArray[0].textContent

							if (customSelect.id !== null && customSelect.id !== "") {
								optionArray[0].closest(".custom-selects").querySelector("input[type='hidden']").value = optionArray[0].getAttribute("value")
							}

							optionArray[0].scrollIntoView({ behavior: "smooth", block: "nearest" })
							optionArray[0].classList.add("selected")

							if (!selectsDiv.querySelector("._open, ._open-reverse")) {
								eventClick()
							}

							break
						}
					} else if (e.code === "End" || e.code === "PageDown") {
						optionActive.classList.remove("selected")
						let i, elem
						for ([i, elem] of optionArray.entries()) {
							if (i == optionArray.length - 1) {
								if (customSelect.getAttribute("icon") === "true") {
									if (customSelect.getAttribute("icon-type") === "img") {
										elem.closest(".custom-selects").querySelector(".custom-select > img").src = `${customSelect.getAttribute("icon-path")}/${elem.getAttribute(
											"icon"
										)}.${customSelect.getAttribute("icon-ext")}`
									}

									if (customSelect.getAttribute("icon-type") === "awesome") {
										elem.closest(".custom-selects").querySelector(".custom-select > i").className = elem.getAttribute("icon")
									}
								}
								selectText.textContent = elem.textContent

								if (customSelect.id !== null && customSelect.id !== "") {
									elem.closest(".custom-selects").querySelector("input[type='hidden']").value = elem.getAttribute("value")
								}

								elem.scrollIntoView({ behavior: "smooth", block: "nearest" })
								elem.classList.add("selected")

								if (!selectsDiv.querySelector("._open, ._open-reverse")) {
									eventClick()
								}
							}
						}
					} else if (e.code === "ArrowUp") {
						optionActive.classList.remove("selected")
						optionActive = optionActive.previousElementSibling || optionActive

						if (customSelect.getAttribute("icon") === "true") {
							if (customSelect.getAttribute("icon-type") === "img") {
								optionActive.closest(".custom-selects").querySelector(".custom-select > img").src = `${customSelect.getAttribute("icon-path")}/${optionActive.getAttribute(
									"icon"
								)}.${customSelect.getAttribute("icon-ext")}`
							}

							if (customSelect.getAttribute("icon-type") === "awesome") {
								optionActive.closest(".custom-selects").querySelector(".custom-select > i").className = optionActive.getAttribute("icon")
							}
						}
						selectText.textContent = optionActive.textContent

						if (customSelect.id !== null && customSelect.id !== "") {
							optionActive.closest(".custom-selects").querySelector("input[type='hidden']").value = optionActive.getAttribute("value")
						}

						optionActive.scrollIntoView({ behavior: "smooth", block: "nearest" })
						optionActive.classList.add("selected")

						if (!selectsDiv.querySelector("._open, ._open-reverse")) {
							eventClick()
						}
					} else if (e.code === "ArrowDown") {
						optionActive.classList.remove("selected")
						optionActive = optionActive.nextElementSibling || optionActive

						if (customSelect.getAttribute("icon") === "true") {
							if (customSelect.getAttribute("icon-type") === "img") {
								optionActive.closest(".custom-selects").querySelector(".custom-select > img").src = `${customSelect.getAttribute("icon-path")}/${optionActive.getAttribute(
									"icon"
								)}.${customSelect.getAttribute("icon-ext")}`
							}

							if (customSelect.getAttribute("icon-type") === "awesome") {
								optionActive.closest(".custom-selects").querySelector(".custom-select > i").className = optionActive.getAttribute("icon")
							}
						}
						selectText.textContent = optionActive.textContent

						if (customSelect.id !== null && customSelect.id !== "") {
							optionActive.closest(".custom-selects").querySelector("input[type='hidden']").value = optionActive.getAttribute("value")
						}

						optionActive.scrollIntoView({ behavior: "smooth", block: "nearest" })
						optionActive.classList.add("selected")

						if (!selectsDiv.querySelector("._open, ._open-reverse")) {
							eventClick()
						}
					}
				})

				let timers, chars, newChar, lastLetter, counts
				selectDiv.addEventListener("keyup", e => {
					if (e.code != "Tab" && e.code != "Space" && e.code != "Escape" && e.key != "Shift") {
						if (timers) {
							chars += e.key.toLowerCase()
						} else {
							chars = e.key.toLowerCase()
						}

						if (lastLetter !== undefined && chars === lastLetter) {
							counts++
						} else {
							lastLetter = chars
							counts = 0
						}

						if (letterUpper.test(chars)) {
							newChar = chars
						} else if (letterLower.test(chars)) {
							newChar = chars
						} else if (characterNumber.test(chars)) {
							newChar = chars
						} else if (chars === "+") {
							newChar = "\\" + chars
						} else {
							newChar = " "
						}

						let regex = new RegExp("^" + newChar, "i")

						let filter = optionArray.filter(filter => {
							return regex.test(filter.textContent)
						})

						if (counts >= filter.length) {
							counts = 0
						}

						if (filter[counts] && filter[counts].textContent !== undefined) {
							optionsDiv.querySelectorAll(".option").forEach(options => {
								options.classList.remove("selected")
							})

							if (customSelect.getAttribute("icon") === "true") {
								if (customSelect.getAttribute("icon-type") === "img") {
									filter[counts].closest(".custom-selects").querySelector(".custom-select > img").src = `${customSelect.getAttribute("icon-path")}/${filter[counts].getAttribute(
										"icon"
									)}.${customSelect.getAttribute("icon-ext")}`
								}

								if (customSelect.getAttribute("icon-type") === "awesome") {
									filter[counts].closest(".custom-selects").querySelector(".custom-select > i").className = filter[counts].getAttribute("icon")
								}
							}
							selectText.textContent = filter[counts].textContent

							if (customSelect.id !== null && customSelect.id !== "") {
								filter[counts].closest(".custom-selects").querySelector("input[type='hidden']").value = filter[counts].getAttribute("value")
							}

							filter[counts].scrollIntoView({ behavior: "smooth", block: "nearest" })
							filter[counts].classList.add("selected")

							if (!selectsDiv.querySelector("._open, ._open-reverse")) {
								eventClick()
							}
						}

						timers = setTimeout(() => {
							newChar = ""
							timers = undefined
						}, 500)
					}
				})

				const wheelArray = [selectsDiv, optionsDiv]
				for (const wheelY of wheelArray) {
					wheelY.addEventListener("wheel", e => {
						if (selectsDiv.querySelector("._open, ._open-reverse")) {
							e.preventDefault()
							const delta = Math.sign(e.deltaY)
							optionsDiv.style.scrollBehavior = "smooth"

							if (delta === 1) {
								optionsDiv.scrollTop += 50
							} else {
								optionsDiv.scrollTop -= 50
							}
						}
					})
				}

				optionsDiv.addEventListener("scroll", e => {
					if (e.target.scrollWidth - e.target.scrollTop === e.target.clientWidth) {
						e.target.classList.add("_decrement-scroll")
					} else {
						e.target.classList.remove("_decrement-scroll")
					}

					if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
						e.target.classList.add("_increment-scroll")
					} else {
						e.target.classList.remove("_increment-scroll")
					}
				})

				window.addEventListener("click", e => {
					if (!selectDiv.contains(e.target)) {
						selectDiv.classList.remove("_open")
						selectDiv.classList.remove("_open-reverse")
						if (optionsDiv.querySelector(".option.selected").getAttribute("value") === "") {
							selectDiv.classList.remove("_valid")
							if (selectDiv !== document.activeElement) {
								selectText.style.opacity = 0
							}
						} else {
							selectDiv.classList.add("_valid")
							selectText.style.opacity = 1
						}
					}
				})

				window.addEventListener("scroll", () => {
					if (selectsDiv.querySelector("._open, ._open-reverse")) {
						selectDiv.blur()
						selectDiv.classList.remove("_open")
						selectDiv.classList.remove("_open-reverse")
					}
				})

				document.addEventListener("mouseleave", e => {
					if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
						if (!selectDiv.contains(e.target)) {
							selectDiv.blur()
							selectDiv.classList.remove("_open")
							selectDiv.classList.remove("_open-reverse")
							if (optionsDiv.querySelector(".option.selected").getAttribute("value") === "") {
								selectDiv.classList.remove("_valid")
								if (selectDiv !== document.activeElement) {
									selectText.style.opacity = 0
								}
							} else {
								selectDiv.classList.add("_valid")
								selectText.style.opacity = 1
							}
						}
					}
				})

				if (customSelect.id !== null && customSelect.id !== "") {
					const inputHidden = document.createElement("input")
					inputHidden.type = "hidden"
					inputHidden.name = customSelect.name
					inputHidden.value = optionsDiv.querySelector(".option.selected").getAttribute("value")
					optionsDiv.after(inputHidden)
				}

				//  NOTE:  MODE LANG
				if (customSelect.getAttribute("mode")?.search("mode-lang-") === 0) {
					optionsDiv.querySelectorAll(".option").forEach(option => {
						option.classList.remove("selected")
						if (option.getAttribute("value") === customSelect.getAttribute("mode").replace("mode-lang-", "")) {
							option.classList.add("selected")
							if (customSelect.getAttribute("icon") === "true") {
								if (customSelect.getAttribute("icon-type") === "img") {
									selectImg.src = `${customSelect.getAttribute("icon-path")}/${option.getAttribute("icon")}.${customSelect.getAttribute("icon-ext")}`
								}

								if (customSelect.getAttribute("icon-type") === "awesome") {
									selectAwesome.className = option.getAttribute("icon")
								}
							}
							selectText.textContent = option.textContent
						}
					})
				}

				const modeLangClick = () => {
					if (customSelect.getAttribute("mode")?.search("mode-lang-") === 0) {
						if (customSelect.getAttribute("mode") !== "mode-lang-" + optionsDiv.querySelector(".option.selected").getAttribute("value")) {
							setCookie("lang_change", "ok", 365)
							setCookie("mode_lang", optionsDiv.querySelector(".option.selected").getAttribute("value"), 365)

							setTimeout(() => {
								location.reload()
							}, 500)
						}
					}
				}

				//  NOTE:  MODE DARK
				if (customSelect.getAttribute("mode")?.search("mode-dark-") === 0) {
					let darkName = customSelect.getAttribute("mode").replace("mode-dark-", "")

					if (customSelect.getAttribute("mode") === "mode-dark-automatic") {
						if (hour >= 6 && hour < 18) {
							darkName = "automatic"
						}
						if (hour >= 18 && hour < 24) {
							darkName = "automatic"
						}
						if (hour >= 0 && hour < 6) {
							darkName = "automatic"
						}
					}

					optionsDiv.querySelectorAll(".option").forEach(option => {
						option.classList.remove("selected")
						if (option.getAttribute("value") === darkName) {
							option.classList.add("selected")
							if (customSelect.getAttribute("icon") === "true") {
								if (customSelect.getAttribute("icon-type") === "img") {
									selectImg.src = `${customSelect.getAttribute("icon-path")}/${option.getAttribute("icon")}.${customSelect.getAttribute("icon-ext")}`
								}

								if (customSelect.getAttribute("icon-type") === "awesome") {
									selectAwesome.className = option.getAttribute("icon")
								}
							}
							selectText.textContent = option.textContent
						}
					})
				}

				const modeDarkClick = () => {
					if (customSelect.getAttribute("mode")?.search("mode-dark-") === 0) {
						if (customSelect.getAttribute("mode") !== "mode-dark-" + optionsDiv.querySelector(".option.selected").getAttribute("value")) {
							setCookie("dark_change", "ok", 365)
							setCookie("mode_dark", optionsDiv.querySelector(".option.selected").getAttribute("value"), 365)

							setTimeout(() => {
								location.reload()
							}, 500)
						}
					}
				}

				//  NOTE:  MODE DESIGN
				if (customSelect.getAttribute("mode")?.search("mode-design-") === 0) {
					let designName = customSelect.getAttribute("mode").replace("mode-design-", "")

					if (getCookie("mode_design") === "design-1") {
						document.body.classList.add("radius-on")
					} else if (getCookie("mode_design") === "design-2") {
						document.body.classList.add("radius-on")
					} else if (getCookie("mode_design") === "design-3") {
						document.body.classList.add("radius-on")
					} else if (getCookie("mode_design") === "design-4") {
						document.body.classList.add("radius-off")
					} else if (getCookie("mode_design") === "design-5") {
						document.body.classList.add("radius-off")
					} else if (getCookie("mode_design") === "design-6") {
						document.body.classList.add("radius-off")
					} else if (getCookie("mode_design") === "design-7") {
						document.body.classList.add("radius-off")
					} else {
						document.body.classList.add("radius-on")
					}

					optionsDiv.querySelectorAll(".option").forEach(option => {
						option.classList.remove("selected")
						if (option.getAttribute("value") === designName) {
							option.classList.add("selected")
							if (customSelect.getAttribute("icon") === "true") {
								if (customSelect.getAttribute("icon-type") === "img") {
									selectImg.src = `${customSelect.getAttribute("icon-path")}/${option.getAttribute("icon")}.${customSelect.getAttribute("icon-ext")}`
								}

								if (customSelect.getAttribute("icon-type") === "awesome") {
									selectAwesome.className = option.getAttribute("icon")
								}
							}
							selectText.textContent = option.textContent
						}
					})
				}

				const modeDesignClick = () => {
					if (customSelect.getAttribute("mode")?.search("mode-design-") === 0) {
						if (customSelect.getAttribute("mode") !== "mode-design-" + optionsDiv.querySelector(".option.selected").getAttribute("value")) {
							setCookie("design_change", "ok", 365)
							setCookie("mode_design", optionsDiv.querySelector(".option.selected").getAttribute("value"), 365)

							setTimeout(() => {
								location.reload()
							}, 500)
						}
					}
				}

				//  NOTE:  MODE CHANGE COLOR
				if (customSelect.getAttribute("mode")?.search("mode-change-color-") === 0) {
					let changeColorName = customSelect.getAttribute("mode").replace("mode-change-color-", "")

					optionsDiv.querySelectorAll(".option").forEach(option => {
						option.classList.remove("selected")
						if (option.getAttribute("value") === changeColorName) {
							option.classList.add("selected")
							if (customSelect.getAttribute("icon") === "true") {
								if (customSelect.getAttribute("icon-type") === "img") {
									selectImg.src = `${customSelect.getAttribute("icon-path")}/${option.getAttribute("icon")}.${customSelect.getAttribute("icon-ext")}`
								}

								if (customSelect.getAttribute("icon-type") === "awesome") {
									selectAwesome.className = option.getAttribute("icon")
								}
							}
							selectText.textContent = option.textContent
						}
					})
				}

				const modeChangeColorClick = () => {
					if (customSelect.getAttribute("mode")?.search("mode-change-color-") === 0) {
						if (customSelect.getAttribute("mode") !== "mode-change-color-" + optionsDiv.querySelector(".option.selected").getAttribute("value")) {
							setCookie("change_color_change", "ok", 365)
							setCookie("mode_change_color", optionsDiv.querySelector(".option.selected").getAttribute("value"), 365)

							setTimeout(() => {
								location.reload()
							}, 500)
						}
					}
				}
				//  NOTE:  MODE ICON NETWORK
				if (customSelect.getAttribute("mode")?.search("mode-icon-network-") === 0) {
					let changeDesignNetwork = customSelect.getAttribute("mode").replace("mode-icon-network-", "")

					optionsDiv.querySelectorAll(".option").forEach(option => {
						option.classList.remove("selected")
						if (option.getAttribute("value") === changeDesignNetwork) {
							option.classList.add("selected")
							if (customSelect.getAttribute("icon") === "true") {
								if (customSelect.getAttribute("icon-type") === "img") {
									selectImg.src = `${customSelect.getAttribute("icon-path")}/${option.getAttribute("icon")}.${customSelect.getAttribute("icon-ext")}`
								}

								if (customSelect.getAttribute("icon-type") === "awesome") {
									selectAwesome.className = option.getAttribute("icon")
								}
							}
							selectText.textContent = option.textContent
						}
					})
				}

				const modeIconNetworkClick = () => {
					if (customSelect.getAttribute("mode")?.search("mode-icon-network-") === 0) {
						if (customSelect.getAttribute("mode") !== "mode-icon-network-" + optionsDiv.querySelector(".option.selected").getAttribute("value")) {
							setCookie("icon_network_change", "ok", 365)
							setCookie("mode_icon_network", optionsDiv.querySelector(".option.selected").getAttribute("value"), 365)

							const iconNetwork = document.querySelectorAll(".iconNetwork")

							iconNetwork.forEach(n => {
								n.src = n.src.replace(n.src.substr(-6, 2), getCookie("mode_icon_network"))
							})
						}
					}
				}

				const eventClick = () => {
					modeLangClick()
					modeDarkClick()
					modeDesignClick()
					modeChangeColorClick()
					modeIconNetworkClick()
				}
			}
		}
	}
}
