const Router = require('express')
const router = new Router()
const producerController = require('../controllers/producerController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), producerController.create)
router.get('/', producerController.getAll)

module.exports = router