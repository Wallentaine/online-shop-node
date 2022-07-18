const Router = require('express')
const router = new Router()
const scenaristController = require('../controllers/scenaristController')

router.post('/', scenaristController.create)
router.get('/', scenaristController.getAll)

module.exports = router