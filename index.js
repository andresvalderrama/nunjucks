const path = require('path')

const express = require('express')
const nunjucks = require('nunjucks')
const i18n = require('i18n')
const cookieParser = require('cookie-parser')

const app = express()

i18n.configure({
  locales: ['en', 'de', 'es'],
  directory: path.resolve(__dirname, 'locales'),
  defaultLocale: 'de',
  queryParameter: 'lang',
  cookie: 'locale'
})
app.use(cookieParser('4io-d8#49jpd;aoi9'))
app.use(i18n.init)

app.set('view engine', 'njk')
nunjucks.configure(path.resolve(__dirname, 'views'), {
  watch: true,
  autoescape: true,
  express: app
})

app.get('/locale', (req, res) => {
  res.cookie('locale', req.query.lang, { httpOnly: true }).redirect(req.query.redirect)
})

app.get('/', (req, res) => {
  console.log('Cookies: ', req.cookies)
  console.log('Signed Cookies: ', req.signedCookies)

  res.render('index', { title: 'andres' })
})

if (!module.parent) {
  app.listen(3000, () => console.log('Listening on port 3000'))
}
