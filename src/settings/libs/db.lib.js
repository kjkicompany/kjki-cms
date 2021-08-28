//  INFO:  LIB INIT

//  NOTE:  ESLINT FIX
/* global func process config mongoose colors __file __ext __line */

//  NOTE:  CONSTANTS
// ============================================================
const dbType = config.get("db.type")
const dbHost = config.get("db.host")
const dbPort = config.get("db.port")
const dbName = process.env.NODE_ENV === "development" ? config.get("db.nameDevelopment") : config.get("db.nameProduction")
const dbUser = config.get("db.user")
const dbPass = config.get("db.pass")
const dbAuth = config.get("db.auth")
const dbUri = `${dbType}://${dbHost}:${dbPort}/${dbName}`

//  NOTE:  FUNCTION DB CONNECT
// ============================================================
const dbConnect = async () => {
	await mongoose
		.connect(dbUri, {
			user: dbUser,
			pass: dbPass,
			authSource: dbAuth,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
			autoIndex: true,
			serverSelectionTimeoutMS: 1000
		})
		.then(() => {
			console.log(
				colors.cyan("["),
				colors.cyan("INFO"),
				colors.cyan("]"),
				colors.green("["),
				colors.green(func.formatDateTime()),
				colors.green("]"),
				colors.cyan("["),
				colors.cyan("Database:"),
				colors.yellow("on"),
				colors.cyan("|"),
				colors.cyan("Mode:"),
				colors.yellow(process.env.NODE_ENV),
				colors.cyan("|"),
				colors.cyan("Host:"),
				colors.yellow(dbHost),
				colors.cyan("|"),
				colors.cyan("Port:"),
				colors.yellow(dbPort),
				colors.cyan("|"),
				colors.cyan("Db:"),
				colors.yellow(dbName),
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
		.catch(errorDb => {
			const name = errorDb.name
			const message = errorDb.message

			console.log(
				colors.red("["),
				colors.red("ERROR"),
				colors.red("]"),
				colors.green("["),
				colors.green(func.formatDateTime()),
				colors.green("]"),
				colors.red("["),
				colors.red("Database:"),
				colors.yellow("off"),
				colors.cyan("|"),
				colors.cyan("Mode:"),
				colors.yellow(process.env.NODE_ENV),
				colors.red("|"),
				colors.red("Status:"),
				colors.yellow(`${name}: ${message}`),
				colors.red("]"),
				colors.red("["),
				colors.red("File:"),
				colors.yellow(__file),
				colors.red("|"),
				colors.red("Line:"),
				colors.yellow(__line),
				colors.red("]")
			)
		})
}

//  NOTE:  EXPORT
// ============================================================
export default dbConnect()
