//  INFO:  LIB SERVER

//  NOTE:  ESLINT FIX
/* global process config func colors __file __ext __line app */

//  NOTE:  LISTEN
// ============================================================
app.listen(app.get("appPort"), () => {
	console.log(
		colors.cyan("["),
		colors.cyan("INFO"),
		colors.cyan("]"),
		colors.green("["),
		colors.green(func.formatDateTime()),
		colors.green("]"),
		colors.cyan("["),
		colors.cyan("Server"),
		colors.yellow("on"),
		colors.cyan("|"),
		colors.cyan("Mode:"),
		colors.yellow(process.env.NODE_ENV),
		colors.cyan("|"),
		colors.cyan("Url FrontEnd:"),
		colors.yellow(app.get("appUrl")),
		colors.cyan("|"),
		colors.cyan("Url BackEnd:"),
		colors.yellow(`${app.get("appUrl")}/panel`),
		colors.cyan("Host:"),
		colors.yellow(app.get("appHost")),
		colors.cyan("|"),
		colors.cyan("Port:"),
		colors.yellow(app.get("appPort")),
		colors.cyan("|"),
		colors.cyan("|"),
		colors.cyan("Version:"),
		colors.yellow(config.get("app.version")),
		colors.cyan("]"),
		colors.cyan("["),
		colors.cyan("File:"),
		colors.yellow(`${__file}.${__ext}`),
		colors.cyan("|"),
		colors.cyan("Line:"),
		colors.yellow(`${__line}`),
		colors.cyan("]")
	)
})
