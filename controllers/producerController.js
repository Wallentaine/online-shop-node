const {Producer} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProducerController {
    async create(req, res, next) {
        try {
            const {name} = req.body

            if (!name) return next(ApiError.badRequest("Не был передан аргумент Name!"))

            const exist = await Producer.findOne({where: {name}})

            if (exist) return next(ApiError.badRequest("Такой жанр уже существует!"))

            const producer = await Producer.create({name})

            if (!producer) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(producer)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            const producers = await Producer.findAll()

            if (!producers) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(producers)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ProducerController()