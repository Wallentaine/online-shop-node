const Router = require('express')
const router = new Router()
const blockedController = require('../controllers/blockedController')

router.post('/', blockedController.addBlockedFilm)
router.get('/:userId', blockedController.getAll)
router.delete('/', blockedController.deleteBlockedFilm)

module.exports = router