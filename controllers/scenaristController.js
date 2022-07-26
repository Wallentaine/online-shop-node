const {Scenarist} = require('../models/models')
const ApiError = require('../error/ApiError')

class ScenaristController {
    async create(req, res, next) {
        try {
            const {name} = req.body

            if (!name) return next(ApiError.badRequest("Не был передан аргумент Name!"))

            const exist = await Scenarist.findOne({where: {name}})

            if (exist) return next(ApiError.badRequest("Такой сценарист уже существует!"))

            const scenarist = await Scenarist.create({name})

            if (!scenarist) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(scenarist)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            const scenarists = await Scenarist.findAll()

            if (!scenarists) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(scenarists)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ScenaristController()