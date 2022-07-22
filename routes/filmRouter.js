const Router = require('express')
const router = new Router()
const filmController = require('../controllers/filmController')

router.post('/', filmController.create)
router.get('/', filmController.getAll)
router.get('/:id', filmController.getOne)

module.exports = router