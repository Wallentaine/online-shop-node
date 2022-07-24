const Router = require('express')
const router = new Router
const purchasedController = require('../controllers/purchasedController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, purchasedController.addPurchasedFilm)
router.get('/', authMiddleware, purchasedController.getAll)

module.exports = router