const {Scenarist} = require('../models/models')
const ApiError = require('../error/ApiError')

class ScenaristController {
    async create(req, res, next) {
        const {name} = req.body
        const exist = await Scenarist.findOne({where: {name}})

        if (exist) return next(ApiError.badRequest("Такой сценарист уже существует!"))

        const scenarist = await Scenarist.create({name})
        return res.json(scenarist)
    }
    async getAll(req, res) {
        const scenarists = await Scenarist.findAll()
        return res.json(scenarists)
    }
}

module.exports = new ScenaristController()