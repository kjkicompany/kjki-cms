// INFO:  MAIN

// NOTE:  IMPORTS
// ============================================================
import { options } from "./modules/_options.js"
import { minWidth } from "./modules/_min-width.js"
import { hoverLogo } from "./modules/_hover-logo.js"
import { fullScreen } from "./modules/_full-screen.js"
import { toggleSettings } from "./modules/_toggle-settings.js"
import { customInputs } from "./modules/_custom-input.js"
import { customSelects } from "./modules/_custom-select.js"
import { customCheckBoxs } from "./modules/_custom-check-box.js"
import { formSubmit } from "./modules/_form-submit.js"
import { formResend } from "./modules/_form-resend.js"

import { preload } from "./modules/_preload.js"

// NOTE:  LOAD DOM
// ============================================================
document.addEventListener("DOMContentLoaded", async () => {
	await options()
	await minWidth()
	await hoverLogo()
	await fullScreen()
	await toggleSettings()
	await customInputs()
	await customSelects()
	await customCheckBoxs()
	await formSubmit()
	await formResend()

	await preload()
})
