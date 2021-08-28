//  INFO:  MODEL USERS

//  NOTE:  ESLINT FIX
/* global mongoose mongoosePaginateV2 */

//  NOTE:  CONSTANT
// ============================================================
const usersSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			trim: true
		},

		lastName: {
			type: String,
			trim: true
		},

		nickName: {
			type: String,
			trim: true,
			unique: true,
			required: true
		},

		email: {
			type: String,
			trim: true,
			unique: true,
			required: true
		},

		password: {
			type: String,
			trim: true,
			required: true
		},

		biographyComment: {
			type: String,
			trim: true
		},

		testimonialComment: {
			type: String,
			trim: true
		},

		role: {
			type: String,
			trim: true,
			required: true,
			default: "free"
		},

		avatar: {
			type: String,
			trim: true
		},

		gender: {
			type: String,
			trim: true
		},

		birthDay: {
			type: String,
			trim: true
		},

		country: {
			type: String,
			trim: true
		},

		state: {
			type: String,
			trim: true
		},

		city: {
			type: String,
			trim: true
		},

		codePostal: {
			type: String,
			trim: true
		},

		address: {
			type: String,
			trim: true
		},

		phone: {
			type: String,
			trim: true
		},

		tokenAccount: {
			type: String,
			trim: true,
			required: true,
			default: ""
		},

		tokenTemp: {
			type: String,
			trim: true,
			default: ""
		},

		tokenReset: {
			type: String,
			trim: true,
			default: ""
		},

		sorting: {
			type: Number,
			trim: true,
			default: 0
		},

		settings: {
			lang: {
				type: String,
				required: true,
				trim: true
			},

			dark: {
				type: String,
				required: true,
				trim: true
			},

			design: {
				type: String,
				required: true,
				trim: true
			},

			changeColor: {
				type: String,
				required: true,
				trim: true
			},

			toggleMenu: {
				type: String,
				required: true,
				trim: true
			},

			iconNetwork: {
				type: String,
				required: true,
				trim: true
			}
		},

		logs: [
			{
				type: String,
				trim: true,
				required: true
			}
		],

		checkSecurity: [
			{
				ip: {
					type: String,
					trim: true,
					required: true
				},
				country: {
					type: String,
					trim: true,
					required: true
				},
				browser: {
					type: String,
					trim: true,
					required: true
				},
				version: {
					type: String,
					trim: true,
					required: true
				},
				platform: {
					type: String,
					trim: true,
					required: true
				},
				os: {
					type: String,
					trim: true,
					required: true
				}
			}
		],

		testimonialStatus: {
			type: Boolean,
			required: true,
			default: false
		},

		acceptTermsPrivacy: {
			type: Boolean,
			required: true,
			default: false
		},

		activateAccount: {
			type: Boolean,
			required: true,
			default: false
		},

		banned: {
			type: Boolean,
			required: true,
			default: false
		},

		create: {
			type: String,
			trim: true,
			required: true
		},

		update: {
			type: String,
			trim: true,
			required: true
		}
	},
	{
		timestamps: false,
		versionKey: false
	}
)

usersSchema.plugin(mongoosePaginateV2)

const usersModel = mongoose.model("users", usersSchema)

//  NOTE:  EXPORT
// ============================================================
export default usersModel
