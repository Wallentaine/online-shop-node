const {Actor} = require('../models/models')
const ApiError = require('../error/ApiError')

class ActorController {
    async create(req, res, next) {
        try {
            const {name} = req.body

            if (!name) return next(ApiError.badRequest("Не был передан userId!"))

            const exist = await Actor.findOne({where: {name}})

            if (exist) return next(ApiError.badRequest("Этот актёр уже существует!"))

            const actor = await Actor.create({name})

            if (!actor) next(ApiError.internal("Что-то пошло не так!"))

            return res.json(actor)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const actors = await Actor.findAll()

            if (!actors) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(actors)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ActorController()