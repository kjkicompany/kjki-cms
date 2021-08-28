// INFO:  CUSTOM FORM SUBMIT

//  NOTE:  ESLINT FIX
/* global audioDanger audioSuccess getFocus */

//  NOTE:  EXPORT
// ============================================================
export const formSubmit = async () => {
	for (const form of document.querySelectorAll(".form")) {
		const inputs = form.querySelectorAll(".custom-input")
		const selects = form.querySelectorAll(".custom-select")
		const checkboxs = form.querySelectorAll(".custom-checkbox")
		const changePasswords = form.querySelectorAll("#change-password")
		const progressPasswords = form.querySelectorAll(".password-progress-bar")
		const status = form.querySelectorAll(".status")
		const statusEndAll = form.querySelectorAll("#status")
		const statusEnd = form.querySelector("#status")

		const button = form.querySelector(".button-default")
		const buttonText = button.innerHTML
		const buttonWait = '<i class="loading _button"></i>'

		form.addEventListener("submit", e => {
			e.preventDefault()

			const action = form.action
			const method = form.method
			const data = JSON.stringify(Object.fromEntries(new FormData(form)))

			audioDanger.pause()
			audioDanger.currentTime = 0
			audioSuccess.pause()
			audioSuccess.currentTime = 0

			// FIXME: fixHeightAccordion()

			inputs.forEach(input => {
				input.querySelector("input").blur()
				input.querySelector("input").classList.remove("_danger")
			})

			selects.forEach(select => {
				select.classList.remove("_danger")
			})

			checkboxs.forEach(checkbox => {
				checkbox.classList.remove("_danger")
			})

			statusEndAll.forEach(status => {
				status.innerHTML = ""
				status.classList.remove("_info")
				status.classList.remove("_danger")
			})

			status.forEach(status => {
				status.innerHTML = ""
				status.classList.remove("_danger")
			})

			button.innerHTML = ""
			setTimeout(() => {
				button.disabled = true
				button.innerHTML = buttonWait
			}, 200)

			fetch(action, {
				method: method,
				body: data,
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => response.json())
				.then(res => {
					const focus = form.querySelector(`#input-${res.focus}`)

					const status = form.querySelector(`#status-${res.focus}`)

					if (res.check === false) {
						audioDanger.play()

						if (focus !== null) {
							getFocus(focus)

							focus.classList.add("_danger")

							status.classList.add("_danger")
							status.innerHTML = res.text
						} else {
							statusEnd.classList.add("_danger")
							statusEnd.innerHTML = res.text
						}

						setTimeout(() => {
							button.disabled = false
							button.innerHTML = buttonText
						}, 500)
					} else {
						let totalTime = res.time

						inputs.forEach(input => {
							input.querySelector("input").classList.add("_success")
							input.querySelector("input").disabled = true
							input.querySelector("input").value = ""
							input.querySelector("input").style.pointerEvents = "none"
						})

						selects.forEach(select => {
							select.classList.add("_success")
							select.style.pointerEvents = "none"
						})

						checkboxs.forEach(checkbox => {
							checkbox.classList.add("_success")
							checkbox.querySelector("input").removeAttribute("checked")
							checkbox.style.pointerEvents = "none"
						})

						changePasswords.forEach(changePassword => {
							changePassword.style.display = "none"
						})

						progressPasswords.forEach(progressPassword => {
							progressPassword.style.display = "none"
						})

						audioSuccess.play()

						statusEnd.classList.add("_success")
						statusEnd.innerHTML = `${res.text} ${totalTime}`

						setInterval(() => {
							totalTime -= 1
							statusEnd.innerHTML = `${res.text} ${totalTime}`
						}, 1000)

						setTimeout("location.href='" + res.redirect + "'", totalTime + "000")
					}
				})
				.catch(error => {
					audioDanger.play()

					statusEnd.classList.add("_danger")
					statusEnd.innerHTML = error
					statusEnd.focus()

					console.log(`%c [ERROR] : ["${error}"]`, "color: #dc3545; font-size: 14px; font-weight: 900;")

					setTimeout(() => {
						button.disabled = false
						button.innerHTML = buttonText
					}, 500)
				})
		})
	}
}
