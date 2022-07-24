const Router = require('express')
const router = new Router()
const likedController = require('../controllers/likedController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, likedController.addLikedFilm)
router.get('/:userId', likedController.getAll)
router.get('/', authMiddleware, likedController.checkCurrentFilm)
router.delete('/', authMiddleware, likedController.deleteLikedFilm)

module.exports = router