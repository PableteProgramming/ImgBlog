const express= require('express')
const serveIndex= require('serve-directory')
const serveStatic= require('serve-static')
const sphp= require('sphp')

router= express.Router()

router.use(serveIndex('public'))
router.use(sphp.express('public/uploads'))

router.use(serveStatic('public/uploads'))

module.exports = router