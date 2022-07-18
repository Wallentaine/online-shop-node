const {Country} = require('../models/models')
const ApiError = require('../error/ApiError')

class CountryController {
    async create(req, res, next) {
        const {name} = req.body

        const exist = await Country.findOne({where: {name}})

        if (exist) return next(ApiError.badRequest("Эта страна уже существует!"))

        const country = await Country.create({name})
        return res.json(country)
    }
    async getAll(req, res) {
        const countries = await Country.findAll()
        return res.json(countries)
    }
}

module.exports = new CountryController()