//  INFO:  LIB STATIC

//  NOTE:  ESLINT FIX
/* global express path __dirname app serveFavicon */

//  NOTE:  STATIC
// ============================================================
app.use(express.static(path.join(__dirname, "../../public")))
app.use(serveFavicon(path.join(__dirname, "../../public/assets/img", "logo.png")))
