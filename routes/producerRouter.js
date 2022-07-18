const Router = require('express')
const router = new Router()
const producerController = require('../controllers/producerController')

router.post('/', producerController.create)
router.get('/', producerController.getAll)

module.exports = router