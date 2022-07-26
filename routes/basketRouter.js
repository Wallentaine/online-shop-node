const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/', basketController.addBasketItem)
router.get('/', basketController.getBasket)
router.delete('/', basketController.deleteBasketItem)

module.exports = router