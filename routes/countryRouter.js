const Router = require('express')
const router = new Router()
const countryController = require('../controllers/countryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), countryController.create)
router.get('/', countryController.getAll)

module.exports = router