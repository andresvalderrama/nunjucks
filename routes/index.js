const router = require('express').Router()

router.get('/locale', (req, res) => {
  console.log(req.query)
  res.redirect('/')
})

module.exports = router
