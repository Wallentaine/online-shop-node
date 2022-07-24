const Router = require('express')
const router = new Router()
const actorController = require('../controllers/actorController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), actorController.create)
router.get('/', actorController.getAll)

module.exports = router