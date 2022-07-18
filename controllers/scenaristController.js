const {Scenarist} = require('../models/models')

class ScenaristController {
    async create(req, res) {
        const {name} = req.body
        const exist = await Scenarist.findOne({where: {name}})

        //if (exist) return такой жанр уже существует

        const scenarist = await Scenarist.create({name})
        return res.json(scenarist)
    }
    async getAll(req, res) {
        const scenarists = await Scenarist.findAll()
        return res.json(scenarists)
    }
}

module.exports = new ScenaristController()