const path = require('path')

const express = require('express')
const nunjucks = require('nunjucks')
const i18n = require('i18n')

const app = express()

i18n.configure({
  locales: ['en', 'de', 'es'],
  directory: path.resolve(__dirname, 'locales'),
  defaultLocale: 'de',
  queryParameter: 'lang'
})
app.use(i18n.init)

app.set('view engine', 'njk')
nunjucks.configure(path.resolve(__dirname, 'views'), {
  watch: true,
  autoescape: true,
  express: app
})

app.get('/', (req, res) => {
  res.render('index', { title: 'andres' })
})

if (!module.parent) {
  app.listen(3000, () => console.log('Listening on port 3000'))
}
