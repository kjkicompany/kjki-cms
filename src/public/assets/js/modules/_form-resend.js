//  INFO:  FORM RESEND

//  NOTE:  ESLINT FIX
/* global audioDanger audioSuccess */

//  NOTE:  EXPORT
// ============================================================
export const formResend = async () => {
	for (const formReSend of document.querySelectorAll(".form-reSend")) {
		const button = formReSend.querySelector(".button-reSend")
		const buttonText = button.innerHTML
		const buttonWait = '<i class="loading _button"></i>'

		formReSend.addEventListener("submit", e => {
			e.preventDefault()

			const action = formReSend.action
			const method = formReSend.method
			const data = JSON.stringify(Object.fromEntries(new FormData(formReSend)))

			audioDanger.pause()
			audioDanger.currentTime = 0
			audioSuccess.pause()
			audioSuccess.currentTime = 0

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
					if (res.check === false) {
						audioDanger.play()

						setTimeout(() => {
							button.disabled = false
							button.innerHTML = `<i class="fas fa-times-circle text-dander"></i> ${buttonText}`
						}, 500)
					} else {
						let totalTime = res.time
						audioSuccess.play()

						setTimeout(() => {
							button.disabled = true
							button.innerHTML = `<i class="fas fa-check-circle text-success"></i> ${buttonText}`
						}, 500)

						setTimeout(() => {
							button.innerHTML = totalTime

							const timeValue = setInterval(() => {
								totalTime -= 1
								button.innerHTML = totalTime
								if (totalTime <= 0) {
									clearInterval(timeValue)
								}
							}, 1000)

							setTimeout(() => {
								button.disabled = false
								button.innerHTML = `<i class="fas fa-check-circle text-success"></i> ${buttonText}`
							}, totalTime + "000")
						}, 3000)
					}
				})
				.catch(error => {
					audioDanger.play()
					console.log(`%c [ERROR] : ["${error}"]`, "color: #dc3545; font-size: 14px; font-weight: 900;")

					setTimeout(() => {
						button.disabled = false
						button.innerHTML = `<i class="fas fa-times-circle text-danger"></i> ${buttonText}`
					}, 500)
				})
		})
	}
}
