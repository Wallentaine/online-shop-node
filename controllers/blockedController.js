const {Blocked} = require('../models/models')
const ApiError = require('../error/ApiError')

class BlockedController {
    async addBlockedFilm(req, res, next) {
        const {userId, filmId} = req.body

        if (userId && filmId) {
            const exist = await Blocked.findOne({where: {userId, filmId}})

            if (exist) return next(ApiError.internal("Что-то пошло не так!"))

            const blocked = await Blocked.create({userId, filmId})

            return res.json(blocked)
        } else if (!userId) {
            return next(ApiError.badRequest("Не был передан UserID!"))
        } else if (!filmId) {
            return next(ApiError.badRequest("Не был передан FilmId!"))
        }
    }

    async getAll(req, res, next) {
        const {userId} = req.body

        if (userId) {
            const blocked = await Blocked.findAll({where: {userId}})

            return res.json(blocked)
        } else {
            return next(ApiError.badRequest("Не был передан Id пользователя!"))
        }
    }

    async deleteBlockedFilm(req, res, next) {
        const {id} = req.body

        if (id) {
            const exist = await Blocked.findOne({where: {id}})

            if (!exist) return next(ApiError.internal("Что-то пошло не так!"))

            const blocked = await Blocked.destroy({where: {id}})

            return res.json(blocked)
        } else {
            return next(ApiError.badRequest("В запросе не был передан Id"))
        }
    }
}



module.exports = new BlockedController()