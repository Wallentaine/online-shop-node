const Router = require('express')
const router = new Router()
const likedController = require('../controllers/likedController')

router.post('/', likedController.addLikedFilm)
router.get('/', likedController.getAll)
router.get('/:id', likedController.checkFilm)
router.delete('/delete/:id', likedController.deleteLikedFilm)

module.exports = router