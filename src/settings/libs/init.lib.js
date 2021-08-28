//  INFO:  LIB INIT

//  NOTE:  ESLINT FIX
/* global global __filename __dirname */

//  NOTE:  IMPORT INTERNAL MODULE
// ============================================================
import fs from "fs"
import path from "path"
import url from "url"
import util from "util"

//  NOTE:  IMPORT DEPENDENCIES MODULES
// ============================================================
import bcryptJs from "bcryptjs"
import canvas from "canvas"
import cookieParser from "cookie-parser"
import cookieSession from "cookie-session"
import ejs from "ejs"
import express from "express"
import expressEjsLayouts from "express-ejs-layouts"
import expressFileUpload from "express-fileupload"
import expressUserAgent from "express-useragent"
import geoIpCountry from "geoip-country"
import mongoose from "mongoose"
import mongoosePaginateV2 from "mongoose-paginate-v2"
import nodeFetch from "node-fetch"
import nodeMailer from "nodemailer"
import stripe from "stripe"

//  NOTE:  IMPORT DEV DEPENDENCIES MODULES
// ============================================================
import colors from "colors"
import editJsonFile from "edit-json-file"
import "magic-globals"
import serveFavicon from "serve-favicon"

//  NOTE:  INTERNAL GLOBALS
// ============================================================
global.fs = fs
global.path = path
global.url = url
global.util = util

//  NOTE:  DEPENDENCIES GLOBALS
// ============================================================
global.bcryptJs = bcryptJs
global.canvas = canvas
global.cookieParser = cookieParser
global.cookieSession = cookieSession
global.ejs = ejs
global.express = express
global.expressEjsLayouts = expressEjsLayouts
global.expressFileUpload = expressFileUpload
global.expressUserAgent = expressUserAgent
global.geoIpCountry = geoIpCountry
global.mongoose = mongoose
global.mongoosePaginateV2 = mongoosePaginateV2
global.nodeFetch = nodeFetch
global.nodeMailer = nodeMailer
global.stripe = stripe

//  NOTE:  DEV DEPENDENCIES GLOBALS
// ============================================================
global.colors = colors
global.editJsonFile = editJsonFile
global.serveFavicon = serveFavicon

//  NOTE:  CONSTANTS GLOBALS
// ============================================================
global.__filename = url.fileURLToPath(import.meta.url)
global.__dirname = path.dirname(__filename)
global.app = express()
global.router = express.Router()

//  NOTE:  WE CALL THE CONFIGURATION FILE
// ============================================================
global.config = editJsonFile(path.join(__dirname, "../../config", "config.json"), {
	stringify_width: 4
})
