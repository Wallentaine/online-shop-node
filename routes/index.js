const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const filmRouter = require('./filmRouter')
const basketRouter = require('./basketRouter')
const genreRouter = require('./genreRouter')
const scenaristRouter = require('./scenaristRouter')
const actorRouter = require('./actorRouter')
const producerRouter = require('./producerRouter')
const countryRouter = require('./countryRouter')
const likedRouter = require('./likedRouter')
const blockedRouter = require('./blockedRouter')
const purchasedRouter = require('./purchasedRouter')
const ratingRouter = require('./ratingRouter')


router.use('/user', userRouter)
router.use('/film', filmRouter)
router.use('/basket', basketRouter)
router.use('/genre', genreRouter)
router.use('/scenarist', scenaristRouter)
router.use('/actor', actorRouter)
router.use('/producer', producerRouter)
router.use('/country', countryRouter)
router.use('/liked', likedRouter)
router.use('/blocked', blockedRouter)
router.use('/purchased', purchasedRouter)
router.use('/rating', ratingRouter)


module.exports = router