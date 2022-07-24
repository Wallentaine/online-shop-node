const Router = require('express')
const router = new Router
const purchasedController = require('../controllers/purchasedController')

router.post('/', purchasedController.addPurchasedFilm)
router.get('/', purchasedController.getAll)

module.exports = router