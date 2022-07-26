const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, basketController.addBasketItem)
router.get('/', authMiddleware, basketController.getBasket)
router.delete('/', authMiddleware, basketController.deleteBasketItem)

module.exports = router