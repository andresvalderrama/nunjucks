const path = require('path')

const Koa = require('koa')
const logger = require('koa-logger')
const views = require('koa-views')
const Router = require('koa-router')
const nunjucks = require('nunjucks')

const app = module.exports = new Koa()
const router = new Router()
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views/partials'), {
  watch: true,
  noCache: true
})

app.use(logger())

app.use(views(path.resolve(__dirname, 'views'), {
  extension: 'njk',
  map: { njk: 'nunjucks' },
  options: {
    nunjucksEnv: env
  }
}))

router.get('/', async (ctx, next) => {
  ctx.state = { title: 'my title', author: 'queckezz' }
  await ctx.render('index')
})

app
  .use(router.routes())
  .use(router.allowedMethods())

if (!module.parent) app.listen(3000)

// https://github.com/chriscoyier/playing_with_nunjucks/tree/master/5
// npm install --save koa-nunjucks-2
