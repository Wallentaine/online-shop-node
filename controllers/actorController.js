const {Actor} = require('../models/models')
const ApiError = require('../error/ApiError')

class ActorController {
    async create(req, res, next) {
        const {name} = req.body

        const exist = await Actor.findOne({where: {name}})

        if (exist) return next(ApiError.badRequest("Этот актёр уже существует!"))

        const actor = await Actor.create({name})
        return res.json(actor)
    }
    async getAll(req, res) {
        const actors = await Actor.findAll()
        return res.json(actors)
    }
}

module.exports = new ActorController()