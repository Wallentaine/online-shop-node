const Router = require('express')
const router = new Router()
const likedController = require('../controllers/likedController')

router.post('/', likedController.addLikedFilm)
router.get('/:userId', likedController.getAll)
router.get('/', likedController.checkCurrentFilm)
router.delete('/', likedController.deleteLikedFilm)

module.exports = router