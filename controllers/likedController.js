const {Liked} = require('../models/models')
const ApiError = require('../error/ApiError')

class LikedController {
    async addLikedFilm(req, res, next) {
        try {
            const {userId, filmId} = req.body

            if (!userId || !filmId) return next(ApiError.badRequest("Не был передан UserID и/или filmId"))

            const exist = await Liked.findOne({where: {userId, filmId}})

            if (exist) return next(ApiError.internal("Что-то пошло не так!"))

            const liked = await Liked.create({userId, filmId})

            return res.json(liked)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {userId} = req.params

            if (!userId) return next(ApiError.badRequest("Не был передан Id пользователя!"))

            const liked = await Liked.findAll({where: {userId}})

            if (!liked) return next(ApiError.badRequest("Что-то пошло не так!"))

            return res.json(liked)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async checkCurrentFilm(req, res, next) {
        try {
            const {userId, filmId} = req.body

            if (!userId || !filmId) return next(ApiError.badRequest("Не был передан UserID и/или filmId"))

            const liked = await Liked.findOne({where: {userId, filmId}})

            if (!liked) return next(ApiError.badRequest("Данного фильма нет в понравившихся пользователю!"))

            return res.json(liked)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteLikedFilm(req, res, next) {
        try {
            const {userId, filmId} = req.body

            if (!userId || !filmId) return next(ApiError.badRequest("Не был передан userId и/или filmId!"))

            const isLiked = await Liked.findOne({where: {userId, filmId}})

            if (!isLiked) return next(ApiError.badRequest("Данного фильма нет в понравившихся пользователю!"))

            const likedDestroy = await Liked.destroy({where: {id: isLiked.id}})

            if (!likedDestroy) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(likedDestroy)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new LikedController()