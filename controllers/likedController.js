const {Liked} = require('../models/models')
const ApiError = require('../error/ApiError')

class LikedController {
    async addLikedFilm(req, res, next) {
        const {userId, filmId} = req.body

        if (userId && filmId) {
            const exist = await Liked.findOne({where: {userId, filmId}})

            if (exist) return next(ApiError.internal("Что-то пошло не так!"))

            const liked = await Liked.create({userId, filmId})

            return res.json(liked)
        } else if (!userId) {
            return next(ApiError.badRequest("Не был передан UserID!"))
        } else if (!filmId) {
            return next(ApiError.badRequest("Не был передан FilmId!"))
        }
    }

    async getAll(req, res, next) {
        const {userId} = req.params

        if (userId) {
            const liked = await Liked.findAll({where: {userId}})

            return res.json(liked)
        } else {
            return next(ApiError.badRequest("Не был передан Id пользователя!"))
        }
    }

    async checkCurrentFilm(req, res, next) {
        const {userId, filmId} = req.body

        if (userId && filmId) {
            const liked = await Liked.findOne({where: {userId, filmId}})

            if (liked) return res.json(liked)
        } else if (!userId) {
            return next(ApiError.badRequest("Не был передан UserID!"))
        } else if (!filmId) {
            return next(ApiError.badRequest("Не был передан FilmId!"))
        }
    }

    async deleteLikedFilm(req, res, next) {
        const {id} = req.body

        if (id) {
            const exist = await Liked.findOne({where: {id}})

            if (!exist) return next(ApiError.internal("Что-то пошло не так!"))

            const liked = await Liked.destroy({where: {id}})

            return res.json(liked)
        } else {
            return next(ApiError.badRequest("В запросе не был передан Id"))
        }
    }
}

module.exports = new LikedController()