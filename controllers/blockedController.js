const {Blocked} = require('../models/models')
const ApiError = require('../error/ApiError')

class BlockedController {
    async addBlockedFilm(req, res, next) {
        try {
            const {userId, filmId} = req.body

            if (!userId || !filmId) return next(ApiError.badRequest("Не был передан userId и/или filmId!"))

            const exist = await Blocked.findOne({where: {userId, filmId}})

            if (exist) return next(ApiError.internal("Что-то пошло не так!"))

            const blocked = await Blocked.create({userId, filmId})

            if (!blocked) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(blocked)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {userId} = req.body

            if (!userId) return next(ApiError.badRequest("Не был передан Id пользователя!"))

            const blocked = await Blocked.findAll({where: {userId}})

            if (!blocked) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(blocked)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteBlockedFilm(req, res, next) {
        try {
            const {userId, filmId} = req.body

            if (!userId || !filmId) return next(ApiError.badRequest("Не был передан userId и/или filmId!"))

            const isBlocked = await Blocked.findOne({where: {id}})

            if (!isBlocked)  return next(ApiError.badRequest("Данного фильма нет в заблокированных пользователем!"))

            const blockedDestroy = await Blocked.destroy({where: {id: isBlocked.id}})

            if (!blockedDestroy) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(blockedDestroy)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}



module.exports = new BlockedController()