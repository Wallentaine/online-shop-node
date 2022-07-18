const {Actor} = require('../models/models')

class ActorController {
    async create(req, res) {
        const {name} = req.body

        const exist = await Actor.findOne({where: {name}})

        // if (exist) return *Ошибка*

        const actor = await Actor.create({name})
        return res.json(actor)
    }
    async getAll(req, res) {
        const actors = await Actor.findAll()
        return res.json(actors)
    }
}

module.exports = new ActorController()