const Router = require('express')
const router = new Router()
const filmController = require('../controllers/filmController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), filmController.create)
router.get('/', filmController.getAll)
router.get('/:id', filmController.getOne)

module.exports = router