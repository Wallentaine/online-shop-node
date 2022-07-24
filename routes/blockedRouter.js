const Router = require('express')
const router = new Router()
const blockedController = require('../controllers/blockedController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, blockedController.addBlockedFilm)
router.get('/:userId', blockedController.getAll)
router.delete('/', authMiddleware, blockedController.deleteBlockedFilm)

module.exports = router