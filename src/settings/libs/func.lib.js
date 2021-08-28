//  INFO:  GLOBAL FUNC

//  NOTE:  ESLINT FIX
/* global func fs global nodeFetch config */

global.func = {
	//  NOTE:  FUNCTION: FORMAT DATE TIME
	// ============================================================
	//  EXAMPLE:  func.formatDateTime()
	//  RETURN:  01-01-2020 | 01:01:01 PM | AM
	//  EXAMPLE:  func.formatDateTime("date")
	//  RETURN:  01-01-2020
	//  EXAMPLE:  func.formatDateTime("time")
	//  RETURN:  01:01:01 PM | AM
	//  EXAMPLE:  func.formatDateTime("time24")
	//  RETURN:  24:01:01
	//  EXAMPLE:   func.formatDateTime("hour")
	//  RETURN:  01 | 24 hours
	//  EXAMPLE:  func.formatDateTime("year")
	//  RETURN:  2021
	formatDateTime: (type = null) => {
		let time = new Date()
		let day = time.getDate()
		let month = time.getMonth() + 1
		let year = time.getFullYear()
		let hour = time.getHours()
		let minute = time.getMinutes()
		let second = time.getSeconds()
		let am_pm = hour >= 12 ? "PM" : "AM"

		if (type === "hour") {
			return hour
		} else if (type === "time24") {
			return `${hour}:${minute}:${second}`
		}

		day = day < 10 ? "0" + day : day
		month = month < 10 ? "0" + month : month
		hour = hour % 12
		hour = hour ? hour : 12
		hour = hour < 10 ? "0" + hour : hour
		minute = minute < 10 ? "0" + minute : minute
		second = second < 10 ? "0" + second : second

		if (type === "date") {
			return `${day}-${month}-${year}`
		} else if (type === "time") {
			return `${hour}:${minute}:${second} ${am_pm}`
		} else if (type === "year") {
			return `${year}`
		} else {
			return `${day}-${month}-${year} | ${hour}:${minute}:${second} ${am_pm}`
		}
	},

	//  NOTE:  FUNCTION: SUBTRACT DATE
	// ============================================================
	//  EXAMPLE:  func.subtractDates("02-01-2021", "04-01-2021")
	//  RETURN:  2
	subtractDates: (D1, D2) => {
		const Date1 = D1.split("-")
		const Date2 = D2.split("-")
		const fDate1 = Date.UTC(Date1[2], Date1[1] - 1, Date1[0])
		const fDate2 = Date.UTC(Date2[2], Date2[1] - 1, Date2[0])
		const dif = fDate2 - fDate1
		const days = Math.floor(dif / (1000 * 60 * 60 * 24))
		return days
	},

	//  NOTE:  FUNCTION: GENERATE RANDOM ALPHANUMERIC
	// ============================================================
	//  EXAMPLE:  func.generateRandomAlphanumeric(5)
	//  RETURN:  a15e6
	generateRandomAlphanumeric: int => {
		let str = ""
		const randomChar = () => {
			let n = Math.floor(Math.random() * 62)
			if (n < 10) return n //1-10
			if (n < 36) return String.fromCharCode(n + 55) //A-Z
			return String.fromCharCode(n + 61) //a-z
		}
		while (str.length < int) str += randomChar()
		return str
	},

	//  NOTE:  FUNCTION: FIND SUBSTR
	// ============================================================
	//  EXAMPLE:  func.findSubStr("palabrA otRa palabra canción", 0, 6)
	//  RETURN:  palabra
	findSubStr: (str, index, length) => {
		return str.substr(index, length)
	},

	//  NOTE:  FUNCTION: GET FILE EXT
	// ============================================================
	//  EXAMPLE:  func.getFileExt("/avatar/admin.png")
	//  RETURN:  png
	getFileExt: str => {
		let basename = str.split(/[\\/]/).pop()
		let pos = basename.lastIndexOf(".")

		if (basename === "" || pos < 1) {
			return ""
		}
		return basename.slice(pos + 1)
	},

	//  NOTE:  FUNCTION: GET FILE NAME
	// ============================================================
	//  EXAMPLE:  func.getFileName("/avatar/admin.png")
	//  RETURN:  admin
	getFileName: str => {
		return str
			.split(/[\\/]/)
			.pop()
			.replace(/[>.][^.]+$/, "")
	},

	//  NOTE:  FUNCTION: GET ARRAY FILE NAME
	// ============================================================
	//  EXAMPLE:  func.getArrayFileName(["/avatar/admin.png", /avatar/free.png"])
	//  RETURN:  ["admin", "free"]
	getArrayFileName: array => {
		let results = []

		array.forEach(e => {
			results.push(
				e
					.split(/[\\/]/)
					.pop()
					.replace(/[>.][^.]+$/, "")
			)
		})
		return results
	},

	//  NOTE:  FUNCTION: GET FILE NAME
	// ============================================================
	//  EXAMPLE:  func.getFileNameExt("/avatar/admin.png")
	//  RETURN:  admin.png
	getFileNameExt: str => {
		return str.split(/[\\/]/).pop()
	},

	//  NOTE:  FUNCTION: GET FILES
	// ============================================================
	//  EXAMPLE:  func.getDirFiles(path.join(__dirname, "lang", "es"))
	//  RETURN:  [all path files]
	getDirFiles: dir => {
		let results = []
		let list = fs.readdirSync(dir)
		list.forEach(file => {
			file = dir + "\\" + file
			let stat = fs.statSync(file)
			if (stat && stat.isDirectory()) {
				results = results.concat(func.getDirFiles(file))
			} else {
				results.push(file)
			}
		})
		return results
	},

	//  NOTE:  FUNCTION: FIRST LETTER UPPERCASE
	// ============================================================
	//  EXAMPLE:  func.firstLetterUpperCase("admin")
	//  RETURN:  Admin
	firstLetterUppercase: str => {
		return str[0].toUpperCase() + str.slice(1).toLowerCase()
	},

	//  NOTE:  FUNCTION: FIRST LETTER OF EACH WORD UPPERCASE
	// ============================================================
	//  EXAMPLE:  func.firstLetterUpperCaseWord("ave carro")
	//  RETURN:  Ave Carro
	firstLetterUpperCaseWord: str => {
		return str
			.toString()
			.toLowerCase()
			.trim()
			.split(" ")
			.map(s => s[0].toUpperCase() + s.substr(1))
			.join(" ")
	},

	//  NOTE:  FUNCTION: LETTER TO LOWERCASE
	// ============================================================
	//  EXAMPLE:  func.letterToLowerCase("Admin")
	//  RETURN:  admin
	letterToLowerCase: str => {
		return str.toLowerCase()
	},

	//  NOTE:  FUNCTION: CREATE SLUG
	// ============================================================
	//  EXAMPLE:  func.createSlug("palabra OTRA PALABRA")
	//  RETURN:  palabra-otra-palabra
	createSlug: str => {
		return str
			.toString()
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9. ]/g, "")
			.replace(/[.]/g, "-")
			.replace(/\s+/g, "-")
	},

	//  NOTE:  FUNCTION: UNESCAPE HTML
	// ============================================================
	//  EXAMPLE:  func.unescapeHtml("&lt;")
	//  RETURN:  <
	unescapeHtml: html => {
		let returnText = html
		returnText = returnText.replace(/&nbsp;/gi, " ")
		returnText = returnText.replace(/&amp;/gi, "&")
		// eslint-disable-next-line quotes
		returnText = returnText.replace(/&quot;/gi, '"')
		returnText = returnText.replace(/&#39;/gi, "'")
		returnText = returnText.replace(/&lt;/gi, "<")
		returnText = returnText.replace(/&gt;/gi, ">")
		return returnText
	},

	//  NOTE:  FUNCTION: UNESCAPE HTML
	// ============================================================
	//  EXAMPLE:  func.imgBase64Encode("logo.png")
	//  RETURN:  data:image/png;base64,Sa7sf1dsf8798ds/dsd/df/sd===
	imgBase64Encode: src => {
		return `data:image/${func.getFileExt(src)};base64,${fs.readFileSync(src, { encoding: "base64" })}`
	},

	//  NOTE:  FUNCTION: GET ARRAY RED SOCIALS
	// ============================================================
	//  EXAMPLE:  func.getArrayRedSocials("34", "34", "1A")
	// designs: 1A, 1B, 1C, 1D, 1E, 1F
	//  RETURN:  <a class="none" href="url_facebook" target='_blank'><img src='icon_facebook-1A' width='34px' height='34px' alt='name_facebook' title='name_facebook'></a>
	getArrayRedSocials: (clase, url, fontAwesome, width, height, design) => {
		let result = []
		config.get("redSocials").forEach(network => {
			if (network.visible) {
				let linksSocials = `<a href="${network.url}" target="_blank">`
				linksSocials += `<a href="${network.url}" target="_blank">`
				if (fontAwesome === true) {
					if (network.name === "linkedin" || network.name === "tiktok") {
						linksSocials += `<i class="${clase} fab fa-${network.name}"></i>`
					} else {
						linksSocials += `<i class="${clase} fab fa-${network.name}-square"></i>`
					}
				} else {
					linksSocials += ` <img class="${clase}" src="${url}/assets/img/networks/${network.name}-${design}.png" width="${width}.px" height="${height}.px" alt="${network.name}" title="${network.name}">`
				}
				linksSocials += "</a>"
				result.push(linksSocials)
			}
		})
		return result.toString().replace(/,/g, "")
	},

	//  NOTE:  GET IP PUBLIC
	// ============================================================
	//  EXAMPLE:  await func.getIpPublic
	//  RETURN:  161.132.234.38
	getIpPublic: nodeFetch(config.get("app.getIpPublic"))
		.then(res => res.text())
		.then(body => {
			return body.replace(/[<>|A-Z|a-z|//| |:|\n]/g, "").trim()
		}),

	//  NOTE:  FUNCTION: EMAIL VALIDATE
	// ============================================================
	//  EXAMPLE 1: func.emailValidate("name@domain.com")
	//  RETURN:  true
	//  EXAMPLE 2: func.emailValidate("name domain.com")
	//  RETURN:  false
	emailValidate: str => {
		const rexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return rexp.test(String(str.toLowerCase()))
	},

	//  NOTE:  VALIDATE ACCEPTED CHARACTERS
	// ============================================================
	firstNameValidate: /[^a-z]/g,
	lastNameValidate: /[^a-z]/g,
	nickNameValidate: /[^a-z0-9_-]/g,
	codeValidate: /[^a-zA-Z0-9]/g,
	titleWebValidate: /[^a-zA-Z0-9@*#_-\s]/g,
	captchaValidate: /[^A-Z1-9]/g,

	passwordValidate: /[^a-zA-Z0-9@*#_-]/g,
	passwordValidateUpperCase: /[A-Z]/,
	passwordValidateLowerCase: /[a-z]/,
	passwordValidateNumber: /[0-9]/,
	passwordValidateSpecial: /[@*#_-]/
}
