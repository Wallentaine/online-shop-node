const {Country} = require('../models/models')
const ApiError = require('../error/ApiError')

class CountryController {
    async create(req, res, next) {
        try {
            const {name} = req.body

            if (!name) next(ApiError.badRequest("Не был передан аргумент name!"))

            const exist = await Country.findOne({where: {name}})

            if (exist) return next(ApiError.badRequest("Эта страна уже существует!"))

            const country = await Country.create({name})

            if (!country) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(country)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            const countries = await Country.findAll()

            if (!countries) return next(ApiError.internal("Что-то пошло не так!"))

            return res.json(countries)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new CountryController()