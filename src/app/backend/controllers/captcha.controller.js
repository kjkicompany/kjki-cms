//  INFO:  CONTROLLER CAPTCHA

//  NOTE:  ESLINT FIX
/* global canvas Buffer */

//  NOTE:  CONSTANT
// ============================================================
const captchaControllerBackEnd = {
	//  NOTE:  GET CAPTCHA
	getCaptcha: (req, res) => {
		const randomColor = () => {
			let r = Math.floor(Math.random() * 256)
			let g = Math.floor(Math.random() * 256)
			let b = Math.floor(Math.random() * 256)
			return "rgb(" + r + "," + g + "," + b + ")"
		}

		const sessions = req.session

		const width = 380
		const height = 50

		const cvs = canvas.createCanvas(width, height)
		const ctx = cvs.getContext("2d")

		let showNum = []
		let sCode = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9"
		let saCode = sCode.split(",")
		let saCodeLen = saCode.length

		for (let i = 0; i <= 6; i++) {
			let sIndex = Math.floor(Math.random() * saCodeLen)
			let sDeg = (Math.random() * 30 * Math.PI) / 360
			let cTxt = saCode[sIndex]
			showNum[i] = cTxt
			let x = 20 + i * 30
			let y = 10 + Math.random() * 8
			ctx.font = "bold 32px Comic Sans MS"
			ctx.translate(x, y)
			ctx.rotate(sDeg)
			ctx.fillStyle = randomColor()
			ctx.fillText(cTxt, 70, 10)
			ctx.rotate(-sDeg)
			ctx.translate(-x, -y)
		}

		for (let i = 0; i <= 5; i++) {
			ctx.strokeStyle = randomColor()
			ctx.beginPath()
			ctx.moveTo(Math.random() * width, Math.random() * height)
			ctx.lineTo(Math.random() * width, Math.random() * height)
			ctx.stroke()
		}

		for (let i = 0; i < 30; i++) {
			ctx.strokeStyle = randomColor()
			ctx.beginPath()
			let x = Math.random() * width
			let y = Math.random() * height
			ctx.moveTo(x, y)
			ctx.lineTo(x + 1, y + 1)
			ctx.stroke()
		}

		sessions.captcha = showNum.join("")

		let img = cvs.toDataURL("image/png", 1.0)

		img = img.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
		img = Buffer.from(img, "base64")

		res.writeHead(200, {
			"Content-Type": "image/png",
			"Content-Length": img.length
		})

		res.end(img)
	}
}

//  NOTE:  EXPORT
// ============================================================
export default captchaControllerBackEnd
