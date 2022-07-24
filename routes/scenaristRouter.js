const Router = require('express')
const router = new Router()
const scenaristController = require('../controllers/scenaristController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), scenaristController.create)
router.get('/', scenaristController.getAll)

module.exports = router