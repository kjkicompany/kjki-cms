// INFO:  CUSTOM CHECK BOX

//  NOTE:  EXPORT
// ============================================================
export const customCheckBoxs = async () => {
	for (const customCheckBox of document.querySelectorAll(".custom-checkbox")) {
		const checkbox = customCheckBox.querySelector("input[type='checkbox']")

		customCheckBox.addEventListener("click", e => {
			if (e.target.className === "link-info") {
				e.stopImmediatePropagation()
			} else {
				if (checkbox.checked !== true) {
					checkbox.checked = true
				} else {
					checkbox.checked = false
				}
			}
		})

		customCheckBox.addEventListener("keyup", e => {
			if (e.target.className === "link-info") {
				e.stopImmediatePropagation()
			} else {
				if (e.code === "Space" || e.code === "Enter") {
					if (checkbox.checked !== true) {
						checkbox.checked = true
					} else {
						checkbox.checked = false
					}
				}
			}
		})
	}
}
