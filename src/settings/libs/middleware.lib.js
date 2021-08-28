//  INFO:  LIB MIDDLEWARES

//  NOTE:  ESLINT FIX
/* global app expressEjsLayouts express expressFileUpload cookieParser cookieSession process config expressUserAgent */

//  NOTE:  MIDDLEWARES
// ============================================================
app.use(expressEjsLayouts)
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ type: "*/*" }))
app.use(expressFileUpload({ createParentPath: true }))
app.set("trust proxy", 1)
app.use(cookieParser())
app.use(
	cookieSession({
		name: process.env.NODE_ENV === "development" ? config.get("session.nameDevelopment") : config.get("session.nameProduction"),
		secret: process.env.NODE_ENV === "development" ? config.get("session.secretDevelopment") : config.get("session.secretProduction"),
		resave: false,
		saveUninitialized: false,
		signed: false,
		cookie: {
			maxAge: 365 * 24 * 60 * 60 * 1000
		}
	})
)
app.use(expressUserAgent.express())
