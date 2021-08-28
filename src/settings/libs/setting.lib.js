//  INFO:  LIB SETTING

//  NOTE:  ESLINT FIX
/* global process config path __dirname app */

//  NOTE:  SETTINGS
// ============================================================
app.set("appUrl", process.env.NODE_ENV === "development" ? config.get("app.urlDevelopment") : config.get("app.urlProduction"))
app.set("appHost", config.get("app.host"))
app.set("appPort", process.env.NODE_ENV === "development" ? config.get("app.portDevelopment") : config.get("app.portProduction"))
app.set("appLang", config.get("app.lang"))
app.set("appDark", config.get("app.dark"))
app.set("appChangeColor", config.get("app.changeColor"))
app.set("appToggleMenu", config.get("app.toggleMenu"))
app.set("appIconNetwork", config.get("app.iconNetwork"))
app.set("appDesign", config.get("app.design"))
app.set("views", path.join(__dirname, "../../app/"))
app.set("view engine", "ejs")
